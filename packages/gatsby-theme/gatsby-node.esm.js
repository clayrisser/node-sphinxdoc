import path from 'path';
import pkgDir from 'pkg-dir';

const rootPath = pkgDir.sync(process.cwd());

export async function createPages({ actions, graphql }) {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`src/templates/Page.js`);
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);
  if (result.errors) throw result.errors;
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {}
    });
  });
}

export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(rootPath, './src')
      }
    }
  });
}
