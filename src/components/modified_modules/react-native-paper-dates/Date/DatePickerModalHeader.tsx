import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

import { useHeaderTextColor } from '../utils'
import { getTranslation } from '../translations/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../../molecules/Button'
import SvgIcon from '../../../atoms/SvgIcon'
import Colors from '../../../../colors/Colors'

export interface DatePickerModalHeaderProps {
  disableSafeTop?: boolean
  saveLabel?: string
  saveLabelDisabled?: boolean
  uppercase?: boolean
  onDismiss: () => void
  onSave: () => void
  locale: string | undefined
  closeIcon?: string
}

export default function DatePickerModalHeader(
  props: DatePickerModalHeaderProps
) {
  const theme = useTheme()
  const { disableSafeTop, locale, closeIcon = 'close' } = props
  const saveLabel = props.saveLabel || getTranslation(locale, 'save')
  const color = useHeaderTextColor()
  const insets = useSafeAreaInsets()

  return (
    <Animated.View
      style={[
        styles.animated,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingTop: disableSafeTop ? 0 : insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <Appbar style={styles.appbarHeader}>
        <Button
          icon={<SvgIcon icon='closeX' />}
          variant='text'
          circular
          accessibilityLabel={getTranslation(locale, 'close')}
          onPress={props.onDismiss}
          testID="react-native-paper-dates-close"
        />
        <Appbar.Content title={''} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            variant='text'
            width='auto'
            size='small'
            contentColor={Colors.Blue500}
            contentVariant='h5'
            contentWeight={props.uppercase ? 'CAPS' : 'SemiBold'}
            onPress={props.onSave}
            disabled={props.saveLabelDisabled ?? false}
            // uppercase={props.uppercase ?? true}
            testID="react-native-paper-dates-save"
          >
            {saveLabel}
          </Button>
        </View>
      </Appbar>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animated: {
    elevation: 4,
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12,
  },
  headerContentContainer: { marginTop: 5, flexDirection: 'row' },
  label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
  singleHeaderText: { color: '#fff', fontSize: 25 },
  rangeHeaderText: { color: '#fff', fontSize: 25 },
  headerTextFilled: { color: 'rgba(255,255,255,1)' },
  headerTextEmpty: { color: 'rgba(255,255,255,0.5)' },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
})
