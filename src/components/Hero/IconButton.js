import classNames from 'classnames';
import React from 'react';

const IconButton = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={classNames(
        'cursor-pointer rounded-md bg-slate-200 bg-opacity-40 p-1 text-sm opacity-80 transition-opacity hover:opacity-100 focus:outline-none',
        {
          [className]: className,
        }
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default IconButton;
