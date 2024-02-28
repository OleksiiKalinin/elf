import * as React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native'

import {
  MD2Theme,
  overlay,
  useTheme,
} from 'react-native-paper'

import TimePicker from './TimePicker'
import {
  clockTypes,
  getTimeInputTypeIcon,
  inputTypes,
  PossibleClockTypes,
  PossibleInputTypes,
  reverseInputTypes,
} from './timeUtils'
import { getTranslation } from '../translations/utils'
import Button from '../../../molecules/Button'
import SvgIcon from '../../../atoms/SvgIcon'
import ScrollLock from '../../../atoms/ScrollLock'
import useShadow from '../../../../hooks/useShadow'
import Colors from '../../../../colors/Colors'
import { Keyboard as KeyboardIcon, Clock as ClockIcon } from '@tamagui/lucide-icons'
import Typography from '../../../atoms/Typography'
import Modal from '../../../atoms/Modal'

const supportedOrientations: (
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right'
)[] = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
  ]

export function TimePickerModal({
  visible,
  onDismiss,
  onConfirm,
  hours,
  minutes,
  label,
  uppercase = false,
  cancelLabel,
  confirmLabel,
  animationType = 'none',
  locale,
  keyboardIcon = 'keyboard-outline',
  clockIcon = 'clock-outline',
  use24HourClock,
  inputFontSize,
  defaultInputType,
}: {
  locale?: undefined | string
  label?: string
  uppercase?: boolean
  cancelLabel?: string
  confirmLabel?: string
  hours?: number | undefined
  minutes?: number | undefined
  visible: boolean | undefined
  onDismiss: () => any
  onConfirm: (hoursAndMinutes: { hours: number; minutes: number }) => any
  animationType?: 'slide' | 'fade' | 'none'
  keyboardIcon?: string
  clockIcon?: string
  use24HourClock?: boolean
  inputFontSize?: number
  defaultInputType?: PossibleInputTypes
}) {
  const theme = useTheme()

  let textFont
  let labelText = label || getTranslation(locale, 'selectTime');

  if (theme.isV3) {
    textFont = theme.fonts.labelLarge
  } else {
    textFont = (theme as any as MD2Theme)?.fonts.medium
  }

  const [inputType, setInputType] = React.useState<PossibleInputTypes>(
    defaultInputType || inputTypes.picker
  )
  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  )
  const [localHours, setLocalHours] = React.useState<number>(getHours(hours))
  const [localMinutes, setLocalMinutes] = React.useState<number>(
    getMinutes(minutes)
  )

  React.useEffect(() => {
    setLocalHours(getHours(hours))
  }, [setLocalHours, hours])

  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes))
  }, [setLocalMinutes, minutes])

  const onFocusInput = React.useCallback(
    (type: PossibleClockTypes) => setFocused(type),
    []
  )
  const onChange = React.useCallback(
    (params: {
      focused?: PossibleClockTypes | undefined
      hours: number
      minutes: number
    }) => {
      if (params.focused) {
        setFocused(params.focused)
      }

      setLocalHours(params.hours)
      setLocalMinutes(params.minutes)
    },
    [setFocused, setLocalHours, setLocalMinutes]
  )
  return (
    <Modal
      visible={visible}
      onClose={onDismiss}
      animationType={animationType}
      presentationStyle="overFullScreen"
      supportedOrientations={supportedOrientations}
      contentContainerStyle={{ maxWidth: '100%' }}
    >
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.modalContent}
      >
        <View style={styles.labelContainer}>
          <Typography variant='h4'>
            {uppercase ? labelText.toUpperCase() : labelText}
          </Typography>
        </View>
        <View style={styles.timePickerContainer}>
          <TimePicker
            locale={locale}
            inputType={inputType}
            use24HourClock={use24HourClock}
            inputFontSize={inputFontSize}
            focused={focused}
            hours={localHours}
            minutes={localMinutes}
            onChange={onChange}
            onFocusInput={onFocusInput}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            circular
            variant='text'
            icon={inputType === 'keyboard' ? <ClockIcon size='$1.5' /> : <KeyboardIcon size='$1.5' />}
            onPress={() => setInputType(reverseInputTypes[inputType])}
            mr={5}
            accessibilityLabel="toggle keyboard"
          />
          <View style={styles.fill} />
          <Button
            onPress={onDismiss}
            width='auto'
            size='medium'
            variant='secondary'
            mr={15}
            br={4}
          >
            {cancelLabel || getTranslation(locale, 'cancelTimeModal')}
          </Button>
          <Button
            width='auto'
            size='medium'
            br={4}
            onPress={() => onConfirm({ hours: localHours, minutes: localMinutes })}
          >
            {confirmLabel || getTranslation(locale, 'confirmTimeModal')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

function getMinutes(minutes: number | undefined | null): number {
  return minutes === undefined || minutes === null
    ? new Date().getMinutes()
    : minutes
}
function getHours(hours: number | undefined | null): number {
  return hours === undefined || hours === null ? new Date().getHours() : hours
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    borderRadius: 4,
    minWidth: 287,
    paddingVertical: 8,
    backgroundColor: Colors.White,
    ...useShadow(15),
  },
  labelContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
  },
  label: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  timePickerContainer: {
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 16,
    paddingRight: 24,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: 14,
    paddingRight: 20,
    paddingBottom: 7,
  },
  inputTypeToggle: { margin: 4 },
  fill: { flex: 1 },
})

export default React.memo(TimePickerModal)
