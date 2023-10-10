import { Children } from 'react';
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { AppRegistry } from 'react-native';
import config from '../../app.json';
import Tamagui from '../../tamagui';
//@ts-ignore
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

function MyDocument() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async ({
  renderPage,
}: DocumentContext): Promise<DocumentInitialProps> => {
  AppRegistry.registerComponent(config.name, () => Main);
  const { getStyleElement } = AppRegistry.getApplication(config.name);
  const page = await renderPage();
  const styles = [
    getStyleElement(),
    <style
      key={'tamagui-rn-web-style-tag'}
      dangerouslySetInnerHTML={{
        __html: Tamagui.getCSS(),
      }}
    />,
    <style dangerouslySetInnerHTML={{
      __html: `@font-face {
      src: url(${iconFont});
      font-family: FontAwesome;
    }`}} />
  ];
  return { ...page, styles: Children.toArray(styles) };
};

export default MyDocument;
