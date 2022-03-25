const path = require(`path`);
const { DateTime } = require('luxon');
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { paginate } = require('gatsby-awesome-pagination');
const axios = require('axios');

const microBlogToken = process.env.MICROBLOG_TOKEN

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  if(!microBlogToken) return;

  const POST_NODE_TYPE = 'microblog';

  const response = await axios.get('https://micro.blog/micropub', {
    params: {
      q: 'source'
    },
    headers: {
      authorization: `Bearer ${microBlogToken}`
    }
  });

  const posts = response.data.items.map(({ type, properties }) => {
    const { uid, name, content, published, url, category } = properties;

    return {
      uid: uid[0],
      name: name[0],
      content: content[0],
      published: published[0],
      url: url[0],
      category,
    }
  });

  // loop through data and create Gatsby nodes
  posts.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${POST_NODE_TYPE}-${post.uid}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(post),
        contentDigest: createContentDigest(post),
      },
    })
  );
}

const blogPages = async (createPage, graphql) => {
  const blogPost = path.resolve(`./src/templates/post.js`);
  const blogIndex = path.resolve('./src/templates/index.js');
  const result = await graphql(
    `
      {
        allMdx(
          filter: { fields: { sourceName: { in: ["blog", "micro"] } } }
          sort: { fields: [frontmatter___date], order: DESC }
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

const notePages = async (createPage, graphql) => {
  const notePage = path.resolve(`./src/templates/note.js`);
  const result = await graphql(
    `
      {
        allMdx(
          filter: { fields: { sourceName: { in: ["notes"] } } }
          sort: { fields: [frontmatter___modified], order: DESC }
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
    const slug = post.node.fields.slug;

    createPage({
      path: slug,
      component: notePage,
      context: {
        slug,
      },
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await blogPages(createPage, graphql);
  await notePages(createPage, graphql);

  // TODO microblog page
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

exports.createResolvers = async ({ actions, cache, createNodeId, createResolvers, store, reporter }) => {
  const { createNode } = actions;

  await createResolvers({
    Anilist_MediaCoverImage: {
      largeFile: {
        type: 'File',
        async resolve(source) {
          return await createRemoteFileNode({
            url: encodeURI(source.large),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
