import { ComponentProps, FC } from 'react';
import { Platform } from 'react-native';
import { RemoveScroll } from 'react-remove-scroll';

type ScrollLockProps = ComponentProps<typeof RemoveScroll>;

const ScrollLock: FC<ScrollLockProps> = (props) => {
  return Platform.OS === 'web' ? <RemoveScroll {...props} /> : props.children;
};

export default ScrollLock;