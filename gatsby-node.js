const path = require(`path`);
const { DateTime } = require('luxon');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/post.js`);
  const blogIndex = path.resolve('./src/templates/index.js');
  const limit = process.env.NODE_ENV !== 'development' ? '' : 'limit: 10';
  const result = await graphql(
    `
      {
        allMdx(
          filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
          sort: { fields: [frontmatter___date], order: DESC }
          ${limit}
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

  paginate({
    createPage,
    items: posts,
    component: blogIndex,
    itemsPerPage: 20,
    itemsPerFirstPage: 10,
    // pathPrefix: ({ pageNumber, numberOfPages }) => pageNumber === 0 ? '' : '/blog/page'
    pathPrefix: '/',
  });

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const slug = post.node.fields.slug;

    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug,
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
    const d = date.includes(' ') ? DateTime.fromSQL(date) : DateTime.fromISO(date);
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
