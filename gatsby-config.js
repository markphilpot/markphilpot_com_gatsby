require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `markphilpot.com`,
    author: `Mark Philpot`,
    description: ``,
    siteUrl: `https://markphilpot.com`,
    social: {
      twitter: `mark_philpot`,
    },
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images-custom`,
            options: {
              maxWidth: 1920,
              // wrapperStyle: img => {
              //   // console.log( img;
              //   if (img.presentationWidth === 1920 && img.aspectRatio > 3) {
              //     return 'margin-left: calc((100vw - 540px) / -2); margin-right: calc((100vw - 540px) / -2);';
              //   }
              //   return '';
              // },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mark Philpot`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/heros/gg_bridge_ico.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `anilist`,
        url: `https://graphql.anilist.co`,
        typeName: `Anilist`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-feed-generator`,
      options: {
        generator: 'GatsbyJS',
        rss: true,
        json: true,
        siteQuery: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                author
              }
            }
          }
        `,
        feeds: [
          {
            name: 'feed',
            query: `
            {
              allMdx(
                filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 20
              ) {
                edges {
                  node {
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      date
                      title
                    }
                  }
                }
              }
            }
            `,
            normalize: ({ query: { site, allMdx, allMicroblog } }) => {
              const mdx = allMdx.edges.map((edge) => {
                return {
                  title: edge.node.frontmatter.title,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  html: edge.node.html,
                };
              });

              // const mb = allMicroblog.edges.map((edge) => {
              //   return {
              //     title: '',
              //     date: edge.node.childMdx.frontmatter.date,
              //     url: site.siteMetadata.siteUrl + edge.node.fields.slug,
              //     html: edge.node.childMdx.html,
              //   };
              // });

              return [...mdx].sort((a, b) => b.date.localeCompare(a.date));
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/micro`,
    //     name: `micro`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/notes`,
        name: `notes`,
      },
    },
  ],
};
