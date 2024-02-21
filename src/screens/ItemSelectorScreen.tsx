import React, { Fragment, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View, } from 'react-native';
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

export type ItemSelectorScreenProps =
  ({
    mode: 'single';
    callback: (id: number) => void,
    highlightPopularItems?: true,
    labels: {
      searchLabel: string,
      itemsLabel: string,
      popularItemsLabel?: string,
    },
  } | {
    mode: 'single';
    callback: (id: number) => void,
    highlightPopularItems?: false,
    labels: {
      searchLabel: string,
      itemsLabel: string,
      popularItemsLabel?: never,
    },
  } | {
    mode: 'multiple';
    callback: (id: number[]) => void,
    highlightPopularItems?: true,
    labels: {
      searchLabel: string,
      itemsLabel: string,
      popularItemsLabel: string,
    },
  } | {
    mode: 'multiple';
    callback: (id: number[]) => void,
    highlightPopularItems?: false,
    labels: {
      searchLabel: string,
      itemsLabel: string,
      popularItemsLabel?: never,
    },
  }) & {
    list: { id: number; name: string; icon?: string, isPopular?: boolean }[],
    headerProps?: Omit<React.ComponentProps<typeof ScreenHeaderProvider>, 'children'>,
    render?: (id: number, name: string, i: number, icon?: string, initialSelected?: number[]) => JSX.Element,
    initialSelected?: number[],
    subViewMode?: boolean,
    allowReturnEmptyList?: boolean,
    closeCallback?: () => void,
  };

const ItemSelectorScreen: React.FC<ItemSelectorScreenProps> = ({
  mode,
  list,
  callback,
  labels,
  headerProps,
  render,
  subViewMode = true,
  initialSelected,
  allowReturnEmptyList = false,
  highlightPopularItems = false,
  closeCallback,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>(initialSelected ? mode === 'multiple' ? initialSelected : [] : []);
  const { backToRemoveParams } = useRouter();

  useEffect(() => {
    console.log(initialSelected)
  }, [initialSelected]);

  useEffect(() => {
    if (mode === 'single' && selectedItems.length > 0) {
      callback(selectedItems[0]);
      if (subViewMode) {
        !!closeCallback ? closeCallback() : backToRemoveParams();
      };
    };
  }, [selectedItems]);

  useEffect(() => {
    if (!!closeCallback) {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            closeCallback();
            return true;
        });

        return () => {
            handler.remove();
        };
    };
}, [closeCallback]);


  const handleSelectedItems = (id: number) => {
    const mySet = new Set([...selectedItems]);
    if (mySet.has(id)) {
      mySet.delete(id);
    } else {
      mySet.add(id);
    }
    setSelectedItems([...mySet]);
  };

  const handleConfirmMultiple = () => {
    if (mode === 'multiple' && selectedItems) {
      callback(selectedItems);
      if (subViewMode) {
        !!closeCallback ? closeCallback() : backToRemoveParams();
      };
    };
  };

  const listOfItems = (list: { id: number; name: string; icon?: string, isPopular?: boolean }[], label: string) => {

    const filteredList = list.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <>
        {!!filteredList.length && !!label &&
          <Typography color={Colors.Basic600} style={styles.ItemsLabel}>
            {label}
          </Typography>
        }
        {filteredList.map(({ id, name, icon }, i) => (
          mode === 'single' ?
            (render ?
              <Fragment key={id}>
                {render(id, name, i, icon, initialSelected)}
              </Fragment>
              :
              <Button
                key={id}
                arrowRight
                borderTop={i === 0}
                borderBottom
                variant='text'
                style={{ paddingVertical: 19 }}
                onPress={() => handleSelectedItems(id)}
              >
                <Typography size={16}>{name}</Typography>
              </Button>
            )
            :
            <Fragment key={id}>
              {i === 0 && <Separator />}
              <View style={{ paddingHorizontal: 19 }}>
                <CheckBox
                  checked={selectedItems.includes(id)}
                  onCheckedChange={() => handleSelectedItems(id)}
                  leftTextView={render ?
                    render(id, name, i, icon)
                    :
                    <Typography style={styles.CheckBoxText} size={16}>{name}</Typography>
                  }
                />
              </View>
              <Separator />
            </Fragment>
        ))}
      </>
    )
  };

  const content = (
    <View style={styles.Wrapper}>
      <View style={styles.Textfield}>
        <TextField
          placeholder={labels.searchLabel}
          textContentType="emailAddress"
          keyboardType="email-address"
          value={search}
          onChangeText={setSearch}
          left={<SvgIcon icon="search" />}
          right={
            search && (
              <Button
                variant="TouchableOpacity"
                onPress={() => setSearch('')}
                style={{ padding: 5, marginRight: -5 }}
              >
                <SvgIcon icon="crossBig" fill={Colors.Basic500} />
              </Button>
            )
          }
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.List}>
          {(highlightPopularItems && labels.popularItemsLabel) ?
            <>
              <View>
                {listOfItems(list.filter(item => item.isPopular), labels.popularItemsLabel)}
              </View>
              <View>
                {listOfItems(list.filter(item => !item.isPopular), labels.itemsLabel)}
              </View>
            </>
            :
            <View>
              {listOfItems(list, labels.itemsLabel)}
            </View>
          }
        </View>
      </ScrollView>
      {mode === 'multiple' && (
        <Button
          stickyBottom
          onPress={handleConfirmMultiple}
          disabled={allowReturnEmptyList ? false : selectedItems.length === 0}
        >
          Potwierdź
        </Button>
      )}
    </View>
  );

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
    marginVertical: 16,
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

export default ItemSelectorScreen;
