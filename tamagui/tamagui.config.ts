import {createTamagui} from 'tamagui';
import {shorthands} from '@tamagui/shorthands';
import {themes, tokens} from '@tamagui/themes';
import {media, mediaQueryDefaultActive} from './mediaQueries';
import {animations} from './animations';
import fonts from './fonts';

const appConfig = createTamagui({
  shouldAddPrefersColorThemes: true,
  // themeClassNameOnRoot: true,
  animations,
  shorthands,
  media,
  fonts,
  themes,
  tokens,
});

//@ts-ignore
appConfig.mediaQueryDefaultActive = mediaQueryDefaultActive;

export type AppConfig = typeof appConfig;
export default appConfig;