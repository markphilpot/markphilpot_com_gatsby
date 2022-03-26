import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DateTime } from 'luxon';

import { Text } from 'theme-ui';

import Layout, { CenterColumn } from '../components/layout';
import NavBar from '../components/NavBar';
import SEO from '../components/SEO';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.microblog;
  const siteTitle = data.site.siteMetadata.title;
  const { slug } = pageContext;

  const date = post.published.includes(' ')
    ? DateTime.fromSQL(post.published)
    : DateTime.fromISO(post.published);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={''}
        // title={post.frontmatter.title}
        // description={post.frontmatter.summary}
        // image={post.frontmatter.featured_image ? post.frontmatter.featured_image.childImageSharp.resize : null}
      />
      {/*<Hero hero={post.frontmatter.hero} />*/}
      <NavBar />
      <CenterColumn>
        <article>
          <header>
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'accent' }} variant={'caps'}>
              {date.toFormat('MMMM d, yyyy')}
            </Text>
            {/*<Heading*/}
            {/*  as="h1"*/}
            {/*  sx={{*/}
            {/*    mb: 10,*/}
            {/*    mt: 6,*/}
            {/*    fontSize: 6,*/}
            {/*  }}*/}
            {/*  css={{ textAlign: 'center' }}*/}
            {/*>*/}
            {/*  {post.frontmatter.title}*/}
            {/*</Heading>*/}
          </header>
          <section>
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
          </section>
          <hr />
        </article>
        {/*<nav>*/}
        {/*  <Flex*/}
        {/*    sx={{*/}
        {/*      justifyContent: 'space-between',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {previous != null ? (*/}
        {/*      <Link sx={{ variant: 'styles.navlink', fontSize: 3 }} to={previous.fields.slug} rel="prev">*/}
        {/*        {previous.frontmatter.title || 'Previous Thought...'}*/}
        {/*      </Link>*/}
        {/*    ) : (*/}
        {/*      <Box />*/}
        {/*    )}*/}
        {/*    {next != null ? (*/}
        {/*      <Link sx={{ variant: 'styles.navlink', fontSize: 3 }} to={next.fields.slug} rel="next">*/}
        {/*        {next.frontmatter.title || 'Next Thought...'}*/}
        {/*      </Link>*/}
        {/*    ) : (*/}
        {/*      <Box />*/}
        {/*    )}*/}
        {/*  </Flex>*/}
        {/*</nav>*/}
      </CenterColumn>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query MicroPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    microblog(fields: { slug: { eq: $slug } }) {
      id
      name
      url
      content
      published
      uid
      childMdx {
        body
      }
    }
  }
`;
