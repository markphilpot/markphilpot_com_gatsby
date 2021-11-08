import React from 'react';
import { graphql } from 'gatsby';
import { Box, Text, Heading, Grid, Link, Progress } from 'theme-ui';
import Image from 'gatsby-image';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import Layout, { CenterColumn } from '../../components/layout';
import { pathOr, pipe, filter, map, head, take, replace, toUpper } from 'ramda';
import { DateTime } from 'luxon';
import { shuffle } from '../../utils/ramda';

const Show = props => {
  const { media, progress } = props;

  const episodes = media.episodes;

  console.log('FUCK', media);

  return (
    <Link href={media.siteUrl} target="_blank">
      <Box
        sx={{
          height: '300px',
          position: 'relative',
        }}
      >
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          // src={media.coverImage.large}
          fluid={media.coverImage.largeFile.childImageSharp.fluid}
        />
        {episodes && progress && (
          <Progress
            sx={{ width: '100%', height: '6px', position: 'absolute', bottom: 0, left: 0, color: 'pink' }}
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
  const shows = pathOr([], ['anilist', 'MediaListCollection', 'lists', 0, 'entries'], data);

  const airing = shows.filter(show => show.media.status === 'RELEASING');
  const backlog = shows.filter(show => show.media.status !== 'RELEASING');

  const heroUrl = pipe(
    filter(show => show.media.bannerImage != null),
    map(show => show.media.bannerImage),
    shuffle,
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
                largeFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
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
