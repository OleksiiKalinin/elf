import type { TranslationsType } from './utils'

const pl: TranslationsType = {
  save: 'Zapisz',
  selectSingle: 'Wybierz datę',
  selectMultiple: 'Wybierz daty',
  selectRange: 'Wybierz zakres',
  notAccordingToDateFormat: (inputFormat) =>
    `Data musi mieć format ${inputFormat}`,
  mustBeHigherThan: (date) => `Nie wcześniej niż ${date}`,
  mustBeLowerThan: (date) => `Nie później niż ${date}`,
  mustBeBetween: (startDate, endDate) => `Pomiędzy ${startDate} - ${endDate}`,
  dateIsDisabled: 'Niedozwolona data',
  previous: 'Poprzedni',
  next: 'Dalej',
  typeInDate: 'Wpisz datę',
  pickDateFromCalendar: 'Wybierz datę z kalendarza',
  close: 'Zamknij',

  selectTime: 'Wybierz czas',
  hourLabel: 'Godzina',
  minuteLabel: 'Minuta',
  cancelTimeModal: 'cofnij',
  confirmTimeModal: 'potwierdź',
}
export default pl
