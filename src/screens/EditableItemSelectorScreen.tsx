import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import Colors from '../colors/Colors';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { Separator } from 'tamagui';
import useRouter from '../hooks/useRouter';
import Button from '../components/molecules/Button';
import CheckBox from '../components/atoms/CheckBox';
import ItemSelectorScreen from './ItemSelectorScreen';
import { uuidv4 } from 'react-native-compressor';
import { CornerUpLeft } from '@tamagui/lucide-icons';

export type EditableItemSelectorScreenProps = {
  itemSelectorList: {
    id: number,
    name: string
  }[],
  initialData: string[],
  callback: (data: string[]) => void,
  headerProps?: Omit<React.ComponentProps<typeof ScreenHeaderProvider>, 'children'>,
};

const EditableItemSelectorScreen: React.FC<EditableItemSelectorScreenProps> = ({
  itemSelectorList,
  callback,
  headerProps,
  initialData
}) => {
  const [showItemSelectorList, setShowItemSelectorList] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [data, setData] = useState<{ id: string, value: string, valueCopy: string, inEditting: boolean }[]>(initialData.map(value => ({ id: uuidv4(), value, valueCopy: value, inEditting: false })));


  const addNewItemHandler = () => {
    const value = newItem.trim();
    if (value) {
      setData(prev => [...prev, { id: uuidv4(), value, valueCopy: value, inEditting: false }]);
      setNewItem('');
    }
  }

  const deleteItemHandler = (id: string) => {
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
    setData(prev => {
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return prev;

      return [
        ...prev.slice(0, index),
        { ...prev[index], valueCopy: value.trim() },
        ...prev.slice(index + 1)
      ]
    });
  }

  const itemInEdittingHandler = (props:
    { id: string, inEditting: true, withSave?: never } |
    { id: string, inEditting: false, withSave: boolean }
  ) => {
    const { id, inEditting, withSave = false } = props;

    setData(prev => {
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return prev;

      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          inEditting,
          ...(withSave ? {
            value: prev[index].valueCopy
          } : {
            valueCopy: prev[index].value
          })
        },
        ...prev.slice(index + 1)
      ]
    });
  }

  const content = showItemSelectorList ?
    <ItemSelectorScreen
      mode='multiple'
      list={itemSelectorList}
      callback={(languages) => { }}
      labels={{
        searchLabel: 'Znajdź język',
        itemsLabel: 'Pozostałe języki',
        popularItemsLabel: 'Popularne języki',
      }}
      // headerProps: { title: 'Preferowane języki' }
      // initialSelected: advertData.known_languages_id
      allowReturnEmptyList
    />
    :
    <View style={styles.Wrapper}>
      <View style={styles.Textfield}>
        <TextField
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
        // {...(showTips && (!value || value.length < minChars) && {
        //   bottomText: !value ? 'Wprowadź opis' : `Opis musi zawierać minimum ${minChars} znaków`,
        // })}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9, paddingVertical: 5 }}>
        <Button
          variant='secondary'
          borderRadius={4}
          fullwidth={false}
          size='small'
          contentWeight='Medium'
          paddingHorizontal={10}
          margin={10}
        >
          Wybierz z listy
        </Button>
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
      {!data.length ?
        <View style={{ flex: 1 }}>
          <Typography
            style={{ padding: 19 }}
            color={Colors.Basic600}
            textAlign='center'
          >
            Nie dodano jeszcze żadnych informacji
          </Typography>
        </View>
        :
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ marginTop: 11, paddingBottom: 30 }}>
          {data.map(({ id, value, valueCopy, inEditting }) => (
            <View
              key={id}
              style={{
                marginHorizontal: 19,
                marginVertical: 8,
                backgroundColor: Colors.White,
                borderRadius: 4,
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  padding: 10,
                  paddingRight: 0,
                  flex: 1
                }}
              >
                {inEditting ?
                  <TextField
                    multiline
                    height={'auto'}
                    returnKeyType='none'
                    maxLength={300}
                    containerStyles={{ borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 }}
                    value={valueCopy}
                    onChangeText={(value) => changeItemHandler(id, value)}
                    numberOfLines={2}
                    autoGrow
                    lineHeight={20}
                    disableNewLineSymbol
                  // {...(showTips && (!value || value.length < minChars) && {
                  //   bottomText: !value ? 'Wprowadź opis' : `Opis musi zawierać minimum ${minChars} znaków`,
                  // })}
                  />
                  :
                  <Typography variant='h5'>
                    {value}
                  </Typography>
                }
              </View>
              <View style={{ padding: 5, justifyContent: 'center' }}>
                {inEditting ? <>
                  <Button
                    variant='TouchableOpacity'
                    onPress={() => itemInEdittingHandler({ id, inEditting: false, withSave: false })}
                    style={{ padding: 5 }}
                  >
                    <CornerUpLeft />
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
                    onPress={() => itemInEdittingHandler({ id, inEditting: true })}
                    style={{ padding: 5 }}
                  >
                    <SvgIcon icon='pencil' />
                  </Button>
                </>}
              </View>
            </View>
          ))}
        </ScrollView>
      }
      <Button
        stickyBottom
      // onPress={handleConfirmMultiple}
      // disabled={allowReturnEmptyList ? false : selectedItems.length === 0}
      >
        Potwierdź
      </Button>
    </View>

  return (
    headerProps ?
      <ScreenHeaderProvider {...headerProps}>{content}</ScreenHeaderProvider>
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
