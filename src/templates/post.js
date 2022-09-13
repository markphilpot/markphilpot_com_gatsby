import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import Link from '../components/Link';
import Seo from '../components/SEO';
import MarkdownProse from '../components/MarkdownProse';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const date = post.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(post.frontmatter.date)
    : DateTime.fromISO(post.frontmatter.date);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        image={post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.resize : null}
      />
      <Hero hero={post.frontmatter.hero} />
      <NavBar />
      <CenterColumn>
        <article className="prose prose-xl max-w-none dark:prose-invert">
          <header>
            <div className="text-xs font-bold uppercase">{date.toFormat('MMMM d, yyyy')}</div>
            <h1 className="mb-6 mt-4 text-center text-4xl">{post.frontmatter.title}</h1>
          </header>
          <MarkdownProse markdown={post.body} />
          <hr />
        </article>
        <nav>
          <div className="flex justify-between">
            {previous != null ? (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title || 'Previous Thought...'}
              </Link>
            ) : (
              <div />
            )}
            {next != null ? (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title || 'Next Thought...'}
              </Link>
            ) : (
              <div />
            )}
          </div>
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
