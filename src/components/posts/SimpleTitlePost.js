import { DateTime } from 'luxon';
import { pathOr } from 'ramda';
import React from 'react';

const SimpleTitlePost = (props) => {
  const { title, node, isDraft } = props;

  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);

  return (
    <div className={'mb-4 flex content-between items-center'}>
      <div className={'text-sm'}>
        {isDraft ? 'DRAFT :: ' : ''}
        {title}
      </div>
      <div className={'flex-column hidden items-end lg:block lg:flex'}>
        <div className={'text-right text-xs font-bold uppercase'}>{date.toFormat('LLLL d, yyyy')}</div>
        <div className={'hidden text-right text-xs lg:block'}>
          {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default SimpleTitlePost;
