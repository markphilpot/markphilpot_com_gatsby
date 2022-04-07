import { DateTime } from 'luxon';
import { Box, Flex, Text } from 'theme-ui';
import { GatsbyImage } from 'gatsby-plugin-image';
import { pathOr } from 'ramda';
import React from 'react';

const FeaturedImagePost = props => {
  const { node, title, isDraft } = props;
  // Woof -- TODO do a date search and replace to remove quotes from `date` fields
  const date = node.frontmatter.date.includes(' ')
    ? DateTime.fromSQL(node.frontmatter.date)
    : DateTime.fromISO(node.frontmatter.date);
  return (
    <Box
      sx={{
        position: 'relative',
        mb: 10,
      }}
    >
      <GatsbyImage
        style={{ borderRadius: 4, height: '180px', objectFit: 'cover' }}
        image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
        alt={title}
      />
      {isDraft ? (
        <Text
          sx={{
            variant: 'text.caps',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-10deg)',
            fontSize: '120px',
            color: 'red',
            opacity: '0.8',
          }}
        >
          draft
        </Text>
      ) : null}
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          px: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        }}
      >
        <Text
          sx={{
            color: '#2E3440',
            fontSize: 4,
          }}
        >
          {title}
        </Text>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Text
            sx={{
              variant: 'text.caps',
              fontSize: 0,
              fontWeight: 'bold',
              color: '#2E3440',
              display: ['none', 'none', 'block', 'block'],
              textAlign: 'right',
            }}
          >
            {date.toFormat('LLLL d, yyyy')}
          </Text>
          <Text
            sx={{
              fontSize: 0,
              color: '#2E3440',
              display: ['none', 'none', 'none', 'block'],
              textAlign: 'right',
            }}
          >
            {pathOr([], ['frontmatter', 'tags'], node).join(', ')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeaturedImagePost;
