import React from 'react';
import { graphql } from 'gatsby';
import { useColorMode, Box, Text, Image, Heading, Grid } from 'theme-ui';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import Layout, { CenterColumn } from '../../components/layout';
import { pathOr, pipe, filter, map, head } from 'ramda';

const Show = props => {
  const { media } = props;

  console.log(media);

  return (
    <Box>
      <Box
        sx={{
          height: '300px'
        }}
      >
        <Image sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} src={media.coverImage.large} />
      </Box>
      <Heading as={'h3'}>{media.title.userPreferred}</Heading>
    </Box>
  );
};

const AnimeWatching = ({ data, location }) => {
  const [colorMode] = useColorMode();

  console.log(data);

  const shows = pathOr([], ['anilist', 'MediaListCollection', 'lists', 0, 'entries'], data);

  const airing = shows.filter(show => show.media.status === 'RELEASING');
  const backlog = shows.filter(show => show.media.status !== 'RELEASING');

  const heroUrl = pipe(
    filter(show => show.media.bannerImage != null),
    map(show => show.media.bannerImage),
    head // TODO would be nice to do a runtime random image
  )(airing);

  console.log(heroUrl);

  return (
    <Layout location={location} title={"What I'm Watching"}>
      <Hero heroUrl={heroUrl} includeDoubleSpacing={false} />
      <NavBar />
      <CenterColumn>
        <Heading>Seasonal</Heading>

        <Grid columns={['1fr 1fr 1fr']}>
          {airing.map(show => (
            <Show key={show.id} media={show.media} />
          ))}
        </Grid>

        <Heading>Backlog</Heading>
        {backlog.map(show => {
          return <Text key={show.id}>{show.media.title.userPreferred}</Text>;
        })}
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
