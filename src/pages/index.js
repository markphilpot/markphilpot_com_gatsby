import React from 'react';
import { Link, graphql } from 'gatsby';
import { useColorMode, Box, Flex, Heading, Text } from 'theme-ui';
import { DateTime } from 'luxon';
import Image from 'gatsby-image';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;
  const { heroLight, heroDark } = data;

  const [colorMode] = useColorMode();

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={colorMode === 'default' ? heroLight : heroDark} />
      <NavBar />
      <CenterColumn>
        {posts.map(({ node }, index, p) => {
          const currentYear = DateTime.fromSQL(node.frontmatter.date).year;
          const prevYear = index > 0 ? DateTime.fromSQL(p[index].node.frontmatter.date).year : null;

          let year = null;
          if (currentYear !== prevYear) {
            year = (
              <Box
                css={{
                  position: 'absolute',
                  width: '150px',
                  left: '-190px',
                  textAlign: 'right',
                }}
              >
                <Heading>{currentYear}</Heading>
              </Box>
            );
          }

          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article style={{ position: 'relative' }} key={node.fields.slug}>
              {year}
              <Link style={{ textDecoration: 'none' }} to={node.fields.slug}>
                <Box
                  css={{
                    position: 'relative',
                  }}
                >
                  <Image style={{ borderRadius: 4 }} fluid={node.frontmatter.featured_image.childImageSharp.fluid} />
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
                        }}
                      >
                        {DateTime.fromSQL(node.frontmatter.date).toFormat('LLLL d, yyyy')}
                      </Text>
                      <Text
                        sx={{
                          fontSize: 0,
                          color: '#2E3440',
                        }}
                      >
                        {node.frontmatter.tags.join(', ')}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Link>
            </article>
          );
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
