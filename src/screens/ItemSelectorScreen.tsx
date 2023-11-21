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

export type ItemSelectorScreenProps =
  ({
    mode: 'single';
    callback: (id: number) => void,
  } | {
    mode: 'multiple';
    callback: (id: number[]) => void,
  }) & {
    list: { id: number; name: string; icon?: string }[],
    labels: {
      searchLabel: string,
      itemsLabel: string,
    };
    headerProps?: Omit<React.ComponentProps<typeof ScreenHeaderProvider>, 'children'>,
    render?: (id: number, name: string, i: number, icon?: string, initialSelected?: number[]) => JSX.Element,
    initialSelected?: number[],
    subViewMode?: boolean,
  };

const ItemSelectorScreen: React.FC<ItemSelectorScreenProps> = ({
  mode,
  list,
  callback,
  labels,
  headerProps,
  render,
  subViewMode = true,
  initialSelected
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>(initialSelected ? mode === 'multiple' ? initialSelected : [] : []);
  const { backToRemoveParams } = useRouter();

  useEffect(() => {
    if (mode === 'single' && selectedItems.length > 0) {
      callback(selectedItems[0]);
      if (subViewMode) {
        backToRemoveParams();
      };
    };
  }, [selectedItems]);

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
        backToRemoveParams();
      };
    };
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
                height={21}
                variant="text"
                icon={
                  <SvgIcon
                    icon="crossBig"
                    fill={Colors.Basic500}
                    style={{ marginRight: -15 }}
                  />
                }
                onPress={() => setSearch('')}
              />
            )
          }
        />
      </View>
      <Typography color={Colors.Basic600} style={styles.ItemsLabel}>
        {labels.itemsLabel}
      </Typography>
      <ScrollView style={{ flex: 1 }}>
        {list
          .filter(({ name }) =>
            name.toLowerCase().includes(search.toLowerCase()),
          )
          .map(({ id, name, icon }, i) => (
            mode === 'single' ?

              render ?
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
                // disabled={initialSelected ? id === initialSelected[0] : false}
                >
                  <Typography size={16}>{name}</Typography>
                </Button>

              :

              <Fragment key={id}>
                {i === 0 && <Separator />}
                <View style={{ paddingHorizontal: 19 }}>
                  <CheckBox

                    checked={selectedItems.includes(id)}
                    onCheckedChange={() => handleSelectedItems(id)}
                    leftTextView={
                      render ?
                        render(id, name, i, icon)

                        :

                        <Typography style={styles.CheckBoxText} size={16}>{name}</Typography>
                    }
                    style={styles.CheckBox}
                  />
                </View>
                <Separator />
              </Fragment>
          ))}
      </ScrollView>
      {mode === 'multiple' && (
        <Button
          stickyBottom
          onPress={handleConfirmMultiple}
          disabled={selectedItems.length === 0}
        >
          Potwierdź
        </Button>
      )}
    </View>
  );

  return (
    <>
      {headerProps ? (
        <ScreenHeaderProvider {...headerProps}>{content}</ScreenHeaderProvider>
      ) : (
        <>{content}</>
      )}
    </>
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
  CheckBox: {
    marginTop: 20,
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
