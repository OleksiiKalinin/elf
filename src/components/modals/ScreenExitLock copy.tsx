import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import Typography from '../atoms/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../atoms/Modal';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import useRouter, { SubViewType } from '../../hooks/useRouter';
import { createParam } from 'solito';
import { CurrentScreenType } from '../../hooks/withUrl';
import { isEqual } from 'lodash';

const { useParam } = createParam<{ subView?: SubViewType }>();

const ScreenExitLock = () => {
  const { showExitWarningModal, blockedScreen, currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
  const { setShowExitWarningModal, setBlockedScreen } = useActions();
  const router = useRouter();
  const { back, backToRemoveParams } = useRouter();
  const [subView] = useParam('subView');
  const [prevScreen, setPrevScreen] = useState<CurrentScreenType>();
  const [currentScreenState, setCurrentScreenState] = useState<CurrentScreenType>();
  const [popstate, setPopstate] = useState(false);

  const goBack = blockedScreen.backTo ? blockedScreen.backTo : !!swipeablePanelProps ? backToRemoveParams : back

  useEffect(() => {
    if (subView === undefined) {
      setBlockedScreen({ ...blockedScreen, blockedBack: blockedScreen.blockedExit });
    } else {
      setBlockedScreen({ ...blockedScreen, blockedBack: false });
    };
  }, [subView]);

 /*  useEffect(() => {
    console.log('prev', prevScreen?.screen);
    console.log('current', currentScreen?.screen);
    console.log('popstate', popstate);
  }, [currentScreen, prevScreen, popstate]); */

  useEffect(() => {
    if(!isEqual(currentScreen, currentScreenState)){
      setPrevScreen(currentScreenState);
      setCurrentScreenState(currentScreen);
      setBlockedScreen({ blockedExit: false, blockedBack: false });
      setShowExitWarningModal(false);
    }
  }, [currentScreen]);

  useEffect(() => {
    const beforeUnloadHandler = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    };

    if (Platform.OS === 'web') {
      if (blockedScreen.blockedExit || blockedScreen.blockedBack) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
        window.addEventListener('popstate', popstateHandler);
      } else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
        window.removeEventListener('popstate', popstateHandler);
      }
    } else {
      if (blockedScreen.blockedBack) {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
          setShowExitWarningModal(true);
          return true;
        });

        return () => {
          handler.remove();
        };
      };
    };

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
        window.removeEventListener('popstate', popstateHandler);
      }
    }
  }, [blockedScreen]);

  const popstateHandler = () => {
    if (subView === undefined) {
      setPopstate(true);
      setShowExitWarningModal(true);

      // @ts-ignore
      router.replace({
        stack: currentScreen.stack,
        screen: currentScreen.screen,
        params: undefined,
      });
    } else if(!!subView && subView !== 'options'){
      setPopstate(true);
      setShowExitWarningModal(true);

      // @ts-ignore
      router.replace({
        stack: currentScreen.stack,
        screen: currentScreen.screen,
        params: {
          subView: subView
        },
      });
    };
  };

  const popstateGoBack = () =>{
    if(prevScreen){
      // @ts-ignore
      router.push({
        stack: prevScreen.stack,
        screen: prevScreen.screen,
        params: undefined,
      });
    };
  };

  const closeHandler = () => {
    setShowExitWarningModal(false);
  };

  const exitHandler = () =>{
    (popstate && prevScreen) ? popstateGoBack() : goBack();
    closeHandler();
    subView === undefined ? setBlockedScreen({ blockedExit: false, blockedBack: false }) : setBlockedScreen({ ...blockedScreen, blockedBack: false })
    setPopstate(false);
  };

  return (
    <Modal
      visible={showExitWarningModal}
      onClose={closeHandler}
      withoutUrl
    >
      <View style={styles.Modal}>
        <View style={styles.CropContainer}>
          <Typography weight='Bold' variant='h4' textAlign='center'>
            Uwaga!
          </Typography>
          <Typography variant='h5' textAlign='center'>
            Jeśli opuścisz ten ekran, wszelkie wprowadzone przez Ciebie dane nie zostaną zapisane.
          </Typography>
          <Typography variant='h5' color={Colors.Basic700} textAlign='center'>
            Czy na pewno chcesz opuścić ekran?
          </Typography>
        </View>
        <View style={{ flexDirection: "row", padding: 7.5 }}>
          <Button
            fullwidth={false}
            size='medium'
            style={{ margin: 7.5, flex: 1 }}
            borderRadius={4}
            onPress={() => exitHandler()}
          >
            Wyjdź
          </Button>
          <Button
            fullwidth={false}
            size='medium'
            style={{ margin: 7.5, flex: 1 }}
            variant='secondary'
            borderRadius={4}
            onPress={() => closeHandler()}
          >
            Anuluj
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: Colors.White,
    borderRadius: 4,
  },
  CropContainer: {
    padding: 15,
    gap: 10
  },
});

export default ScreenExitLock;


















// import React, { useEffect, useState } from 'react';
// import { BackHandler, Platform, StyleSheet, View } from 'react-native';
// import Typography from '../atoms/Typography';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
// import Modal from '../atoms/Modal';
// import { useActions } from '../../hooks/useActions';
// import Colors from '../../colors/Colors';
// import Button from '../molecules/Button';
// import useRouter, { SubViewType } from '../../hooks/useRouter';
// import { createParam } from 'solito';
// import { CurrentScreenType } from '../../hooks/withUrl';
// import { isEqual } from 'lodash';
// import { BlockedScreenType } from '../../store/reducers/types';

// const { useParam } = createParam<{ subView?: SubViewType }>();

// const ScreenExitLock = () => {
//   const { showExitWarningModal, blockedScreen, currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
//   const { setShowExitWarningModal, setBlockedScreen } = useActions();
//   const router = useRouter();
//   const { back, backToRemoveParams } = useRouter();
//   const [subView] = useParam('subView');
//   const [prevScreen, setPrevScreen] = useState<CurrentScreenType>();
//   const [currentScreenState, setCurrentScreenState] = useState<CurrentScreenType>();
//   const [prevBlockedScreen, setPrevBlockedScreen] = useState<BlockedScreenType>();
//   const [popstate, setPopstate] = useState(false);

//   const goBack = blockedScreen.backTo ? blockedScreen.backTo : !!swipeablePanelProps ? backToRemoveParams : back;

//   useEffect(() => {
//     console.log('swipeablePanelProps', swipeablePanelProps);
//     if (!swipeablePanelProps) {
//       setBlockedScreen({ ...blockedScreen, blockedBack: blockedScreen.blockedExit });
//     } else {
//       setBlockedScreen({ ...blockedScreen, blockedBack: false });
//     };
//     if (swipeablePanelProps?.mode === 'screen') {
//       if (!prevBlockedScreen && (blockedScreen.blockedExit || blockedScreen.blockedBack)) {
//         setPrevBlockedScreen(blockedScreen);
//       };
//     };
//   }, [swipeablePanelProps]);

//   useEffect(() => {
//     /*     console.log('prev', prevScreen?.screen);
//         console.log('current', currentScreen?.screen);
//         console.log('popstate', popstate); */
//     /* console.log('prevBlockedScreen', prevBlockedScreen);
//     console.log('blockedScreen', prevBlockedScreen); */
//     /*     console.log('swipeablePanelProps', swipeablePanelProps); */
//   }, [/* currentScreen, prevScreen, popstate, swipeablePanelProps */prevBlockedScreen, blockedScreen, swipeablePanelProps]);

//   useEffect(() => {
//     if (Platform.OS === 'web') {
//       setTimeout(() => {
//         if (!swipeablePanelProps && prevBlockedScreen) {
//           setBlockedScreen(prevBlockedScreen);
//         };
//       }, 1000)
//     };
//   }, [/* prevBlockedScreen,  */swipeablePanelProps]);

//   useEffect(() => {
//     if (Platform.OS === 'web') {
//       if (!swipeablePanelProps) {
//         setPrevBlockedScreen(blockedScreen);
//       };
//     };
//   }, [blockedScreen]);

//   useEffect(() => {
//     if (!isEqual(currentScreen, currentScreenState)) {
//       setPrevScreen(currentScreenState);
//       setCurrentScreenState(currentScreen);
//       setBlockedScreen({ blockedExit: false, blockedBack: false });
//       setShowExitWarningModal(false);
//     };
//   }, [currentScreen]);

//   useEffect(() => {

//     if(blockedScreen.blockedExit || blockedScreen.blockedBack){
      
//     }
//   }, [swipeablePanelProps, blockedScreen]);

//   useEffect(() => {
//     const beforeUnloadHandler = (event: { preventDefault: () => void; }) => {
//       event.preventDefault();
//     };

//     if (Platform.OS === 'web') {
//       if (blockedScreen.blockedExit || blockedScreen.blockedBack) {
//         window.addEventListener("beforeunload", beforeUnloadHandler);
//         /* window.addEventListener('popstate', popstateHandler); */
//         console.log('pushstate')
//         history.pushState(null, '', location.href);
//         window.onpopstate = function () {
//           history.go(1);
//           setPopstate(true);
//           setShowExitWarningModal(true);
//         };
//       } else {
//         window.removeEventListener("beforeunload", beforeUnloadHandler);
//         /* window.removeEventListener('popstate', popstateHandler); */
//       }
//     } else {
//       if (blockedScreen.blockedBack) {
//         const handler = BackHandler.addEventListener('hardwareBackPress', () => {
//           setShowExitWarningModal(true);
//           return true;
//         });

//         return () => {
//           handler.remove();
//         };
//       };
//     };

//     return () => {
//       if (Platform.OS === 'web') {
//         window.removeEventListener("beforeunload", beforeUnloadHandler);
//         window.onpopstate = ()=> {};
//         /* window.removeEventListener('popstate', popstateHandler); */
//       }
//     }
//   }, [blockedScreen, swipeablePanelProps]);

//   const popstateHandler = () => {
//     if (subView === undefined) {
//       setPopstate(true);
//       setShowExitWarningModal(true);

//       // @ts-ignore
//       router.replace({
//         stack: currentScreen.stack,
//         screen: currentScreen.screen,
//         params: undefined,
//       });
//     } else if (!!subView && subView !== 'options' && blockedScreen.blockedBack) {
//       setPopstate(true);
//       setShowExitWarningModal(true);

//       // @ts-ignore
//       router.replace({
//         stack: currentScreen.stack,
//         screen: currentScreen.screen,
//         params: {
//           subView: subView
//         },
//       });
//     };
//   };

//   const screenPopstateGoBack = () => {
//     if (Platform.OS === 'web') {
//       if (prevScreen) {
//         // @ts-ignore
//         router.push({
//           stack: prevScreen.stack,
//           screen: prevScreen.screen,
//           params: undefined,
//         });
//       };
//     }
//   };

//   const subViewPopstateGoBack = () => {
//     if (Platform.OS === 'web') {
//       if (prevScreen) {
//         // @ts-ignore
//         router.replace({
//           stack: currentScreen.stack,
//           screen: currentScreen.screen,
//           params: undefined,
//         });
//       };
//     }
//   };

//   const closeHandler = () => {
//     setShowExitWarningModal(false);
//   };

//   const exitHandler = () => {
//     /* window.onpopstate = ()=> {}; */
//     /* (popstate && prevScreen && Platform.OS === 'web') ? (!!subView && subView !== 'options') ? subViewPopstateGoBack() : screenPopstateGoBack() :  */goBack();
//     closeHandler();
//     if (Platform.OS === 'web') {
//       setBlockedScreen({ blockedExit: false, blockedBack: false })
//     } else {
//       !swipeablePanelProps ? setBlockedScreen({ blockedExit: false, blockedBack: false }) : setBlockedScreen({ ...blockedScreen, blockedBack: false })
//     };
//     setPopstate(false);
//   };

//   return (
//     <Modal
//       visible={showExitWarningModal && !!blockedScreen}
//       onClose={closeHandler}
//       withoutUrl
//     >
//       <View style={styles.Modal}>
//         <View style={styles.CropContainer}>
//           <Typography weight='Bold' variant='h4' textAlign='center'>
//             Uwaga!
//           </Typography>
//           <Typography variant='h5' textAlign='center'>
//             Jeśli opuścisz ten ekran, wszelkie wprowadzone przez Ciebie dane nie zostaną zapisane.
//           </Typography>
//           <Typography variant='h5' color={Colors.Basic700} textAlign='center'>
//             Czy na pewno chcesz opuścić ekran?
//           </Typography>
//         </View>
//         <View style={{ flexDirection: "row", padding: 7.5 }}>
//           <Button
//             fullwidth={false}
//             size='medium'
//             style={{ margin: 7.5, flex: 1 }}
//             borderRadius={4}
//             onPress={() => exitHandler()}
//           >
//             Wyjdź
//           </Button>
//           <Button
//             fullwidth={false}
//             size='medium'
//             style={{ margin: 7.5, flex: 1 }}
//             variant='secondary'
//             borderRadius={4}
//             onPress={() => closeHandler()}
//           >
//             Anuluj
//           </Button>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   Modal: {
//     backgroundColor: Colors.White,
//     borderRadius: 4,
//   },
//   CropContainer: {
//     padding: 15,
//     gap: 10
//   },
// });

// export default ScreenExitLock;