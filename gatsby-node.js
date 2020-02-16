const path = require(`path`);
const { DateTime } = require('luxon');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/post.js`);
  const result = await graphql(
    `
      {
        allMdx(
          filter: { fields: { sourceName: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const { date, slug } = node.frontmatter;
    const d = DateTime.fromSQL(date);
    const fullSlug = `/posts/${d.year}/${d.toFormat('LL')}/${d.toFormat('dd')}/${slug}`;

    // const value = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    createNodeField({
      name: `slug`,
      node,
      value: fullSlug,
    });
    createNodeField({
      node,
      name: 'sourceName',
      value: fileNode.sourceInstanceName,
    });
  }
};
