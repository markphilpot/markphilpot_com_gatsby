import { DateTime } from 'luxon';
import { pathOr } from 'ramda';
import React from 'react';

const SimpleTitlePost = (props) => {
  const { title, node, isDraft } = props;

  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);

  return (
    <div className={'mb-8 flex items-center justify-between'}>
      <div className={'text-xl'}>
        {isDraft ? 'DRAFT :: ' : ''}
        {title}
      </div>
      <div className={'hidden lg:flex lg:flex-col lg:items-end'}>
        <div className={'text-right text-xs font-bold uppercase'}>{date.toFormat('LLLL d, yyyy')}</div>
        <div className={'text-right text-xs'}>{pathOr([], ['frontmatter', 'tags'], node).join(', ')}</div>
      </div>
    </div>
  );
};

export default SimpleTitlePost;
