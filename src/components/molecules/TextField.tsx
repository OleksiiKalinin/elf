import React, { useEffect, useState, useRef, FC, ComponentProps, ReactNode, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  TextStyle,
  Platform,
} from 'react-native';
import TextInput from 'react-native-mask-input';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import { Button } from 'tamagui';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type TextFieldProps = ({
  autoGrow?: true,
  multiline: true;
} | {
  autoGrow?: false,
  multiline?: boolean;
}) & {
  lineHeight?: number,
  disableNewLineSymbol?: boolean,
  label?: string,
  left?: ReactNode,
  right?: ReactNode,
  bottomText?: string,
  height?: number | string,
  underline?: boolean,
  activeLabel?: boolean,
  inputStyles?: StyleProp<TextStyle>,
  rowStyles?: StyleProp<TextStyle>,
  containerStyles?: StyleProp<TextStyle>,
} & ComponentProps<typeof TextInput>;

const TextField: FC<TextFieldProps> = forwardRef(({
  label = null,
  left = null,
  right = null,
  bottomText = null,
  underline = true,
  inputStyles,
  containerStyles,
  rowStyles,
  activeLabel,
  autoGrow = false,
  numberOfLines = 1,
  lineHeight,
  style,
  disableNewLineSymbol = false,
  ...props
}, ref) => {
  const [moveLabelDir, setMoveLabelDir] = useState<boolean>(!!props.value || !!props.defaultValue || !!activeLabel);
  const [isOnTop, setIsOnTop] = useState<boolean>(moveLabelDir);
  const [isSecured, setIsSecured] = useState<boolean>(!!props.secureTextEntry);
  const [lineCount, setLineCount] = useState(1);
  const moveText = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const { windowSizes } = useTypedSelector(state => state.general);

  useEffect(() => {
    if (autoGrow) {
      const inputElement = hiddenInputRef.current;
      if (Platform.OS === 'web') {
        if (inputElement) {
          const { lineHeight, paddingTop, paddingBottom } = getComputedStyle(inputElement);
          const lineHeightValue = parseFloat(lineHeight);
          const paddingTopValue = parseFloat(paddingTop);
          const paddingBottomValue = parseFloat(paddingBottom);

          const contentHeight = inputElement.scrollHeight - (paddingTopValue + paddingBottomValue);
          const lines = Math.round(contentHeight / lineHeightValue);

          setLineCount(lines);
        };
      };
    };
  }, [props.value, windowSizes.width]);

  useEffect(() => {
    if (moveLabelDir) moveTextTop();
    else if (!moveLabelDir && !props.value) moveTextBottom();
  }, [moveLabelDir, props.value]);

  useEffect(() => {
    setMoveLabelDir(!!props.value);
  }, [props.value]);

  const moveTextTop = () => {
    setIsOnTop(true);
    Animated.timing(moveText, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    setIsOnTop(false);
    Animated.timing(moveText, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const translateY = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  return (<>
    <View style={[styles.Container, containerStyles, { borderBottomWidth: underline ? 1 : 0, height: props.height ? 'auto' : 44 }]}>
      <View style={[styles.Row, rowStyles, { height: props.height || 'auto' }]}>
        {left && <View style={[styles.Adornment, { paddingRight: 10 }]}>{left}</View>}
        <View style={[styles.InputWrapper]}>
          <Animated.View pointerEvents='none' style={[styles.Label, { transform: [{ translateY }] }]}>
            <Typography {...(isOnTop ? { color: Colors.Basic600 } : { variant: 'h5' })} style={{ lineHeight: 16 }}>
              {label}
            </Typography>
          </Animated.View>
          <TextInput
            ref={(node) => {
              (inputRef as any).current = node;
              if (ref) (ref as any).current = node;
            }}
            placeholderTextColor={Colors.Basic600}
            style={[styles.Input, inputStyles, { lineHeight: lineHeight }, (autoGrow && Platform.OS === 'web') ? { overflow: 'hidden' } : {}]}
            onFocus={() => setMoveLabelDir(true)}
            onBlur={() => !activeLabel && setMoveLabelDir(false)}
            blurOnSubmit={!props.multiline}
            selectionColor={Colors.TextDark}
            textAlignVertical={props.multiline ? 'top' : 'center'}
            {...props}
            onChangeText={(masked, unmasked, obfuscated) => {
              const [newMasked, newUnmasked, newObfuscated] = [masked, unmasked, obfuscated].map(v => disableNewLineSymbol ? v.replace(/\n/g, '') : v);

              props.onChangeText?.(newMasked, newUnmasked, newObfuscated);
            }}
            secureTextEntry={isSecured}
            numberOfLines={(autoGrow && Platform.OS === 'web') ? (numberOfLines > lineCount ? numberOfLines : lineCount) : numberOfLines}
          />
          {(autoGrow && Platform.OS === 'web') &&
            <TextInput
              style={[styles.Input, inputStyles, { visibility: 'hidden', height: 0, lineHeight: lineHeight }]}
              ref={hiddenInputRef as any}
              textAlignVertical={props.multiline ? 'top' : 'center'}
              {...props}
              secureTextEntry={isSecured}
            />
          }
        </View>
        {(right || props.secureTextEntry) &&
          <View style={[styles.Adornment, { paddingLeft: 10 }]}>
            {right ? right :
              <Button
                circular
                bg='transparent'
                style={{ height: 'auto', width: 'auto', minHeight: 0, minWidth: 0 }}
                onPress={() => setIsSecured(prev => !prev)}
                icon={<SvgIcon icon={isSecured ? 'eyeOff' : 'eyeOn'} />}
              />
            }
          </View>
        }
      </View>
      {props.multiline && props.maxLength && <View style={{ position: 'absolute', bottom: 2, right: 5 }}>
        <Typography variant='small'>{props.value?.length}/{props.maxLength}</Typography>
      </View>}
    </View>
    {bottomText && <Typography variant='small' color={Colors.Danger}>{bottomText}</Typography>}
  </>);
});

export default TextField;

const styles = StyleSheet.create({
  Container: {
    borderColor: Colors.Basic300,
    justifyContent: 'flex-end',
    position: 'relative'
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  InputWrapper: {
    flex: 1,
  },
  Input: {
    fontSize: 16,
    fontFamily: `RedHatDisplay-Medium`,
    color: Colors.TextDark,
    padding: 0,
    outlineStyle: 'none',
  },
  Label: {
    top: 0,
    position: 'absolute',
  },
  Adornment: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});