import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import { Text } from 'theme-ui';

import Layout, { CenterColumn } from '../components/layout';
import NavBar from '../components/NavBar';
import Seo from '../components/SEO';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.microblog;
  const siteTitle = data.site.siteMetadata.title;
  // const { slug } = pageContext;

  const date = post.published.includes(' ') ? DateTime.fromSQL(post.published) : DateTime.fromISO(post.published);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={''}
        // title={post.frontmatter.title}
        // description={post.frontmatter.summary}
        // image={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.resize : null}
      />
      <NavBar />
      <CenterColumn>
        <article>
          <header>
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
              {date.toFormat('MMMM d, yyyy')}
            </Text>
          </header>
          <section>
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
          </section>
          <hr />
        </article>
      </CenterColumn>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query MicroPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    microblog(fields: { slug: { eq: $slug } }) {
      id
      name
      url
      content
      published
      uid
      childMdx {
        body
      }
    }
  }
`;
