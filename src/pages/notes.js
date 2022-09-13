import React from 'react';
import { graphql } from 'gatsby';
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
      <Hero />
      <NavBar />
      <CenterColumn>
        {posts.map(({ node }, index, p) => {
          const date = node.frontmatter.modified.includes(' ')
            ? DateTime.fromSQL(node.frontmatter.modified)
            : DateTime.fromISO(node.frontmatter.modified);

          return (
            <article style={{ position: 'relative' }} key={node.fields.slug}>
              <div>
                <Link to={node.fields.slug}>
                  <div className="my-6 flex flex-row items-center justify-between">
                    <h1 className="text-lg">{node.frontmatter.title}</h1>
                    <div className="text-xs font-bold uppercase">{date.toFormat('MMMM d, yyyy')}</div>
                  </div>
                </Link>
              </div>
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
