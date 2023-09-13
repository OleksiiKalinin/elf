import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';

type TabbarMenuProps = {
  scrollable?: boolean;
  autoWidth?: boolean;
  paddingHorizontal?: number;
  backgroundColor?: string;
  componentToPassDown?: Element;
} & React.ComponentProps<typeof TabView>;

export type TabbarRoute = { icon?: IconTypes } & Route;

const TabbarMenu: React.FC<TabbarMenuProps> = ({
  scrollable = false,
  autoWidth = false,
  paddingHorizontal = 0,
  componentToPassDown,
  ...props
}) => {
  return (
    <TabView
      swipeEnabled={false}
      renderTabBar={defaultProps => (<>
        <TabBar
          {...defaultProps}
          scrollEnabled={scrollable}
          indicatorStyle={styles.Indicator}
          style={[styles.Tabbar, { backgroundColor: props.backgroundColor || Colors.Basic100, shadowColor: props.backgroundColor ? 'transparent' : Colors.White }]}
          tabStyle={[styles.Tab, autoWidth ? { width: 'auto' } : {}]}
          renderLabel={({ route, focused }) => (
            <Button
              variant="text"
              {...(route.icon ? { icon: <SvgIcon icon={route.icon as IconTypes} /> } : {})}
              contentColor={focused ? Colors.Basic900 : Colors.Basic700}
              contentWeight={focused ? 'Bold' : 'SemiBold'}
              contentVariant="h5"
              style={{ paddingVertical: 0, paddingHorizontal }}
            >
              {'  '}{route.title}{'  '}
            </Button>
          )}
        />
        {componentToPassDown}
      </>)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  Tabbar: {
    flexWrap: "nowrap",
    height: 45
  },
  Tab: {
    padding: 0,
    justifyContent: 'center',
  },
  Indicator: {
    backgroundColor: Colors.Basic900,
  },
});

export default TabbarMenu;
