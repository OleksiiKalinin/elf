import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import DayNames, { dayNamesHeight } from './DayNames'
import type { DisableWeekDaysType } from './dateUtils'
import { getTranslation } from '../translations/utils'
import Button from '../../../molecules/Button'
import SvgIcon from '../../../atoms/SvgIcon'

const buttonContainerHeight = 56
const buttonContainerMarginTop = 4
const buttonContainerMarginBottom = 8

export function getCalendarHeaderHeight(scrollMode: 'horizontal' | 'vertical') {
  if (scrollMode === 'horizontal') {
    return (
      buttonContainerHeight +
      buttonContainerMarginTop +
      buttonContainerMarginBottom +
      dayNamesHeight
    )
  }
  return dayNamesHeight
}

function CalendarHeader({
  scrollMode,
  onPrev,
  onNext,
  disableWeekDays,
  locale,
}: {
  locale: undefined | string
  scrollMode: 'horizontal' | 'vertical'
  onPrev: () => any
  onNext: () => any
  disableWeekDays?: DisableWeekDaysType
}) {
  const theme = useTheme()
  const isHorizontal = scrollMode === 'horizontal'
  return (
    <View style={styles.datePickerHeader} pointerEvents={'box-none'}>
      {isHorizontal ? (
        <View style={styles.buttonContainer} pointerEvents={'box-none'}>
          <View style={styles.spacer} pointerEvents={'box-none'} />
          <View
            style={[
              styles.buttonWrapper,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Button 
              circular
              variant='text'
              accessibilityLabel={getTranslation(locale, 'previous')}
              icon={<SvgIcon icon='arrowLeft' />}
              onPress={onPrev}
            />
          </View>
          <View
            style={[
              styles.buttonWrapper,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Button
              circular
              variant='text'
              icon={<SvgIcon icon='arrowRight' />}
              accessibilityLabel={getTranslation(locale, 'next')}
              onPress={onNext}
            />
          </View>
        </View>
      ) : null}
      <DayNames disableWeekDays={disableWeekDays} locale={locale} />
    </View>
  )
}

const styles = StyleSheet.create({
  datePickerHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
  buttonContainer: {
    height: buttonContainerHeight,
    marginTop: buttonContainerMarginTop,
    marginBottom: buttonContainerMarginBottom,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginRight: 10,
  },
  spacer: { flex: 1 },
})

export default React.memo(CalendarHeader)
