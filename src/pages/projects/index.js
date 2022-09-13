import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../components/layout';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';

import MarkdownProse from '../../components/MarkdownProse';

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { about, hero } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <h1 className="pb-6 text-center text-2xl">Projects</h1>

        <MarkdownProse markdown={about.body} />
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
    hero: file(absolutePath: { regex: "/projects/hero.jpg/" }) {
      publicURL
    }
    about: mdx(fields: { sourceName: { eq: "pages" } }, frontmatter: { slug: { eq: "projects" } }) {
      body
      fields {
        slug
      }
    }
  }
`;
