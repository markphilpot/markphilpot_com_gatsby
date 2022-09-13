import React from 'react';
import { graphql } from 'gatsby';
import Layout, { CenterColumn } from '../../components/layout';
import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import { GatsbyImage } from 'gatsby-plugin-image';

import Link from '../../components/Link';

const Cell = (props) => {
  return <div className="flex min-w-[50%] flex-col items-center justify-center p-2">{props.children}</div>;
};

const SpacesPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  const { hero, software } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Hero hero={hero} />
      <NavBar />
      <CenterColumn>
        <h1 className="pb-6 text-center text-lg">spaces</h1>

        <div className="flex flex-wrap">
          <Cell>
            <Link to={`${__PATH_PREFIX__}/spaces/software`}>
              <div className="flex flex-col items-center justify-center">
                <GatsbyImage
                  style={{ borderRadius: 4, height: '100%', width: '100%', objectFit: 'cover' }}
                  image={software.childImageSharp.gatsbyImageData}
                />
                <p>software matrix</p>
              </div>
            </Link>
          </Cell>
          <Cell></Cell>
        </div>
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
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
`;
