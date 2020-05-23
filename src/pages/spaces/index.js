import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../components/layout';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import { Flex, Heading, Text, Box } from 'theme-ui';
import Image from 'gatsby-image';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faFlickr } from '@fortawesome/free-brands-svg-icons';
import Link from "../../components/Link";

const Cell = props => {
  return (
    <Flex sx={{
      minWidth: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 2
    }}>{props.children}</Flex>
  )
}

const SpacesPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { about, hero, software } = data;

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
          spaces
        </Heading>

        <Flex sx={{
          flexWrap: 'wrap'
        }}>

          <Cell>
            <Link to={`${__PATH_PREFIX__}/spaces/software`} sx={{ width: '100%'}}>
              <Flex sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  style={{ borderRadius: 4, height: '100%', width: '100%', objectFit: 'cover' }}
                  fluid={software.childImageSharp.fluid}
                />
                <Text>software matrix</Text>
              </Flex>
            </Link>
          </Cell>
          <Cell></Cell>
        </Flex>
      </CenterColumn>
    </Layout>
  );
};

export default SpacesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    hero: file(absolutePath: { regex: "/spaces/hero.jpg/" }) {
      publicURL
    }
    software: file(absolutePath: { regex: "/spaces/software/hero.jpg/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    about: mdx(fields: { sourceName: { eq: "pages" } }, frontmatter: { slug: { eq: "spaces" } }) {
      body
      fields {
        slug
      }
    }
  }
`;
