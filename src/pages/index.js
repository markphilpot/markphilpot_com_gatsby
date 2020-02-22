import React from 'react';
import { graphql } from 'gatsby';
import { useColorMode, Box, Flex, Text } from 'theme-ui';
import { DateTime } from 'luxon';
import Image from 'gatsby-image';

import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Year } from '../components/typography';
import Link from '../components/Link';

const FeaturedImagePost = props => {
  const { node, title, isDraft } = props;
  return (
    <Box
      sx={{
        position: 'relative',
        mb: 10,
      }}
    >
      <Image
        style={{ borderRadius: 4, height: '180px', objectFit: 'cover' }}
        fluid={node.frontmatter.featured_image.childImageSharp.fluid}
      />
      {isDraft ? (
        <Text
          sx={{
            variant: 'text.caps',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-10deg)',
            fontSize: '120px',
            color: 'red',
            opacity: '0.8',
          }}
        >
          draft
        </Text>
      ) : null}
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          px: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        }}
      >
        <Text
          sx={{
            color: '#2E3440',
            fontSize: 4,
          }}
        >
          {title}
        </Text>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Text
            sx={{
              variant: 'text.caps',
              fontSize: 0,
              fontWeight: 'bold',
              color: '#2E3440',
              display: ['none', 'none', 'block', 'block'],
              textAlign: 'right',
            }}
          >
            {DateTime.fromSQL(node.frontmatter.date).toFormat('LLLL d, yyyy')}
          </Text>
          <Text
            sx={{
              fontSize: 0,
              color: '#2E3440',
              display: ['none', 'none', 'none', 'block'],
              textAlign: 'right',
            }}
          >
            {node.frontmatter.tags.join(', ')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const SimpleTitlePost = props => {
  const { title, node, isDraft } = props;

  return (
    <Flex
      sx={{
        mb: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        sx={{
          fontSize: 4,
        }}
      >
        {isDraft ? 'DRAFT :: ' : ''}
        {title}
      </Text>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          display: ['none', 'none', 'block', 'block'],
        }}
      >
        <Text
          sx={{
            variant: 'text.caps',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'muted',
            textAlign: 'right',
          }}
        >
          {DateTime.fromSQL(node.frontmatter.date).toFormat('LLLL d, yyyy')}
        </Text>
        <Text
          sx={{
            fontSize: 0,
            color: 'muted',
            display: ['none', 'none', 'none', 'block'],
            textAlign: 'right',
          }}
        >
          {node.frontmatter.tags.join(', ')}
        </Text>
      </Flex>
    </Flex>
  );
};

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.posts.edges;
  const drafts = data.drafts.edges;
  const { heroLight, heroDark } = data;

  const [colorMode] = useColorMode();

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={colorMode === 'default' ? heroLight : heroDark} />
      <NavBar />
      <CenterColumn>
        {process.env.NODE_ENV === 'development' ? drafts
            .map(({ node }, index, p) => {

              let year = null;
              if (index === 0) {
                year = <Year>Drafts</Year>;
              }

              const title = node.frontmatter.title || node.fields.slug;
              const isDraft = node.frontmatter.status === 'draft';
              const hasFeaturedImage = node.frontmatter.featured_image != null && node.frontmatter.featured_image != '';
              return (
                <article style={{ position: 'relative' }} key={node.fields.slug}>
                  {year}
                  <Link sx={{ textDecoration: 'none' }} to={node.fields.slug}>
                    {/*<a href={node.fields.slug}>*/}
                    {hasFeaturedImage ? (
                      <FeaturedImagePost node={node} title={title} isDraft={isDraft} />
                    ) : (
                      <SimpleTitlePost title={title} node={node} isDraft={isDraft} />
                    )}
                    {/*</a>*/}
                  </Link>
                </article>
              );
            })
          : null}
        {posts
          .filter(({ node }) => {
            if (process.env.NODE_ENV !== 'development') {
              return node.frontmatter.status !== 'draft';
            }
            return true;
          })
          .map(({ node }, index, p) => {
            const currentYear = DateTime.fromSQL(node.frontmatter.date).year;
            const prevYear = index > 0 ? DateTime.fromSQL(p[index - 1].node.frontmatter.date).year : null;

            let year = null;
            if (currentYear !== prevYear) {
              year = <Year>{currentYear}</Year>;
            }

            const title = node.frontmatter.title || node.fields.slug;
            const isDraft = node.frontmatter.status === 'draft';
            const hasFeaturedImage = node.frontmatter.featured_image != null && node.frontmatter.featured_image != '';
            return (
              <article style={{ position: 'relative' }} key={node.fields.slug}>
                {year}
                <Link sx={{ textDecoration: 'none' }} to={node.fields.slug}>
                  {/*<a href={node.fields.slug}>*/}
                  {hasFeaturedImage ? (
                    <FeaturedImagePost node={node} title={title} isDraft={isDraft} />
                  ) : (
                    <SimpleTitlePost title={title} node={node} isDraft={isDraft} />
                  )}
                  {/*</a>*/}
                </Link>
              </article>
            );
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
    heroLight: file(absolutePath: { regex: "/gg_bridge_light.jpg/" }) {
      publicURL
    }
    heroDark: file(absolutePath: { regex: "/gg_bridge_dark.jpg/" }) {
      publicURL
    }
    posts: allMdx(
        filter: { fields: { sourceName: { eq: "blog" } }, frontmatter: { status: { ne: "draft" } } }
        sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            status
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
    drafts: allMdx(
        filter: { fields: { sourceName: { eq: "blog" } }, frontmatter: { status: { eq: "draft" } } }
        sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            status
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
