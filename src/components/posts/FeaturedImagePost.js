import { DateTime } from 'luxon';
import { GatsbyImage } from 'gatsby-plugin-image';
import { pathOr } from 'ramda';
import React from 'react';

const FeaturedImagePost = (props) => {
  const { node, title, isDraft } = props;
  // Woof -- TODO do a date search and replace to remove quotes from `date` fields
  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);

  return (
    <div className="relative mb-4">
      <GatsbyImage
        style={{ borderRadius: 4, height: '180px', objectFit: 'cover' }}
        image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
        alt={title}
      />
      {isDraft ? (
        <div
          className="absolute top-1/2 left-1/2 text-xl uppercase text-red-400 opacity-80"
          style={{
            transform: 'translate(-50%, -50%) rotate(-10deg)',
          }}
        >
          draft
        </div>
      ) : null}
      <div className="absolute bottom-0 flex w-full items-center justify-between bg-white bg-opacity-75 px-2 dark:bg-slate-700 dark:bg-opacity-75">
        <div className="text-lg">{title}</div>
        <div className="flex flex-col items-end">
          <div className="hidden text-right text-xs font-bold uppercase lg:block">{date.toFormat('LLLL d, yyyy')}</div>
          <div className="hidden text-right text-xs lg:block">
            {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedImagePost;
