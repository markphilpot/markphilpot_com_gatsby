import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import { Text } from 'theme-ui';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import Seo from '../components/SEO';

const NoteTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;

  const date = post.frontmatter.modified.includes(' ')
    ? DateTime.fromSQL(post.frontmatter.modified)
    : DateTime.fromISO(post.frontmatter.modified);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        image={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.resize : null}
      />
      <Hero/>
      <NavBar />
      <CenterColumn>
        <article>
          <header>
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
              Updated {date.toFormat('MMMM d, yyyy')}
            </Text>
          </header>
          <section>
            <MDXRenderer>{post.body}</MDXRenderer>
          </section>
        </article>
      </CenterColumn>
    </Layout>
  );
};

export default NoteTemplate;

export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
        modified
        tags
      }
    }
  }
`;
