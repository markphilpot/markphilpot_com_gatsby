import React from 'react';
import { graphql } from 'gatsby';
import { Box, Text } from 'theme-ui';
import { DateTime } from 'luxon';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Year } from '../components/typography';

const MicroIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero/>
      <NavBar />
      <CenterColumn>
        {posts.map(({ node }, index, p) => {
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
                  {currentDate.toFormat('LLLL d, yyyy')}
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
    allMdx(filter: { fields: { sourceName: { eq: "micro" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
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
            featuredImage {
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
