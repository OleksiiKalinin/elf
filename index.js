/**
 * When compiling for mobile, it will search for index.js on root.
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import { LocaleConfig as CalendarLocaleConfig } from 'react-native-calendars';
// import { LocaleConfig as CalendarLocaleConfig } from './node_modules_modified/react-native-calendars-new/src';



// CalendarLocaleConfig.locales['pl'] = {
//   monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
//   monthNamesShort: ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'],
//   dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
//   dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
//   // dayNamesShort: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'],
//   // today: "Dzisiaj"
// };
// CalendarLocaleConfig.defaultLocale = 'pl';

AppRegistry.registerComponent(appName, () => App);
