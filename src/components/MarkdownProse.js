import React from 'react';

import { MDXRenderer } from 'gatsby-plugin-mdx';

const MarkdownProse = (props) => {
  const { markdown } = props;
  return (
    <article className="prose prose-xl max-w-none dark:prose-invert">
      <MDXRenderer>{markdown}</MDXRenderer>
    </article>
  );
};

export default MarkdownProse;
