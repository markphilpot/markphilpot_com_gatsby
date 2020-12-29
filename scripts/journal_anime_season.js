import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import _ from 'lodash';

import { reverse, path } from 'ramda';

const ANILIST_API = 'https://graphql.anilist.co';
const JOURNAL_API = 'https://imperio.usejournal.com/graphql';
// const JOURNAL_API = 'https://imperio.staging.canopyiq.com/graphql';
const JOURNAL_JWT = process.env.JWT;

const seasonQuery = gql`
  query seasonQuery($year: Int, $season: MediaSeason, $sort: [MediaSort]) {
    Page(page: 1, perPage: 100) {
      media(seasonYear: $year, season: $season, sort: $sort, format: TV) {
        id
        description
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        bannerImage
        siteUrl
        studios {
          nodes {
            name
          }
        }
        trailer {
          id
          site
        }
        externalLinks {
          url
          site
        }
        tags {
          name
        }
      }
    }
  }
`;

const createSpace = gql`
  mutation createSpaceMutation($input: CreateSpaceInput) {
    createSpace(input: $input) {
      status
      id
    }
  }
`;
const createHeader = gql`
  mutation createSpaceAnnotationMutation($input: CreateSpaceAnnotationInput) {
    createSpaceAnnotation(input: $input) {
      status
      id
    }
  }
`;
const createLink = gql`
  mutation createJournalLink($input: CreateJournalLinkInput) {
    createJournalLink(input: $input) {
      status
      urn
      id
    }
  }
`;

const link = createHttpLink({ uri: ANILIST_API, fetch });
const journalLink = createHttpLink({ uri: JOURNAL_API, fetch });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JOURNAL_JWT;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'x-protocol-version': 2,
    }
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
const journalClient = new ApolloClient({
  link: authLink.concat(journalLink),
  cache: new InMemoryCache(),
});

const year = process.env.YEAR || 2020;
const season = process.env.SEASON || 'fall';


const fetchAnilistData = async () => {
  const { data } = await client.query({
    query: seasonQuery,
    variables: {
      year,
      season: season.toUpperCase(),
      sort: ['START_DATE'],
      // sort: ['POPULARITY_DESC'],
    },
  });

  const shows = data.Page.media;

  console.log(`${shows.length} shows found...`);

  return shows.map(show => {
    const description = _.get(show, 'description', '');
    const tags = _.get(show, 'tags', []);

    const trailer = path(['trailer', 'site'], show) === 'youtube' ? `https://www.youtube.com/watch?v=${show.trailer.id}` : null;

    return {
      ...show,
      __studios: _.get(show, 'studios.nodes', [])
        .map(s => s.name)
        .join(', '),
      __description: description != null ? description.replace('\r\n', '<br/>').replace('\n', '<br/>') : '',
      __tags: tags.map(t => t.name).join(', '),
      __trailer: trailer,
    };
  });
};

const build = async () => {
  try {
    const shows = reverse(await fetchAnilistData());
    // const shows = await fetchAnilistData();

    const createSpaceResponse = await journalClient.mutate({
      mutation: createSpace,
      variables: {
        input: {
          name: 'Fall 2020 Anime Sampling'
        }
      }
    });

    const spaceUrn = 'journal:space:project';
    const spaceId = path(['data', 'createSpace', 'id'], createSpaceResponse);

    for (let i = 0; i < shows.length; i++) {
      console.log(`Adding show :: ${i}`);
      const show = shows[i];

      const title = show.title.romaji;
      const coverUrl = show.coverImage.large
      const bannerUrl = show.bannerImage;
      const trailerUrl = show['__trailer'];
      const externalLinks = show.externalLinks;

      // if(externalLinks) {
      //   for(let j = 0; j < externalLinks.length; j++) {
      //     const elinkUrl = externalLinks[j].url;
      //     await journalClient.mutate({
      //       mutation: createLink,
      //       variables: {
      //         input: {
      //           url: elinkUrl,
      //           spaceUrn,
      //           spaceId,
      //         }
      //       }
      //     })
      //   }
      // }

      // if(trailerUrl) {
      //   await journalClient.mutate({
      //     mutation: createLink,
      //     variables: {
      //       input: {
      //         url: trailerUrl,
      //         spaceUrn,
      //         spaceId,
      //       }
      //     }
      //   })
      // }

      if(coverUrl) {
        await journalClient.mutate({
          mutation: createLink,
          variables: {
            input: {
              url: coverUrl,
              spaceUrn,
              spaceId,
            }
          }
        })
      }

      if(bannerUrl) {
        await journalClient.mutate({
          mutation: createLink,
          variables: {
            input: {
              url: bannerUrl,
              spaceUrn,
              spaceId,
            }
          }
        })
      }

      await journalClient.mutate({
        mutation: createHeader,
        variables: {
          input: {
            text: title,
            markdownText: '',
            spaceId,
            spaceUrn,
            annotationType: 'journal:space:annotation:header',
            index: 0,
          }
        }
      });
    }

    // fs.writeFileSync("output.json", JSON.stringify(shows, null, 2));
  } catch(e) {
    console.error(e);
  }
};

build();
