import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../../components/layout';
import Hero from '../../../components/Hero';
import NavBar from '../../../components/NavBar';
import { Heading } from 'theme-ui';

import { MDXRenderer } from 'gatsby-plugin-mdx';

const SoftwarePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { about, hero } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <Heading
          as="h1"
          sx={{
            textAlign: 'center',
            fontSize: 5,
            pb: 6,
          }}
        >
          software matrix
        </Heading>
        <MDXRenderer>{about.body}</MDXRenderer>
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
