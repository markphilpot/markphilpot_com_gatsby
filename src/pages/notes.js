import React from 'react';
import { graphql } from 'gatsby';
import { Box, Flex, Text, Heading } from 'theme-ui';
import { DateTime } from 'luxon';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import Link from '../components/Link';

const NotesIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero/>
      <NavBar />
      <CenterColumn>
        {posts.map(({ node }, index, p) => {
          const date = node.frontmatter.modified.includes(' ')
            ? DateTime.fromSQL(node.frontmatter.modified)
            : DateTime.fromISO(node.frontmatter.modified);

          return (
            <article style={{ position: 'relative' }} key={node.fields.slug}>
              <Box>
                <Link to={node.fields.slug}>
                  <Flex sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', my: 6 }}>
                    <Heading sx={{ fontSize: 4 }}>{node.frontmatter.title}</Heading>
                    <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
                      {date.toFormat('MMMM d, yyyy')}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            </article>
          );
        })}
      </CenterColumn>
    </Layout>
  );
};

export default NotesIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { sourceName: { eq: "notes" } } }
      sort: { fields: [frontmatter___modified], order: DESC }
    ) {
      edges {
        node {
          body
          fields {
            slug
          }
          frontmatter {
            date
            modified
            title
            tags
          }
        }
      }
    }
  }
`;
