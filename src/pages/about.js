import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../components/layout';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import { IoLogoGithub, IoLogoTwitter, IoLogoFlickr } from 'react-icons/io5';
import { SiBandcamp, SiAnilist, SiMastodon } from 'react-icons/si';
import MarkdownProse from '../components/MarkdownProse';

const InternetPresence = (props) => {
  const { link, text, icon } = props;

  return (
    <a href={link}>
      <div className="flex flex-col items-center justify-center text-4xl text-slate-500 hover:text-indigo-700 hover:dark:text-indigo-200">
        {icon}
        <div className="text-lg">{text}</div>
      </div>
    </a>
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
        <h1 className="pb-6 text-center text-4xl">about</h1>

        <p className="font-center text-lg">Some places you can find me on the Internet</p>
        <div className="my-5 flex justify-around">
          <InternetPresence link={'https://twitter.com/mark_philpot'} icon={<IoLogoTwitter />} text={'Twitter'} />
          <InternetPresence link={'https://philpot.org/@mark'} icon={<SiMastodon />} text={'Mastodon'} />
          <InternetPresence link={'https://github.com/markphilpot'} icon={<IoLogoGithub />} text={'Github'} />
          <InternetPresence
            link={'https://www.flickr.com/photos/markphilpot'}
            icon={<IoLogoFlickr />}
            text={'Flickr'}
          />
          <InternetPresence link={'https://anilist.co/user/mphilpot'} icon={<SiAnilist />} text={'AniList'} />
          <InternetPresence link={'https://markphilpot.bandcamp.com/'} icon={<SiBandcamp />} text={'Bandcamp'} />
        </div>

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
