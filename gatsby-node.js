const path = require(`path`);
const { DateTime } = require('luxon');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const axios = require('axios');

const microBlogToken = process.env.MICROBLOG_TOKEN

const MICROBLOG_NODE_TYPE = 'microblog';

// https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings-and-nodes
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  if(!microBlogToken) return;

  const response = await axios.get('https://micro.blog/micropub', {
    params: {
      q: 'source'
    },
    headers: {
      authorization: `Bearer ${microBlogToken}`
    }
  });

  const mdxPosts = response.data.items.map(({ type, properties }) => {
    const { uid, name, content, published, url, category } = properties;

    return {
      uid: uid[0],
      name: name[0],
      content: content[0],
      published: published[0],
      url: url[0],
      category,
      mdx: `---
uid: ${uid[0]}
published: ${published[0]}
name: ${name[0]}
url: ${url[0]}
category: ${category}
---
${content}
`
    };
  });

  // loop through data and create Gatsby nodes
  mdxPosts.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${MICROBLOG_NODE_TYPE}-${post.uid}`),
      parent: null,
      children: [],
      internal: {
        type: MICROBLOG_NODE_TYPE,
        mediaType: 'text/markdown',
        content: post.mdx,
        contentDigest: createContentDigest(post),
      },
    })
  );
}

const indexPage = async (createPage, graphql) => {
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

  createPage({
    path: '/',
    component: blogIndex,
  });

  // paginate({
  //   createPage,
  //   items: posts,
  //   component: blogIndex,
  //   itemsPerPage: 20,
  //   itemsPerFirstPage: 10,
  //   // pathPrefix: ({ pageNumber, numberOfPages }) => pageNumber === 0 ? '' : '/blog/page'
  //   pathPrefix: '/',
  // });
}

const blogPages = async (createPage, graphql) => {
  const blogPost = path.resolve(`./src/templates/post.js`);
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

const microblogPages = async (createPage, graphql) => {
  const microblogPage = path.resolve(`./src/templates/microblogPost.js`);
  const result = await graphql(
    `
      {
        allMicroblog(sort: {fields: published, order: DESC}) {
          edges {
            node {
              id
              name
              url
              content
              published
              uid
              fields {
                slug
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
  const posts = result.data.allMicroblog.edges;

  posts.forEach((post, index) => {
    const slug = post.node.fields.slug

    createPage({
      path: slug,
      component: microblogPage,
      context: {
        slug,
      },
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await indexPage(createPage, graphql);
  await blogPages(createPage, graphql);
  await notePages(createPage, graphql);
  await microblogPages(createPage, graphql);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const { date, slug } = node.frontmatter;

    if(!date) return;

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
  } else if(node.internal.type === MICROBLOG_NODE_TYPE) {
    const { published, uid } = node;

    const d = published.includes(' ') ? DateTime.fromSQL(published) : DateTime.fromISO(published);
    const fullSlug = `/micro/${d.year}/${d.toFormat('LL')}/${d.toFormat('dd')}/${uid}`;

    createNodeField({
      name: `slug`,
      node,
      value: fullSlug,
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
