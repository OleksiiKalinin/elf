import React, { ComponentProps, FC, ReactNode, useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Popover as TamaPopover, Separator } from 'tamagui';
import Colors from '../../colors/Colors';
import BlurBackground from '../atoms/BlurBackground';
import Typography from '../atoms/Typography';
import { isFunction } from 'lodash';
import ScrollLock from '../atoms/ScrollLock';

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
const Popover: FC<Props> = ({ triggerComponent, closeButtonComponent, children, hideArrow = false, hideBlur = false, hideCloseButton = false, contentContainerStyle, containerStyle, ...props }) => {
  const [open, setOpen] = useState(!!props.open);

  useEffect(() => {
    setOpen(open);
  }, [props.open]);

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
          <TamaPopover.Content p={0} br={4} overflow='hidden' backgroundColor={hideBlur ? Colors.White : Colors.White10} shadowColor={Colors.Basic500} shadowRadius={25} minWidth={175} style={contentContainerStyle}>
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