import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Text, Heading } from 'theme-ui';

import Layout from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={post.frontmatter.hero} />
      <NavBar />
      <article
        style={{
          margin: '0 auto',
          maxWidth: '660px',
        }}
      >
        <header>
          <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
            {post.frontmatter.date}
          </Text>
          <Heading
            as="h1"
            sx={{
              mb: 10,
              mt: 6,
              fontSize: 6,
            }}
            css={{ textAlign: 'center' }}
          >
            {post.frontmatter.title}
          </Heading>
        </header>
        <section>
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
        <hr />
        <footer>{/*<Bio />*/}</footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero {
          publicURL
        }
      }
    }
  }
`;
