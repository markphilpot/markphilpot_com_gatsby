import React from 'react';
import { graphql } from 'gatsby';
import { Box, Text, Heading, Grid, Link, Progress } from 'theme-ui';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import Layout, { CenterColumn } from '../../components/layout';
import { pathOr, pipe, filter, map, head, take, replace, toUpper } from 'ramda';
import { DateTime } from 'luxon';
import { shuffle } from '../../utils/ramda';

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
        <GatsbyImage
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
          alt={media.title.userPreferred}
          image={media.coverImage.largeFile.childImageSharp.gatsbyImageData}
        />
        {episodes && progress ? (
          <Progress
            sx={{ width: '100%', height: '6px', position: 'absolute', bottom: 0, left: 0, color: '#9932CC' }}
            value={progress}
            max={episodes}
          />
        ) : null}
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

const Watching = ({ data, location }) => {
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
          <Heading>Seasonal Anime - {seasonText}</Heading>
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
          <Heading>Also...</Heading>
        </Box>

        <Grid gap={6} columns={['1fr 1fr 1fr']}>
          <Box
            sx={{
              height: '300px',
              position: 'relative',
            }}
          >
            <StaticImage
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              src={'https://m.media-amazon.com/images/M/MV5BYmU5OWM5ZTAtNjUzOC00NmUyLTgyOWMtMjlkNjdlMDAzMzU1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg'}
              alt={'Arcane: League of Legends'}
            />
            <Heading
              as={'h5'}
              sx={{
                marginTop: 4,
                minHeight: 40,
              }}
            >
              Arcane: League of Legends
            </Heading>
          </Box>
          <Box
            sx={{
              height: '300px',
              position: 'relative',
            }}
          >
            <StaticImage
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              src={'https://static.wikia.nocookie.net/the-owl-house/images/b/b1/The-Owl-House-key-art.jpg/revision/latest?cb=20210517172042'}
              alt={'Owl House Season 2'}
            />
            <Heading
              as={'h5'}
              sx={{
                marginTop: 4,
                minHeight: 40,
              }}
            >
              Owl House Season 2
            </Heading>
          </Box>
          <Box
            sx={{
              height: '300px',
              position: 'relative',
            }}
          >
            <StaticImage
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
              src={'https://nerdist.com/wp-content/uploads/2021/10/WOFT_S1_OneSheet_HeroesVillains_PRE_27x40_THA_FINAL_en-US.jpg'}
              alt={'Wheel of Time'}
            />
            <Heading
              as={'h5'}
              sx={{
                marginTop: 4,
                minHeight: 40,
              }}
            >
              Wheel of Time
            </Heading>
          </Box>
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            marginBottom: 4,
            marginTop: 16,
          }}
        >
          <Heading>Anime Backlog</Heading>
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

export default Watching;

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
                    gatsbyImageData(layout: CONSTRAINED)
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
