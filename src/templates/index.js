import React from 'react';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Year } from '../components/typography';
import Link from '../components/Link';
import Seo from '../components/SEO';
import FeaturedImagePost from '../components/posts/FeaturedImagePost';
import SimpleTitlePost from '../components/posts/SimpleTitlePost';
import MarkdownProse from '../components/MarkdownProse';
import classNames from 'classnames';

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const mdxPosts = data.posts.edges;

  const microPosts = data.microPosts.edges
    .filter((edge) => edge.node.uid !== 1532342) // Filter out the initial "experiment" post
    .map((edge) => {
      return {
        node: {
          ...edge.node,
          ...edge.node.childMdx,
        },
      };
    });

  const posts = [...microPosts, ...mdxPosts].sort((a, b) => {
    const aDate = a.node.frontmatter.date.includes(' ')
      ? DateTime.fromSQL(a.node.frontmatter.date)
      : DateTime.fromISO(a.node.frontmatter.date);
    const bDate = b.node.frontmatter.date.includes(' ')
      ? DateTime.fromSQL(b.node.frontmatter.date)
      : DateTime.fromISO(b.node.frontmatter.date);
    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  });

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={'markphilpot.com'} />
      <Hero hero={null} showDoubleSpace={false} showFilterMicro={true} />
      <NavBar />
      <CenterColumn>
        {posts
          .filter(({ node }) => {
            if (process.env.NODE_ENV !== 'development') {
              return node.frontmatter.status !== 'draft';
            }
            return true;
          })
          .map(({ node }, index, p) => {
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

            const title = node.frontmatter.title;
            const isDraft = node.frontmatter.status === 'draft';
            const hasFeaturedImage = node.frontmatter.featuredImage != null && node.frontmatter.featuredImage !== '';

            if (title) {
              return (
                <div className={'relative'} key={node.fields.slug}>
                  {year}
                  <article className={'relative'}>
                    <Link to={node.fields.slug}>
                      {hasFeaturedImage ? (
                        <FeaturedImagePost title={title} node={node} isDraft={isDraft} />
                      ) : (
                        <SimpleTitlePost title={title} node={node} isDraft={isDraft} />
                      )}
                    </Link>
                  </article>
                </div>
              );
            } else {
              return (
                <div className="relative" key={node.fields.slug}>
                  {year}
                  <div className={'relative'} datatype={'micro'}>
                    <div
                      className={classNames(
                        'absolute top-0 left-0 -left-8 h-full w-full w-[100vw] bg-slate-200',
                        'lg:-left-[2rem] lg:w-[calc(100%+4rem)] lg:rounded-3xl'
                      )}
                    />
                    <div className="relative my-16 py-8">
                      <div className="mb-4 w-full text-right text-sm font-bold uppercase">
                        <Link to={node.fields.slug}>{currentDate.toFormat('LLLL d, yyyy')}</Link>
                      </div>
                      <MarkdownProse markdown={node.body} />
                    </div>
                  </div>
                </div>
              );
            }
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
    microPosts: allMicroblog {
      edges {
        node {
          uid
          fields {
            slug
          }
          childMdx {
            body
            frontmatter {
              date: published
            }
          }
        }
      }
    }
    posts: allMdx(
      filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
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
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
