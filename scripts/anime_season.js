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

const listQuery = gql`
  query listQuery($page: Int) {
    Page(page: $page, perPage: 50) {
      mediaList(userName: "mphilpot", status_in: [PLANNING, CURRENT]) {
        media {
          id
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const seasonQuery = gql`
  query seasonQuery($year: Int, $season: MediaSeason, $page: Int) {
    Page(page: $page, perPage: 50) {
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
      pageInfo {
        hasNextPage
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
const targetDir = `${root}/${year}/anime_${season.toLowerCase()}_first.textbundle`;

fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(`${targetDir}/assets`);

const info = {
  version: 2,
  type: 'net.daringfireball.markdown',
  transient: false,
};

fs.writeFileSync(`${targetDir}/info.json`, JSON.stringify(info));

const fetchPlanningIds = async () => {
  let page = 1;
  let ids = [];
  let hasNextPage;

  do {
    const { data } = await client.query({
      query: listQuery,
      variables: {
        page,
      },
    });
    hasNextPage = data.Page.pageInfo.hasNextPage;
    ids = ids.concat(data.Page.mediaList.map((m) => m.media.id));
    page++;
  } while (hasNextPage);

  console.log(`Found ${ids.length} shows in PLANNING/CURRENT`);

  return new Set(ids);
};

const fetchData = async (filteredIds) => {
  const pageLimit = 1;
  let page = 1;
  let shows = [];
  let hasNextPage;

  do {
    console.log(`Retrieving page ${page}...`);
    const { data } = await client.query({
      query: seasonQuery,
      variables: {
        year,
        season: season.toUpperCase(),
        page,
      },
    });

    hasNextPage = data.Page.pageInfo.hasNextPage;
    shows = shows.concat(data.Page.media);
    page++;
  } while (hasNextPage && page < pageLimit);

  console.log(`${shows.length} shows found...`);

  shows = shows.filter((show) => filteredIds.has(show.id));

  console.log(`${shows.length} shows found in PLANNING/CURRENT...`);

  for (const show of shows) {
    await download(show.coverImage.large, `${targetDir}/assets`);
  }

  return shows.map((show) => {
    const coverUrl = show.coverImage.large;
    const coverFile = coverUrl.split('/').slice(-1)[0];

    const description = _.get(show, 'description', '');

    return {
      ...show,
      __studios: _.get(show, 'studios.nodes', [])
        .map((s) => s.name)
        .join(', '),
      __description: description != null ? description.replace('\r\n', '<br/>').replace('\n', '<br/>') : '',
      coverFile,
    };
  });
};

const build = async () => {
  const planningIds = await fetchPlanningIds();
  const view = {
    shows: await fetchData(planningIds),
    timestamp: DateTime.local().toSQLTime(),
    season,
    __season: _.capitalize(season),
    year,
  };

  const template = handlebars.compile(fs.readFileSync('scripts/templates/anime_season.md').toString());

  const output = template(view);

  fs.writeFileSync(`${targetDir}/text.md`, output);
};

build();
