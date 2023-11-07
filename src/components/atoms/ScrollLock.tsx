import React, { FC } from 'react';
import { Platform } from 'react-native';
import {RemoveScroll} from 'react-remove-scroll';

type ScrollLockProps = {
 children: React.ReactElement,
} & React.ComponentProps<typeof RemoveScroll>;

const ScrollLock: FC<ScrollLockProps> = ({
  children,
  ...props
}) => {

  return (
    <>
      {Platform.OS === 'web' ?
        <RemoveScroll {...props}>
          {children}
        </RemoveScroll>

        :

        <>
          {children}
        </>
      }
    </>
  );
};

export default ScrollLock;