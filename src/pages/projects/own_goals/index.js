import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../../components/layout';
import Hero from '../../../components/Hero';
import NavBar from '../../../components/NavBar';

import { MDXRenderer } from 'gatsby-plugin-mdx';

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { og, hero } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <MDXRenderer>{og.body}</MDXRenderer>
      </CenterColumn>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    hero: file(absolutePath: { regex: "/own_goals/cover.jpg/" }) {
      publicURL
    }
    og: mdx(fields: { sourceName: { eq: "pages" } }, frontmatter: { slug: { eq: "own_goals" } }) {
      body
      fields {
        slug
      }
    }
  }
`;
