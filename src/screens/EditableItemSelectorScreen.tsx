import React, { Fragment, Ref, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View, ScrollView as ScrollViewNative, BackHandler, TextInput } from 'react-native';
import Colors from '../colors/Colors';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import useRouter from '../hooks/useRouter';
import Button from '../components/molecules/Button';
import ItemSelectorScreen from './ItemSelectorScreen';
import { uuidv4 } from 'react-native-compressor';
import { Undo as UndoIcon, Equal as DragIcon } from '@tamagui/lucide-icons';
import { createParam } from 'solito';
import DraggableList, { RenderItemParams } from '../components/organismes/DraggableList';

export type EditableItemSelectorScreenProps = {
  itemSelectorList: {
    id: number,
    name: string
  }[],
  initialData: string[],
  callback: (data: string[]) => void,
  headerProps?: Omit<React.ComponentProps<typeof ScreenHeaderProvider>, 'children'>,
  isSubView?: boolean,
};

const stepsOrder = ['fill', 'select'] as const;
export type StepType = typeof stepsOrder[number];

const { useParam } = createParam<{ subViewMode: StepType }>();

type DataType = { id: string, value: string, valueCopy: string, inEditting: boolean };

const EditableItemSelectorScreen: React.FC<EditableItemSelectorScreenProps> = ({
  itemSelectorList,
  callback,
  headerProps,
  initialData,
  isSubView = true,
}) => {
  const [newItem, setNewItem] = useState<string>('');
  const [stepInitialParam, setStepInitialParam] = useParam('subViewMode', { initial: 'fill' });
  const [step, setStep] = useState<StepType>('fill');
  const [data, setData] = useState<DataType[]>(initialData.map(value => ({ id: uuidv4(), value, valueCopy: value, inEditting: false })));
  const ElementsViewRef = useRef<ScrollViewNative>(null);
  const MainTextFieldRef = useRef<TextInput>(null);
  const scrollAccess = useRef(false);
  const { back, backToRemoveParams } = useRouter();

  useEffect(() => {
    setStepInitialParam('fill', { webBehavior: 'replace' });
    setStep('fill');

    setTimeout(() => {
      MainTextFieldRef.current?.focus();
    }, 10);
  }, []);

  useEffect(() => {
    if (stepsOrder.includes(stepInitialParam as any)) {
      setStep(stepInitialParam as any);
    }
  }, [stepInitialParam]);

  useEffect(() => {
    if (ElementsViewRef.current && ElementsViewRef.current.scrollToEnd && scrollAccess.current) {
      ElementsViewRef.current.scrollToEnd();
      scrollAccess.current = false;
    }
  }, [data]);

  const backHandler = () => {
    if (step === 'select' && Platform.OS !== 'web') {
      setStepInitialParam('fill');
    } else {
      back();
    }
  }

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      backHandler();
      return true;
    });

    return () => {
      handler.remove();
    }
  }, [step]);

  const addNewItemHandler = () => {
    const value = newItem.trim();
    if (value) {
      scrollAccess.current = true;
      setData(prev => [...prev, { id: uuidv4(), value, valueCopy: value, inEditting: false }]);
      setNewItem('');
      MainTextFieldRef.current?.focus();
    }
  }

  const deleteItemHandler = (id: string) => {
    scrollAccess.current = false;
    setData(prev => {
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return prev;

      return [
        ...prev.slice(0, index),
        ...prev.slice(index + 1)
      ]
    });
  }

  const changeItemHandler = (id: string, value: string) => {
    scrollAccess.current = false;
    setData(prev => {
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return prev;

      return [
        ...prev.slice(0, index),
        { ...prev[index], valueCopy: value },
        ...prev.slice(index + 1)
      ]
    });
  }

  const itemInEdittingHandler = (props:
    { id: string, ref: RefObject<TextInput>, inEditting: true, withSave?: never } |
    { id: string, ref?: never, inEditting: false, withSave: boolean }
  ) => {
    const { id, inEditting, withSave = false, ref } = props;
    scrollAccess.current = false;


    setData(prev => {
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return prev;

      if (ref?.current && inEditting) {
        ref.current.focus();
        (ref.current as any).selectionStart = prev[index].valueCopy.length;
        (ref.current as any).selectionEnd = prev[index].valueCopy.length;
      }

      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          inEditting,
          ...(withSave ? {
            value: prev[index].valueCopy.trim()
          } : {
            valueCopy: prev[index].value.trim()
          })
        },
        ...prev.slice(index + 1)
      ]
    });
  }

  const submitHandler = () => {
    callback(data.map(e => e.value));
    if (isSubView) {
      backToRemoveParams();
    };
  }

  const SelectFromListButton = () => (
    <Button
      variant='secondary'
      borderRadius={4}
      fullwidth={false}
      size='small'
      contentWeight='Medium'
      paddingHorizontal={10}
      margin={10}
      onPress={() => setStepInitialParam('select', { webBehavior: 'push' })}
    >
      Wybierz z listy
    </Button>
  );

  const content = (
    <View style={styles.Wrapper}>
      {step === 'select' && <ItemSelectorScreen
        subViewMode={false}
        mode='multiple'
        list={itemSelectorList}
        callback={(newIds) => {
          scrollAccess.current = true;
          const newData: string[] = [];

          for (let index = 0; index < itemSelectorList.length; ++index) {
            const element = itemSelectorList[index];
            if (newIds.includes(element.id) && !data.find(e => e.value === element.name)) {
              newData.push(element.name);
            }
          }

          setData(prev => [
            ...prev,
            ...newData.map(value => ({ id: uuidv4(), value, valueCopy: value, inEditting: false }))
          ]);
          backHandler();
        }}
        initialSelected={itemSelectorList.reduce<number[]>((prev, curr) => data.find(d => d.value === curr.name) ? [...prev, curr.id] : prev, [])}
        labels={{
          searchLabel: 'Znajdź obowiązek',
          itemsLabel: '',
          popularItemsLabel: '',
        }}
        allowReturnEmptyList
      />}
      <View style={step === 'select' ? { visibility: 'hidden', opacity: 0, position: 'absolute', left: '1000%' } : { flex: 1 }}>
        <View style={styles.Textfield}>
          <TextField
            ref={MainTextFieldRef}
            label="Obowiązek"
            multiline
            height={'auto'}
            returnKeyType='none'
            maxLength={300}
            containerStyles={{ borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 }}
            value={newItem}
            onChangeText={setNewItem}
            numberOfLines={2}
            autoGrow
            lineHeight={20}
            disableNewLineSymbol
            autoFocus
          // {...(showTips && (!value || value.length < minChars) && {
          //   bottomText: !value ? 'Wprowadź opis' : `Opis musi zawierać minimum ${minChars} znaków`,
          // })}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9, paddingVertical: 5 }}>
          <SelectFromListButton />
          <Button
            borderRadius={4}
            fullwidth={false}
            size='small'
            contentWeight='Medium'
            paddingHorizontal={10}
            margin={10}
            onPress={addNewItemHandler}
          >
            Dodaj
          </Button>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 2, width: '20%', backgroundColor: Colors.Basic300, borderRadius: 1 }} />
        </View>
        {!data.length && <>
          <Typography
            style={{ paddingHorizontal: 19, marginTop: 19, }}
            color={Colors.Basic600}
            textAlign='center'
          >
            Nie dodano jeszcze żadnych informacji
          </Typography>
          <View style={{ height: 90, justifyContent: 'center', alignItems: 'center' }}>
            <SelectFromListButton />
          </View>
        </>}
        <DraggableList
          ref={ElementsViewRef}
          disableWindowScroll
          style={{
            marginTop: 11,
            height: Platform.select({ web: 1 }),
          }}
          contentContainerStyle={{
            paddingBottom: 30
          }}
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={({ id }) => id}
          renderItem={({ item, drag }: RenderItemParams<DataType>) => {
            const { id, inEditting, value, valueCopy } = item;
            const inputRef = useRef<TextInput>(null);

            return (
              <View
                style={{
                  marginHorizontal: 19,
                  marginVertical: 8,
                  backgroundColor: Colors.White,
                  borderRadius: 4,
                  flexDirection: 'row',
                }}
              >
                {!inEditting && <Button
                  variant='TouchableOpacity'
                  style={{
                    padding: 10,
                    cursor: 'grab',
                    justifyContent: 'center',
                    flex: 1
                  }}
                  onPressIn={drag}
                >
                  <DragIcon />
                </Button>}
                <View
                  style={[{
                    flex: 1,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: Colors.White,
                  }, inEditting ? {
                    borderWidth: 0,
                    paddingVertical: 0,
                  } : {}]}
                >
                  <TextField
                    ref={inputRef}
                    multiline
                    height='auto'
                    returnKeyType='none'
                    underline={inEditting}
                    maxLength={inEditting ? 300 : undefined}
                    containerStyles={inEditting ? { borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 } : { borderWidth: 0 }}
                    value={valueCopy}
                    onChangeText={(value) => changeItemHandler(id, value)}
                    numberOfLines={3}
                    autoGrow
                    lineHeight={21}
                    disableNewLineSymbol
                    editable={inEditting}
                    pointerEvents={inEditting ? 'auto' : 'none'}
                  />
                </View>
                <View style={{ padding: 5, justifyContent: 'center' }}>
                  {inEditting ? <>
                    <Button
                      variant='TouchableOpacity'
                      onPress={() => itemInEdittingHandler({ id, inEditting: false, withSave: false })}
                      style={{ padding: 5 }}
                    >
                      <UndoIcon />
                    </Button>
                    <Button
                      variant='TouchableOpacity'
                      onPress={() => itemInEdittingHandler({ id, inEditting: false, withSave: true })}
                      style={{ padding: 5 }}
                    >
                      <SvgIcon icon='check' />
                    </Button>
                  </> : <>
                    <Button
                      variant='TouchableOpacity'
                      onPress={() => deleteItemHandler(id)}
                      style={{ padding: 5 }}
                    >
                      <SvgIcon icon='closeX' />
                    </Button>
                    <Button
                      variant='TouchableOpacity'
                      onPress={() => itemInEdittingHandler({ id, ref: inputRef, inEditting: true })}
                      style={{ padding: 5 }}
                    >
                      <SvgIcon icon='pencil' />
                    </Button>
                  </>}
                </View>
              </View>
            );
          }}
        />
        <Button
          stickyBottom
          onPress={submitHandler}
        >
          Potwierdź
        </Button>
      </View>
    </View>
  );

  return (
    headerProps ?
      <ScreenHeaderProvider
        {...headerProps}
        callback={Platform.OS !== 'web' ? backHandler : undefined}
      >
        {content}
      </ScreenHeaderProvider>
      :
      content
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.Basic100,
    flex: 1,
  },
  Textfield: {
    marginTop: 19,
    marginHorizontal: 19,
  },
  List: {
    marginTop: 24,
    gap: 24
  },
  CheckBoxText: {
    paddingVertical: 20,
  },
  ItemsLabel: {
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 19,
  },
});

export default EditableItemSelectorScreen;
