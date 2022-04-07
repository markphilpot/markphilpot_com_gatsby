import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import { Box, Flex, Text, Heading } from 'theme-ui';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import Link from '../components/Link';
import SEO from '../components/SEO';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next, slug } = pageContext;

  const date = post.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(post.frontmatter.date)
    : DateTime.fromISO(post.frontmatter.date);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        image={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.resize : null}
      />
      <Hero hero={post.frontmatter.hero} />
      <NavBar />
      <CenterColumn>
        <article>
          <header>
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
              {date.toFormat('MMMM d, yyyy')}
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
        </article>
        <nav>
          <Flex
            sx={{
              justifyContent: 'space-between',
            }}
          >
            {previous != null ? (
              <Link sx={{ variant: 'styles.navlink', fontSize: 3 }} to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title || 'Previous Thought...'}
              </Link>
            ) : (
              <Box />
            )}
            {next != null ? (
              <Link sx={{ variant: 'styles.navlink', fontSize: 3 }} to={next.fields.slug} rel="next">
                {next.frontmatter.title || 'Next Thought...'}
              </Link>
            ) : (
              <Box />
            )}
          </Flex>
        </nav>
      </CenterColumn>
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
      body
      frontmatter {
        title
        date
        hero {
          publicURL
        }
        featuredImage {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`;
