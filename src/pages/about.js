import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { Flex, Link, Heading, Text } from 'theme-ui';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import { IoLogoGithub, IoLogoTwitter, IoLogoFlickr } from 'react-icons/io5';
import { SiBandcamp, SiAnilist } from 'react-icons/si';

const InternetPresence = props => {
  const { link, text, icon } = props;

  return (
    <Link href={link}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: 7,
        }}
      >
        {icon}
        <Text sx={{ fontSize: 3 }}>{text}</Text>
      </Flex>
    </Link>
  );
};

const AboutPage = ({ data, location }) => {
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
          about
        </Heading>

        <Text
          sx={{
            variant: 'styles.p',
            textAlign: 'center',
          }}
        >
          Some places you can find me on the Internet
        </Text>
        <Flex
          sx={{
            justifyContent: 'space-around',
            my: 5,
          }}
        >
          <InternetPresence link={'https://twitter.com/mark_philpot'} icon={<IoLogoTwitter />} text={'Twitter'} />
          <InternetPresence link={'https://github.com/markphilpot'} icon={<IoLogoGithub />} text={'Github'} />
          <InternetPresence
            link={'https://www.flickr.com/photos/markphilpot'}
            icon={<IoLogoFlickr />}
            text={'Flickr'}
          />
          <InternetPresence link={'https://anilist.co/user/mphilpot'} icon={<SiAnilist />} text={'AniList'} />
          <InternetPresence link={'https://markphilpot.bandcamp.com/'} icon={<SiBandcamp />} text={'Bandcamp'} />
        </Flex>

        <MDXRenderer>{about.body}</MDXRenderer>
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
    hero: file(absolutePath: { regex: "/about/hero.jpg/" }) {
      publicURL
    }
    about: mdx(fields: { sourceName: { eq: "pages" } }, frontmatter: { slug: { eq: "about" } }) {
      body
      fields {
        slug
      }
    }
  }
`;
