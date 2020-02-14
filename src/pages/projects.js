import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Flex, Box, Link, Heading, Text } from 'theme-ui'

import { MDXRenderer } from 'gatsby-plugin-mdx';

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { about, hero } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <Heading as='h1' sx={{
          textAlign: 'center',
          fontSize: 5,
          pb: 6,
        }}>Projects</Heading>

        <MDXRenderer>{about.body}</MDXRenderer>
      </CenterColumn>
    </Layout>
  )
}

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
    about: mdx(fields: {sourceName: {eq: "pages"}}, frontmatter: {slug: {eq: "projects"}}) {
      body
      fields {
        slug
      }
    }
  }
`;
