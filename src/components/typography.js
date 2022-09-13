import classNames from 'classnames';
import React from 'react';

export const Caption = (props) => {
  return (
    <div className={classNames('pt-2 text-center text-sm italic', { [props.className]: props.className })}>
      {props.children}
    </div>
  );
};

export const CaptionedImage = (props) => {
  return (
    <>
      {props.children}
      <Caption className={'mb-6'}>{props.caption}</Caption>
    </>
  );
};

export const Year = (props) => {
  return (
    <div className={classNames('rounded text-4xl', 'lg:absolute lg:top-0 lg:-left-[140px]')}>
      <h2>{props.children}</h2>
    </div>
  );
};
