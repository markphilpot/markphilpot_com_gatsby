import React from 'react';
import { Link, graphql } from 'gatsby';
import { useColorMode, Box, Flex, Heading, Text } from 'theme-ui';
import { DateTime } from 'luxon';
import Image from 'gatsby-image';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const MicroIndex = ({ data, location }) => {
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
          const prevYear = index > 0 ? DateTime.fromSQL(p[index-1].node.frontmatter.date).year : null;

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
          return (
            <article style={{ position: 'relative' }} key={node.fields.slug}>
              {year}
              <Box
                sx={{
                  position: 'relative',
                  backgroundColor: 'microBg',
                  boxShadow: theme => `0px 0px 8px 12px ${theme.colors.microBg}`,
                  pb: 10,
                  mb: 64,
                  borderRadius: 8,
                }}
              >
                <MDXRenderer>{node.body}</MDXRenderer>
                <Text
                  sx={{
                    position: 'absolute',
                    variant: 'text.caps',
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'body',
                    bottom: 2,
                    right: 2,
                  }}
                >
                  {DateTime.fromSQL(node.frontmatter.date).toFormat('LLLL d, yyyy')}
                </Text>
              </Box>
            </article>
          );
        })}
      </CenterColumn>
    </Layout>
  );
};

export default MicroIndex;

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
    allMdx(filter: {fields: {sourceName: {eq: "micro"}}}, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
  }
`;
