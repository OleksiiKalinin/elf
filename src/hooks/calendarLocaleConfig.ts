import { LocaleConfig } from '../../node_modules_modified/react-native-calendars/src'

export default function calendarLocaleConfig() {
    LocaleConfig.locales['pl'] = {
        monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        monthNamesShort: ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'],
        dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
        dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
        // dayNamesShort: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'],
        // today: "Dzisiaj"
    };
    LocaleConfig.defaultLocale = 'pl';
}