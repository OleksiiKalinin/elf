import { Alert, Text, View } from 'react-native';

// somewhere in your app
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const MenuDemo = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu >
      <MenuTrigger text='Select action' />
      <MenuOptions>
        <MenuOption onSelect={() => console.log(`Save`)} text='Save' />
        <MenuOption onSelect={() => console.log(`Delete`)} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
  </View>
);