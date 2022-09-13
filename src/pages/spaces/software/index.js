import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../../components/layout';
import Hero from '../../../components/Hero';
import NavBar from '../../../components/NavBar';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import MarkdownProse from '../../../components/MarkdownProse';

const SoftwarePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { about, hero } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <h1 className="pb-6 text-center text-lg">software matrix</h1>
        <MarkdownProse markdown={about.body} />
      </CenterColumn>
    </Layout>
  );
};

export default SoftwarePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    hero: file(absolutePath: { regex: "/spaces/software/hero.jpg/" }) {
      publicURL
    }
    about: mdx(fields: { sourceName: { eq: "pages" } }, frontmatter: { slug: { eq: "software" } }) {
      body
      fields {
        slug
      }
    }
  }
`;
