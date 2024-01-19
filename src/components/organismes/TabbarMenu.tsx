import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Route, SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import { isNumber } from 'lodash';
import Typography from '../atoms/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const TABBAR_HEIGHT = 45;

type OriginProps = React.ComponentProps<typeof TabView>;

type TabbarMenuProps = {
  scrollable?: boolean;
  autoWidth?: boolean;
  stickyTop?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
  ComponentToPassDown?: Element;
  onlyTabs?: boolean;
  renderScene?: OriginProps['renderScene'],
} & Omit<OriginProps, 'renderScene'>;

export type TabbarRoute = { icon?: IconTypes } & Route;

const TabbarMenu: React.FC<TabbarMenuProps> = ({
  scrollable = false,
  autoWidth = false,
  onlyTabs = false,
  stickyTop,
  backgroundColor,
  paddingHorizontal = 0,
  ComponentToPassDown,
  renderScene,
  ...props
}) => {
  return (
    <TabView
      swipeEnabled={false}
      lazy
      renderTabBar={defaultProps => (<>
        <TabBar
          {...defaultProps}
          scrollEnabled={scrollable}
          indicatorStyle={styles.Indicator}
          style={[
            styles.Tabbar,
            isNumber(stickyTop) ? { ...styles.TabbarSticky, top: Platform.select({ native: 0, web: stickyTop }) } : {},
            {
              backgroundColor: backgroundColor || Colors.Basic100,
              shadowColor: backgroundColor ? 'transparent' : Colors.White
            }
          ]}
          tabStyle={[styles.Tab, autoWidth ? { width: 'auto' } : {}]}
          renderLabel={({ route, focused }) => (
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
            >
              {route.icon && <SvgIcon icon={route.icon as IconTypes} />}
              <Typography
                color={focused ? Colors.Basic900 : Colors.Basic600}
                // weight={focused ? 'Bold' : 'SemiBold'}
                weight={'SemiBold'}
                variant="h5"
              >
                {route.title}
              </Typography>
            </TouchableOpacity>
          )}
        />
        {ComponentToPassDown}
      </>)}
      {...props}
      renderScene={renderScene || SceneMap(props.navigationState.routes.reduce((prev, curr) => ({ ...prev, [curr.key]: () => null }), {}))}
      style={[{
        zIndex: 10,
        minHeight: isNumber(stickyTop) ? TABBAR_HEIGHT : undefined,
        flex: Platform.select({ native: onlyTabs ? 0 : 1, web: 'none' as any })
      }, props.style]}
      sceneContainerStyle={[{
        marginTop: isNumber(stickyTop) ? TABBAR_HEIGHT : undefined,
      }, props.sceneContainerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  Tabbar: {
    flexWrap: "nowrap",
    height: TABBAR_HEIGHT,
  },
  TabbarSticky: {
    position: Platform.select({
      native: 'absolute',
      web: 'fixed'
    }),
    width: '100%',
    maxWidth: 768,
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
