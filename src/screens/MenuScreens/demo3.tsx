import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Text, View } from 'react-native';
import Button from '../../components/molecules/Button';
import { useCallback, useState } from 'react';

export const DateTimePickerDemo = () => {
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const onDismiss = useCallback(() => {
      setVisible(false)
    }, [setVisible])
  
    const onConfirm = useCallback(
      ({ hours, minutes }: any) => {
        setVisible(false);
        console.log({ hours, minutes });
      },
      [setVisible]
    );

    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = useCallback(
        (params: any) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => setOpen(true)}>
                Pick single date
            </Button>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
            <Button onPress={() => setVisible(true)}>
              Pick time
            </Button>
            <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={12}
              minutes={14}
              use24HourClock
              inputFontSize={38}
              keyboardIcon='keyboard-outline'
            />
        </View>
    )
};