import React, { FC, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { Separator } from 'tamagui';
import { Gift, Check } from '@tamagui/lucide-icons'
import Button from '../molecules/Button';
import Typography from '../atoms/Typography';
import Popover from '../molecules/Popover';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export type FormFieldType = {
  name: string,
  isValid: boolean,
  required?: boolean,
  value?: any,
};

type FormProgressBarProps = ({
  fields: FormFieldType[],
  giftInfoText?: {
    requiredFields: string,
    optionalFields: string,
  },
  giftInfo?: never,
} | {
  fields: FormFieldType[],
  giftInfoText?: never,
  giftInfo?: React.ReactNode,
});

const FormProgressBar: FC<FormProgressBarProps> = ({
  fields,
  giftInfoText,
  giftInfo,
}) => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [stepWidth, setItemWidth] = useState(0);
  const [requiredFields, setRequiredFields] = useState<FormFieldType[]>([]);
  const [optionalFields, setOptionalFields] = useState<FormFieldType[]>([]);
  const [infoDisplayed, setInfoDisplayed] = useState(false);
  const { windowSizes } = useTypedSelector(state => state.general);

  const stepGap = 5;
  const iconWidth = 40;
  const paddingHorizontal = 19;

  useEffect(() => {
    if (fields.length) {
      const requiredFields = fields.filter(field => field.required).sort((a, b) => Number(b.isValid) - Number(a.isValid));
      const optionalFields = fields.filter(field => !field.required).sort((a, b) => Number(b.isValid) - Number(a.isValid));

      setRequiredFields(requiredFields);
      setOptionalFields(optionalFields);
    };
  }, [fields]);

  useEffect(() => {
    const itemWidth = ((progressBarWidth - (optionalFields.length ? iconWidth * 2 : iconWidth) - ((fields.length - (optionalFields.length ? 2 : 1)) * stepGap) - (paddingHorizontal * 2))) / fields.length;

    setItemWidth(itemWidth);
  }, [fields, progressBarWidth]);

  const handleLayout = (event: { nativeEvent: { layout: { width: number; height: number; }; }; }) => {
    const { width } = event.nativeEvent.layout;
    setProgressBarWidth(width);
  };

  const progressBar = () => {
    const allRequiredFields = requiredFields.every(item => item.isValid);
    const allOptional = optionalFields.every(item => item.isValid);
    const stepItemColor = (isValid: boolean) => isValid ? Colors.Green500 : Colors.Basic400;
    const iconColor = (isValid: boolean) => isValid ? Colors.Basic900 : Colors.Basic500;

    return (
      <>
        <Separator />
        <View style={{ paddingHorizontal }}>
          <View style={styles.ProgressBarContainer}>
            {(!!requiredFields.length && stepWidth > 0) &&
              <View style={styles.ProgressBar}>
                <View style={[styles.Steps, { gap: stepGap }]}>
                  {requiredFields.map(item =>
                    <View
                      key={item.name}
                      style={[styles.StepItem, { backgroundColor: stepItemColor(item.isValid), width: stepWidth }]}
                    />
                  )}
                  <View style={[styles.IconContainer, { width: iconWidth }]}>
                    <Check color={iconColor(allRequiredFields)} />
                  </View>
                </View>
              </View>
            }
            {(!!optionalFields.length && stepWidth > 0) &&
              <View style={styles.ProgressBar}>
                <View style={[styles.Steps, { gap: stepGap }]}>
                  {optionalFields.map(item =>
                    <View
                      key={item.name}
                      style={[styles.StepItem, { backgroundColor: stepItemColor(item.isValid), width: stepWidth }]}
                    />
                  )}
                  <View style={[styles.IconContainer, { width: iconWidth }]}>
                    <Gift color={iconColor(allRequiredFields && allOptional)} />
                  </View>
                </View>
              </View>
            }
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      {!!giftInfo || !!giftInfoText ?
        <Popover
          hideBlur
          placement='bottom'
          triggerComponent={(open) => (
            <Button
              variant='TouchableOpacity'
              activeOpacity={.7}
              onLayout={handleLayout}
            >
              <View
                onMouseEnter={() => {
                  !infoDisplayed && open();
                  setInfoDisplayed(true);
                }}
              >
                {progressBar()}
              </View>
            </Button>
          )}
          containerStyle={styles.Wrapper}
          contentContainerStyle={{ width: windowSizes.width * 0.85, maxWidth: 500, backgroundColor: Colors.White }}
        >
          {(!!giftInfoText && !giftInfo) &&
            <View style={styles.InfoWrapper}>
              <View style={styles.InfoTextWrapper}>
                <View style={styles.InfoIcon}>
                  <Check />
                </View>
                <Typography style={styles.InfoText}>
                  {giftInfoText.requiredFields}
                </Typography>
              </View>
              <View style={styles.InfoTextWrapper}>
                <View style={styles.InfoIcon}>
                  <Gift />
                </View>
                <Typography style={styles.InfoText}>
                  {giftInfoText.optionalFields}
                </Typography>
              </View>
            </View>
          }
          {(!!giftInfo && !giftInfoText) &&
            <>
              {giftInfo}
            </>
          }
        </Popover>

        :

        <View style={styles.Wrapper}>
          <>
            {progressBar()}
          </>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.White,
    position: Platform.select({ web: 'sticky' as any }),
    top: Platform.select({ web: 50 }),
    zIndex: 100000,
  },
  ProgressBarContainer: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  ProgressBar: {
    flexDirection: 'row',
  },
  Steps: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  StepItem: {
    height: 4,
    borderRadius: 50,
  },
  IconContainer: {
    alignItems: 'center'
  },
  InfoWrapper: {
    paddingHorizontal: 19,
    paddingVertical: 30,
    gap: 20,
  },
  InfoTextWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  InfoText: {
    flex: 1
  },
  InfoIcon: {
    width: 30,
  }
});

export default FormProgressBar;