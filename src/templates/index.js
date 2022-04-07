import React from 'react';
import { graphql } from 'gatsby';
import { useColorMode, Box, Text } from 'theme-ui';
import { DateTime } from 'luxon';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Year } from '../components/typography';
import Link from '../components/Link';
import SEO from '../components/SEO';
import FeaturedImagePost from '../components/posts/FeaturedImagePost';
import SimpleTitlePost from '../components/posts/SimpleTitlePost';

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const mdxPosts = data.posts.edges;

  const microPosts = data.microPosts.edges
    .filter(edge => edge.node.uid !== 1532342) // Filter out the initial "experiment" post
    .map(edge => {
      return {
        node: {
          ...edge.node,
          ...edge.node.childMdx,
        },
      };
    });

  const posts = [...microPosts, ...mdxPosts].sort((a, b) => {
    const aDate = a.node.frontmatter.date.includes(' ')
      ? DateTime.fromSQL(a.node.frontmatter.date)
      : DateTime.fromISO(a.node.frontmatter.date);
    const bDate = b.node.frontmatter.date.includes(' ')
      ? DateTime.fromSQL(b.node.frontmatter.date)
      : DateTime.fromISO(b.node.frontmatter.date);
    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  });

  const { heroLight, heroDark } = data;

  const [colorMode] = useColorMode();

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={'markphilpot.com'} />
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
            const hasFeaturedImage = node.frontmatter.featuredImage != null && node.frontmatter.featuredImage !== '';

            if (title) {
              return (
                <article style={{ position: 'relative' }} key={node.fields.slug}>
                  {year}
                  <Link sx={{ textDecoration: 'none' }} to={node.fields.slug}>
                    {/*<a href={node.fields.slug}>*/}
                    {hasFeaturedImage ? (
                      <FeaturedImagePost title={title} node={node} isDraft={isDraft} />
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
      </CenterColumn>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
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
    microPosts: allMicroblog {
      edges {
        node {
          uid
          fields {
            slug
          }
          childMdx {
            body
            frontmatter {
              date: published
            }
          }
        }
      }
    }
    posts: allMdx(
      filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
