import React from 'react';

import { Text } from 'theme-ui';

export const Caption = (props) => {
  return (<Text sx={{
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'muted',
    fontSize: 2,
      pt: 2,
      ...props.sx,
  }}>{props.children}</Text>
  )
};

export const CaptionedImage = (props) => {
  return (
    <>
      {props.children}
      <Caption sx={{
        mb: 6
      }}>{props.caption}</Caption>
    </>
  )
}
