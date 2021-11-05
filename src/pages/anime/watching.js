import React from 'react';
import { graphql } from 'gatsby';
import { useColorMode, Box, Text, Image, Heading, Grid, Link } from 'theme-ui';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import Layout, { CenterColumn } from '../../components/layout';
import { pathOr, pipe, filter, map, head, take, replace, toLower, toUpper } from 'ramda';
import { DateTime } from 'luxon';

const Show = props => {
  const { media, progress } = props;

  const episodes = media.episodes;

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
        />
        {episodes && progress && (
          <progress
            style={{ width: '100%', height: '10px', position: 'absolute', bottom: '-4px', left: 0 }}
            value={progress}
            max={episodes}
          />
        )}
      </Box>

      <Heading
        as={'h5'}
        sx={{
          marginTop: 4,
          minHeight: 40,
        }}
      >
        {media.title.userPreferred}
      </Heading>
    </Link>
  );
};

const AnimeWatching = ({ data, location }) => {
  // console.log(data);

  const shows = pathOr([], ['anilist', 'MediaListCollection', 'lists', 0, 'entries'], data);

  const airing = shows.filter(show => show.media.status === 'RELEASING');
  const backlog = shows.filter(show => show.media.status !== 'RELEASING');

  const heroUrl = pipe(
    filter(show => show.media.bannerImage != null),
    map(show => show.media.bannerImage),
    head // TODO would be nice to do a runtime random image
  )(airing);

  const seasonText = pipe(
    take(1),
    map(show => `${show.media.season.toLowerCase()} ${show.media.startDate.year}`),
    head,
    replace(/^./, toUpper)
  )(airing);

  return (
    <Layout location={location} title={"What I'm Watching"}>
      <Hero heroUrl={heroUrl} includeDoubleSpacing={false} />
      <NavBar />
      <CenterColumn>
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          <Heading>Seasonal - {seasonText}</Heading>
          <Text
            sx={{
              fontStyle: 'italic',
              fontSize: 1,
            }}
          >
            Updated {DateTime.local().toFormat('LLLL d, yyyy')}
          </Text>
        </Box>

        <Grid gap={6} columns={['1fr 1fr 1fr']}>
          {airing.map(show => (
            <Show key={show.id} media={show.media} progress={show.progress} />
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            marginBottom: 4,
            marginTop: 8,
          }}
        >
          <Heading>Backlog</Heading>
        </Box>
        <Grid gap={6} columns={['1fr 1fr 1fr']}>
          {backlog.map(show => (
            <Show key={show.id} media={show.media} progress={show.progress} />
          ))}
        </Grid>
      </CenterColumn>
    </Layout>
  );
};

export default AnimeWatching;

export const pageQuery = graphql`
  query {
    anilist {
      MediaListCollection(userId: 85236, type: ANIME, status: CURRENT) {
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
