# 🛸 elfemployer

splash screen: https://blog.logrocket.com/splash-screen-react-native/#react-native-splash-screen-example icon: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=clipart&foreground.clipart=android&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=circle&effects=none&name=ic_launcher

Generate build {
    1: cd android
    2: .\gradlew clean
    debug:
    3.1: .\gradlew assembleDebug
    release:
    3.1: .\gradlew bundleRelease

    Result debug path: android/app/build/outputs/apk/debug/app-debug.apk

    Result release path: android/app/build/outputs/bundle/release/app-release.aab
}

## ⭐ Features

- [React Native Web][22]
- [Next.js][6]
- [Tamagui][29]
- [Solito][23]
- [TypeScript][24]
- Other

## 🏃🏻‍♂️ Running the app

- ### 📱  **Native**

#### `yarn start`

Start Metro Bundler. After that, you can press `i` or `a` to run the app on iOS or Android simulator respectively.


- ### 💻   **Web**
#### `yarn web`

Runs the app in the web in development mode.\
Open [http://localhost:3000][25] to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build`

Builds the web app for production with Next.js.

#### `yarn next-start`

Runs the web app in production mode with Next.js. \
Open [http://localhost:3000][25] to view it in the browser. \
**Note:** You have to run `yarn build` first!


## 🧰 Development Tools
- [React Dev Tools][27] supports inspecting and editing of React Native styles. It’s recommended that you rely more on React Dev Tools and live/hot-reloading rather than inspecting and editing the **DOM** directly.
-  Check your code style with `yarn lint:all` (runs eslint, prettier, and tsc)
- Check your code correctness with `yarn test:all` (runs jest)


[6]: https://nextjs.org/
[22]: https://necolas.github.io/react-native-web/
[23]: https://solito.dev/
[24]: https://www.typescriptlang.org/
[25]: http://localhost:3000
[26]: https://reactnative.dev/docs/environment-setup
[27]: https://beta.reactjs.org/learn/react-developer-tools
[29]: https://tamagui.dev
