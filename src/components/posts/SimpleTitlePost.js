import { DateTime } from 'luxon';
import { Flex, Text } from 'theme-ui';
import { pathOr } from 'ramda';
import React from 'react';

const SimpleTitlePost = props => {
  const { title, node, isDraft } = props;

  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);

  return (
    <Flex
      sx={{
        mb: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        sx={{
          fontSize: 4,
        }}
      >
        {isDraft ? 'DRAFT :: ' : ''}
        {title}
      </Text>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          display: ['none', 'none', 'block', 'block'],
        }}
      >
        <Text
          sx={{
            variant: 'text.caps',
            fontSize: 0,
            fontWeight: 'bold',
            color: 'muted',
            textAlign: 'right',
          }}
        >
          {date.toFormat('LLLL d, yyyy')}
        </Text>
        <Text
          sx={{
            fontSize: 0,
            color: 'muted',
            display: ['none', 'none', 'none', 'block'],
            textAlign: 'right',
          }}
        >
          {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SimpleTitlePost;
