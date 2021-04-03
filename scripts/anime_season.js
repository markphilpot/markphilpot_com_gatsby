import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DateTime } from 'luxon';
import handlebars from 'handlebars';
import _ from 'lodash';

import fs from 'fs';
import download from 'download';

const ANILIST_API = 'https://graphql.anilist.co';

const seasonQuery = gql`
  query seasonQuery($year: Int, $season: MediaSeason) {
    Page(page: 1, perPage: 100) {
      media(seasonYear: $year, season: $season, sort: [POPULARITY_DESC]) {
        id
        description
        title {
          userPreferred
          english
          romaji
        }
        coverImage {
          large
        }
        siteUrl
        studios {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const link = createHttpLink({ uri: ANILIST_API, fetch });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const year = process.env.YEAR || 2019;
const season = process.env.SEASON || 'fall';
const root = process.env.ROOT || 'content/blog';
const targetDir = `${root}/${year}/anime_${season.toLowerCase()}_first`;

fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(`${targetDir}/covers`);

const fetchData = async () => {
  const { data } = await client.query({
    query: seasonQuery,
    variables: {
      year,
      season: season.toUpperCase(),
    },
  });

  const shows = data.Page.media;

  console.log(`${shows.length} shows found...`);

  for (const show of shows) {
    await download(show.coverImage.large, `${targetDir}/covers`);
  }

  return shows.map(show => {
    const coverUrl = show.coverImage.large;
    const coverFile = coverUrl.split('/').slice(-1)[0];

    const description = _.get(show, 'description', '');

    return {
      ...show,
      __studios: _.get(show, 'studios.nodes', [])
        .map(s => s.name)
        .join(', '),
      __description: description != null ? description.replace('\r\n', '<br/>').replace('\n', '<br/>') : '',
      coverFile,
    };
  });
};

const build = async () => {
  const view = {
    shows: await fetchData(),
    timestamp: DateTime.local().toSQLTime(),
    season,
    __season: _.capitalize(season),
    year,
  };

  const template = handlebars.compile(fs.readFileSync('scripts/templates/anime_season.md').toString());

  const output = template(view);

  fs.writeFileSync(`${targetDir}/index.md`, output);
};

build();
