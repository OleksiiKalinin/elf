import React, { useEffect, useState, useRef, FC, ComponentProps, ReactNode } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    StyleSheetProperties,
    StyleProp,
    TextStyle,
    Platform,
} from 'react-native';
import TextInput from 'react-native-mask-input';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import { Button } from 'tamagui';

type TextFieldProps = {
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
    autoGrow?: boolean,
} & ComponentProps<typeof TextInput>;

const TextField: FC<TextFieldProps> = ({
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
    style,
    ...props
}) => {
    const [moveLabelDir, setMoveLabelDir] = useState<boolean>(!!props.value || !!props.defaultValue || !!activeLabel);
    const [isOnTop, setIsOnTop] = useState<boolean>(moveLabelDir);
    const [isSecured, setIsSecured] = useState<boolean>(!!props.secureTextEntry);
    const moveText = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [lineCount, setLineCount] = useState(1);

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
            }
            // else {
            //     if (inputElement) {

            //         let elementHeight;
            //         hiddenInputRef.measure((a, b, width, height, px, py) => {
            //             elementHeight = parseFloat(height);
            //             console.log(height);
            //         });

            //         const lines = Math.round(elementHeight / 20);

            //         console.log(lines);
            //         setLineCount(lines);
            //     }
            // }
        }
    }, [props.value]);

    useEffect(() => {
        if (moveLabelDir) moveTextTop();
        else if (!moveLabelDir && !props.value) moveTextBottom();
    }, [moveLabelDir]);

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
                    <Animated.View style={[styles.Label, { transform: [{ translateY }] }]}>
                        <Typography {...(isOnTop ? { color: Colors.Basic600 } : { variant: 'h5' })}>
                            {label}
                        </Typography>
                    </Animated.View>
                    <TextInput
                        placeholderTextColor={Colors.Basic600}
                        style={[styles.Input, inputStyles, (autoGrow && Platform.OS === 'web') ? { overflow: 'hidden' } : {}]}
                        onFocus={() => setMoveLabelDir(true)}
                        onBlur={() => !activeLabel && setMoveLabelDir(false)}
                        blurOnSubmit
                        selectionColor={Colors.TextDark}
                        ref={inputRef}
                        textAlignVertical={props.multiline ? 'top' : 'center'}
                        {...props}
                        secureTextEntry={isSecured}
                        numberOfLines={(autoGrow && Platform.OS === 'web') ? (numberOfLines > lineCount) ? numberOfLines : lineCount : numberOfLines}
                    />
                    {(autoGrow && Platform.OS === 'web') &&
                        <TextInput
                            style={[styles.Input, inputStyles, Platform.OS === 'web' ? { visibility: 'hidden', height: 0 } : { opacity: 0, position: 'absolute' }]}
                            ref={hiddenInputRef as any}
                            textAlignVertical={props.multiline ? 'top' : 'center'}
                            {...props}
                            secureTextEntry={isSecured}
                            // onLayout={(e) => {
                            //     if (Platform.OS === 'android' || Platform.OS === 'ios') {
                            //         hiddenInputRef.current.measure((x, y, width, height, pageX, pageY) => {
                            //             console.log(Math.round(height / 20));
                            //             setLineCount(Math.round(height / 20));
                            //         });
                            //     }
                            // }}
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
                                // _pressed={{ bg: Colors.Basic100 }}
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
};
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