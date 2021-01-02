import React from 'react';
import { graphql } from 'gatsby';
import { useColorMode, Box, Flex, Text } from 'theme-ui';
import { DateTime } from 'luxon';
import Image from 'gatsby-image';
import { pathOr } from 'ramda';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Year } from '../components/typography';
import Link from '../components/Link';

const FeaturedImagePost = props => {
  const { node, title, isDraft } = props;
  // Woof -- TODO do a date search and replace to remove quotes from `date` fields
  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);
  return (
    <Box
      sx={{
        position: 'relative',
        mb: 10,
      }}
    >
      <Image
        style={{ borderRadius: 4, height: '180px', objectFit: 'cover' }}
        fluid={node.frontmatter.featured_image.childImageSharp.fluid}
      />
      {isDraft ? (
        <Text
          sx={{
            variant: 'text.caps',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-10deg)',
            fontSize: '120px',
            color: 'red',
            opacity: '0.8',
          }}
        >
          draft
        </Text>
      ) : null}
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          px: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        }}
      >
        <Text
          sx={{
            color: '#2E3440',
            fontSize: 4,
          }}
        >
          {title}
        </Text>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Text
            sx={{
              variant: 'text.caps',
              fontSize: 0,
              fontWeight: 'bold',
              color: '#2E3440',
              display: ['none', 'none', 'block', 'block'],
              textAlign: 'right',
            }}
          >
            {date.toFormat('LLLL d, yyyy')}
          </Text>
          <Text
            sx={{
              fontSize: 0,
              color: '#2E3440',
              display: ['none', 'none', 'none', 'block'],
              textAlign: 'right',
            }}
          >
            {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const SimpleTitlePost = props => {
  const { title, node, isDraft } = props;

  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);

  return (
    <Flex
      sx={{
        mb: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        sx={{
          fontSize: 4,
        }}
      >
        {isDraft ? 'DRAFT :: ' : ''}
        {title}
      </Text>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          display: ['none', 'none', 'block', 'block'],
        }}
      >
        <Text
          sx={{
            variant: 'text.caps',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'muted',
            textAlign: 'right',
          }}
        >
          {date.toFormat('LLLL d, yyyy')}
        </Text>
        <Text
          sx={{
            fontSize: 0,
            color: 'muted',
            display: ['none', 'none', 'none', 'block'],
            textAlign: 'right',
          }}
        >
          {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
        </Text>
      </Flex>
    </Flex>
  );
};

const BlogIndex = ({ data, location, pageContext }) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.posts.edges;
  const { heroLight, heroDark } = data;

  const [colorMode] = useColorMode();

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={colorMode === 'default' ? heroLight : heroDark} />
      <NavBar />
      <CenterColumn>
        {posts
          .filter(({ node }) => {
            if (process.env.NODE_ENV !== 'development') {
              return node.frontmatter.status !== 'draft';
            }
            return true;
          })
          .map(({ node }, index, p) => {
            // TODO date search/replace to remove quotes from `date` field
            const currentDate = node.frontmatter.date.includes(' ')
              ? DateTime.fromSQL(node.frontmatter.date)
              : DateTime.fromISO(node.frontmatter.date);
            const prevDate =
              index > 0
                ? p[index - 1].node.frontmatter.date.includes(' ')
                  ? DateTime.fromSQL(p[index - 1].node.frontmatter.date)
                  : DateTime.fromISO(p[index - 1].node.frontmatter.date)
                : null;
            const currentYear = currentDate.year;
            const prevYear = index > 0 ? prevDate.year : null;

            let year = null;
            if (currentYear !== prevYear) {
              year = <Year>{currentYear}</Year>;
            }

            const title = node.frontmatter.title;
            const isDraft = node.frontmatter.status === 'draft';
            const hasFeaturedImage = node.frontmatter.featured_image != null && node.frontmatter.featured_image !== '';

            if (title) {
              return (
                <article style={{ position: 'relative' }} key={node.fields.slug}>
                  {year}
                  <Link sx={{ textDecoration: 'none' }} to={node.fields.slug}>
                    {/*<a href={node.fields.slug}>*/}
                    {hasFeaturedImage ? (
                      <FeaturedImagePost node={node} title={title} isDraft={isDraft} />
                    ) : (
                      <SimpleTitlePost title={title} node={node} isDraft={isDraft} />
                    )}
                    {/*</a>*/}
                  </Link>
                </article>
              );
            } else {
              return (
                <article style={{ position: 'relative' }} key={node.fields.slug}>
                  {year}
                  <Box
                    sx={{
                      position: 'relative',
                      pt: 10,
                      my: 64,
                      borderRadius: 8,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        backgroundColor: 'microBg',
                        boxShadow: theme => `0px 0px 8px 12px ${theme.colors.microBg}`,
                        top: 0,
                        left: ['0%', '0%', '0%', '-10%'],
                        width: ['100%', '100%', '100%', '120%'],
                        height: '100%',
                        zIndex: -10,
                      }}
                    />
                    <Text
                      sx={{
                        position: 'absolute',
                        variant: 'text.caps',
                        fontSize: 0,
                        fontWeight: 'bold',
                        color: 'body',
                        top: 2,
                        right: 2,
                      }}
                    >
                      <Link sx={{ textDecoration: 'none' }} to={node.fields.slug}>
                        {currentDate.toFormat('LLLL d, yyyy')}
                      </Link>
                    </Text>
                    <MDXRenderer>{node.body}</MDXRenderer>
                  </Box>
                </article>
              );
            }
          })}
        <Flex
          sx={{
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              marginRight: 'auto',
            }}
          >
            {nextPagePath ? (
              <Link sx={{ textDecoration: 'none' }} to={nextPagePath}>
                Older Posts
              </Link>
            ) : (
              <Box sx={{ visibility: 'hidden' }}>Older Posts</Box>
            )}
          </Box>
          <Box>
            {humanPageNumber} of {numberOfPages}
          </Box>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            {previousPagePath ? (
              <Link sx={{ textDecoration: 'none' }} to={previousPagePath}>
                Newer Posts
              </Link>
            ) : (
              <Box sx={{ visibility: 'hidden' }}>Newer Posts</Box>
            )}
          </Box>
        </Flex>
      </CenterColumn>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    heroLight: file(absolutePath: { regex: "/gg_bridge_light.jpg/" }) {
      publicURL
    }
    heroDark: file(absolutePath: { regex: "/gg_bridge_dark.jpg/" }) {
      publicURL
    }
    posts: allMdx(
      filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          body
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            featured_image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    drafts: allMdx(
      filter: { fields: { sourceName: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            featured_image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
