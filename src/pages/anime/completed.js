import React from 'react';
import { graphql } from 'gatsby';
import { Box, Image, Heading, Grid, Link } from 'theme-ui';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import Layout, { CenterColumn } from '../../components/layout';
import { pathOr, pipe, filter, map, head, reduce, sort, keys } from 'ramda';
import { shuffle } from '../../utils/ramda';

const skipEnglish = true;

const buildTitle = (title) => {
  if(skipEnglish || title.romaji.toLowerCase() === title.english?.toLowerCase()) {
    return (
      <Heading
        as={'h5'}
        sx={{
          marginTop: 4,
          minHeight: 40,
        }}
      >{title.romaji}</Heading>
    );
  } else {
    return (
      <>
        <Heading
          as={'h5'}
          sx={{
            marginTop: 4,
          }}
        >{title.romaji}</Heading>
        <Heading
          as={'h5'}
          sx={{
            marginTop: 2,
          }}
        >({title.english})</Heading>
      </>
    );
  }
}

const Show = props => {
  const { media } = props;

  return (
    <Link href={media.siteUrl} target="_blank">
      <Box
        sx={{
          height: '300px',
          position: 'relative',
        }}
      >
        <Image
          sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          src={media.coverImage.large}
          loading={"lazy"}
        />
      </Box>

      <Heading
        as={'h5'}
        sx={{
          marginTop: 4,
          minHeight: 40,
        }}
      >
        {buildTitle(media.title)}
      </Heading>
    </Link>
  );
};

const AnimeYear = ({ year, shows }) => {
  return (
    <>
    <Box
      sx={{
        textAlign: 'center',
        marginBottom: 4,
      }}
    >
      <Heading><Link id={year}>{year}</Link></Heading>
    </Box>
    <Grid gap={6} columns={['1fr 1fr 1fr']}>
      {shows.map(show => (
        <Show key={show.id} media={show.media}/>
      ))}
    </Grid>
    </>
  )
}

const AnimeCompleted = ({ data, location }) => {
  // console.log(data);

  const shows = pathOr([], ['anilist', 'MediaListCollection', 'lists', 0, 'entries'], data);

  const heroUrl = pipe(
    filter(show => show.media.bannerImage != null),
    map(show => show.media.bannerImage),
    shuffle,
    head // TODO would be nice to do a runtime random image
  )(shows);

  const byYear = reduce((acc, show) => {
    const year = show.media.startDate.year;
    return {
      ...acc,
      [year]: [
        ...(acc[year] || []),
        show
      ]
    }
  }, {}, shows)

  const years = pipe(
    keys,
    sort((a, b) => b.localeCompare(a, undefined, { numeric: true })),
  )(byYear);

  return (
    <Layout location={location} title={"What I'm Watching"}>
      <Hero heroUrl={heroUrl} includeDoubleSpacing={false} />
      <NavBar />
      <CenterColumn>
        <Box sx={{ marginBottom: 6 }}>
          {years.map(year => (
            <Link href={`#${year}`}>{year} </Link>
          ))}
        </Box>
        {years.map(year => (
          <AnimeYear key={year} year={year} shows={byYear[year]}/>
        ))}
      </CenterColumn>
    </Layout>
  );
};

export default AnimeCompleted;

export const pageQuery = graphql`
  query {
    anilist {
      MediaListCollection(userId: 85236, type: ANIME, status: COMPLETED) {
        lists {
          name
          status
          isCustomList
          entries {
            id
            status
            score
            mediaId
            progress
            customLists
            hiddenFromStatusLists
            updatedAt
            createdAt
            media {
              id
              type
              format
              status
              episodes
              chapters
              siteUrl
              title {
                userPreferred
                romaji
                english
              }
              coverImage {
                medium
                large
              }
              bannerImage
              nextAiringEpisode {
                timeUntilAiring
                episode
              }
              season
              startDate {
                month
                day
                year
              }
            }
          }
        }
      }
    }
  }
`;
