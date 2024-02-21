import React, { ComponentProps, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import { Popover as TamaPopover, Separator } from 'tamagui';
import Colors from '../../colors/Colors';
import BlurBackground from '../atoms/BlurBackground';
import Typography from '../atoms/Typography';
import { isArray, isFunction } from 'lodash';
import ScrollLock from '../atoms/ScrollLock';
import useShadow from '../../hooks/useShadow';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type Props = {
  triggerComponent: (open: () => void) => ReactNode,
  /** 
   * - do not provide any touchables! 
   * - or make it "disabled" 
   * */
  closeButtonComponent?: ReactNode,
  children: ((close: () => void) => ReactNode) | ReactNode,
  hideArrow?: boolean,
  hideBlur?: boolean,
  hideCloseButton?: boolean,
  containerStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
} & Omit<ComponentProps<typeof TamaPopover>, 'children'>;

/** 
 * "children" examples:
 * - {(close) => <></>}
 * - <></>
*/

const Popover: FC<Props> = ({ triggerComponent, closeButtonComponent, children, hideArrow = false, hideBlur = true, hideCloseButton = false, contentContainerStyle, containerStyle, ...props }) => {
  const [open, setOpen] = useState(!!props.open);
  const [visibleOnNative, setVisibleOnNative] = useState(false);
  const firstLoad = useRef(true);
  const { windowSizes } = useTypedSelector(s => s.general);

  useEffect(() => {
    setOpen(open);
  }, [props.open]);

  // useEffect(() => {
  //   if (Platform.OS !== 'web') {
  //     if (open) {
  //       setTimeout(() => {
  //         setVisibleOnNative(true);
  //         firstLoad.current = false;
  //       }, open && firstLoad.current ? 200 : 0);
  //     } else {
  //       setVisibleOnNative(false);
  //     }
  //   }
  // }, [open]);

  useEffect(() => {
    console.log('changed');
    
  }, [windowSizes.width]);

  return (
    <View style={containerStyle}>
      <ScrollLock enabled={open}>
        <TamaPopover
          {...props}
          open={open}
          onOpenChange={setOpen}
        >
          <TamaPopover.Trigger>
            {triggerComponent(() => setOpen(true))}
          </TamaPopover.Trigger>
          <TamaPopover.Content
            p={0} br={4} overflow='hidden' minWidth={175}
            backgroundColor={hideBlur ? Colors.White : Colors.White10}
            style={[
              {
                ...useShadow(20),
                // opacity: Platform.select({ native: visibleOnNative ? 1 : 0 })
              },
              ...(isArray(contentContainerStyle) ? contentContainerStyle : [contentContainerStyle]),
            ]}
          >
            {/* {!hideArrow && <TamaPopover.Arrow />} */}
            <TamaPopover.ScrollView style={{ width: '100%' }}>
              {!hideBlur && <BlurBackground blurAmount={30} />}
              {isFunction(children) ? children(() => setOpen(false)) : children}
              {!hideCloseButton &&
                <TamaPopover.Close style={{ cursor: 'pointer' }}>
                  {(!!closeButtonComponent ?
                    closeButtonComponent
                    :
                    <>
                      <Separator borderColor={Colors.Basic500} />
                      <View style={{ padding: 10 }}>
                        <Typography variant='h5' color={Colors.Basic700} textAlign='center'>Anuluj</Typography>
                      </View>
                    </>
                  )}
                </TamaPopover.Close>
              }
            </TamaPopover.ScrollView>
          </TamaPopover.Content>
        </TamaPopover>
      </ScrollLock>
    </View>
  );
};

export default Popover;