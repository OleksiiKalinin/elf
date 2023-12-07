import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { ScrollView } from '../../components/molecules/ScrollView';
import { createParam } from 'solito';
import useRouter from '../../hooks/useRouter';
import Typography from '../../components/atoms/Typography';
import { InitialPropsFromParams } from '../../hooks/types';
import { UserEventType } from '../../store/reducers/types';
import { useActions } from '../../hooks/useActions';
import SvgIcon from '../../components/atoms/SvgIcon';

type Props = NonNullable<CalendarStackParamList['default']['EventScreen']>;
const { useParam } = createParam<Props>();

const EventScreen: React.FC<InitialPropsFromParams<Props>> = ({ idInitial }) => {
  const dispatch = useTypedDispatch();
  const { replace, push } = useRouter();
  const [id] = useParam('id', { initial: idInitial });
  const [subView] = useParam('subView');
  const [subViewMode, setSubViewMode] = useState<'optionsMenu' | 'deleteMenu'>('optionsMenu');
  const { userEvents, userData, appLoading } = useTypedSelector(state => state.general);
  const [event, setEvent] = useState<UserEventType | null>(null);
  const { setSwipeablePanelProps } = useActions();
  const startDate = new Date(event?.start_time || '').toLocaleDateString();
  const endDate = new Date(event?.end_time || '').toLocaleDateString();

  useEffect(() => {
    if (!appLoading) {
      if (id) {
        const event = userEvents.find(e => e.id.toString() === id);
        if (event) {
          setEvent(userEvents.find(e => e.id.toString() === id) || null);
          return;
        }
      }
      replace({ stack: 'CalendarStack' });
    }
  }, [id, userEvents, appLoading]);

  useEffect(() => {
    if (subViewMode === 'optionsMenu') {
      editModeSubView();
    } else if (subViewMode === 'deleteMenu') {
      deleteModeSubView();
    }
  }, [subView, subViewMode]);

  const editModeSubView = () => {
    if (id) {
      setSwipeablePanelProps(
        (() => {
          if (subView === 'options')
            return {
              title: 'Co robimy tym razem?',
              closeButton: true,
              buttons: [
                {
                  children: 'Edytuj wydarzenie',
                  icon: <SvgIcon icon="pencil" />,
                  closeAction: 'props-null',
                  onPress: () =>
                    replace({ stack: 'CalendarStack', screen: 'EventEditorScreen', params: { id } }),
                },
                {
                  children: 'Usuń wydarzenie',
                  contentColor: Colors.Danger,
                  contentVariant: 'h5',
                  icon: <SvgIcon icon="crossBig" fill={Colors.Danger} />,
                  closeAction: 'none',
                  onPress: () => setSubViewMode('deleteMenu'),
                },
              ],
            };
          return null;
        })(),
      );
    }
  };

  const deleteModeSubView = () => {
    if (id) {
      setSwipeablePanelProps(
        (() => {
          if (subView === 'options')
            return {
              title: 'Czy chcesz usunąć pytanie?',
              closeButton: true,
              buttons: [
                {
                  children: 'Tak',
                  contentColor: Colors.Danger,
                  contentVariant: 'h5',
                  closeAction: 'props-null',
                  onPress: () => {
                    console.log('to delete');

                    replace({ stack: 'CalendarStack' });
                  },
                },
                {
                  children: 'Nie',
                  closeAction: 'none',
                  onPress: () => setSubViewMode('optionsMenu'),
                },
              ],
            };
          return null;
        })(),
      );
    }
  };

  const handleSubView = () => {
    if (id) {
      setSubViewMode('optionsMenu');
      push({
        stack: 'CalendarStack',
        screen: 'EventScreen',
        params: { id, subView: 'options' },
      });
    }
  };
  console.log(event);


  return !!event && (
    <ScreenHeaderProvider
      backgroundContent={Colors.Basic100}
      actions={[{ icon: 'threeDots', onPress: handleSubView }]}
    >
      <ScrollView>
        <View style={{ padding: 18 }}>
          <Typography>Data</Typography>
          <Typography>{startDate !== endDate ? `${startDate} - ${endDate}` : startDate}</Typography>
          <Typography>Czas</Typography>
          <Typography>{new Date(event.start_time).toLocaleTimeString().replace(/:00$/, '')}{' - '}{new Date(event.end_time).toLocaleTimeString().replace(/:00$/, '')}</Typography>
          <Typography>Kandydat</Typography>
          <Typography>{event.candidate_first_name}{' '}{event.candidate_second_name}</Typography>
          <Typography>Firma</Typography>
          <Typography>{event.company_name}</Typography>
          <Typography>{event.is_phone ?
            'Spotkanie telefoniczne: +48 123 456 789'
            :
            'Spotkanie pod adresem: ' + event.location?.formattedAddress
          }</Typography>
        </View>
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
});

export default EventScreen;
