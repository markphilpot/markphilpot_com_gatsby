import React from 'react';

import { Box, Heading, Text } from 'theme-ui';

export const Caption = props => {
  return (
    <Text
      sx={{
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'muted',
        fontSize: 2,
        pt: 2,
        ...props.sx,
      }}
    >
      {props.children}
    </Text>
  );
};

export const CaptionedImage = props => {
  return (
    <>
      {props.children}
      <Caption
        sx={{
          mb: 6,
        }}
      >
        {props.caption}
      </Caption>
    </>
  );
};

export const Year = props => {
  return (
    <Box
      sx={{
        position: ['static', 'static', 'static', 'absolute'],
        width: '150px',
        left: [0, 0, 0, '-190px'],
        textAlign: ['left', 'left', 'left', 'right'],
        mb: [10, 10, 10, 0],
        color: 'dateHighlight',
      }}
    >
      <Heading
        as={'h2'}
        sx={{
          fontSize: 6,
        }}
      >
        {props.children}
      </Heading>
    </Box>
  );
};
