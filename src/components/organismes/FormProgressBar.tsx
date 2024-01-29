import React, { FC, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { Separator } from 'tamagui';
import { Gift, Check } from '@tamagui/lucide-icons'

export type FormFieldType = {
  name: string,
  isValid: boolean,
  require?: boolean
};

type FormProgressBarProps = {
  fields: FormFieldType[];
};

const FormProgressBar: FC<FormProgressBarProps> = ({ fields }) => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [stepWidth, setItemWidth] = useState(0);
  const [requiredFields, setRequiredFields] = useState<FormFieldType[]>([]);
  const [optionalFields, setOptionalFields] = useState<FormFieldType[]>([]);

  const stepGap = 5;
  const iconWidth = 50;
  const paddingHorizontal = 19;

  useEffect(() => {
    if (fields.length) {
      const requiredFields = fields.filter(field => field.require).sort((a, b) => Number(b.isValid) - Number(a.isValid));
      const optionalFields = fields.filter(field => !field.require).sort((a, b) => Number(b.isValid) - Number(a.isValid));

      setRequiredFields(requiredFields);
      setOptionalFields(optionalFields);
    };
  }, [fields]);

  useEffect(() => {
    const numberOfItems = requiredFields.length + optionalFields.length;
    const itemWidth = (progressBarWidth - (optionalFields.length ? iconWidth * 2 : iconWidth) - ((numberOfItems - (optionalFields.length ? 2 : 1)) * stepGap) - (paddingHorizontal * 2)) / numberOfItems;

    setItemWidth(itemWidth);
  }, [fields, progressBarWidth]);

  const handleLayout = (event: { nativeEvent: { layout: { width: number; height: number; }; }; }) => {
    const { width } = event.nativeEvent.layout;
    setProgressBarWidth(width);
  };

  const allRequiredFields = requiredFields.every(item => item.isValid);
  const allOptional = optionalFields.every(item => item.isValid);

  return (
    <View
      onLayout={handleLayout}
      style={styles.Wrapper}
    >
      <Separator />
      <View style={{ paddingHorizontal: paddingHorizontal }}>
        <View style={styles.ProgressBarContainer}>
          {requiredFields.length &&
            <View style={styles.ProgressBar}>
              <View style={[styles.Steps, { gap: stepGap }]}>
                {requiredFields.map(item =>
                  <View
                    key={item.name}
                    style={[styles.StepItem, { backgroundColor: item.isValid ? Colors.Green500 : Colors.Basic400, width: stepWidth }]}
                  />
                )}
                <View style={styles.IconContainer}>
                  <Check color={allRequiredFields ? Colors.Basic900 : Colors.Basic500} />
                </View>
              </View>
            </View>
          }
          {optionalFields.length &&
            <View style={styles.ProgressBar}>
              <View style={[styles.Steps, { gap: stepGap }]}>
                {optionalFields.map(item =>
                  <View
                    key={item.name}
                    style={[styles.StepItem, { backgroundColor: item.isValid ? Colors.Green500 : Colors.Basic400, width: stepWidth }]}
                  />
                )}
                <View style={styles.IconContainer}>
                  <Gift color={(allRequiredFields && allOptional) ? Colors.Basic900 : Colors.Basic500} />
                </View>
              </View>
            </View>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.White,
    position: Platform.select({ web: 'sticky' as any }),
    top: Platform.select({ web: 50 }),
    zIndex: 100000
  },
  ProgressBarContainer: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  ProgressBar: {
    flexDirection: 'row'
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
    width: 50,
    alignItems: 'center'
  }
})

export default FormProgressBar;