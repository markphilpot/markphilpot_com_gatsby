import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useColorMode } from 'theme-ui'

import { Heading, Text } from 'theme-ui';

import Layout from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;
  const { heroLight, heroDark } = data;

  const [colorMode] = useColorMode();

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={colorMode === 'default' ? heroLight : heroDark}/>
      <NavBar/>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <Heading as={'h3'}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </Heading>
              <small>{node.frontmatter.date}</small>
            </header>
            <section
              style={{
                margin: '0 auto',
                maxWidth: '33rem',
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
