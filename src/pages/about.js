import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Flex, Box, Link, Heading, Text } from 'theme-ui'

import { MDXRenderer } from 'gatsby-plugin-mdx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faFlickr,  } from '@fortawesome/free-brands-svg-icons'

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
        }}>About</Heading>

        <Text sx={{
          variant: 'styles.p',
          textAlign: 'center'
        }}>Some places you can find me on the Internet</Text>
        <Flex sx={{
          justifyContent: 'space-around',
          fontSize: 7,
          my: 5,
        }}>
          <Link href={"https://twitter.com/mark_philpot"}>
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link href={'https://github.com/markphilpot'}>
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link href={'https://www.flickr.com/photos/markphilpot'}>
            <FontAwesomeIcon icon={faFlickr} />
          </Link>
          <Link href={'https://anilist.co/user/mphilpot'}>
            <FontAwesomeIcon icon={faFont} />
          </Link>
        </Flex>

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
    hero: file(absolutePath: { regex: "/about/hero.jpg/" }) {
      publicURL
    }
    about: mdx(fields: {sourceName: {eq: "pages"}}, frontmatter: {slug: {eq: "about"}}) {
      body
      fields {
        slug
      }
    }
  }
`;
