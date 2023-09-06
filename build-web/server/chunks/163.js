exports.id = 163;
exports.ids = [163];
exports.modules = {

/***/ 84399:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83849);
/* harmony import */ var _organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26528);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8750);
/* harmony import */ var _navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1371);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_2__, _navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_4__]);
([_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_2__, _navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const Layout = ({ children })=>{
    const [profileFocused, setProfileFocused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentScreen, setCurrentScreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (()=>{
            const [, routeStack, routeScreen] = router.pathname.split("/");
            let currentScreen = "";
            if (routeStack) {
                const linking = _navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_4__/* .navigationLinking */ .TQ.config?.screens;
                if (linking) {
                    for(const stackName in linking){
                        const currStack = linking[stackName];
                        if (currStack?.path === routeStack) {
                            if (routeScreen) {
                                for(const screenName in currStack.screens){
                                    const currScreen = currStack.screens[screenName];
                                    if (currScreen === routeScreen) {
                                        currentScreen = stackName + "-" + screenName;
                                        break;
                                    }
                                }
                            }
                            if (!currentScreen) {
                                currentScreen = stackName + "-" + "MainScreen";
                            }
                        }
                    }
                }
            }
            setCurrentScreen(currentScreen || "MenuStack-MainScreen");
        })();
    }, [
        router
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                style: {
                    paddingBottom: 45
                },
                children: children
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                style: {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    // height: 50,
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.White
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    profileFocused,
                    setProfileFocused,
                    currentScreen,
                    routes: Object.keys(_navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_4__/* .navigationLinking */ .TQ.config?.screens || {})
                })
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 80761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ atoms_SvgIcon)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(16689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./node_modules/@tamagui/react-native-svg/dist/cjs/index.js
var cjs = __webpack_require__(87837);
;// CONCATENATED MODULE: ./src/assets/icons/AppleLittleIcon.tsx



const AppleLittleIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 28,
        height: 34,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M27.146 26.1a17.713 17.713 0 0 1-1.751 3.15c-.922 1.314-1.676 2.223-2.257 2.728-.901.828-1.867 1.253-2.9 1.277-.742 0-1.637-.212-2.68-.64-1.044-.426-2.005-.637-2.883-.637-.921 0-1.91.21-2.966.637-1.059.428-1.911.652-2.563.674-.991.042-1.98-.394-2.966-1.311-.63-.55-1.417-1.49-2.36-2.824-1.012-1.424-1.844-3.076-2.496-4.958C.626 22.163.276 20.194.276 18.287c0-2.183.472-4.067 1.417-5.645A8.312 8.312 0 0 1 4.661 9.64a7.983 7.983 0 0 1 4.012-1.132c.787 0 1.82.244 3.103.722 1.28.48 2.1.724 2.461.724.27 0 1.182-.284 2.73-.852 1.463-.527 2.698-.745 3.71-.659 2.74.221 4.8 1.302 6.17 3.249-2.452 1.485-3.665 3.566-3.64 6.235.021 2.08.776 3.81 2.258 5.183a7.422 7.422 0 0 0 2.257 1.48 24.39 24.39 0 0 1-.576 1.51ZM20.86 1.36c0 1.63-.595 3.151-1.782 4.56-1.432 1.674-3.164 2.641-5.042 2.488a5.08 5.08 0 0 1-.038-.617c0-1.564.681-3.239 1.89-4.607.604-.693 1.372-1.27 2.303-1.73.93-.452 1.808-.703 2.635-.746.024.218.034.436.034.652Z",
            fill: "#fff"
        })
    });
/* harmony default export */ const icons_AppleLittleIcon = (AppleLittleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowForwardIcon.tsx



const ArrowForwardIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 12.859,
                        cy: 11.999,
                        r: 12,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "m4.86 11.999 1.41 1.41 5.59-5.58v12.17h2V7.829l5.59 5.58 1.41-1.41-8-8-8 8Z",
                        fill: "#fff"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "rotate(-90 12.43 11.57)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_ArrowForwardIcon = (ArrowForwardIcon);

// EXTERNAL MODULE: ./src/colors/Colors.ts
var Colors = __webpack_require__(8750);
;// CONCATENATED MODULE: ./src/assets/icons/ArrowLeftIcon.tsx




const ArrowLeftIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 13,
        height: 21,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "m12.232 2.666-1.77-1.77-9.9 9.9 9.9 9.9 1.77-1.77-8.13-8.13 8.13-8.13Z",
            fill: props.fill ? props.fill : Colors/* default */.Z.Basic900
        })
    });
/* harmony default export */ const icons_ArrowLeftIcon = (ArrowLeftIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowRightIcon.tsx




const ArrowRightIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 12,
        height: 21,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "m.287 2.666 1.77-1.77 9.9 9.9-9.9 9.9-1.77-1.77 8.13-8.13-8.13-8.13Z",
            fill: props.fill ? props.fill : Colors/* default */.Z.Basic900
        })
    });
/* harmony default export */ const icons_ArrowRightIcon = (ArrowRightIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowTopIcon.tsx




const ArrowTopIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 25,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "m8.27 15.41 4.59-4.58 4.59 4.58L18.86 14l-6-6-6 6 1.41 1.41Z",
            fill: props.fill ? props.fill : Colors/* default */.Z.Basic300
        })
    });
/* harmony default export */ const icons_ArrowTopIcon = (ArrowTopIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CalculatorIcon.tsx



const CalculatorIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6.293 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-12Zm1 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-10Z",
                fill: props.fill ? props.fill : "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 2,
                d: "M5.293 10h14"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 7.293,
                y: 12,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 7.293,
                y: 16,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 11.293,
                y: 12,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 11.293,
                y: 16,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 15.293,
                y: 12,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 15.293,
                y: 16,
                width: 2,
                height: 2,
                rx: 1,
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_CalculatorIcon = (CalculatorIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CandidatesIcon.tsx



const CandidatesIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M8.504 21h-1a1 1 0 0 0 1 1v-1Zm14 0v1a1 1 0 0 0 1-1h-1Zm-13 0a6 6 0 0 1 6-6v-2a8 8 0 0 0-8 8h2Zm6-6a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8v2Zm-7 7h14v-2h-14v2ZM18.504 7a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5h-2Zm-3 3a3 3 0 0 1-3-3h-2a5 5 0 0 0 5 5v-2Zm-3-3a3 3 0 0 1 3-3V2a5 5 0 0 0-5 5h2Zm3-3a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5v2Z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M3.215 21h-1a1 1 0 0 0 1 1v-1Zm12.291 1a1 1 0 1 0 0-2v2Zm-4.373-5.832a1 1 0 0 0 .69-1.877l-.69 1.877Zm-6.918 4.833a5.146 5.146 0 0 1 5.146-5.146v-2a7.146 7.146 0 0 0-7.146 7.146h2Zm-1 1h12.291v-2H3.215v2Zm6.146-6.146c.624 0 1.221.11 1.772.313l.69-1.877a7.134 7.134 0 0 0-2.462-.436v2ZM10.248 6.229a1 1 0 1 0 .721-1.866l-.721 1.866Zm2.672 5.096a1 1 0 1 0-1.585-1.22l1.585 1.22Zm-3.036-.299a2.512 2.512 0 0 1-2.993-1.913l-1.953.43a4.512 4.512 0 0 0 5.376 3.436l-.43-1.953ZM6.891 9.113A2.512 2.512 0 0 1 8.805 6.12l-.43-1.954a4.512 4.512 0 0 0-3.437 5.376l1.953-.43ZM8.805 6.12c.502-.11.999-.063 1.443.109l.721-1.866a4.495 4.495 0 0 0-2.594-.197l.43 1.954Zm2.53 3.986c-.348.452-.85.788-1.45.92l.429 1.953a4.498 4.498 0 0 0 2.606-1.654l-1.585-1.22Z"
            })
        ]
    });
/* harmony default export */ const icons_CandidatesIcon = (CandidatesIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CardFilledIcon.tsx



const CardFilledIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2Z"
        })
    });
/* harmony default export */ const icons_CardFilledIcon = (CardFilledIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CardOutlinedIcon.tsx



const CardOutlinedIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 14,
        height: 19,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M1.01 2.605v-.001c0-.554.449-1 .99-1h10c.548 0 1 .452 1 1v14.483l-5.606-2.402L7 14.516l-.394.169-5.605 2.402.009-14.482Z",
            stroke: props.fill ? props.fill : "#000",
            strokeWidth: 2
        })
    });
/* harmony default export */ const icons_CardOutlinedIcon = (CardOutlinedIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CheckIcon.tsx



const CheckIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M9.86 16.2 5.66 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6Z",
            fill: "#000"
        })
    });
/* harmony default export */ const icons_CheckIcon = (CheckIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CloseCircleIcon.tsx



const CloseCircleIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M12.86 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.48-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54L9.37 7l3.54 3.53L16.46 7l1.42 1.41L14.34 12l3.52 3.48Z"
        })
    });
/* harmony default export */ const icons_CloseCircleIcon = (CloseCircleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CloseXIcon.tsx



const CloseXIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4Z",
            fill: "#7A7C99"
        })
    });
/* harmony default export */ const icons_CloseXIcon = (CloseXIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CreateCircleIcon.tsx



const CreateCircleIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 17,
                cy: 17,
                r: 14,
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M16.812 0C7.622.098.137 7.508 0 16.749v.534c.153 9.18 7.566 16.58 16.747 16.716 9.388.14 17.112-7.358 17.251-16.745C34.138 7.865 26.64.14 17.252.003a17.412 17.412 0 0 0-.44-.002Zm-1.426 6.853h3.228c.099 0 .178.079.178.178v8.176h8.177c.099 0 .178.08.178.178v3.228c0 .1-.08.18-.178.18h-8.177v8.176c0 .1-.079.179-.178.179h-3.228a.178.178 0 0 1-.179-.179v-8.175H7.031a.18.18 0 0 1-.179-.18v-3.229c0-.099.08-.178.179-.178h8.176V7.03c0-.099.08-.178.179-.178Z",
                fill: "#03D6B0"
            })
        ]
    });
/* harmony default export */ const icons_CreateCircleIcon = (CreateCircleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CrossBigIcon.tsx




const CrossBigIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 15,
        height: 14,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M14.36 1.4 12.96 0l-5.6 5.6L1.76 0 .36 1.4 5.96 7l-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4L8.76 7l5.6-5.6Z",
            fill: props.fill || Colors/* default */.Z.Basic700
        })
    });
/* harmony default export */ const icons_CrossBigIcon = (CrossBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CrossCircleBigIcon.tsx



const CrossCircleBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m25.86 12.399-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.86 2.999a15 15 0 1 0 0 30 15 15 0 0 0 0-30Z",
                fill: "#ED095B"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m26.358 23.219-2.13 2.13-5.295-5.31-5.31 5.31-2.115-2.115 5.295-5.31-5.295-5.31 2.115-2.115 5.31 5.295 5.325-5.295 2.13 2.115-5.31 5.385 5.28 5.22Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m26.358 23.219-2.13 2.13-5.295-5.31-5.31 5.31-2.115-2.115 5.295-5.31-5.295-5.31 2.115-2.115 5.31 5.295 5.325-5.295 2.13 2.115-5.31 5.385 5.28 5.22Z",
                fill: "#fff"
            })
        ]
    });
/* harmony default export */ const icons_CrossCircleBigIcon = (CrossCircleBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CrossCircleSmallIcon.tsx



const CrossCircleSmallIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m19.86 6.399-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z",
                fill: "#8789A2"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M12.86 1.999a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.48-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54 1.41-1.41 3.54 3.53 3.55-3.53 1.42 1.41-3.54 3.59 3.52 3.48Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_CrossCircleSmallIcon = (CrossCircleSmallIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CrossSmallIcon.tsx



const CrossSmallIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m19.86 6.399-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M12.86 1.999a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m17.86 15.479-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54 1.41-1.41 3.54 3.53 3.55-3.53 1.42 1.41-3.54 3.59 3.52 3.48Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m17.86 15.479-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54 1.41-1.41 3.54 3.53 3.55-3.53 1.42 1.41-3.54 3.59 3.52 3.48Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_CrossSmallIcon = (CrossSmallIcon);

;// CONCATENATED MODULE: ./src/assets/icons/EmailIcon.tsx



const EmailIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m6.86 8.499 4.648 4.261a2 2 0 0 0 2.703 0L18.859 8.5",
                stroke: props.fill,
                strokeWidth: 2,
                strokeLinecap: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 3.859,
                y: 4.999,
                width: 18,
                height: 14,
                rx: 1,
                stroke: props.fill,
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const icons_EmailIcon = (EmailIcon);

;// CONCATENATED MODULE: ./src/assets/icons/EyeOffIcon.tsx



const EyeOffIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M5.566 3.292a1 1 0 1 0-1.414 1.414L6.576 7.13C5.146 8.206 3.9 9.684 2.965 11.552a1 1 0 0 0 0 .894C5.123 16.763 8.956 19 12.859 19c1.556 0 3.1-.355 4.531-1.055l2.762 2.762a1 1 0 1 0 1.415-1.414l-16-16Zm10.307 13.135c-.98.383-2 .572-3.014.572-2.968 0-6.002-1.62-7.87-5 .818-1.479 1.858-2.62 3.019-3.437l2.144 2.144a3 3 0 0 0 4.001 4.001l1.72 1.72ZM19.412 13.895c.483-.556.926-1.187 1.318-1.896-1.869-3.38-4.902-5-7.87-5-.113 0-.225.002-.337.007L10.74 5.222a10.214 10.214 0 0 1 2.12-.223c3.903 0 7.737 2.236 9.895 6.553a1 1 0 0 1 0 .894 13.11 13.11 0 0 1-1.926 2.865l-1.416-1.416Z"
        })
    });
/* harmony default export */ const icons_EyeOffIcon = (EyeOffIcon);

;// CONCATENATED MODULE: ./src/assets/icons/EyeOnIcon.tsx



const EyeOnIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M15.86 11.999a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M22.754 11.552c-2.158-4.317-5.992-6.553-9.895-6.553-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C5.123 16.763 8.956 19 12.859 19c3.903 0 7.737-2.236 9.895-6.553a1 1 0 0 0 0-.894Zm-9.895 5.447c-2.968 0-6.002-1.62-7.87-5 1.868-3.38 4.902-5 7.87-5 2.97 0 6.002 1.62 7.87 5-1.868 3.38-4.9 5-7.87 5Z"
            })
        ]
    });
/* harmony default export */ const icons_EyeOnIcon = (EyeOnIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FacebookIcon.tsx



const FacebookIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M24.271 20.894v-1h-1v1h1Zm2.717 0v1h.797l.178-.776-.975-.224Zm.888-3.873.974.223.28-1.223h-1.254v1Zm-3.605 0h-1v1h1v-1Zm3.82-3.146v1h1v-1h-1Zm0-4.009h1V9.25l-.55-.277-.45.893Zm-5.641-.253-.364-.931.364.93Zm-3.181 7.408v1h1v-1h-1Zm-2.475 0v-1h-1v1h1Zm0 3.873h-1v1h1v-1Zm2.474 0h1v-1h-1v1Zm6.003 11.378V20.894h-2v11.378h2Zm-1-10.378h2.717v-2h-2.717v2Zm3.692-.776.887-3.874-1.95-.446-.887 3.873 1.95.447Zm-.087-5.097H24.27v2h3.605v-2Zm-2.605 1V14.92h-2v2.101h2Zm0-2.101c0-.266.022-.321.014-.299a.506.506 0 0 1-.261.279c-.044.019-.014-.006.236-.017.233-.01.53-.008.974-.008v-2c-.402 0-.772-.003-1.066.01-.276.013-.631.043-.954.186-.405.179-.68.495-.818.894-.112.32-.125.671-.125.955h2Zm.963-.045h1.857v-2h-1.857v2Zm2.857-1V9.866h-2v4.01h2Zm-.55-4.902c-.802-.404-1.974-.635-3.096-.7-1.125-.064-2.384.027-3.36.409l.73 1.862c.594-.232 1.526-.33 2.515-.274.992.058 1.856.26 2.311.49l.9-1.787Zm-6.456-.291c-1.117.437-2.108 1.056-2.803 2.052-.695.996-1.014 2.253-1.014 3.812h2c0-1.292.264-2.107.654-2.667.391-.56.991-.982 1.892-1.335l-.729-1.862Zm-3.817 5.864v2.475h2v-2.475h-2Zm1 1.475h-2.474v2h2.474v-2Zm-3.474 1v3.873h2v-3.873h-2Zm1 4.873h2.474v-2h-2.474v2Zm1.474-1v11.378h2V20.894h-2Z",
                fill: "#474861"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 4.783,
                y: 3.88,
                width: 28.197,
                height: 28.25,
                rx: 3,
                stroke: "#474861",
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const icons_FacebookIcon = (FacebookIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FacebookLittleIcon.tsx



const FacebookLittleIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 36,
        height: 36,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M35.25 18.105C35.25 8.578 27.527.855 18 .855 8.473.855.75 8.578.75 18.105c0 8.61 6.308 15.746 14.555 17.04V23.091h-4.38v-4.986h4.38v-3.8c0-4.324 2.575-6.712 6.515-6.712 1.888 0 3.862.337 3.862.337v4.245h-2.175c-2.143 0-2.812 1.33-2.812 2.694v3.236h4.785l-.765 4.986h-4.02v12.054c8.247-1.294 14.555-8.43 14.555-17.04Z",
            fill: "#fff"
        })
    });
/* harmony default export */ const icons_FacebookLittleIcon = (FacebookLittleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FileDocumentIcon.tsx



const FileDocumentIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M6.918 21v-1 1Zm12.706 0v1-1Zm1.059-1h-1 1Zm0-11.208h1-1Zm-.282-.68-.714.7.714-.7Zm-4.698-4.791.714-.7-.714.7ZM14.926 3V2v1ZM6.918 3v1-1ZM5.86 4h1-1Zm0 16h-1 1Zm1.06 2h12.705v-2H6.918v2Zm14.764-2V8.792h-2V20h2Zm-.568-12.588-4.698-4.791-1.428 1.4 4.698 4.792 1.428-1.4ZM14.926 2H6.918v2h8.008V2ZM4.86 4v16h2V4h-2Zm2.06-2c-1.083 0-2.06.842-2.06 2h2a.05.05 0 0 1-.004.02c-.002.004-.003.003.001 0 .008-.007.027-.02.062-.02V2Zm9.498.62a2.089 2.089 0 0 0-1.49-.62v2c.016 0 .03.003.042.008a.06.06 0 0 1 .02.013l1.428-1.4Zm5.266 6.172a1.97 1.97 0 0 0-.568-1.38l-1.428 1.4c.002.003.001.002 0-.002a.048.048 0 0 1-.004-.018h2ZM19.624 22c1.082 0 2.059-.842 2.059-2h-2c0-.007.002-.014.004-.02.002-.004.003-.003 0 0-.009.007-.028.02-.063.02v2ZM6.918 20c-.035 0-.054-.013-.062-.02-.004-.003-.003-.004 0 0a.051.051 0 0 1 .003.02h-2c0 1.158.977 2 2.06 2v-2ZM10.078 16a1 1 0 0 0 0 2v-2Zm6.353 2a1 1 0 1 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2ZM10.078 12.998a1 1 0 0 0 0 2v-2Zm6.353 2a1 1 0 0 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2Z",
                fill: props.fill ? props.fill : "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M20.68 10a1 1 0 1 0 0-2v2Zm-5.295-1v1-1Zm-1.059-1h-1 1Zm1-5a1 1 0 1 0-2 0h2Zm5.353 5h-5.294v2h5.294V8Zm-5.353 0V3h-2v5h2Zm.059 0c-.035 0-.054-.013-.062-.02-.004-.003-.003-.004-.001 0a.051.051 0 0 1 .004.02h-2c0 1.158.977 2 2.059 2V8Z",
                fill: props.fill ? props.fill : "#080914"
            })
        ]
    });
/* harmony default export */ const icons_FileDocumentIcon = (FileDocumentIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FilterListIcon.tsx



const FilterListIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M10.86 17.999h4v-2h-4v2Zm-7-12v2h18v-2h-18Zm3 7h12v-2h-12v2Z"
        })
    });
/* harmony default export */ const icons_FilterListIcon = (FilterListIcon);

;// CONCATENATED MODULE: ./src/assets/icons/GoogleLittleIcon.tsx



const GoogleLittleIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 32,
        height: 32,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M30.72 16.349c0-1.088-.098-2.133-.28-3.137H16v5.931h8.252c-.356 1.917-1.436 3.541-3.06 4.628v3.848h4.956c2.899-2.67 4.572-6.6 4.572-11.27Z",
                fill: "#4285F4"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M15.999 31.333c4.14 0 7.61-1.373 10.148-3.715l-4.956-3.847c-1.373.92-3.129 1.464-5.192 1.464-3.994 0-7.374-2.697-8.58-6.322H2.297v3.973c2.523 5.011 7.708 8.447 13.702 8.447Z",
                fill: "#34A853"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7.42 18.913A9.217 9.217 0 0 1 6.94 16c0-1.01.173-1.993.48-2.913V9.114H2.297A15.327 15.327 0 0 0 .667 16c0 2.474.592 4.816 1.63 6.886l5.123-3.973Z",
                fill: "#FBBC05"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M15.999 6.765c2.251 0 4.272.774 5.861 2.293l4.398-4.398C23.603 2.186 20.132.667 16 .667c-5.994 0-11.18 3.436-13.702 8.447l5.122 3.973C8.625 9.462 12.005 6.765 16 6.765Z",
                fill: "#EA4335"
            })
        ]
    });
/* harmony default export */ const icons_GoogleLittleIcon = (GoogleLittleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HeartIcon.tsx



const HeartIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M12.86 4.527a6 6 0 0 0-8.243 8.715l6.828 6.828a2 2 0 0 0 2.829 0l6.828-6.828a6 6 0 0 0-8.243-8.715ZM11.687 6.17l.464.464a1 1 0 0 0 1.415 0l.464-.464a4 4 0 0 1 5.657 5.657l-6.829 6.828-6.828-6.828a4 4 0 0 1 5.657-5.657Z"
        })
    });
/* harmony default export */ const icons_HeartIcon = (HeartIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HomeIcon.tsx



const HomeIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 20,
        height: 21,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M6.443 19.75H2.359a1 1 0 0 1-1-1V8.263a1 1 0 0 1 .376-.78l7.79-6.23a1 1 0 0 1 1.254.005l7.671 6.224a1 1 0 0 1 .37.777V18.75a1 1 0 0 1-1 1h-4.142a1 1 0 0 1-1-1.006l.04-6.358a1 1 0 0 0-1-1.007H8.443a1 1 0 0 0-1 1v6.371a1 1 0 0 1-1 1Z",
            strokeWidth: 2,
            stroke: props.fill
        })
    });
/* harmony default export */ const icons_HomeIcon = (HomeIcon);

;// CONCATENATED MODULE: ./src/assets/icons/InstagramIcon.tsx



const InstagramIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 4.859,
                y: 3.88,
                width: 28,
                height: 28.12,
                rx: 3,
                stroke: "#474861",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 18.86,
                cy: 18,
                r: 6.404,
                stroke: "#474861",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 26.786,
                cy: 10.595,
                r: 1.877,
                fill: "#474861"
            })
        ]
    });
/* harmony default export */ const icons_InstagramIcon = (InstagramIcon);

;// CONCATENATED MODULE: ./src/assets/icons/InternetIcon.tsx



const InternetIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.903 31.9c7.953 0 14.4-6.447 14.4-14.4s-6.447-14.4-14.4-14.4-14.4 6.447-14.4 14.4 6.447 14.4 14.4 14.4Z",
                stroke: "#474861",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.904 31.9c3.977 0 7.2-6.447 7.2-14.4s-3.223-14.4-7.2-14.4c-3.976 0-7.2 6.447-7.2 14.4s3.224 14.4 7.2 14.4Z",
                stroke: "#474861",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M7.724 26.762c2.64-1.625 6.668-2.663 11.18-2.663 4.451 0 8.43 1.01 11.071 2.595M30.084 8.237C27.443 9.862 23.415 10.9 18.903 10.9c-4.45 0-8.43-1.009-11.071-2.594M4.503 17.5h28.8M18.902 3.1v28.8",
                stroke: "#474861",
                strokeWidth: 2,
                strokeMiterlimit: 10
            })
        ]
    });
/* harmony default export */ const icons_InternetIcon = (InternetIcon);

;// CONCATENATED MODULE: ./src/assets/icons/LikeIcon.tsx



const LikeIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M21.86 8.999c1.1 0 2 .9 2 2l-.01.08.01.01v1.91c0 .26-.05.5-.14.73l-3.02 7.05c-.3.72-1.01 1.22-1.84 1.22h-9c-1.1 0-2-.9-2-2v-10c0-.55.22-1.05.59-1.41l6.58-6.59 1.06 1.05c.27.27.44.65.44 1.06l-.03.32-.95 4.57h6.31Zm-16 13h-4v-12h4v12Z"
        })
    });
/* harmony default export */ const icons_LikeIcon = (LikeIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ListIcon.tsx



const ListIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M15.293 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm0-4h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Zm2-6h-1.18a3 3 0 0 0-2.82-2h-2a3 3 0 0 0-2.82 2h-1.18a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-7 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V5Zm8 14a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6h1a1 1 0 0 1 1 1v12Z",
            fill: props.fill ? props.fill : "#080914"
        })
    });
/* harmony default export */ const icons_ListIcon = (ListIcon);

;// CONCATENATED MODULE: ./src/assets/icons/LogoIcon.tsx



const LogoIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 45,
        height: 29,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M3.899 16.344V2.03H14.9v2.577H6.864v3.271h4.744v2.495H6.864v3.394h8.118v2.577H3.899ZM17.078 16.344V2.03h2.966v11.697h7.831v2.617H17.078ZM29.919 16.344V2.03H40.98v2.577h-8.097V7.98h4.822v2.494h-4.822v5.869h-2.965ZM3.702 27.611v-5.55h2.403c.364 0 .681.06.951.182.27.122.478.294.626.516.148.216.222.473.222.769 0 .27-.068.507-.206.713-.137.207-.33.37-.578.492.311.111.555.28.729.507.18.222.27.484.27.785 0 .323-.08.603-.238.84-.159.239-.38.424-.666.556-.286.127-.621.19-1.007.19H3.702Zm.833-3.195h1.522c.312 0 .56-.074.745-.222a.73.73 0 0 0 .278-.603.73.73 0 0 0-.278-.602c-.185-.148-.433-.222-.745-.222H4.535v1.649Zm0 2.49h1.61c.348 0 .623-.082.824-.246a.806.806 0 0 0 .31-.666.798.798 0 0 0-.31-.659c-.201-.169-.476-.253-.825-.253h-1.61v1.823ZM11.281 27.698c-.48 0-.898-.1-1.252-.3a2.039 2.039 0 0 1-.817-.85c-.19-.37-.285-.805-.285-1.308v-3.18h.832v3.18c0 .344.06.643.182.896.127.254.304.45.532.587.232.137.502.206.808.206.318 0 .59-.069.817-.206.227-.137.402-.333.523-.587.127-.253.19-.552.19-.896v-3.18h.833v3.18c0 .503-.098.939-.293 1.309-.19.364-.463.647-.817.848-.354.2-.772.301-1.253.301ZM16.553 27.69c-.444 0-.872-.087-1.284-.261a3.417 3.417 0 0 1-1.094-.738l.507-.586c.301.296.608.515.92.658.317.142.647.214.99.214.27 0 .506-.037.707-.111.206-.08.364-.19.475-.333a.767.767 0 0 0 .167-.484c0-.248-.087-.439-.262-.57-.174-.133-.462-.233-.864-.302l-.928-.15c-.507-.09-.888-.254-1.142-.492-.248-.238-.372-.555-.372-.952a1.4 1.4 0 0 1 .254-.832c.169-.243.407-.431.713-.563a2.744 2.744 0 0 1 1.079-.198c.401 0 .795.066 1.18.198.392.127.744.312 1.055.555l-.46.634c-.597-.454-1.202-.682-1.815-.682-.243 0-.455.035-.635.103a.956.956 0 0 0-.42.294.651.651 0 0 0-.15.428c0 .227.076.402.23.523.153.116.407.201.76.254l.897.15c.587.096 1.017.267 1.292.516.275.248.412.59.412 1.023 0 .338-.092.637-.277.896a1.824 1.824 0 0 1-.777.594 2.918 2.918 0 0 1-1.158.214ZM19.537 27.611v-5.55h.832v5.55h-.832ZM21.503 27.611v-5.55h.81l3.1 4.123V22.06h.784v5.55h-.729l-3.172-4.25v4.25h-.793ZM27.334 27.611v-5.55h4.091v.73h-3.258v1.664h2.14v.706h-2.14v1.72h3.29v.73h-4.123ZM34.192 27.69c-.444 0-.872-.087-1.285-.261a3.417 3.417 0 0 1-1.094-.738l.508-.586c.301.296.608.515.92.658.317.142.647.214.99.214.27 0 .505-.037.706-.111.207-.08.365-.19.476-.333a.767.767 0 0 0 .167-.484c0-.248-.088-.439-.262-.57-.174-.133-.463-.233-.864-.302l-.928-.15c-.508-.09-.888-.254-1.142-.492-.248-.238-.372-.555-.372-.952a1.4 1.4 0 0 1 .253-.832c.17-.243.407-.431.714-.563a2.743 2.743 0 0 1 1.078-.198c.402 0 .796.066 1.182.198.39.127.742.312 1.054.555l-.46.634c-.597-.454-1.202-.682-1.815-.682-.244 0-.455.035-.635.103a.957.957 0 0 0-.42.294.652.652 0 0 0-.15.428c0 .227.076.402.23.523.153.116.406.201.76.254l.897.15c.586.096 1.017.267 1.292.516.275.248.412.59.412 1.023 0 .338-.092.637-.277.896a1.824 1.824 0 0 1-.777.594 2.919 2.919 0 0 1-1.158.214ZM39.132 27.69c-.444 0-.872-.087-1.284-.261a3.418 3.418 0 0 1-1.095-.738l.508-.586c.301.296.608.515.92.658.317.142.647.214.99.214.27 0 .506-.037.706-.111.207-.08.365-.19.476-.333a.767.767 0 0 0 .167-.484c0-.248-.088-.439-.262-.57-.174-.133-.463-.233-.864-.302l-.928-.15c-.507-.09-.888-.254-1.142-.492-.248-.238-.372-.555-.372-.952a1.4 1.4 0 0 1 .253-.832c.17-.243.407-.431.714-.563a2.743 2.743 0 0 1 1.078-.198c.402 0 .796.066 1.182.198.39.127.742.312 1.054.555l-.46.634c-.597-.454-1.202-.682-1.815-.682-.243 0-.455.035-.635.103a.957.957 0 0 0-.42.294.652.652 0 0 0-.15.428c0 .227.076.402.23.523.153.116.406.201.76.254l.897.15c.586.096 1.017.267 1.292.516.275.248.412.59.412 1.023 0 .338-.092.637-.277.896a1.823 1.823 0 0 1-.777.594 2.918 2.918 0 0 1-1.158.214Z",
            fill: "#080914"
        })
    });
/* harmony default export */ const icons_LogoIcon = (LogoIcon);

;// CONCATENATED MODULE: ./src/assets/icons/MessengerBigIcon.tsx



const MessengerBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 61,
        height: 60,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M30.86-.001c16.901 0 30 12.381 30 29.101s-13.099 29.101-30 29.101a32.677 32.677 0 0 1-8.686-1.152 2.4 2.4 0 0 0-1.602.117l-5.952 2.628a2.4 2.4 0 0 1-3.369-2.12l-.165-5.341a2.391 2.391 0 0 0-.804-1.71C4.444 45.406.86 37.85.86 29.1.86 12.38 13.96 0 30.86 0ZM12.843 37.611l8.811-13.98a4.499 4.499 0 0 1 6.51-1.2l7.008 5.25a1.8 1.8 0 0 0 2.17 0l9.464-7.188c1.263-.957 2.913.555 2.067 1.899l-8.81 13.98a4.5 4.5 0 0 1-6.51 1.2l-7.009-5.25a1.8 1.8 0 0 0-2.169 0l-9.465 7.185c-1.263.958-2.913-.555-2.067-1.899v.003Z",
                fill: "url(#a)"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m21.655 23.63-8.81 13.981v-.003c-.847 1.344.803 2.857 2.066 1.9l9.465-7.186a1.8 1.8 0 0 1 2.17 0l7.007 5.25a4.501 4.501 0 0 0 6.51-1.2l8.811-13.98c.846-1.344-.804-2.856-2.067-1.9l-9.465 7.189a1.8 1.8 0 0 1-2.169 0l-7.008-5.25a4.5 4.5 0 0 0-6.51 1.2Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.LinearGradient, {
                    id: "a",
                    x1: 81.539,
                    y1: -50.944,
                    x2: 12.951,
                    y2: 60.046,
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 0.461,
                            stopColor: "#FF6F65"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 0.555,
                            stopColor: "#F04D94"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 0.732,
                            stopColor: "#9937FF"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 1,
                            stopColor: "#178AFF"
                        })
                    ]
                })
            })
        ]
    });
/* harmony default export */ const icons_MessengerBigIcon = (MessengerBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/MessengerIcon.tsx



const MessengerIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "m6.773 19.353.949.316a1 1 0 0 0-.313-1.088l-.636.772Zm-1.056 3.171-.949-.316a1 1 0 0 0 1.39 1.214l-.441-.898Zm3.49-1.712.377-.927a1 1 0 0 0-.817.03l.44.897Zm-2.37-6.9a1 1 0 1 0 1.236 1.572l-1.236-1.572Zm4.594-2.34.555-.832-.603-.402-.57.448.618.786Zm2.857 1.905-.554.832.627.418.574-.488-.647-.762Zm4.104-2.17A1 1 0 1 0 17.1 9.78l1.293 1.525Zm-5.532-8.83c-5.656 0-10.524 4.514-10.524 10.047h2c0-4.328 3.87-8.047 8.524-8.047v-2ZM2.336 12.524c0 3.062 1.637 5.815 3.8 7.6l1.273-1.543c-1.805-1.489-3.073-3.712-3.073-6.057h-2Zm3.488 6.513-1.056 3.171 1.898.632 1.056-3.171-1.898-.632Zm.333 4.385 3.491-1.712-.88-1.796-3.492 1.712.881 1.796Zm2.674-1.684c1.214.494 2.576.834 4.029.834v-2c-1.14 0-2.245-.267-3.276-.686l-.753 1.852Zm4.029.834c5.656 0 10.524-4.515 10.524-10.048h-2c0 4.328-3.87 8.048-8.524 8.048v2Zm10.524-10.048c0-5.533-4.868-10.047-10.524-10.047v2c4.654 0 8.524 3.719 8.524 8.047h2Zm-15.311 2.96 3.976-3.126-1.236-1.572-3.976 3.126 1.236 1.572Zm2.803-3.08 2.858 1.905 1.109-1.664-2.857-1.905-1.11 1.664Zm4.06 1.835 3.456-2.933L17.1 9.781l-3.458 2.933 1.294 1.525Z"
        })
    });
/* harmony default export */ const icons_MessengerIcon = (MessengerIcon);

;// CONCATENATED MODULE: ./src/assets/icons/Metting1Icon.tsx



const Metting1Icon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                id: "a",
                fill: "#fff",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M6.86 4.999a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14h-13v-14Z"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M6.86 4.999a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14h-13v-14Z",
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 4,
                mask: "url(#a)"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 9.859,
                y: 6.999,
                width: 3,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 13.859,
                y: 6.999,
                width: 3,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 9.859,
                y: 9.999,
                width: 3,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 11.859,
                y: 12.999,
                width: 3,
                height: 5,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 13.859,
                y: 9.999,
                width: 3,
                height: 2,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 2,
                strokeLinecap: "round",
                d: "M4.859 17.999h17M6.859 4.999h13"
            })
        ]
    });
/* harmony default export */ const icons_Metting1Icon = (Metting1Icon);

;// CONCATENATED MODULE: ./src/assets/icons/Metting2Icon.tsx



const Metting2Icon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 12.859,
                        cy: 11.999,
                        r: 12,
                        fill: "#D2D7E2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                        id: "b",
                        fill: "#fff",
                        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                            d: "M6.66 5.999a1 1 0 0 1 1-1h10.133a1 1 0 0 1 1 1v13H6.659v-13Z"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M6.66 5.999a1 1 0 0 1 1-1h10.133a1 1 0 0 1 1 1v13H6.659v-13Z",
                        stroke: "#000",
                        strokeWidth: 4,
                        mask: "url(#b)"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 9.459,
                        y: 7.799,
                        width: 2.8,
                        height: 1.867,
                        rx: 0.933,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 13.193,
                        y: 7.799,
                        width: 2.8,
                        height: 1.867,
                        rx: 0.933,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 9.459,
                        y: 10.599,
                        width: 2.8,
                        height: 1.867,
                        rx: 0.933,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 11.326,
                        y: 13.399,
                        width: 2.8,
                        height: 4.667,
                        rx: 1,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 13.193,
                        y: 10.599,
                        width: 2.8,
                        height: 1.867,
                        rx: 0.933,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        stroke: "#000",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        d: "M4.859 17.999h15.734M6.726 5.866h12"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.86 -.001)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_Metting2Icon = (Metting2Icon);

;// CONCATENATED MODULE: ./src/assets/icons/MoreVertIcon.tsx



const MoreVertIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M12.86 7.999c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z",
            fill: "#080914",
            stroke: "#D2D7E2"
        })
    });
/* harmony default export */ const icons_MoreVertIcon = (MoreVertIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PacketsIcon.tsx



const PacketsIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M5.623 9.342a2 2 0 0 1 1.973-1.671h10.31a2 2 0 0 1 1.968 1.64l1.804 9.875a2 2 0 0 1-1.968 2.359H5.951a2 2 0 0 1-1.973-2.329l1.645-9.874Z",
                strokeWidth: 2,
                stroke: props.fill
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M16.649 10.631V5.394a2 2 0 0 0-2-2h-3.583a2 2 0 0 0-2 2v5.237",
                strokeWidth: 2,
                strokeLinecap: "round",
                stroke: props.fill
            })
        ]
    });
/* harmony default export */ const icons_PacketsIcon = (PacketsIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PaymentIcon.tsx



const PaymentIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M7.86 14.999h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm12-10h-14a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-6h16v6Zm0-8h-16v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
        })
    });
/* harmony default export */ const icons_PaymentIcon = (PaymentIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PencilIcon.tsx



const PencilIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M21.57 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75 1.84-1.83ZM3.86 17.25V21h3.75L18.67 9.93l-3.75-3.75L3.86 17.25Z",
            fill: "#9FA1AE"
        })
    });
/* harmony default export */ const icons_PencilIcon = (PencilIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PhoneCall1Icon.tsx



const PhoneCall1Icon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 18,
        height: 18,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M10.91 4.064a3.83 3.83 0 0 1 3.026 3.026M10.91 1A6.894 6.894 0 0 1 17 7.082m-.766 6.112v2.298a1.53 1.53 0 0 1-1.67 1.532 15.158 15.158 0 0 1-6.61-2.351 14.936 14.936 0 0 1-4.596-4.596 15.159 15.159 0 0 1-2.352-6.641 1.532 1.532 0 0 1 1.525-1.67h2.297A1.532 1.532 0 0 1 6.36 3.083c.097.736.277 1.458.537 2.153a1.532 1.532 0 0 1-.345 1.616l-.973.973a12.255 12.255 0 0 0 4.596 4.596l.973-.973a1.532 1.532 0 0 1 1.616-.345c.695.26 1.417.44 2.152.537a1.532 1.532 0 0 1 1.318 1.554Z",
            stroke: props.fill ? props.fill : "#080914",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })
    });
/* harmony default export */ const icons_PhoneCall1Icon = (PhoneCall1Icon);

;// CONCATENATED MODULE: ./src/assets/icons/PhoneCall2Icon.tsx



const PhoneCall2Icon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 12.859,
                        cy: 11.999,
                        r: 12,
                        fill: "#D2D7E2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M14.038 7.993a2.98 2.98 0 0 1 1.563.884c.427.453.717 1.031.832 1.66m-2.395-5.121c1.23.145 2.378.73 3.254 1.66a5.95 5.95 0 0 1 1.567 3.455m-.606 5.142v1.933c0 .18-.034.357-.102.521a1.29 1.29 0 0 1-.291.434 1.2 1.2 0 0 1-.432.27c-.16.058-.33.08-.497.063a11.556 11.556 0 0 1-5.234-1.978 12.221 12.221 0 0 1-3.638-3.865 13.274 13.274 0 0 1-1.862-5.587 1.364 1.364 0 0 1 .059-.527c.054-.17.14-.325.253-.457.114-.132.252-.238.406-.31.154-.073.32-.11.489-.11h1.82c.294-.003.579.107.802.311.223.204.369.487.41.797a8.7 8.7 0 0 0 .425 1.81c.081.231.099.482.05.723-.048.24-.16.462-.323.637l-.77.818a10.027 10.027 0 0 0 3.638 3.866l.77-.818c.165-.173.373-.293.6-.344.227-.051.463-.033.68.054.55.218 1.121.37 1.704.45.294.045.563.203.755.444.193.241.295.549.288.865Z",
                        stroke: "#080914",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.86 -.001)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_PhoneCall2Icon = (PhoneCall2Icon);

;// CONCATENATED MODULE: ./src/assets/icons/PhotoIcon.tsx



const PhotoIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 3.573,
                y: 6.339,
                width: 18.571,
                height: 13.429,
                rx: 1,
                stroke: props.fill,
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M9.252 4.98a1 1 0 0 1 .968-.748h5.131a1 1 0 0 1 .95.69l.324.988H9.01l.241-.93Z",
                stroke: props.fill,
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 12.86,
                cy: 13.024,
                r: 3.857,
                stroke: props.fill,
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const icons_PhotoIcon = (PhotoIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PinIcon.tsx



const PinIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                clipPath: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "m14.969 3.8-4.685 4.524c-.66-.077-1.298-.078-1.963.099-.74.196-1.425.588-2.17 1.175-.712.562-.732 1.587-.14 2.199l3.104 3.215-5.035 4.863-.385 1.761 1.774-.322 5.035-4.863 3.106 3.215c.591.613 1.616.628 2.202-.064.613-.724 1.029-1.395 1.25-2.128.2-.657.221-1.295.168-1.957l4.685-4.524.348.36a1 1 0 1 0 1.438-1.39L16.06 2.05a1 1 0 0 0-1.439 1.39l.348.36Zm.701 10.443 4.856-4.69-4.168-4.315-4.856 4.689c-.343.332-.812.47-1.26.407-.615-.085-1.028-.08-1.408.022-.28.074-.59.212-.98.472l6.788 7.029c.274-.38.423-.685.507-.962.114-.377.134-.789.07-1.407-.046-.45.108-.913.451-1.245Z"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.86 -.001)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_PinIcon = (PinIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PrivacyIcon.tsx



const PrivacyIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M12.36 12.625a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Zm-2.126.875a2.125 2.125 0 1 1 4.25 0 2.125 2.125 0 0 1-4.25 0Z",
                strokeWidth: 0.25
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m10.12 17.208-.06.167H14.659l-.059-.167a2.376 2.376 0 0 0-4.48 0ZM8.734 18a3.625 3.625 0 1 1 7.25 0c0 .345-.28.625-.625.625h-6A.625.625 0 0 1 8.734 18Z",
                strokeWidth: 0.25
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Mask, {
                id: "a",
                //   maskUnits="userSpaceOnUse"
                x: 4.109,
                y: 7.25,
                width: 16,
                height: 15,
                fill: "#000",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M4.109 7.25h16v15h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M5.11 10.5a2.25 2.25 0 0 1 2.25-2.25h10a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-10a2.25 2.25 0 0 1-2.25-2.25v-9Zm13 0v9a.75.75 0 0 1-.75.75h-10a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75Z"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M5.11 10.5a2.25 2.25 0 0 1 2.25-2.25h10a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-10a2.25 2.25 0 0 1-2.25-2.25v-9Zm13 0v9a.75.75 0 0 1-.75.75h-10a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75Z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M5.36 10.5a2 2 0 0 1 2-2V8a2.5 2.5 0 0 0-2.5 2.5h.5Zm2-2h10V8h-10v.5Zm10 0a2 2 0 0 1 2 2h.5a2.5 2.5 0 0 0-2.5-2.5v.5Zm2 2V12h.5v-1.5h-.5Zm-1 1.5v-1.5h-.5V12h.5Zm0-1.5a1 1 0 0 0-1-1v.5a.5.5 0 0 1 .5.5h.5Zm-1-1h-10v.5h10v-.5Zm-10 0a1 1 0 0 0-1 1h.5a.5.5 0 0 1 .5-.5v-.5Zm-1 1v9h.5v-9h-.5Zm0 9a1 1 0 0 0 1 1V20a.5.5 0 0 1-.5-.5h-.5Zm1 1h10V20h-10v.5Zm10 0a1 1 0 0 0 1-1h-.5a.5.5 0 0 1-.5.5v.5Zm1-1V16h-.5v3.5h.5Zm1-3.5v3.5h.5V16h-.5Zm0 3.5a2 2 0 0 1-2 2v.5a2.5 2.5 0 0 0 2.5-2.5h-.5Zm-2 2h-10v.5h10v-.5Zm-10 0a2 2 0 0 1-2-2h-.5a2.5 2.5 0 0 0 2.5 2.5v-.5Zm-2-2v-9h-.5v9h.5Zm13-3.5v-4h-.5v4h.5Zm1-4v4h.5v-4h-.5Z",
                mask: "url(#a)"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M11.86 2.125A4.375 4.375 0 0 0 7.483 6.5V9a.875.875 0 1 0 1.75 0V6.5a2.625 2.625 0 0 1 2.625-2.625h1A2.625 2.625 0 0 1 15.484 6.5V9a.875.875 0 1 0 1.75 0V6.5a4.375 4.375 0 0 0-4.375-4.375h-1Z",
                strokeWidth: 0.25
            })
        ]
    });
/* harmony default export */ const icons_PrivacyIcon = (PrivacyIcon);

;// CONCATENATED MODULE: ./src/assets/icons/SearchIcon.tsx



const SearchIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M18.297 10.503a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.242 6.917a9 9 0 1 1 1.386-1.443l3.962 3.962a1 1 0 0 1-1.414 1.415l-3.934-3.934Z"
        })
    });
/* harmony default export */ const icons_SearchIcon = (SearchIcon);

;// CONCATENATED MODULE: ./src/assets/icons/SettingsIcon.tsx



const SettingsIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                clipRule: "evenodd",
                d: "m21.112 8.114-.595-.984c-.503-.833-1.619-1.12-2.493-.642v0c-.416.234-.913.3-1.381.184a1.813 1.813 0 0 1-1.113-.801 1.61 1.61 0 0 1-.244-.834v0a1.7 1.7 0 0 0-.517-1.265 1.874 1.874 0 0 0-1.312-.528H12.26c-.485 0-.949.184-1.29.511-.342.327-.532.77-.53 1.232v0c-.014.953-.829 1.718-1.828 1.718a1.815 1.815 0 0 1-.875-.234v0c-.875-.478-1.99-.19-2.494.642l-.638 1.001c-.503.832-.206 1.894.665 2.377v0c.565.31.914.886.914 1.509a1.73 1.73 0 0 1-.914 1.51v0c-.87.478-1.167 1.538-.665 2.367v0l.603.993c.236.405.632.704 1.1.831.468.127.97.07 1.394-.156v0a1.889 1.889 0 0 1 1.38-.177c.467.12.864.411 1.104.81.157.253.242.541.245.835v0c0 .962.819 1.742 1.829 1.742h1.198c1.007 0 1.824-.775 1.829-1.734v0c-.003-.463.19-.907.533-1.235.343-.327.81-.51 1.295-.508.307.008.608.088.875.234v0c.872.479 1.987.195 2.493-.634v0l.63-1c.244-.4.31-.875.186-1.32a1.748 1.748 0 0 0-.85-1.057v0c-.42-.23-.727-.61-.852-1.057a1.664 1.664 0 0 1 .186-1.32c.159-.264.388-.482.665-.633v0c.865-.483 1.162-1.539.665-2.369v0-.008Z",
                stroke: props.fill,
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                clipRule: "evenodd",
                d: "M12.863 14.402c1.392 0 2.52-1.075 2.52-2.402 0-1.326-1.128-2.401-2.52-2.401-1.391 0-2.52 1.075-2.52 2.401 0 1.326 1.129 2.402 2.52 2.402Z",
                stroke: props.fill,
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        ]
    });
/* harmony default export */ const icons_SettingsIcon = (SettingsIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ShareIcon.tsx



const ShareIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M19.455 15.264a3.37 3.37 0 0 0-3.035 1.923l-6.004-4.294c.084-.299.151-.614.151-.945 0-.332-.067-.647-.15-.945l6.003-4.295a3.37 3.37 0 0 0 3.035 1.924c1.845 0 3.354-1.493 3.354-3.317S21.3 2 19.455 2c-1.693 0-3.085 1.244-3.303 2.852l-6.59 4.726a3.432 3.432 0 0 0-2.349-.945c-1.844 0-3.354 1.492-3.354 3.316 0 1.824 1.51 3.316 3.354 3.316.906 0 1.728-.365 2.348-.945l6.59 4.725c.219 1.609 1.61 2.852 3.304 2.852 1.845 0 3.354-1.492 3.354-3.316 0-1.824-1.509-3.316-3.354-3.316Zm0-11.607c.923 0 1.677.746 1.677 1.658 0 .912-.754 1.658-1.677 1.658a1.673 1.673 0 0 1-1.677-1.658c0-.912.755-1.658 1.677-1.658ZM7.213 13.606a1.673 1.673 0 0 1-1.677-1.658c0-.912.755-1.658 1.677-1.658.923 0 1.677.746 1.677 1.658 0 .912-.754 1.658-1.677 1.658Zm12.242 6.632a1.673 1.673 0 0 1-1.677-1.658c0-.912.755-1.658 1.677-1.658.923 0 1.677.746 1.677 1.658 0 .912-.754 1.658-1.677 1.658Z"
        })
    });
/* harmony default export */ const icons_ShareIcon = (ShareIcon);

;// CONCATENATED MODULE: ./src/assets/icons/StarFillIcon.tsx



const StarFillIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M11.71 4.131c.436-1.003 1.86-1.003 2.295 0l1.98 4.566 4.954.472c1.088.103 1.528 1.457.708 2.181l-3.73 3.294 1.082 4.857c.238 1.068-.914 1.904-1.856 1.348l-4.285-2.529-4.285 2.53c-.942.556-2.094-.28-1.856-1.348l1.082-4.857-3.73-3.294c-.82-.724-.38-2.078.709-2.18l4.953-.473 1.98-4.567Zm1.148 2.383-1.527 3.52-.234.542-.588.056-3.82.364 2.876 2.54.443.39-.128.576-.835 3.746 3.305-1.95.508-.3.508.3 3.305 1.95-.835-3.746-.128-.576.443-.39 2.876-2.54-3.82-.364-.588-.056-.234-.542-1.527-3.52Z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m12.858 6.514-1.527 3.52-.234.542-.588.056-3.82.364 2.876 2.54.443.39-.128.576-.835 3.746 3.305-1.95.508-.3.508.3 3.305 1.95-.835-3.746-.128-.576.443-.39 2.876-2.54-3.82-.364-.588-.056-.234-.542-1.527-3.52Z"
            })
        ]
    });
/* harmony default export */ const icons_StarFillIcon = (StarFillIcon);

;// CONCATENATED MODULE: ./src/assets/icons/StarHalfIcon.tsx



const StarHalfIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M11.71 4.131c.436-1.003 1.86-1.003 2.295 0l1.98 4.566 4.954.472c1.088.103 1.528 1.457.708 2.181l-3.73 3.294 1.082 4.857c.238 1.068-.914 1.904-1.856 1.348l-4.285-2.529-4.285 2.53c-.942.556-2.094-.28-1.856-1.348l1.082-4.857-3.73-3.294c-.82-.724-.38-2.078.709-2.18l4.953-.473 1.98-4.567Zm1.148 2.383-1.527 3.52-.234.542-.588.056-3.82.364 2.876 2.54.443.39-.128.576-.835 3.746 3.305-1.95.508-.3.508.3 3.305 1.95-.835-3.746-.128-.576.443-.39 2.876-2.54-3.82-.364-.588-.056-.234-.542-1.527-3.52Z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m12.858 6.514-1.527 3.52-.234.542-.588.056-3.82.364 2.876 2.54.443.39-.128.576-.835 3.746 3.305-1.95.508-.3V6.513Z"
            })
        ]
    });
/* harmony default export */ const icons_StarHalfIcon = (StarHalfIcon);

;// CONCATENATED MODULE: ./src/assets/icons/StarOutlineIcon.tsx



const StarOutlineIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M11.71 4.131c.436-1.003 1.86-1.003 2.295 0l1.98 4.566 4.954.472c1.088.103 1.528 1.457.708 2.181l-3.73 3.294 1.082 4.857c.238 1.068-.914 1.904-1.856 1.348l-4.285-2.529-4.285 2.53c-.942.556-2.094-.28-1.856-1.348l1.082-4.857-3.73-3.294c-.82-.724-.38-2.078.709-2.18l4.953-.473 1.98-4.566Zm1.148 2.383-1.527 3.52-.234.542-.588.056-3.82.364 2.876 2.54.443.39-.128.576-.835 3.746 3.305-1.95.508-.3.508.3 3.305 1.95-.835-3.746-.128-.576.443-.39 2.876-2.54-3.82-.364-.588-.056-.234-.542-1.527-3.52Z"
        })
    });
/* harmony default export */ const icons_StarOutlineIcon = (StarOutlineIcon);

;// CONCATENATED MODULE: ./src/assets/icons/TelegramIcon.tsx



const TelegramIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 35,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                id: "a",
                fill: "#fff",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M3.055 6.88a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4h-22a4 4 0 0 1-4-4v-22Zm15.648 7.257c-1.343.559-4.028 1.715-8.055 3.47-.653.26-.996.514-1.027.762-.053.42.473.586 1.19.812.098.03.199.062.302.096.706.23 1.654.497 2.148.508.447.01.946-.175 1.497-.553 3.762-2.54 5.704-3.823 5.826-3.851.086-.02.206-.044.286.028.081.071.073.207.065.244-.052.222-2.119 2.143-3.188 3.137-.333.31-.57.53-.618.58-.109.113-.219.219-.325.321-.655.632-1.146 1.105.027 1.879.564.372 1.016.679 1.466.986.492.334.982.668 1.617 1.084.161.106.316.216.466.324.572.408 1.087.774 1.722.716.369-.034.75-.381.944-1.416.457-2.447 1.357-7.746 1.564-9.93a2.436 2.436 0 0 0-.023-.544.581.581 0 0 0-.196-.374c-.166-.135-.421-.163-.535-.161-.52.01-1.317.286-5.153 1.882Z"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m10.648 17.606.74 1.859.03-.012.03-.013-.8-1.834Zm8.055-3.47-.768-1.846.768 1.847ZM9.621 18.37l1.984.25-1.984-.25Zm1.19.812.6-1.908-.6 1.908Zm.302.096.619-1.902-.619 1.902Zm2.148.508-.044 2 .043-2Zm1.497-.553-1.119-1.658-.006.004-.007.005 1.132 1.649Zm5.826-3.851-.442-1.95.442 1.95Zm.35.272 1.948.457-1.947-.457Zm-3.187 3.137-1.362-1.465 1.362 1.465Zm-.618.58 1.44 1.387-1.44-1.387Zm-.325.321 1.388 1.44-1.388-1.44Zm.027 1.879-1.1 1.67 1.1-1.67Zm1.466.986 1.126-1.654-1.126 1.654Zm1.617 1.084-1.097 1.673 1.097-1.673Zm.466.324 1.161-1.629-1.16 1.629Zm1.722.716-.183-1.992.183 1.992Zm.944-1.416 1.966.367-1.966-.367Zm1.564-9.93 1.992.189-1.992-.19Zm-.023-.544-1.97.337 1.97-.337Zm-.196-.374 1.26-1.553-1.26 1.553Zm-.535-.161-.034-2h-.002l.036 2ZM29.055.88h-22v4h22v-4Zm6 28v-22h-4v22h4Zm-28 6h22v-4h-22v4Zm-6-28v22h4v-22h-4Zm10.392 12.56c4.03-1.756 6.699-2.905 8.024-3.457l-1.536-3.693c-1.361.566-4.062 1.73-8.085 3.483l1.597 3.667Zm.158-.822c-.044.356-.189.61-.297.757-.104.139-.196.209-.214.223-.03.021.038-.032.293-.133L9.91 15.748c-.398.158-.829.363-1.2.639-.32.237-.955.792-1.073 1.734l3.97.497Zm-.194-1.345c-.19-.06-.315-.1-.418-.137-.107-.038-.115-.048-.077-.026.03.017.236.134.422.407a1.625 1.625 0 0 1 .267 1.101l-3.969-.497c-.072.58.063 1.159.394 1.646.292.43.664.68.909.82.443.252.997.415 1.272.502l1.2-3.816Zm.32.102a32.666 32.666 0 0 0-.32-.102l-1.2 3.816c.1.03.191.06.284.09l1.237-3.804Zm1.573.41c.023 0-.015.001-.136-.02-.111-.02-.25-.05-.415-.092a16.162 16.162 0 0 1-1.021-.298l-1.237 3.804c.38.123.84.262 1.285.374.399.1.948.22 1.437.232l.087-4Zm.322-.202a1.688 1.688 0 0 1-.349.195c-.057.021-.043.006.027.007l-.087 4c1.027.022 1.939-.4 2.673-.905l-2.264-3.297Zm6.516-4.152c-.21.047-.367.12-.396.133a4.038 4.038 0 0 0-.312.166c-.099.058-.22.133-.355.219a81.21 81.21 0 0 0-1.145.747c-.98.647-2.412 1.607-4.295 2.878l2.238 3.315c1.88-1.268 3.3-2.22 4.262-2.856a78.64 78.64 0 0 1 1.085-.708c.123-.078.203-.127.248-.154.025-.014.022-.012.003-.002a1.53 1.53 0 0 1-.086.042c-.014.006-.16.075-.362.12l-.885-3.9Zm2.057.483a2.206 2.206 0 0 0-1.454-.553c-.312-.003-.573.063-.603.07l.885 3.9c.055-.012-.103.031-.313.03a1.794 1.794 0 0 1-1.172-.458l2.657-2.99Zm.683 2.196c.065-.279.074-.577.032-.86a2.22 2.22 0 0 0-.715-1.336l-2.657 2.99a1.781 1.781 0 0 1-.584-1.067 1.64 1.64 0 0 1 .03-.64l3.894.913Zm-3.773 4.145c.532-.495 1.329-1.236 2-1.882.334-.321.653-.635.899-.891.12-.125.245-.26.35-.386a3.33 3.33 0 0 0 .191-.248c.019-.027.235-.322.333-.738l-3.895-.914a1.896 1.896 0 0 1 .268-.616c.032-.048.052-.07.04-.055a4.52 4.52 0 0 1-.173.187c-.19.198-.464.468-.787.78-.642.617-1.413 1.334-1.95 1.833l2.724 2.93Zm-.54.502c-.023.024-.03.031.008-.006l.12-.113.412-.383-2.724-2.93c-.292.272-.598.555-.697.658l2.882 2.774Zm-.377.374c.102-.098.24-.23.378-.374l-2.882-2.774a10.34 10.34 0 0 1-.272.268l2.776 2.88Zm-.26-1.231c-.192-.126-.132-.126-.028.029.06.091.138.24.183.44.045.206.043.411.007.596-.065.331-.222.496-.184.45a4.42 4.42 0 0 1 .282-.284l-2.776-2.88c-.141.136-.385.368-.592.619-.202.245-.53.694-.654 1.32-.317 1.606.88 2.6 1.56 3.05l2.202-3.34Zm1.49 1.003c-.45-.307-.912-.622-1.49-1.003l-2.201 3.34c.55.362.99.662 1.44.969l2.252-3.306Zm1.588 1.065c-.618-.406-1.096-.73-1.587-1.066L17.17 24.21c.492.335.995.678 1.646 1.104l2.193-3.345Zm.531.367c-.146-.104-.331-.236-.53-.367l-2.194 3.345c.124.081.247.169.402.28l2.322-3.258Zm.378.353a.534.534 0 0 1 .16.01c.037.008.043.014.01-.001a1.812 1.812 0 0 1-.192-.114c-.1-.065-.206-.141-.356-.248l-2.322 3.257c.423.301 1.56 1.218 3.066 1.08l-.366-3.984Zm-.84.208c-.066.355-.128.368-.038.25.053-.07.155-.181.32-.279.17-.1.363-.16.558-.179l.366 3.983c1.802-.165 2.497-1.814 2.727-3.04l-3.932-.735Zm1.54-9.752c-.198 2.082-1.08 7.299-1.54 9.752l3.933.735c.456-2.439 1.372-7.822 1.59-10.108l-3.983-.38Zm-.003-.017a1.041 1.041 0 0 1-.003-.022v.004l.002.016.001.022a1.019 1.019 0 0 1 .001.031v-.004l.002-.03 3.983.379c.04-.419-.005-.85-.043-1.07l-3.943.674Zm.515.842c-.445-.36-.512-.825-.515-.842l3.943-.675a2.576 2.576 0 0 0-.908-1.59l-2.52 3.107Zm.758.286a.957.957 0 0 1-.25-.026 1.287 1.287 0 0 1-.508-.26l2.52-3.106a2.72 2.72 0 0 0-1.082-.524 3.049 3.049 0 0 0-.747-.084l.067 4Zm-4.418 1.728c1.925-.8 3.041-1.25 3.734-1.502.728-.264.786-.228.686-.226l-.071-4c-.619.011-1.22.19-1.98.466-.793.288-1.994.774-3.905 1.57l1.536 3.692ZM7.055 30.88a2 2 0 0 1-2-2h-4a6 6 0 0 0 6 6v-4Zm24-2a2 2 0 0 1-2 2v4a6 6 0 0 0 6-6h-4Zm-24-28a6 6 0 0 0-6 6h4a2 2 0 0 1 2-2v-4Zm22 4a2 2 0 0 1 2 2h4a6 6 0 0 0-6-6v4Z",
                fill: "#474861",
                mask: "url(#a)"
            })
        ]
    });
/* harmony default export */ const icons_TelegramIcon = (TelegramIcon);

;// CONCATENATED MODULE: ./src/assets/icons/TimeIcon.tsx



const TimeIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 37,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.043,
                y: 0.846,
                width: 36,
                height: 36,
                rx: 18,
                fill: "#EFF4FC"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M27.451 22.234a1 1 0 1 0-1.881-.678l1.881.678Zm-5.265 4.601-.46-.887.46.887Zm-11.788-3.241.849-.528-.85.528Zm2.32-12.004-.592-.806.592.806Zm6.345-1.687.113-.993-.113.993Zm5.802 3.072.758-.652-.758.652Zm1.907 3.677-.45.893 1 .502.387-1.048-.937-.347Zm2.145-2.915a1 1 0 1 0-1.875-.694l1.875.694Zm-5.268.226a1 1 0 0 0-.898 1.788l.898-1.788Zm1.92 7.594a8 8 0 0 1-3.843 4.39l.92 1.776a10 10 0 0 0 4.805-5.489l-1.881-.678Zm-3.843 4.39a8 8 0 0 1-5.804.612l-.53 1.929a10 10 0 0 0 7.254-.765l-.92-1.775Zm-5.804.612a8 8 0 0 1-4.675-3.493l-1.699 1.055a10 10 0 0 0 5.844 4.367l.53-1.929Zm-4.675-3.493a8 8 0 0 1-1.059-5.739l-1.963-.38a10 10 0 0 0 1.323 7.174l1.699-1.055Zm-1.059-5.739a8 8 0 0 1 3.121-4.93l-1.183-1.613a10 10 0 0 0-3.901 6.164l1.963.38Zm3.121-4.93a8 8 0 0 1 5.64-1.5l.227-1.987a10 10 0 0 0-7.05 1.874l1.184 1.612Zm5.64-1.5a8 8 0 0 1 5.158 2.73l1.516-1.304a10 10 0 0 0-6.447-3.413l-.226 1.987Zm5.158 2.73a8 8 0 0 1 1.695 3.269l1.94-.488a10 10 0 0 0-2.119-4.085l-1.516 1.305Zm2.935-.584-1.208 3.262 1.875.694 1.208-3.262-1.875-.694Zm.179 2.716-3.572-1.796-.898 1.788 3.572 1.795.898-1.787ZM19.043 13.846a1 1 0 1 0-2 0h2Zm1.849 9.759a1 1 0 0 0 1.302-1.518l-1.302 1.518Zm-2.849-3.76h-1v.46l.35.299.65-.76Zm-1-6v6h2v-6h-2Zm.35 6.759 3.499 3 1.302-1.517-3.5-3.001-1.302 1.518Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_TimeIcon = (TimeIcon);

;// CONCATENATED MODULE: ./src/assets/icons/UserIcon.tsx



const UserIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M5.86 21h-1a1 1 0 0 0 1 1v-1Zm14 0v1a1 1 0 0 0 1-1h-1Zm-13 0a6 6 0 0 1 6-6v-2a8 8 0 0 0-8 8h2Zm6-6a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8v2Zm-7 7h14v-2h-14v2ZM15.86 7a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5h-2Zm-3 3a3 3 0 0 1-3-3h-2a5 5 0 0 0 5 5v-2Zm-3-3a3 3 0 0 1 3-3V2a5 5 0 0 0-5 5h2Zm3-3a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5v2Z"
        })
    });
/* harmony default export */ const icons_UserIcon = (UserIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ViberIcon.tsx



const ViberIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.446 2.16c-.981.006-1.966.065-2.959.186-1.898.233-3.78.621-5.585 1.45-2.872 1.32-4.908 3.559-5.499 6.813a42.85 42.85 0 0 0-.568 4.165c-.222 2.72-.084 5.448.686 8.128.608 2.112 1.727 4.01 3.688 5.243.83.52 1.923.773 2.494 1.037.16.076.2.121.209.133.008.008.03.028.028.197-.02 1.72 0 5.05 0 5.05-.03.5.32.655.42.718.38.237.89-.028 1.076-.203.187-.174 3.265-3.141 4.446-4.435.214-.23.324-.36.346-.374.02-.014-.014-.023.206-.028 1.55-.031 3.096-.09 4.643-.174 2.04-.113 4.118-.307 6.117-1.142 1.741-.729 3.195-1.918 4.076-3.702.9-1.828 1.38-3.766 1.56-5.77.299-3.34.195-6.683-.728-9.98-.543-1.932-1.634-3.566-3.307-4.719-2.003-1.378-4.261-1.896-6.472-2.225a33.472 33.472 0 0 0-3.895-.357 28.47 28.47 0 0 0-.982-.011Zm.942 1.451c1.24.034 2.481.155 3.724.34 2.132.318 4.143.802 5.867 1.989 1.398.962 2.27 2.261 2.737 3.918.86 3.082.97 6.24.68 9.467-.166 1.859-.607 3.61-1.42 5.262-.717 1.457-1.837 2.382-3.339 3.01-1.743.728-3.639.922-5.636 1.031-1.53.085-3.063.141-4.595.172-.386.008-.763.11-1.03.306-.267.197-.388.38-.554.56-.844.923-2.525 2.546-3.442 3.434-.006-1.074-.014-2.373 0-3.572.005-.368-.08-.745-.29-1.043-.211-.298-.5-.478-.78-.608-.812-.377-1.875-.663-2.336-.953-1.612-1.012-2.526-2.531-3.069-4.421-.711-2.473-.846-5.018-.635-7.608.112-1.345.306-2.692.55-4.028.513-2.815 2.121-4.587 4.68-5.762 1.618-.743 3.345-1.109 5.165-1.33 1.24-.153 2.48-.2 3.723-.164Zm.304 3.589a7.99 7.99 0 0 0-1.73.191.722.722 0 0 0 .32 1.406 6.29 6.29 0 0 1 1.41-.157 6.34 6.34 0 0 1 6.35 6.348c0 .486-.053.959-.157 1.414a.72.72 0 1 0 1.404.315 7.785 7.785 0 0 0 .194-1.73c0-4.291-3.496-7.787-7.79-7.787ZM12.51 8.643a1.369 1.369 0 0 0-.366.03c-1.308.29-2.607 1.238-2.643 2.931.036.237.033.49.12.703.428 1.047.8 2.127 1.334 3.117 2.601 4.809 6.536 8.153 11.55 10.277.6.253 1.218.306 1.823.053.833-.346 1.539-.88 2.008-1.648.644-1.055.653-1.786-.408-2.565-.694-.512-1.378-1.038-2.08-1.539-1.072-.759-2.231-.891-3.03.442-.042.068-.104.124-.157.18-.411.436-.914.543-1.449.323-2.028-.835-3.594-2.182-4.54-4.187-.556-1.179-.404-1.77.636-2.554.104-.076.203-.158.299-.245.455-.416.576-.911.306-1.47a11.513 11.513 0 0 0-2.452-3.398c-.279-.265-.597-.43-.951-.45Zm7.172.717c-.318 0-.633.025-.942.079a.722.722 0 0 0-.459 1.18c.172.2.442.293.7.237a4.38 4.38 0 0 1 .7-.056 4.206 4.206 0 0 1 4.22 4.219c0 .239-.02.475-.057.7a.724.724 0 0 0 .237.7.722.722 0 0 0 1.181-.458 5.67 5.67 0 0 0-5.58-6.601Zm-.101 2.16a.724.724 0 0 0-.633.357c-.13.225-.13.5 0 .726.132.225.374.36.633.357 1.2 0 2.16.959 2.16 2.16-.003.259.132.5.357.633.225.13.5.13.725 0a.724.724 0 0 0 .358-.633c0-1.98-1.62-3.6-3.6-3.6Z",
                fill: "#474861"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m18.446 2.16.001.2v-.2Zm-2.959.186-.024-.199.024.199Zm-5.585 1.45.083.183-.083-.182ZM4.403 10.61l.197.036-.197-.036Zm-.568 4.165-.2-.016.2.016Zm.686 8.128-.192.055.192-.055Zm3.688 5.243-.107.169.107-.17Zm2.494 1.037.086-.18-.002-.001-.084.181Zm.209.133-.16.12.008.011.01.01.142-.141Zm.028.197-.2-.004v.001l.2.003Zm0 5.05.2.012v-.012h-.2Zm.42.718.106-.17-.106.17Zm5.522-4.638-.146-.136-.001.001.147.135Zm.346-.374.107.17.01-.007-.117-.163Zm.206-.028-.004-.2h-.002l.006.2Zm4.643-.174.011.2-.01-.2Zm6.117-1.142.077.184-.077-.184Zm4.076-3.702.179.089-.18-.089Zm1.56-5.77.2.017-.2-.018Zm-.728-9.98.193-.053-.193.053Zm-3.307-4.719.113-.165-.113.165Zm-6.472-2.225.03-.197-.03.197Zm-3.895-.357.006-.2h-.001l-.005.2Zm-.04 1.44-.006.2.006-.2Zm3.724.34-.03.198.03-.198ZM28.98 5.94l-.113.165.113-.165Zm2.737 3.918.192-.054-.192.054Zm.68 9.467-.199-.018.2.018Zm-1.42 5.262-.18-.089.18.089Zm-3.339 3.01-.077-.185.077.184Zm-5.636 1.031-.01-.2.01.2Zm-4.595.172-.005-.2.005.2Zm-1.03.306-.119-.16.12.16Zm-.554.56-.147-.135.147.135ZM12.38 33.1l-.2.001.002.47.337-.327-.14-.144Zm0-3.572-.2-.003v.001l.2.002Zm-.29-1.043-.163.115.163-.115Zm-.78-.608.085-.181-.084.181Zm-2.336-.953-.107.17.107-.17Zm-3.069-4.421.192-.055-.192.055Zm-.635-7.608-.2-.017.2.017Zm.55-4.028.198.036-.197-.036Zm4.68-5.762-.083-.182.084.182Zm5.165-1.33.024.198-.024-.199Zm2.297 3.616-.043-.195h-.002l.045.195Zm-.542.864-.196.043.196-.043Zm.863.542.044.196-.044-.196Zm7.602 7.605-.195-.044.195.044Zm.543.861-.044.195.044-.195Zm.86-.546-.194-.044.195.044ZM12.51 8.643l.011-.2h-.002l-.009.2Zm-.366.03.044.196-.044-.195ZM9.5 11.605l-.2-.004v.018l.002.017.198-.03Zm.12.703-.185.076.186-.076Zm1.334 3.117-.176.095.176-.095ZM22.504 25.7l-.077.184.078-.184Zm1.823.053-.077-.185.077.185Zm2.008-1.648.17.104-.17-.104Zm-.408-2.565-.118.16v.001l.118-.161Zm-2.08-1.539.115-.162-.116.162Zm-3.03.442.17.106.002-.003-.172-.103Zm-.157.18-.145-.138h-.001l.146.138Zm-1.449.323-.076.185.076-.185Zm-4.54-4.187.182-.086-.181.086Zm.636-2.554-.117-.162-.003.002.12.16Zm.299-.245.134.148-.134-.148Zm.306-1.47-.18.085v.001l.18-.087ZM13.46 9.092l.138-.145-.138.145Zm5.279.346.025.198.009-.001-.034-.197Zm-.58.452-.186-.072.186.072Zm.121.729-.153.128.002.002.151-.13Zm.7.236-.032-.197-.01.002.043.195Zm4.863 4.863.196.043.002-.01-.198-.033Zm.237.7-.13.152.002.002.128-.154Zm.728.121.072.187-.072-.187Zm.453-.58-.197-.033-.002.008.199.026Zm-5.681-4.44-.003.2h.003v-.2Zm-.633.357-.173-.101v.001l.173.1Zm0 .726-.174.1.001.001.173-.101Zm.633.357v-.2h-.003l.003.2Zm2.16 2.16.2.002v-.002h-.2Zm.357.633-.102.172.002.001.1-.173Zm.725 0 .1.173h.002l-.102-.173Zm.358-.633h-.2v.002l.2-.002ZM18.445 1.96c-.989.006-1.98.065-2.982.187l.049.397c.984-.12 1.961-.179 2.935-.184l-.002-.4Zm-2.982.187c-1.908.235-3.813.626-5.645 1.468l.167.364c1.78-.818 3.638-1.203 5.527-1.435l-.049-.397ZM9.818 3.615c-2.92 1.342-5.007 3.63-5.611 6.958l.393.071c.577-3.18 2.563-5.37 5.385-6.665l-.167-.364Zm-5.611 6.958a43.044 43.044 0 0 0-.571 4.185l.399.032a42.65 42.65 0 0 1 .565-4.145l-.393-.072Zm-.571 4.185c-.224 2.737-.086 5.49.693 8.2l.385-.111c-.763-2.652-.9-5.354-.68-8.057l-.398-.032Zm.693 8.2c.617 2.144 1.76 4.09 3.773 5.356l.213-.339c-1.907-1.198-3.003-3.048-3.601-5.128l-.385.11Zm3.773 5.356c.434.272.932.471 1.383.634.463.166.86.289 1.134.416l.168-.363c-.296-.137-.732-.274-1.166-.43-.446-.16-.91-.348-1.306-.596l-.213.339Zm2.516 1.05c.149.07.154.098.133.07l.32-.24c-.037-.049-.11-.11-.282-.192l-.171.361Zm.152.092-.008-.008a.148.148 0 0 1-.027-.05l.001.007.002.02a.95.95 0 0 1 .002.083l.4.007a.876.876 0 0 0-.016-.208.298.298 0 0 0-.056-.118.212.212 0 0 0-.015-.016l-.283.283Zm-.03.053c-.01.862-.01 2.126-.008 3.174a699.988 699.988 0 0 0 .007 1.843V34.563h.2l.2-.002V34.524a50.331 50.331 0 0 0-.002-.51l-.005-1.332c-.002-1.048-.002-2.31.008-3.168l-.4-.005Zm0 5.042a.89.89 0 0 0 .211.666c.122.138.272.213.303.233l.212-.34c-.068-.043-.143-.077-.215-.158-.062-.07-.123-.183-.112-.378l-.399-.023Zm.514.898c.257.16.545.143.773.076a1.44 1.44 0 0 0 .545-.301l-.273-.293c-.07.066-.217.16-.385.21-.168.05-.324.046-.448-.03l-.211.339Zm1.318-.225c.188-.175 3.271-3.147 4.458-4.447l-.295-.27c-1.176 1.288-4.25 4.25-4.436 4.424l.273.293Zm4.457-4.446c.108-.116.19-.207.246-.27a4.22 4.22 0 0 1 .065-.07l.014-.015c.006-.005-.003.004-.02.015l-.212-.34c-.022.014-.04.031-.044.036a5.235 5.235 0 0 0-.099.105c-.057.064-.137.153-.243.267l.293.272Zm.316-.347a.231.231 0 0 0 .04-.036l.002-.004c.001 0 0 0 0 0a.176.176 0 0 1-.09.055l.028-.002.114-.004-.01-.4c-.104.003-.171.006-.214.015a.233.233 0 0 0-.114.058c-.011.01-.027.029-.018.018a.17.17 0 0 1 .03-.026l.232.326Zm.093.009a134.74 134.74 0 0 0 4.65-.175l-.022-.4c-1.544.085-3.09.144-4.636.175l.008.4Zm4.65-.175c2.041-.112 4.15-.307 6.183-1.157l-.154-.369c-1.966.821-4.014 1.014-6.05 1.127l.021.4Zm6.183-1.157c1.778-.744 3.273-1.963 4.178-3.797l-.359-.177c-.855 1.732-2.268 2.892-3.973 3.605l.154.37Zm4.178-3.797c.913-1.854 1.399-3.816 1.58-5.842l-.398-.036c-.178 1.985-.653 3.898-1.54 5.701l.358.177Zm1.58-5.842c.3-3.354.197-6.724-.734-10.05l-.386.107c.915 3.266 1.02 6.584.722 9.907l.399.036Zm-.734-10.05c-.555-1.974-1.672-3.649-3.387-4.83l-.227.329c1.632 1.124 2.697 2.717 3.229 4.609l.385-.109Zm-3.387-4.83c-2.041-1.405-4.337-1.928-6.556-2.258l-.058.395c2.202.328 4.423.84 6.387 2.192l.227-.33ZM23.352 2.33a33.67 33.67 0 0 0-3.918-.36l-.012.4c1.296.04 2.587.165 3.872.355l.058-.395Zm-3.92-.36a28.655 28.655 0 0 0-.987-.011l.003.4c.326-.003.65.003.975.011l.01-.4Zm-.05 1.84c1.232.034 2.464.154 3.7.338l.06-.395a31.096 31.096 0 0 0-3.748-.343l-.011.4Zm3.7.338c2.125.317 4.098.795 5.784 1.956l.226-.33c-1.762-1.213-3.81-1.702-5.95-2.021l-.06.395Zm5.784 1.956c1.355.933 2.202 2.19 2.657 3.807l.385-.109c-.478-1.696-1.376-3.037-2.816-4.028l-.226.33Zm2.657 3.807c.852 3.052.962 6.184.674 9.395l.398.036c.291-3.242.182-6.426-.687-9.54l-.385.109Zm.674 9.395c-.164 1.838-.6 3.566-1.4 5.191l.358.177c.826-1.676 1.273-3.453 1.44-5.333l-.398-.035Zm-1.4 5.192c-.693 1.405-1.77 2.3-3.237 2.913l.155.369c1.537-.642 2.698-1.598 3.44-3.106l-.359-.177Zm-3.237 2.913c-1.71.714-3.575.907-5.57 1.017l.022.4c2-.11 3.925-.306 5.703-1.048l-.155-.37Zm-5.57 1.017c-1.527.084-3.058.14-4.588.171l.008.4c1.535-.031 3.07-.087 4.602-.172l-.022-.4Zm-4.589.171c-.413.009-.834.117-1.143.345l.237.322c.224-.165.557-.26.915-.267l-.009-.4Zm-1.143.345c-.288.212-.437.427-.583.586l.294.27c.186-.2.28-.352.526-.534l-.238-.322Zm-.583.586c-.839.917-2.515 2.534-3.435 3.426l.279.287c.914-.886 2.602-2.515 3.45-3.443l-.294-.27ZM12.58 33.1c-.006-1.075-.014-2.372 0-3.568l-.4-.005c-.014 1.2-.006 2.502 0 3.575l.4-.002Zm0-3.568c.006-.398-.085-.82-.327-1.162l-.326.231c.18.255.258.586.253.925l.4.006Zm-.327-1.162c-.24-.338-.565-.537-.858-.673l-.168.363c.263.122.517.284.7.541l.326-.23Zm-.858-.673c-.416-.193-.895-.362-1.316-.516-.432-.157-.79-.294-.999-.425l-.213.338c.253.159.657.31 1.075.463.429.156.888.319 1.285.503l.168-.363Zm-2.315-.941c-1.558-.98-2.449-2.449-2.983-4.307l-.384.11c.552 1.921 1.489 3.489 3.154 4.535l.213-.338Zm-2.983-4.308c-.703-2.443-.838-4.963-.628-7.536l-.399-.032c-.212 2.607-.077 5.178.643 7.679l.384-.11Zm-.628-7.535c.112-1.337.305-2.678.549-4.009l-.394-.072a41.919 41.919 0 0 0-.554 4.047l.399.034Zm.549-4.009c.498-2.74 2.056-4.464 4.566-5.617l-.167-.363C7.81 6.12 6.15 7.942 5.624 10.832l.394.071Zm4.566-5.617c1.591-.73 3.295-1.092 5.105-1.313l-.049-.397c-1.83.223-3.58.592-5.223 1.347l.167.363Zm5.105-1.313a24.42 24.42 0 0 1 3.694-.162l.011-.4a24.818 24.818 0 0 0-3.754.165l.049.397ZM19.692 7c-.609 0-1.2.07-1.773.196l.087.39a7.79 7.79 0 0 1 1.686-.186V7Zm-1.775.196a.925.925 0 0 0-.693 1.102l.39-.087a.525.525 0 0 1 .394-.625l-.091-.39Zm-.693 1.102a.922.922 0 0 0 1.103.695l-.088-.39a.522.522 0 0 1-.624-.392l-.39.087Zm1.104.694a6.09 6.09 0 0 1 1.364-.152v-.4a6.49 6.49 0 0 0-1.454.162l.09.39Zm1.364-.152a6.14 6.14 0 0 1 6.15 6.148h.4a6.54 6.54 0 0 0-6.55-6.548v.4Zm6.15 6.148c0 .472-.051.93-.152 1.37l.39.089c.108-.47.163-.958.163-1.46h-.4Zm-.152 1.37a.92.92 0 0 0 .694 1.1l.088-.39a.52.52 0 0 1-.392-.621l-.39-.089Zm.694 1.1a.92.92 0 0 0 1.1-.697l-.39-.087a.52.52 0 0 1-.622.394l-.088.39Zm1.1-.696c.13-.571.199-1.163.199-1.774h-.4c0 .58-.066 1.142-.19 1.685l.39.089Zm.199-1.774c0-4.403-3.586-7.988-7.99-7.988v.4c4.183 0 7.59 3.406 7.59 7.588h.4ZM12.518 8.443a1.568 1.568 0 0 0-.418.035l.087.39a1.17 1.17 0 0 1 .313-.026l.018-.4Zm-.418.035C10.74 8.78 9.34 9.781 9.3 11.6l.4.009c.033-1.568 1.231-2.462 2.487-2.74l-.087-.39Zm-2.798 3.157c.018.117.024.216.04.354.016.125.04.262.093.394l.37-.151a1.15 1.15 0 0 1-.065-.292c-.013-.102-.024-.247-.043-.366l-.395.06Zm.133.748c.422 1.032.801 2.133 1.343 3.136l.352-.19c-.528-.978-.891-2.037-1.324-3.097l-.37.151Zm1.343 3.136c2.625 4.853 6.597 8.226 11.649 10.366l.156-.369c-4.978-2.107-8.876-5.422-11.453-10.187l-.352.19Zm11.649 10.366c.637.269 1.312.332 1.977.053l-.154-.368c-.544.227-1.106.183-1.668-.054l-.155.369Zm1.977.054c.863-.359 1.606-.918 2.102-1.729l-.341-.209c-.444.725-1.113 1.235-1.915 1.568l.154.37Zm2.102-1.729c.328-.538.521-1.033.463-1.514-.06-.49-.371-.91-.923-1.316l-.237.322c.509.374.722.708.763 1.042.041.343-.092.74-.407 1.258l.34.208Zm-.46-2.83c-.69-.508-1.38-1.039-2.084-1.54l-.232.325c.702.5 1.38 1.021 2.079 1.537l.237-.322Zm-2.084-1.54c-.555-.394-1.158-.645-1.747-.6-.603.044-1.145.392-1.57 1.101l.344.206c.374-.624.81-.876 1.255-.909.458-.034.97.161 1.486.528l.232-.327Zm-3.314.498c-.029.045-.066.077-.133.148l.29.276c.039-.041.125-.122.182-.212l-.34-.212Zm-.134.149a1.125 1.125 0 0 1-.575.35 1.08 1.08 0 0 1-.652-.075l-.152.37c.3.123.6.159.89.095.29-.064.552-.224.78-.466l-.291-.274Zm-1.227.276c-1.988-.82-3.513-2.135-4.434-4.089l-.362.17c.969 2.057 2.577 3.437 4.644 4.288l.152-.37Zm-4.434-4.089c-.274-.578-.35-.966-.268-1.29.08-.325.332-.633.843-1.018l-.241-.32c-.53.4-.875.779-.99 1.24-.116.463.01.958.294 1.56l.362-.172Zm.572-2.307c.111-.08.215-.167.315-.258l-.27-.296c-.09.083-.183.16-.28.231l.235.323Zm.315-.258c.25-.229.422-.491.486-.787.065-.297.017-.606-.134-.919l-.36.174c.12.248.146.466.104.66-.043.196-.16.389-.365.576l.27.296Zm.353-1.705a11.713 11.713 0 0 0-2.495-3.456l-.276.29a11.313 11.313 0 0 1 2.41 3.338l.36-.172Zm-2.496-3.456c-.303-.288-.663-.482-1.077-.505l-.022.4c.295.016.57.154.824.395l.275-.29Zm6.084.212c-.329 0-.655.026-.976.082l.068.394c.297-.052.6-.076.908-.076v-.4Zm-.968.08a.922.922 0 0 0-.74.579l.373.145a.522.522 0 0 1 .418-.327l-.05-.397Zm-.74.58a.928.928 0 0 0 .154.928l.307-.256a.528.528 0 0 1-.088-.528l-.373-.145Zm.155.93a.924.924 0 0 0 .895.302l-.085-.391a.524.524 0 0 1-.506-.171l-.303.26Zm.885.304A4.18 4.18 0 0 1 19.68 11v-.4c-.25 0-.497.02-.733.059l.065.395ZM19.68 11c2.23 0 4.019 1.79 4.019 4.019h.4a4.406 4.406 0 0 0-4.42-4.42v.4Zm4.019 4.019c0 .228-.02.453-.054.668l.395.064c.038-.236.059-.482.059-.732h-.4Zm-.052.658a.924.924 0 0 0 .301.894l.26-.303a.524.524 0 0 1-.17-.507l-.391-.084Zm.304.896a.928.928 0 0 0 .928.154l-.144-.373a.528.528 0 0 1-.528-.088l-.256.307Zm.929.154a.922.922 0 0 0 .578-.74l-.396-.052a.522.522 0 0 1-.328.419l.146.373Zm.577-.732c.056-.321.082-.648.082-.976h-.4c0 .307-.025.61-.076.908l.394.068Zm.082-.976a5.87 5.87 0 0 0-5.86-5.86v.4a5.47 5.47 0 0 1 5.46 5.46h.4Zm-5.958-3.7a.924.924 0 0 0-.808.457l.345.202a.524.524 0 0 1 .458-.258l.005-.4Zm-.809.458a.927.927 0 0 0 0 .925l.347-.199a.527.527 0 0 1 0-.526l-.347-.2Zm.001.927c.17.287.478.46.808.456l-.005-.4a.524.524 0 0 1-.458-.259l-.345.203Zm.806.456c1.09 0 1.96.87 1.96 1.96h.4a2.35 2.35 0 0 0-2.36-2.36v.4Zm1.96 1.958a.924.924 0 0 0 .456.807l.202-.345a.524.524 0 0 1-.258-.458l-.4-.004Zm.457.808a.927.927 0 0 0 .925 0l-.2-.347a.527.527 0 0 1-.526 0l-.199.347Zm.927 0a.924.924 0 0 0 .456-.808l-.4.004a.524.524 0 0 1-.259.458l.203.345Zm.456-.806c0-2.09-1.71-3.8-3.8-3.8v.4c1.87 0 3.4 1.53 3.4 3.4h.4Z",
                fill: "#474861"
            })
        ]
    });
/* harmony default export */ const icons_ViberIcon = (ViberIcon);

;// CONCATENATED MODULE: ./src/assets/icons/VideoIcon.tsx



const VideoIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 1,
                y: 4,
                width: 22,
                height: 16.595,
                rx: 3,
                stroke: "#7A7C99",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M15.3 12.104a.3.3 0 0 1 0 .52L9.45 16a.3.3 0 0 1-.45-.26V8.986a.3.3 0 0 1 .45-.26l5.85 3.378Z",
                stroke: "#7A7C99",
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const icons_VideoIcon = (VideoIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WeightIcon.tsx



const WeightIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: props.fill,
                strokeWidth: 2,
                strokeLinecap: "round",
                d: "m7.109 6.833 11.345-4.39M12.596 5.533v-1.72"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M8.503 9.328c-.496-.99-1.905-1-2.416-.019l-2.77 5.32c-1.554 2.986.613 6.556 3.979 6.556 3.282 0 5.415-3.455 3.946-6.389l-2.74-5.468Zm-3.15 5.72 1.926-3.697 1.852 3.698H5.354Zm-.52 2a2.486 2.486 0 0 0 2.463 2.137 2.414 2.414 0 0 0 2.4-2.136H4.833ZM19.698 5.418c-.496-.99-1.905-1.001-2.416-.02l-2.77 5.32c-1.554 2.987.613 6.557 3.98 6.557 3.281 0 5.415-3.455 3.945-6.389l-2.74-5.468Zm-3.149 5.72 1.925-3.697 1.852 3.697H16.55Zm-.521 2a2.486 2.486 0 0 0 2.463 2.137 2.414 2.414 0 0 0 2.4-2.137h-4.863Z",
                fill: props.fill
            })
        ]
    });
/* harmony default export */ const icons_WeightIcon = (WeightIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WhatsappIcon.tsx



const WhatsappIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Mask, {
                id: "a",
                x: 1.3,
                y: 0.44,
                width: 35,
                height: 35,
                fill: "#000",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M1.3.44h35v35h-35z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M18.86 1.44C9.723 1.44 2.3 8.863 2.3 18c0 2.937.805 5.678 2.149 8.07l-2.122 7.576a.72.72 0 0 0 .866.893l7.899-1.958c2.32 1.24 4.955 1.979 7.768 1.979 9.137 0 16.56-7.423 16.56-16.56 0-9.137-7.423-16.56-16.56-16.56Zm0 1.44c8.359 0 15.12 6.761 15.12 15.12 0 8.359-6.761 15.12-15.12 15.12-2.68 0-5.19-.699-7.372-1.92a.72.72 0 0 0-.524-.07l-6.918 1.714 1.855-6.617a.72.72 0 0 0-.072-.562A15.034 15.034 0 0 1 3.74 18c0-8.359 6.762-15.12 15.12-15.12Zm-6.018 6.48a2.29 2.29 0 0 0-1.662.755c-.325.35-1.68 1.671-1.68 3.992 0 2.42 1.678 4.51 1.881 4.777h.002v.002a22.77 22.77 0 0 0 2.163 2.652c1.298 1.367 3.124 2.947 5.39 3.914a25.69 25.69 0 0 0 2.49.908c1.156.363 2.209.308 3 .191.592-.087 1.243-.371 1.887-.779.644-.407 1.275-.914 1.554-1.684.2-.553.3-1.063.337-1.483.019-.21.021-.395.007-.566-.013-.172.001-.303-.159-.566-.335-.55-.714-.564-1.11-.76-.22-.11-.847-.415-1.476-.715-.627-.299-1.171-.564-1.506-.683-.211-.076-.47-.186-.842-.144-.373.043-.74.311-.955.629-.203.301-1.02 1.266-1.27 1.55-.003-.002.019.008-.08-.041-.308-.153-.685-.282-1.243-.577a10.286 10.286 0 0 1-2.02-1.402v-.001c-1.136-1-1.932-2.257-2.183-2.68.017-.02-.002.005.033-.03l.002-.001c.257-.253.484-.555.676-.777.273-.314.393-.59.523-.849.26-.515.116-1.083-.035-1.381v-.001c.01.02-.038-.138-.136-.372-.1-.234-.269-.58-.404-.904-.27-.647-.57-1.372-.75-1.797v-.001c-.21-.5-.495-.861-.868-1.035-.373-.174-.703-.125-.716-.126h-.002a18.858 18.858 0 0 0-.848-.015Zm0 1.44c.278 0 .552.003.78.014.237.012.222.013.177-.008-.046-.022.016-.029.15.29.175.415.478 1.143.748 1.792.136.325.262.63.363.868.101.239.156.372.22.5v.002c.063.123.058.044.036.087-.152.302-.173.376-.326.553-.234.27-.473.57-.6.694-.11.109-.31.278-.434.61-.124.331-.066.786.134 1.126.266.452 1.144 1.881 2.509 3.082.859.758 1.66 1.259 2.299 1.596.64.338 1.16.535 1.277.592.276.137.579.244.93.201.352-.042.655-.255.849-.473l.001-.002c.257-.291 1.02-1.163 1.387-1.7.015.006.01.001.132.045v.001h.001c.056.02.752.332 1.373.628.62.295 1.25.603 1.455.704.296.146.435.242.471.242.003.063.005.132-.004.236-.025.29-.103.69-.257 1.118-.076.21-.471.643-.97.958-.497.315-1.104.538-1.328.57-.675.1-1.477.137-2.357-.14-.61-.191-1.372-.44-2.357-.859-1.998-.852-3.697-2.303-4.91-3.58a21.427 21.427 0 0 1-1.44-1.684c-.344-.449-.495-.682-.62-.848l-.002-.001c-.223-.295-1.59-2.195-1.59-3.907 0-1.81.842-2.521 1.297-3.012.24-.257.5-.295.606-.295Z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M13.438 10.589h.397l-.036.217-.361.001v-.218ZM16.213 13.36l.217-.122.136.373-.176.25-.177-.501Z"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.86 1.44C9.723 1.44 2.3 8.863 2.3 18c0 2.937.805 5.678 2.149 8.07l-2.122 7.576a.72.72 0 0 0 .866.893l7.899-1.958c2.32 1.24 4.955 1.979 7.768 1.979 9.137 0 16.56-7.423 16.56-16.56 0-9.137-7.423-16.56-16.56-16.56Zm0 1.44c8.359 0 15.12 6.761 15.12 15.12 0 8.359-6.761 15.12-15.12 15.12-2.68 0-5.19-.699-7.372-1.92a.72.72 0 0 0-.524-.07l-6.918 1.714 1.855-6.617a.72.72 0 0 0-.072-.562A15.034 15.034 0 0 1 3.74 18c0-8.359 6.762-15.12 15.12-15.12Zm-6.018 6.48a2.29 2.29 0 0 0-1.662.755c-.325.35-1.68 1.671-1.68 3.992 0 2.42 1.678 4.51 1.881 4.777h.002v.002a22.77 22.77 0 0 0 2.163 2.652c1.298 1.367 3.124 2.947 5.39 3.914a25.69 25.69 0 0 0 2.49.908c1.156.363 2.209.308 3 .191.592-.087 1.243-.371 1.887-.779.644-.407 1.275-.914 1.554-1.684.2-.553.3-1.063.337-1.483.019-.21.021-.395.007-.566-.013-.172.001-.303-.159-.566-.335-.55-.714-.564-1.11-.76-.22-.11-.847-.415-1.476-.715-.627-.299-1.171-.564-1.506-.683-.211-.076-.47-.186-.842-.144-.373.043-.74.311-.955.629-.203.301-1.02 1.266-1.27 1.55-.003-.002.019.008-.08-.041-.308-.153-.685-.282-1.243-.577a10.286 10.286 0 0 1-2.02-1.402v-.001c-1.136-1-1.932-2.257-2.183-2.68.017-.02-.002.005.033-.03l.002-.001c.257-.253.484-.555.676-.777.273-.314.393-.59.523-.849.26-.515.116-1.083-.035-1.381v-.001c.01.02-.038-.138-.136-.372-.1-.234-.269-.58-.404-.904-.27-.647-.57-1.372-.75-1.797v-.001c-.21-.5-.495-.861-.868-1.035-.373-.174-.703-.125-.716-.126h-.002a18.858 18.858 0 0 0-.848-.015Zm0 1.44c.278 0 .552.003.78.014.237.012.222.013.177-.008-.046-.022.016-.029.15.29.175.415.478 1.143.748 1.792.136.325.262.63.363.868.101.239.156.372.22.5v.002c.063.123.058.044.036.087-.152.302-.173.376-.326.553-.234.27-.473.57-.6.694-.11.109-.31.278-.434.61-.124.331-.066.786.134 1.126.266.452 1.144 1.881 2.509 3.082.859.758 1.66 1.259 2.299 1.596.64.338 1.16.535 1.277.592.276.137.579.244.93.201.352-.042.655-.255.849-.473l.001-.002c.257-.291 1.02-1.163 1.387-1.7.015.006.01.001.132.045v.001h.001c.056.02.752.332 1.373.628.62.295 1.25.603 1.455.704.296.146.435.242.471.242.003.063.005.132-.004.236-.025.29-.103.69-.257 1.118-.076.21-.471.643-.97.958-.497.315-1.104.538-1.328.57-.675.1-1.477.137-2.357-.14-.61-.191-1.372-.44-2.357-.859-1.998-.852-3.697-2.303-4.91-3.58a21.427 21.427 0 0 1-1.44-1.684c-.344-.449-.495-.682-.62-.848l-.002-.001c-.223-.295-1.59-2.195-1.59-3.907 0-1.81.842-2.521 1.297-3.012.24-.257.5-.295.606-.295Z",
                fill: "#474861"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M13.438 10.589h.397l-.036.217-.361.001v-.218ZM16.213 13.36l.217-.122.136.373-.176.25-.177-.501Z",
                fill: "#474861"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m4.449 26.07.24.068.028-.1-.05-.09-.218.122Zm-2.122 7.576-.241-.068.24.068Zm.866.893.06.242-.06-.242Zm7.899-1.958.117-.22-.084-.045-.094.023.06.242Zm.396-1.38.122-.219-.122.218Zm-.524-.07.06.242-.06-.243Zm-6.918 1.713-.24-.067-.116.413.416-.103-.06-.243Zm1.855-6.617-.24-.069v.001l.24.068Zm-.072-.562.216-.126-.216.126Zm5.351-15.55-.183-.17.183.17Zm.201 8.77-.199.15.075.1h.124v-.25Zm.002 0h.25v-.25h-.25v.25Zm0 0-.2.152.45.59v-.741h-.25Zm.627.857-.198.153.198-.153Zm1.536 1.796.18-.172-.18.172Zm5.39 3.914-.098.23.098-.23Zm2.49.908.075-.238-.075.238Zm3 .191-.037-.247.037.247Zm1.887-.779-.134-.211.134.211Zm1.554-1.684.235.085-.235-.085Zm.337-1.483.25.022-.25-.022Zm.007-.566.25-.02-.25.02Zm-.159-.566-.213.13.213-.13Zm-1.11-.76-.111.224.11-.224Zm-1.476-.715-.107.226.107-.226Zm-1.506-.683-.084.235.084-.235Zm-.842-.144.028.249-.028-.249Zm-.955.629.207.14-.207-.14Zm-1.27 1.55-.13.213.18.11.138-.158-.188-.165Zm-.08-.041-.11.224.11-.224Zm-1.243-.577-.117.221.117-.22Zm-2.02-1.402h-.25v.113l.085.075.166-.188Zm0-.001h.25v-.113l-.084-.075-.165.188Zm-2.183-2.68-.192-.16-.114.136.09.153.216-.128Zm.033-.03.176.178.001-.001-.177-.177Zm.002-.001-.176-.178h-.001l.177.178Zm.676-.777.189.164-.189-.164Zm.523-.849.224.112-.224-.112Zm-.035-1.382.224-.113-.474.113h.25Zm-.54-1.276.231-.096-.23.096Zm-.75-1.797h-.25v.05l.02.047.23-.097Zm0-.001h.25v-.05l-.019-.048-.23.098ZM14.409 9.5l.105-.227-.105.227Zm-.716-.126.012-.25h-.012v.25Zm-.002 0-.011.25h.011v-.25Zm-.067 1.439.012-.25-.012.25Zm.326.281.23-.097-.23.097Zm.748 1.793-.23.096.23-.096Zm.363.868-.23.097.23-.097Zm.22.5h.25v-.06l-.027-.053-.223.112Zm0 0h-.25v.104l.073.073.177-.176Zm0 .002.224-.113-.018-.036-.028-.028-.177.177Zm.036.087.223.113-.223-.113Zm-.326.553.189.164-.19-.164Zm-.6.694.176.179-.175-.179Zm-.434.61.234.087-.234-.088Zm.134 1.126-.216.127.216-.127Zm2.509 3.082.165-.187-.165.187Zm2.299 1.596-.117.221.117-.22Zm1.277.592.11-.224-.11.224Zm.93.201-.03-.248.03.248Zm.849-.473-.177-.177-.006.005-.005.006.188.166Zm.001-.002.177.177.005-.006.005-.006-.187-.165Zm1.387-1.7.083-.236-.182-.064-.108.16.206.14Zm.132.045h.25v-.176l-.166-.06-.084.236Zm0 .001h-.25v.25h.25v-.25Zm.001 0 .084-.235-.04-.015h-.044v.25Zm2.828 1.332-.11.224.11-.224Zm.471.242.25-.01-.01-.237-.237-.003-.003.25Zm-.004.236-.25-.021.25.021Zm-.257 1.118.235.085-.235-.085Zm-2.298 1.529-.037-.247.037.247Zm-2.357-.14.075-.24-.075.24Zm-2.357-.86-.098.23.098-.23Zm-4.91-3.58-.182.172.181-.172Zm-1.44-1.684-.197.153.198-.153Zm-.62-.848.198-.15-.01-.014-.012-.012-.177.176Zm-.002-.001-.2.15.01.015.013.012.177-.177Zm-.293-6.919-.183-.17.183.17Zm1.202-.506v-.25h-.25v.25h.25Zm.397 0 .246.04.048-.29h-.294v.25Zm-.397.218h-.25v.251h.251l-.001-.25Zm2.775 2.553-.123-.218-.183.103.07.199.236-.084Zm.177.5-.235.084.161.455.279-.395-.205-.144Zm2.47-12.67C9.585 1.19 2.05 8.725 2.05 18h.5c0-9 7.31-16.31 16.31-16.31v-.5ZM2.05 18c0 2.983.818 5.766 2.18 8.193l.437-.245C3.342 23.589 2.55 20.89 2.55 18h-.5Zm2.158 8.003-2.122 7.575.481.135 2.122-7.575-.481-.135Zm-2.122 7.576a.97.97 0 0 0-.006.5l.484-.123a.47.47 0 0 1 .003-.243l-.481-.134Zm-.006.5a.97.97 0 0 0 .244.436l.359-.348a.47.47 0 0 1-.119-.211l-.484.123Zm.244.436a.97.97 0 0 0 .429.257l.137-.48a.47.47 0 0 1-.207-.125l-.36.348Zm.429.257a.97.97 0 0 0 .5.01l-.12-.486a.47.47 0 0 1-.243-.004l-.137.48Zm.5.01 7.899-1.958-.12-.485-7.9 1.957.12.486Zm7.72-1.98c2.355 1.257 5.029 2.008 7.887 2.008v-.5c-2.769 0-5.362-.728-7.65-1.95l-.236.442Zm7.887 2.008c9.275 0 16.81-7.535 16.81-16.81h-.5c0 8.999-7.311 16.31-16.31 16.31v.5ZM35.67 18c0-9.275-7.535-16.81-16.81-16.81v.5C27.859 1.69 35.17 9 35.17 18h.5ZM18.86 3.13c8.22 0 14.87 6.65 14.87 14.87h.5c0-8.497-6.873-15.37-15.37-15.37v.5ZM33.73 18c0 8.22-6.65 14.87-14.87 14.87v.5c8.497 0 15.37-6.873 15.37-15.37h-.5ZM18.86 32.87a14.79 14.79 0 0 1-7.25-1.888l-.244.437a15.29 15.29 0 0 0 7.494 1.95v-.5Zm-7.25-1.888a.97.97 0 0 0-.707-.095l.12.486a.47.47 0 0 1 .343.046l.244-.437Zm-.706-.095-6.918 1.715.12.485 6.918-1.714-.12-.486Zm-6.617 2.025 1.855-6.618-.482-.135-1.854 6.618.481.135Zm1.855-6.617a.97.97 0 0 0 .029-.388l-.496.063a.47.47 0 0 1-.014.188l.48.137Zm.029-.388a.97.97 0 0 0-.126-.368l-.431.253a.47.47 0 0 1 .06.178l.497-.063Zm-.126-.369A14.783 14.783 0 0 1 3.99 18h-.5c0 2.847.776 5.507 2.124 7.792l.43-.254ZM3.99 18c0-8.22 6.649-14.87 14.87-14.87v-.5C10.363 2.63 3.49 9.503 3.49 18h.5Zm8.852-8.89c-.519 0-1.249.193-1.845.835l.367.34a2.04 2.04 0 0 1 1.478-.675v-.5Zm-1.845.835c-.326.352-1.747 1.736-1.747 4.162h.5c0-2.216 1.29-3.473 1.614-3.822l-.367-.34ZM9.25 14.107c0 2.517 1.736 4.67 1.932 4.928l.399-.301c-.21-.278-1.831-2.302-1.831-4.627h-.5Zm2.131 5.027h.002v-.5h-.002v.5Zm-.248-.25v.002h.5v-.002h-.5Zm.449-.15a.241.241 0 0 0-.008-.009l-.015-.017a.236.236 0 0 0-.105-.063.429.429 0 0 0-.254.068.442.442 0 0 0-.067.19.246.246 0 0 0 .05.134 6.532 6.532 0 0 0 .165.233c.114.16.277.382.464.625l.396-.305a24.577 24.577 0 0 1-.582-.792l-.03-.043-.003-.003.005.008.01.017a.242.242 0 0 1 .023.09.442.442 0 0 1-.067.19.429.429 0 0 1-.254.067.45.45 0 0 1-.072-.034c-.018-.014-.03-.026-.033-.029a.234.234 0 0 1-.015-.016l-.006-.008.398-.302Zm.23 1.16c.373.487.896 1.125 1.552 1.816l.363-.344a22.512 22.512 0 0 1-1.519-1.776l-.396.305Zm1.552 1.816c1.311 1.38 3.164 2.987 5.474 3.972l.196-.46c-2.223-.948-4.02-2.502-5.307-3.856l-.363.344Zm5.474 3.972a25.9 25.9 0 0 0 2.513.917l.15-.477c-.62-.195-1.435-.46-2.467-.9l-.196.46Zm2.513.917c1.206.378 2.3.32 3.111.2l-.073-.495c-.77.114-1.781.165-2.888-.182l-.15.477Zm3.111.2c.64-.094 1.324-.397 1.985-.816l-.268-.422c-.627.397-1.245.663-1.79.743l.073.495Zm1.985-.816c.654-.413 1.347-.958 1.655-1.81l-.47-.17c-.249.688-.819 1.157-1.453 1.558l.268.422Zm1.655-1.81a6.191 6.191 0 0 0 .351-1.546l-.498-.043a5.691 5.691 0 0 1-.323 1.419l.47.17Zm.351-1.546c.02-.22.023-.42.008-.608l-.499.04c.012.154.01.326-.007.525l.498.043Zm.008-.608c-.005-.062-.007-.172-.03-.28a1.226 1.226 0 0 0-.165-.396l-.427.26a.735.735 0 0 1 .103.238c.014.067.011.108.02.217l.499-.04Zm-.195-.676c-.385-.632-.892-.695-1.214-.855l-.221.449c.47.233.723.198 1.008.666l.427-.26Zm-1.214-.855c-.22-.109-.849-.415-1.478-.715l-.215.45c.627.3 1.253.605 1.472.714l.221-.449Zm-1.478-.715c-.619-.295-1.18-.569-1.53-.694l-.168.471c.32.114.846.37 1.483.674l.215-.451Zm-1.53-.694c-.203-.073-.515-.206-.954-.156l.056.497c.306-.035.51.051.73.13l.169-.47Zm-.954-.156c-.463.052-.89.375-1.134.737l.414.28c.185-.274.494-.488.776-.52l-.056-.497Zm-1.134.737c-.192.285-.998 1.238-1.25 1.525l.375.33c.246-.28 1.076-1.258 1.29-1.575l-.415-.28Zm-.933 1.476a.254.254 0 0 1 .091.098.25.25 0 0 1-.208.365h-.017.006a.24.24 0 0 0 .14-.044.25.25 0 0 0 .009-.405c-.012-.01-.022-.015-.024-.016a4.742 4.742 0 0 0-.096-.049l-.222.448.07.035-.007-.004-.008-.005a.206.206 0 0 1-.029-.022.253.253 0 0 1-.062-.082.25.25 0 0 1 .225-.356h.006-.017l-.034.005a.24.24 0 0 0-.08.03.25.25 0 0 0-.003.43l.26-.428Zm-.099-.051c-.161-.08-.343-.155-.539-.24-.2-.087-.427-.19-.698-.334l-.234.442c.287.152.527.26.732.35.21.091.37.157.517.23l.222-.448Zm-1.237-.574a10.038 10.038 0 0 1-1.971-1.368l-.33.375c.78.688 1.495 1.133 2.067 1.435l.234-.442Zm-1.886-1.18v-.002h-.5v.001h.5Zm-.085-.19c-1.108-.975-1.888-2.204-2.135-2.619l-.43.256c.257.43 1.069 1.712 2.234 2.739l.33-.376Zm-2.158-2.33.001-.001-.004.004a.177.177 0 0 1-.032.028.24.24 0 0 1-.036.022l-.022.01.013-.005a.26.26 0 0 0 .082-.057.683.683 0 0 0 .016-.015l-.35-.356-.005.004a.227.227 0 0 1 .054-.034l.011-.004-.022.01a.257.257 0 0 0-.061.042l-.019.02a.387.387 0 0 0-.009.01l.383.322Zm.02-.015v-.002l-.353-.353-.001.001.353.354Zm0 0c.264-.261.514-.589.689-.79l-.377-.329c-.21.241-.415.518-.664.762l.351.357Zm.689-.79c.297-.343.432-.652.558-.902l-.447-.224c-.135.267-.24.512-.489.797l.378.328Zm.558-.902c.309-.613.134-1.27-.035-1.605l-.447.224c.131.262.245.74.035 1.156l.447.226Zm-.009-1.493v-.001h-.5v.001h.5Zm-.473.11c.002.004.009.018.02.034.004.006.02.028.045.049.009.007.118.1.261.036a.25.25 0 0 0 .148-.24.404.404 0 0 0-.014-.077 4.948 4.948 0 0 0-.143-.382l-.46.195a4.595 4.595 0 0 1 .123.328c.003.008 0 .002-.002-.01a.23.23 0 0 1 0-.089.248.248 0 0 1 .144-.182c.144-.064.253.029.262.036.025.02.04.042.044.048.011.015.017.028.019.03l-.447.225Zm.317-.58c-.052-.121-.12-.271-.191-.425-.072-.157-.146-.32-.212-.478l-.462.192c.07.167.147.338.22.494.072.158.137.299.184.412l.46-.195Zm-.403-.903c-.27-.646-.57-1.373-.75-1.798l-.46.194c.178.424.478 1.149.748 1.796l.462-.192Zm-.73-1.701v-.001h-.5v.001h.5Zm-.02-.099c-.223-.53-.543-.954-.994-1.164l-.211.453c.295.138.546.435.744.906l.461-.194Zm-.994-1.164a1.66 1.66 0 0 0-.823-.15l-.009.002h-.005.028l-.024.5a.254.254 0 0 0 .03-.001h.01l.013-.002a.9.9 0 0 1 .164 0c.108.007.252.033.405.104l.211-.453Zm-.821-.149h-.002v.5h.002v-.5Zm.01 0a19.11 19.11 0 0 0-.86-.015v.5c.289 0 .576.003.837.015l.023-.5Zm-.86 1.925c.277 0 .546.003.77.014l.023-.5a17.707 17.707 0 0 0-.793-.014v.5Zm.768.014c.105.005.182.01.218.008.007 0 .02-.001.036-.004a.25.25 0 0 0 .18-.37c-.032-.058-.08-.087-.082-.089-.021-.014-.043-.023-.043-.024l-.015-.006-.211.453.01.005.006.002c.008.004-.007-.002-.024-.013 0 0-.046-.028-.078-.085a.25.25 0 0 1 .174-.366l.024-.003-.037-.001-.133-.007-.024.5Zm.294-.485a.163.163 0 0 1 .033.02l.003.003c-.001-.001-.345.03-.33.374a.295.295 0 0 0 .013.012h-.002c0-.002-.001-.002-.002-.003-.014-.012-.017-.018-.012-.011.01.013.05.071.112.218l.46-.194a1.547 1.547 0 0 0-.173-.325.425.425 0 0 0-.06-.066l-.001-.001.012.011c.015.344-.328.376-.33.375l.005.003a.288.288 0 0 0 .061.037l.211-.453Zm-.185.613c.175.416.477 1.143.748 1.792l.461-.192c-.27-.648-.573-1.377-.748-1.794l-.461.194Zm.748 1.792c.135.324.261.63.363.87l.46-.196-.362-.866-.462.192Zm.363.87c.099.233.158.377.226.513l.447-.224c-.059-.118-.11-.241-.213-.485l-.46.195Zm.2.401v.002h.5v-.002h-.5Zm.073.178.001.002.354-.354-.002-.001-.353.353Zm-.045-.062a.66.66 0 0 0 .058.096.32.32 0 0 0 .076.073.259.259 0 0 0 .142.042.252.252 0 0 0 .247-.251.25.25 0 0 0-.307-.244.26.26 0 0 0-.131.074.294.294 0 0 0-.05.072l.446.225a.24.24 0 0 1-.266.117.249.249 0 0 1-.083-.45.25.25 0 0 1 .304.019c.013.011.02.021.022.024.004.005 0 .001-.012-.023l-.446.226Zm.035-.138c-.16.317-.164.354-.292.5l.378.329c.18-.207.216-.319.36-.604l-.446-.225Zm-.292.5c-.119.138-.24.283-.342.405a4.79 4.79 0 0 1-.244.276l.351.357c.073-.073.172-.189.275-.31.107-.127.222-.267.338-.4l-.378-.327Zm-.585.681c-.105.103-.347.308-.494.7l.468.175c.102-.271.26-.404.376-.518l-.35-.357Zm-.494.7c-.155.413-.08.947.152 1.34l.431-.253c-.168-.286-.209-.662-.115-.912l-.468-.176Zm.152 1.34c.271.46 1.165 1.916 2.56 3.144l.33-.375c-1.335-1.175-2.197-2.577-2.459-3.022l-.43.254Zm2.56 3.144a12.025 12.025 0 0 0 2.347 1.63l.233-.443a11.52 11.52 0 0 1-2.25-1.562l-.33.375Zm2.347 1.63c.327.172.623.308.85.408.242.106.38.16.433.186l.221-.448c-.064-.031-.244-.104-.452-.196a12.62 12.62 0 0 1-.819-.393l-.233.442Zm1.283.594c.294.146.649.276 1.071.226l-.06-.497c-.28.034-.53-.048-.79-.177l-.221.448Zm1.071.226c.431-.052.786-.308 1.006-.557l-.375-.331c-.166.188-.417.358-.69.391l.06.497Zm.995-.545.002-.002-.354-.354-.001.002.353.354Zm.012-.014c.254-.287 1.03-1.171 1.406-1.724l-.413-.282c-.356.522-1.107 1.38-1.368 1.676l.375.33Zm1.116-1.63c.011.005.02.007.023.008l.01.003.098.034.17-.47a3.472 3.472 0 0 0-.115-.04l-.022-.007.003.001-.167.472Zm-.034-.19v.001h.5v-.001h-.5Zm.25.251h.001v-.5h-.001v.5Zm-.083-.014.035.015.099.043.321.144c.258.117.585.268.894.415l.215-.451a40.37 40.37 0 0 0-1.396-.637l-.168.47Zm1.35.617c.619.296 1.248.602 1.451.703l.222-.448c-.206-.102-.837-.41-1.459-.706l-.215.451Zm1.451.703c.142.07.247.129.323.17l.101.055a.536.536 0 0 0 .052.023c.014.005.054.02.103.02l.006-.5a.216.216 0 0 1 .066.011l-.005-.002a2.488 2.488 0 0 1-.081-.044c-.077-.042-.19-.105-.343-.18l-.222.447Zm.332.028c.003.06.005.116-.003.204l.498.044c.01-.12.008-.2.005-.268l-.5.02Zm-.003.204a4.339 4.339 0 0 1-.244 1.055l.47.17c.163-.449.245-.87.272-1.181l-.498-.043Zm-.244 1.055c-.018.051-.102.18-.269.35a3.427 3.427 0 0 1-.598.482l.267.422c.267-.168.505-.368.688-.554.174-.178.325-.371.383-.53l-.47-.17Zm-.867.832a4.82 4.82 0 0 1-.728.37 2.674 2.674 0 0 1-.504.165l.073.494c.143-.02.374-.094.62-.195.253-.104.542-.245.806-.412l-.267-.422Zm-1.232.535c-.655.096-1.414.129-2.245-.132l-.15.477c.93.292 1.773.252 2.468.15l-.073-.495Zm-2.245-.132a23.82 23.82 0 0 1-2.334-.851l-.196.46c.996.424 1.766.675 2.38.868l.15-.477Zm-2.334-.851c-1.955-.834-3.626-2.258-4.827-3.522l-.363.344c1.226 1.29 2.952 2.767 4.994 3.638l.196-.46Zm-4.827-3.522c-.6-.632-1.08-1.22-1.422-1.664l-.396.305c.35.455.841 1.056 1.455 1.703l.363-.345ZM13.35 18.71c-.17-.222-.293-.39-.388-.523-.093-.131-.167-.237-.233-.324l-.398.303c.06.078.125.172.224.311.098.137.224.31.399.538l.396-.305Zm-.643-.872-.001-.002-.354.354.002.001.353-.353Zm.021.024a9.92 9.92 0 0 1-.854-1.384c-.364-.714-.684-1.575-.684-2.372h-.5c0 .915.362 1.86.738 2.598.378.743.784 1.305.901 1.46l.4-.302Zm-1.538-3.756c0-.863.2-1.45.444-1.877.25-.433.545-.706.786-.965l-.367-.34c-.215.232-.567.56-.852 1.056-.29.505-.511 1.179-.511 2.126h.5Zm1.23-2.842c.18-.195.37-.215.422-.215v-.5c-.158 0-.492.055-.789.375l.367.34Zm1.018-.426h.397v-.5h-.397v.5Zm.15-.291-.036.217.493.081.036-.217-.493-.081Zm.21.008-.361.001.002.5.36-.001-.001-.5Zm-.11.251v-.218h-.5v.218h.5Zm2.647 2.77.217-.12-.245-.437-.217.122.245.436Zm-.14-.253.136.373.47-.172-.137-.373-.47.172Zm.167.143-.176.25.409.287.175-.249-.408-.288Zm.264.31-.178-.5-.47.167.177.5.471-.167Z",
                fill: "#474861",
                mask: "url(#a)"
            })
        ]
    });
/* harmony default export */ const icons_WhatsappIcon = (WhatsappIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WorkIcon.tsx



const WorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 25,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 3.531,
                y: 7.629,
                width: 18.216,
                height: 13.072,
                rx: 2,
                stroke: props.fill,
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M16.715 7.27V5.702a3 3 0 0 0-3-3h-2.149a3 3 0 0 0-3 3v1.57",
                stroke: props.fill,
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const icons_WorkIcon = (WorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WomanIcon.tsx



const WomanIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 48,
        height: 48,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 48,
                height: 48,
                rx: 24,
                fill: "#E2E6EF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M10.195 30V16h2.82l4.38 8.96 4.38-8.96h2.8v14h-1.98V18.56L17.375 29l-5.22-10.44V30h-1.96Zm17.227 0V16h6.48c.92 0 1.72.18 2.4.54.68.347 1.213.833 1.6 1.46s.58 1.353.58 2.18c0 .827-.193 1.553-.58 2.18a4.05 4.05 0 0 1-1.62 1.48c-.68.347-1.473.52-2.38.52h-4.38V30h-2.1Zm2.1-7.42h4.16c.827 0 1.48-.213 1.96-.64.493-.44.74-1.02.74-1.74s-.247-1.293-.74-1.72c-.48-.427-1.133-.64-1.96-.64h-4.16v4.74Z",
                fill: "#7A7C99"
            })
        ]
    });
/* harmony default export */ const icons_WomanIcon = (WomanIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ManIcon.tsx



const ManIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 49,
        height: 49,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                        id: "b",
                        //@ts-ignore
                        style: {
                            maskType: "alpha"
                        },
                        maskUnits: "userSpaceOnUse",
                        x: 6,
                        y: 38,
                        width: 39,
                        height: 17
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                        mask: "url(#b)",
                        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                            d: "M33.305 47.506c-1.837 7.05-9.69 11.106-17.54 9.06-7.85-2.045-12.724-9.419-10.887-16.469 1.838-7.05 9.69-11.106 17.54-9.06 7.85 2.045 12.724 9.419 10.887 16.469Z",
                            fill: "#AEB2C6"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M31.63 38.768c.083 1.033-.379 2.095-1.233 2.685l-3.675 2.54a2.527 2.527 0 0 1-2.83.03l-4.157-2.748a2.527 2.527 0 0 1-1.11-2.446l.014-.112a37.92 37.92 0 0 1 12.992.05Z",
                        fill: "#8789A2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                        id: "c",
                        //@ts-ignore
                        style: {
                            maskType: "alpha"
                        },
                        maskUnits: "userSpaceOnUse",
                        x: 19,
                        y: 31,
                        width: 12,
                        height: 13,
                        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                            d: "M29.923 33.574c.248 1.544.536 3.293.774 4.642.223 1.263-.406 2.66-1.536 3.266l-2.564 1.376c-.732.393-1.61.4-2.349.021l-3.14-1.612a2.528 2.528 0 0 1-1.336-2.68l.877-5.054a2.527 2.527 0 0 1 2.49-2.096h4.282c1.245 0 2.304.907 2.502 2.137Z",
                            fill: "#FFADB0"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                        mask: "url(#c)",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                                d: "M29.877 33.634c.294 2.173.654 4.767.922 6.514.176 1.146-.342 2.376-1.32 2.999l-2.723 1.732a2.527 2.527 0 0 1-2.671.027l-3.202-1.949a2.527 2.527 0 0 1-1.187-2.525l1-6.833a2.527 2.527 0 0 1 2.5-2.162h4.172c1.268 0 2.34.94 2.51 2.197Z",
                                fill: "#FFADB0"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                                d: "M40.486 34.825c-.45 1.891 1.07 8.52.566 9.483-.504.962-3.179 3.726-4.243 4.721-.85.797-2.034.433-2.518.151 0 0-4.085-2.553-4.719-3.758-.633-1.206.21-11.082-1.39-9.275-1.24 1.401 2.12-4.871 3.697-4.344 1.577.527 3.731.31 5.579-.644 3.27-1.687 3.476 1.774 3.028 3.666Z",
                                fill: "#FF888B"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M31.797 25.33c.086-.258.13-.528.13-.8v-2.002c0-.294.052-.586.152-.863l.308-.846a2.527 2.527 0 0 0-.675-2.734l-1.398-1.27a2.523 2.523 0 0 1-.365-.413l-2.338-3.312c-.396-.561-1.002-.947-1.687-.988-1.202-.07-2.728.01-3.348.63-.57.57-1.009 1.09-1.285 1.445a3.174 3.174 0 0 1-.65.643l-1.352.965a.444.444 0 0 0-.14.163c-.113.228-.01.5.235.572.57.168 1.18.302.854.628-.23.23-.682.788-1.128 1.358-.59.753-.671 1.777-.274 2.648.204.447.363.83.363.93 0 .149-.09.846-.172 1.45-.056.412-.013.831.129 1.222l.232.64a2.527 2.527 0 0 0 2.317 1.663l7.577.176a2.527 2.527 0 0 0 2.456-1.728l.06-.178Z",
                        fill: "#342660"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M19.669 24.535c.98-.367 2.073.13 2.44 1.11l.228.606a1.895 1.895 0 1 1-3.55 1.331l-.227-.606a1.895 1.895 0 0 1 1.109-2.44Z",
                        fill: "#FFADB0"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M31.184 24.535a1.896 1.896 0 0 0-2.44 1.11l-.228.606a1.895 1.895 0 1 0 3.55 1.331l.227-.606a1.896 1.896 0 0 0-1.109-2.44Z",
                        fill: "#FF888B"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M31.918 24.532c0 .271-.043.541-.13.8l-.059.177c-.07.212-.167.41-.285.59l-.485.545a2.525 2.525 0 0 1-.36.252l-1.014-5.33-7.274.52-1.776 4.661a2.526 2.526 0 0 1-1.155-1.35l-.233-.64a2.56 2.56 0 0 1-.129-1.221c.083-.605.172-1.302.172-1.451 0-.1-.159-.482-.363-.93a2.688 2.688 0 0 1-.242-1.252c.34.207.958.1 1.648-1.454 1.04-2.338 2.598-2.078 3.897 0 .626 1.002 1.725 1.08 2.784 1.153.697.049 1.376.096 1.891.405.406.406.46.37.739.185.078-.052.174-.116.3-.185 2.224-1.213 2.14.196 2.075 1.29-.018.31-.035.596.003.788l.023.077a2.517 2.517 0 0 0-.027.368v2.002Z",
                        fill: "#1F143E"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M29.974 34.366a50.42 50.42 0 0 1-2.007 2.026c-.851.797-2.034.432-2.52.15 0 0-3.653-2.283-4.585-3.55a2.528 2.528 0 0 1 2.333-1.555h4.17c1.269 0 2.34.94 2.51 2.197l.1.732Z",
                        fill: "#FF888B"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M30.886 23.222c-.52 1.559.52 7.176 0 7.955-.52.78-3.146 2.955-4.185 3.734-.831.624-1.905.26-2.338 0 0 0-3.636-2.338-4.156-3.377-.52-1.039.457-6.385 0-8.312-1.01-4.254 1.457-3.475 2.886-2.955 1.43.52 3.434.445 5.195-.26 3.117-1.247 3.117 1.657 2.598 3.215Z",
                        fill: "#FFD1D2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M21.698 19.876c.48.065.984.238 1.4.39 1.429.519 3.434.444 5.195-.26 3.117-1.247 3.117 1.656 2.598 3.215-.266.798-.123 2.662.01 4.394.126 1.65.243 3.18-.01 3.56-.52.78-3.146 2.955-4.185 3.735-.269.201-.562.3-.852.332a1.403 1.403 0 0 1-.03-.02s-3.55-2.498-4.058-3.61c-.253-.554-.142-2.259-.022-4.083.119-1.826.246-3.771.022-4.802-.306-1.413-.285-2.307-.068-2.85Z",
                        fill: "#FFADB0"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        x: 0.99,
                        y: 0.98,
                        width: 48,
                        height: 48,
                        rx: 24,
                        fill: "#fff"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_ManIcon = (ManIcon);

;// CONCATENATED MODULE: ./src/assets/icons/LogoBigIcon.tsx



const LogoBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 138,
        height: 94,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M2 52.499V.489h39.974V9.85h-29.2v11.888H30.01v9.065H12.774v12.334H42.27V52.5H2ZM49.89 52.499V.489h10.773v42.5H89.12v9.51H49.89ZM96.545 52.499V.489h40.197V9.85h-29.423v12.26h17.524v9.065h-17.524v21.324H96.545Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M0 92.872v-20.3h8.787c1.334 0 2.494.222 3.48.666.986.445 1.75 1.074 2.291 1.886.541.792.812 1.73.812 2.813 0 .986-.251 1.856-.754 2.61-.503.754-1.208 1.353-2.117 1.798 1.14.406 2.03 1.024 2.668 1.856.657.812.986 1.769.986 2.87 0 1.18-.29 2.204-.87 3.075-.58.87-1.392 1.546-2.436 2.03-1.044.464-2.272.696-3.683.696H0Zm3.045-11.688h5.568c1.14 0 2.05-.27 2.726-.811.677-.542 1.015-1.276 1.015-2.205 0-.928-.338-1.662-1.015-2.204-.677-.54-1.585-.811-2.726-.811H3.045v6.031Zm0 9.107h5.887c1.276 0 2.281-.3 3.016-.9.754-.599 1.131-1.41 1.131-2.435 0-1.006-.377-1.808-1.131-2.407-.735-.62-1.74-.928-3.016-.928H3.045v6.67ZM27.721 93.19c-1.76 0-3.287-.367-4.582-1.102a7.455 7.455 0 0 1-2.987-3.102c-.696-1.354-1.044-2.949-1.044-4.785V72.57h3.045v11.63c0 1.256.222 2.349.667 3.277.464.928 1.112 1.643 1.943 2.146.85.502 1.837.754 2.958.754 1.16 0 2.156-.252 2.987-.754.831-.503 1.47-1.218 1.914-2.146.464-.928.696-2.02.696-3.277V72.57h3.045v11.63c0 1.836-.358 3.431-1.073 4.785a7.456 7.456 0 0 1-2.987 3.102c-1.295.735-2.823 1.103-4.582 1.103ZM47.003 93.162a11.94 11.94 0 0 1-4.698-.958 12.492 12.492 0 0 1-4.002-2.697l1.856-2.145c1.102 1.082 2.223 1.885 3.364 2.407a8.739 8.739 0 0 0 3.625.782c.986 0 1.846-.135 2.58-.406.755-.29 1.335-.695 1.74-1.217a2.807 2.807 0 0 0 .61-1.77c0-.908-.32-1.604-.957-2.088-.638-.483-1.692-.85-3.161-1.101l-3.393-.551c-1.856-.33-3.248-.928-4.176-1.799-.909-.87-1.363-2.03-1.363-3.48 0-1.16.31-2.174.928-3.044.619-.89 1.488-1.576 2.61-2.06 1.14-.483 2.455-.724 3.944-.724 1.47 0 2.91.241 4.32.724 1.432.465 2.717 1.141 3.858 2.03l-1.682 2.32c-2.185-1.662-4.398-2.494-6.641-2.494-.89 0-1.663.126-2.32.377-.657.252-1.17.61-1.537 1.073a2.384 2.384 0 0 0-.551 1.567c0 .83.28 1.469.84 1.913.562.426 1.49.735 2.785.928l3.277.552c2.146.347 3.722.976 4.727 1.885 1.005.908 1.508 2.155 1.508 3.74 0 1.238-.338 2.33-1.015 3.278-.677.928-1.624 1.653-2.842 2.175-1.218.521-2.63.782-4.234.782ZM57.915 92.872v-20.3h3.045v20.3h-3.045ZM65.108 92.872v-20.3h2.958l11.34 15.08v-15.08h2.87v20.3h-2.668l-11.6-15.544v15.544h-2.9ZM86.434 92.872v-20.3h14.964v2.668h-11.92v6.09h7.83v2.58h-7.83v6.294h12.036v2.668h-15.08ZM111.517 93.162a11.94 11.94 0 0 1-4.698-.958 12.492 12.492 0 0 1-4.002-2.697l1.856-2.145c1.102 1.082 2.223 1.885 3.364 2.407a8.738 8.738 0 0 0 3.625.782c.986 0 1.846-.135 2.581-.406.754-.29 1.334-.695 1.74-1.217a2.807 2.807 0 0 0 .609-1.77c0-.908-.319-1.604-.957-2.088-.638-.483-1.692-.85-3.161-1.101l-3.393-.551c-1.856-.33-3.248-.928-4.176-1.799-.909-.87-1.363-2.03-1.363-3.48 0-1.16.309-2.174.928-3.044.618-.89 1.488-1.576 2.61-2.06 1.14-.483 2.455-.724 3.944-.724 1.469 0 2.909.241 4.321.724 1.43.465 2.716 1.141 3.857 2.03l-1.682 2.32c-2.185-1.662-4.399-2.494-6.641-2.494-.89 0-1.663.126-2.32.377-.658.252-1.17.61-1.537 1.073a2.38 2.38 0 0 0-.551 1.567c0 .83.28 1.469.841 1.913.56.426 1.488.735 2.784.928l3.277.552c2.146.347 3.721.976 4.727 1.885 1.005.908 1.508 2.155 1.508 3.74 0 1.238-.339 2.33-1.015 3.278-.677.928-1.624 1.653-2.842 2.175-1.218.521-2.63.782-4.234.782ZM129.585 93.162a11.94 11.94 0 0 1-4.698-.958 12.492 12.492 0 0 1-4.002-2.697l1.856-2.145c1.102 1.082 2.223 1.885 3.364 2.407a8.738 8.738 0 0 0 3.625.782c.986 0 1.846-.135 2.581-.406.754-.29 1.334-.695 1.74-1.217a2.807 2.807 0 0 0 .609-1.77c0-.908-.319-1.604-.957-2.088-.638-.483-1.692-.85-3.161-1.101l-3.393-.551c-1.856-.33-3.248-.928-4.176-1.799-.909-.87-1.363-2.03-1.363-3.48 0-1.16.309-2.174.928-3.044.619-.89 1.489-1.576 2.61-2.06 1.141-.483 2.455-.724 3.944-.724 1.469 0 2.91.241 4.321.724a12.477 12.477 0 0 1 3.857 2.03l-1.682 2.32c-2.185-1.662-4.398-2.494-6.641-2.494-.889 0-1.663.126-2.32.377-.657.252-1.17.61-1.537 1.073a2.385 2.385 0 0 0-.551 1.567c0 .83.28 1.469.841 1.913.561.426 1.489.735 2.784.928l3.277.552c2.146.347 3.722.976 4.727 1.885 1.005.908 1.508 2.155 1.508 3.74 0 1.238-.338 2.33-1.015 3.278-.677.928-1.624 1.653-2.842 2.175-1.218.521-2.629.782-4.234.782Z",
                fill: "#8789A2"
            })
        ]
    });
/* harmony default export */ const icons_LogoBigIcon = (LogoBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/AnimalWorkIcon.tsx



const AnimalWorkIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 34,
        height: 34,
        viewBox: "0 0 8.996 8.996",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
            style: {
                fill: "none"
            },
            transform: "scale(.26458)",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                    width: 34,
                    height: 34,
                    rx: 17,
                    fill: "#dcbd99"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M21.5 20.5c-.585-1.755-.857-3.5-4.357-3.5s-3.918 1.172-4.5 3.5c-.5 2-2.75.5-3.5 3.5-1 4 3.5 6.5 5.5 5s3.857-1.5 6 0C22.6 30.369 26.5 27 25 24c-1.128-2.256-2.915-1.745-3.5-3.5ZM28.494 18.075c-1.166 1.322-2.643 1.351-3.296.774-.654-.576-.808-2.046.359-3.367 1.166-1.321 2.643-1.35 3.296-.774.654.577.808 2.046-.359 3.367zM9.177 15.482c-1.166-1.32-2.643-1.35-3.297-.774-.653.577-.807 2.046.36 3.367 1.165 1.322 2.642 1.352 3.296.775.654-.577.807-2.046-.359-3.368zM15.198 9.756c-.552-2.075-2.215-3.029-3.42-2.709-1.206.32-2.176 1.975-1.624 4.05.551 2.074 2.214 3.028 3.42 2.707 1.205-.32 2.175-1.974 1.624-4.048zM24.198 11.097c-.552 2.074-2.215 3.028-3.42 2.708-1.206-.32-2.176-1.975-1.624-4.05.551-2.074 2.214-3.028 3.42-2.707 1.205.32 2.175 1.974 1.624 4.048z",
                    stroke: "#000",
                    strokeWidth: 2
                })
            ]
        })
    });
/* harmony default export */ const icons_AnimalWorkIcon = (AnimalWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/TransportWorkIcon.tsx



const TransportWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#FFC599"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M13.312 21.075h6.739v-9.016c0-.822-.667-1.49-1.489-1.49H6.982c-.823 0-1.489.667-1.489 1.49v9.016h1.77M26.897 21.075h1.751v-2.922c0-.284-1.07-3.094-1.49-4.108-.42-1.015-.666-1.49-1.49-1.49h-5.617v8.52h.797",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M4.5 21.075h.994M28.506 21.075h.994M28.166 16.815h-5.134M10.206 22.936a1.861 1.861 0 1 0 0-3.722 1.861 1.861 0 0 0 0 3.722ZM23.916 22.936a1.86 1.86 0 1 0 0-3.722 1.86 1.86 0 0 0 0 3.722Z",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round"
            })
        ]
    });
/* harmony default export */ const icons_TransportWorkIcon = (TransportWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/OfficeWorkIcon.tsx



const OfficeWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#D3EAFD"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m12.5 11.07.447-1.33c.166-.487.551-.9 1.043-1.157a2.509 2.509 0 0 1 1.497-.262c.274.038.55.125.816.268.337.182.586.34.8.473.782.493 1.077.679 3.47.679.032 0 .063.001.095.004.43.043.889.371 1.302.775.493.483.92 1.074 1.154 1.42l.033.048c.052.079.173.05.174-.045v-.072c-.002-.52-.125-1.152-.356-1.819a9.21 9.21 0 0 0-.955-1.955c-1.487-2.306-4.114-4.063-7.23-1.783-.264.192-.53.413-.8.665-1.479 0-2.225 1.058-2.081 2.41.056.53.25 1.106.59 1.68Zm.654-6.017c1.439-1.184 2.97-1.805 4.539-1.803 1.745.002 3.204.776 4.298 1.746 1.088.964 1.912 2.198 2.461 3.382.538 1.16.9 2.457.879 3.6a2.09 2.09 0 0 1-2.373 2.036 5.678 5.678 0 0 1-2.606 4.072l.104.979 3.735 1.165a6 6 0 0 1 4.139 4.792l.17 1.079a1.5 1.5 0 0 1-1.481 1.734H7.25a1.5 1.5 0 0 1-1.48-1.75l.285-1.689a5 5 0 0 1 3.492-3.96l4.337-1.302.181-.074v-1.132a5.672 5.672 0 0 1-2.409-4.357l-.878-1.482c-.807-1.362-1.162-3.003-.65-4.483.479-1.38 1.605-2.297 3.025-2.553Zm2.913 13.764v1.466l1.298 1.124 1.19-1.31-.133-1.245a5.706 5.706 0 0 1-2.355-.035Zm4.578-6.793c.125.129.247.27.36.41v.846a3.678 3.678 0 0 1-7.317.532l.708-2.106.185-.552.249-.737.004-.004a.418.418 0 0 1 .139-.082.447.447 0 0 1 .38.019c.275.148.468.269.678.401l.116.073c.253.158.597.37 1.046.535.82.304 1.771.374 3.139.381.076.058.183.15.313.284Zm-.411-.348.012.006a.08.08 0 0 1-.012-.006Zm-7.936 10.023-2.174.653a3 3 0 0 0-2.096 2.376l-.186 1.107h8.088l.726-1.984-2.512 1.535-1.846-3.687Zm9.82.34.183-.303 1.294.403a4 4 0 0 1 2.76 3.195l.078.5H18.71l-.786-2.013 2.573 1.573 1.621-3.354Zm-2.053-.63-.804.886.396.241.523-1.083-.115-.043Zm-5.107 1.136.39-.238-.899-.778.509 1.016Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_OfficeWorkIcon = (OfficeWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/BarWorkIcon.tsx



const BarWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#DDB5E4"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M19.422 11.715c.005-.066.02-.133.02-.2a2.114 2.114 0 0 0-2.113-2.112 2.114 2.114 0 0 0-2.113 2.112c0 .072.014.134.02.2h4.186Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M27.5 7h-3.936a.1.1 0 0 0-.09.058L20.5 13.5m0 0H7.741a.1.1 0 0 0-.07.17L15.5 21.5m5-8h2.759a.1.1 0 0 1 .07.17L15.5 21.5m0 0v8m0 0h-4m4 0h4",
                stroke: "#080914",
                strokeWidth: 2,
                strokeLinecap: "round"
            })
        ]
    });
/* harmony default export */ const icons_BarWorkIcon = (BarWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/SweetsWorkIcon.tsx



const SweetsWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#FCD"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M19.37 8.585c1.509-.596 1.575-.616 2.116-.655 1.009-.07 1.98.357 2.876 1.268.9.915 1.619 2.322 1.885 3.695.092.475.098.794.098 4.898 0 3.79-.011 4.45-.082 4.823-.267 1.408-.972 2.792-1.91 3.746-.857.872-1.695 1.265-2.7 1.265-.253 0-.59-.034-.75-.076-.475-.123-14.285-5.666-14.412-5.784l-.116-.108v-3.86c0-3.324.01-3.874.077-3.969.053-.076 1.4-.638 4.514-1.882l2.353-.941.36.744-2.242.897-.007.003-.01.004-.007.003-.1.04L7.9 14.062l.181.077c.1.042.853.345 1.673.673.82.328.9.36.97.407l7.586 3.093c.125 0 .546.142 1.153.39 1.315.533 1.84.697 2.243.697.688 0 1.302-.34 2.09-1.158 1.248-1.296 1.782-2.673 1.705-4.4-.093-2.105-1.256-4.049-2.955-4.942-.263-.139-.351-.158-.722-.158-.265 0-.563.04-.8.105-.307.085-1.676.613-1.834.707-.002-.001-.149.056-.404.157l-.319-.765.902-.36Zm3.259 11.538a6.403 6.403 0 0 0 1.728-1.266c.317-.316.646-.71.84-1.006l.32-.488v2.33c0 1.833-.016 2.425-.077 2.773-.229 1.315-.856 2.527-1.727 3.338-.433.403-1.28.936-1.494.94-.052.001-.062-.654-.052-3.193l.013-3.195.449-.233ZM7.241 21.215c.072.07 13.798 5.54 13.97 5.568l.17.028-.015-1.312-.013-1.312-1.725-.688-1.724-.688-3.035-1.194c-.052-.032-1.792-.738-3.867-1.568l-3.773-1.51-.014 1.32c-.008.724.004 1.335.026 1.356Zm-.012-3.565-.014-1.48c-.008-.813.004-1.477.026-1.475.022.003.848.334 1.837.736l1.487.608 2.66 1.07 5.064 2.036c.063.003.767.268 1.563.59l1.449.584.014 1.48.013 1.48-.194-.078-1.618-.64L18.093 22l-3.246-1.315s-1.86-.73-3.816-1.513L7.229 17.65Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m19.37 8.585.184.465-.184-.465Zm2.116-.655-.035-.498.035.498Zm2.876 1.268.356-.351-.356.35Zm1.885 3.695-.491.095.49-.095Zm.016 9.72-.491-.093.491.094Zm-1.91 3.747.357.35-.357-.35Zm-3.45 1.19-.126.483.126-.484ZM6.49 21.764l.34-.366-.34.366Zm-.116-.108-.34.366-.16-.148v-.218h.5Zm.077-7.829-.41-.286.41.286Zm4.514-1.882-.186-.465.186.465Zm10.058-3.1.134.482-.134-.482Zm-1.833.707.256.43-.334.198-.275-.273.353-.355Zm-7.878 3.143-.186-.464.186.464ZM7.9 14.062l-.194.46-1.12-.473 1.128-.451.186.464Zm.181.077.195-.46-.195.46Zm1.673.673.186-.464-.186.464Zm.97.407-.188.463-.045-.019-.04-.026.274-.418Zm7.586 3.093v.5h-.098l-.09-.037.188-.463Zm1.153.39.189-.464-.189.463Zm4.333-.461.36.347-.36-.347Zm1.705-4.4.5-.023-.5.022Zm-2.955-4.942-.233.442.233-.442ZM7.215 16.17l.5-.004-.5.004Zm.014 1.48-.186.464-.311-.124-.003-.335.5-.005Zm3.802 1.521-.186.464.186-.464Zm3.816 1.513.183-.466.005.002-.188.464Zm-1.526-3.547.18-.467-.18.466Zm-2.756-1.098-.186.463h-.003l.19-.463Zm-1.487-.608.189-.463-.189.463Zm15.279 3.426-.353-.354.353.354Zm-1.728 1.266-.23-.444.23.444Zm-.449.233-.5-.002.002-.303.268-.139.23.444Zm-.013 3.195-.5-.002.5.002Zm.052 3.193.009.5-.01-.5Zm1.494-.94.34.366-.34-.366Zm1.727-3.338.493.086-.493-.086Zm.077-5.103-.418-.274.918-1.4v1.674h-.5Zm-.32.488-.418-.275.419.274ZM7.242 21.215l-.346.36.346-.36Zm13.97 5.568-.08.494.08-.494Zm.17.028.5-.005.006.594-.587-.096.08-.493Zm-.015-1.312-.5.005.5-.005Zm-.013-1.312.185-.465.311.125.004.335-.5.005Zm-1.725-.688-.185.465.185-.465Zm-1.724-.688.183-.465h.002l-.185.465Zm-3.035-1.194-.183.465-.043-.016-.039-.024.265-.425Zm-3.867-1.568.185-.464-.185.464Zm-3.773-1.51-.5-.004.007-.73.678.27-.185.465Zm-.014 1.32.5.004-.5-.005Zm10.878 2.14-.183.465-.005-.002.188-.463Zm1.423.562.184-.465-.184.465Zm1.618.64.185-.464-.185.464Zm.194.078.5-.005.007.746-.692-.277.185-.464Zm-.013-1.48-.5.005.5-.005Zm-.014-1.48.187-.463.31.125.003.334-.5.004Zm-1.449-.584.187-.464-.187.464Zm-1.563-.59-.023.5-.085-.004-.079-.032.187-.464Zm-6.876-6.489.186.464-.186-.464Zm1.906-1.651-.186-.464.433-.173.203.42-.45.217Zm.36.744.45-.218.233.483-.498.2-.186-.465Zm4.79-2.804-.462.192-.195-.468.47-.188.186.464Zm.318.765.184.465-.457.18-.188-.453.461-.192Zm-7.367 2.943-.186-.464.186.464Zm.017-.007.186.464-.186-.464Zm7.75-4.526c.744-.294 1.16-.458 1.456-.549.326-.1.522-.119.808-.14l.07.998c-.254.018-.363.03-.582.097-.25.078-.622.222-1.385.524l-.367-.93Zm2.264-.688c1.192-.084 2.297.43 3.267 1.415l-.713.701c-.823-.836-1.658-1.177-2.483-1.119l-.07-.997Zm3.267 1.415c.976.991 1.736 2.49 2.02 3.95l-.982.19c-.25-1.284-.925-2.6-1.75-3.439l.712-.701Zm2.02 3.95c.104.537.107.928.107 4.994h-1c0-4.143-.009-4.39-.09-4.803l.983-.19Zm.107 4.994c0 1.894-.003 3.01-.014 3.701-.012.682-.032.98-.076 1.215l-.983-.187c.026-.139.047-.356.059-1.045.011-.68.014-1.787.014-3.684h1Zm-.09 4.916c-.285 1.498-1.033 2.974-2.045 4.003l-.713-.7c.863-.879 1.525-2.17 1.775-3.49l.983.187ZM24.71 26.71c-.93.946-1.89 1.415-3.056 1.415v-1c.842 0 1.558-.317 2.343-1.115l.713.7Zm-3.056 1.415c-.276 0-.66-.036-.877-.092l.252-.968c.103.027.394.06.625.06v1Zm-.877-.092a3.845 3.845 0 0 1-.287-.1c-.13-.048-.305-.115-.518-.197-.425-.164-1.005-.392-1.687-.661-1.365-.54-3.14-1.248-4.905-1.956-1.764-.708-3.518-1.416-4.839-1.955-.66-.269-1.213-.496-1.606-.66a36.537 36.537 0 0 1-.604-.26 1.586 1.586 0 0 1-.09-.045c-.004-.003-.047-.027-.09-.067l.68-.733a.49.49 0 0 0-.093-.068l.016.008.115.05c.104.046.257.11.451.192.389.162.94.388 1.599.657a1059.105 1059.105 0 0 0 9.734 3.907 250.95 250.95 0 0 0 2.186.852c.139.051.191.069.19.068l-.252.968ZM6.15 22.132l-.116-.109.68-.732.117.108-.68.733Zm-.276-.475v-3.86h1v3.86h-1Zm0-3.86c0-1.66.003-2.634.014-3.205.005-.283.013-.48.025-.615a1.59 1.59 0 0 1 .027-.193.662.662 0 0 1 .101-.242l.82.573a.4.4 0 0 0 .047-.09l.01-.03s-.002.004-.003.017a9.008 9.008 0 0 0-.027.6c-.011.559-.014 1.522-.014 3.185h-1Zm.167-4.256a.543.543 0 0 1 .167-.155c.03-.02.063-.037.093-.052.06-.032.139-.07.233-.112a31.5 31.5 0 0 1 .834-.358c.736-.308 1.854-.76 3.411-1.383l.371.929a270.677 270.677 0 0 0-3.397 1.376c-.366.153-.63.267-.805.346-.089.04-.148.069-.184.088l-.02.01c.002 0 .012-.007.026-.019.008-.006.05-.039.09-.096l-.819-.574Zm15.116-4.213c-.125.034-.519.177-.926.335a26.595 26.595 0 0 0-.727.293l-.058.027-.512-.86c.078-.046.235-.113.375-.17.16-.066.36-.145.562-.224.393-.151.837-.315 1.019-.365l.267.964Zm-9.66 3.832-3.41 1.366-.373-.928 3.412-1.366.371.928Zm-3.402.441.181.077-.39.921-.18-.076.389-.921Zm.181.077c.094.04.84.34 1.664.67l-.371.928c-.817-.327-1.577-.632-1.682-.677l.39-.92Zm1.664.67c.408.163.638.255.773.312.133.055.208.09.285.14l-.547.837h-.001l-.002-.002-.008-.003a2.376 2.376 0 0 0-.112-.05 68.524 68.524 0 0 0-.76-.306l.372-.928Zm8.37 3.464c.1 0 .204.024.273.042.082.022.178.051.282.087.21.07.478.172.787.297l-.377.926a13.505 13.505 0 0 0-.73-.276 3.222 3.222 0 0 0-.212-.066c-.064-.016-.06-.01-.023-.01v-1Zm1.341.426c1.342.545 1.77.66 2.055.66v1c-.52 0-1.144-.21-2.43-.734l.375-.926Zm2.055.66c.487 0 .978-.223 1.73-1.004l.72.694c-.823.854-1.56 1.31-2.45 1.31v-1Zm1.73-1.004c1.158-1.202 1.636-2.447 1.566-4.031l.999-.045c.083 1.87-.506 3.38-1.845 4.77l-.72-.694Zm1.566-4.031c-.087-1.948-1.165-3.72-2.689-4.522l.466-.885c1.874.986 3.121 3.101 3.222 5.362l-1 .045ZM22.314 9.34a.776.776 0 0 0-.194-.084 1.503 1.503 0 0 0-.295-.016v-1c.184 0 .348.004.508.039.17.037.307.103.447.176l-.466.885Zm-.49-.1c-.223 0-.476.034-.666.087l-.267-.964c.284-.079.627-.123.934-.123v1ZM7.716 16.166l.014 1.48-1 .009-.014-1.48 1-.01Zm-.3 1.02 3.802 1.52-.372.93-3.802-1.522.371-.928Zm7.124.965c.044.035.072.042-.001.009a8.054 8.054 0 0 0-.245-.103 92.88 92.88 0 0 0-1.154-.454l.363-.933c.556.217.928.363 1.168.46.12.049.21.087.277.117.044.02.137.061.208.116l-.616.788Zm-4.163-1.65-1.487-.607.378-.926 1.487.608-.378.925Zm-1.486-.607a269.183 269.183 0 0 0-1.782-.715.996.996 0 0 0-.021-.008l.006.002.018.005c.001 0 .031.01.07.014l.119-.993c.04.005.071.014.074.014a.666.666 0 0 1 .089.03l.118.046.402.16 1.284.519-.377.926Zm-1.708-.702a.499.499 0 0 0 .495-.254c.03-.054.041-.1.044-.11a.388.388 0 0 0 .007-.033l.001-.01v.014l-.003.038a8.954 8.954 0 0 0-.01.299c-.004.261-.005.626-.001 1.03l-1 .01c-.004-.41-.003-.785.002-1.058.002-.136.006-.25.01-.335.002-.04.005-.082.01-.12a.523.523 0 0 1 .18-.35.501.501 0 0 1 .383-.114l-.118.993Zm17.528 4.02a6.903 6.903 0 0 1-1.85 1.355l-.461-.888a5.913 5.913 0 0 0 1.605-1.176l.706.708Zm-1.85 1.355-.45.233-.46-.888.449-.233.46.888Zm-.18-.209-.013 3.195-1-.005.013-3.194 1 .004Zm-.013 3.195a147.31 147.31 0 0 0 .003 2.539c.003.24.01.387.016.47.004.046.006.052.003.038a.49.49 0 0 0-.479-.356l.017 1a.51.51 0 0 1-.457-.27.597.597 0 0 1-.056-.151 1.304 1.304 0 0 1-.025-.18 9.21 9.21 0 0 1-.02-.535c-.007-.487-.007-1.29-.002-2.56l1 .005Zm-.457 2.691c-.056.001-.081.015-.05.004.02-.007.054-.021.102-.045a5.537 5.537 0 0 0 1.11-.765l.681.732a6.499 6.499 0 0 1-1.352.931c-.068.034-.14.065-.208.09a.852.852 0 0 1-.265.053l-.018-1Zm1.162-.806c.782-.728 1.363-1.836 1.576-3.058l.985.172c-.246 1.409-.919 2.724-1.88 3.618l-.68-.732Zm1.576-3.058c.051-.294.07-.83.07-2.687h1c0 1.81-.015 2.457-.085 2.86l-.985-.173Zm.07-2.687v-2.33h1v2.33h-1Zm.918-2.056-.32.488-.837-.549.32-.487.837.548Zm-.32.488a7.49 7.49 0 0 1-.906 1.086l-.706-.708c.3-.298.604-.665.775-.927l.837.549Zm-18.03 2.729c-.038-.038-.075-.06-.08-.062-.01-.008-.02-.013-.024-.015l-.01-.005a.035.035 0 0 1 .003.001l.013.006.113.049.443.182a1620.876 1620.876 0 0 0 12.702 5.063 55.814 55.814 0 0 0 .605.23c.02.007-.015-.006-.06-.013l-.16.987a.943.943 0 0 1-.144-.041 377.979 377.979 0 0 1-2.204-.86 1699.634 1699.634 0 0 1-11.117-4.44 56.435 56.435 0 0 1-.581-.242 1.861 1.861 0 0 1-.077-.037.534.534 0 0 1-.03-.017c-.006-.003-.043-.026-.083-.064l.692-.722Zm13.706 5.436.169.027-.161.987-.17-.027.162-.987Zm-.412.526-.014-1.312 1-.01.014 1.312-1 .01Zm-.014-1.312-.013-1.312 1-.01.013 1.312-1 .01Zm.301-.853-1.724-.688.37-.928 1.725.688-.37.928Zm-1.724-.688-1.724-.687.37-.93 1.725.689-.37.928Zm-4.839-1.922c.035.022.065.033.033.02a646.568 646.568 0 0 0-3.821-1.547l.372-.93a639.146 639.146 0 0 1 3.537 1.43 26.847 26.847 0 0 1 .318.132s.05.022.09.047l-.528.848Zm-3.788-1.528-3.773-1.509.371-.928 3.774 1.509-.372.928ZM7.73 18.545l-.014 1.318-1-.01.014-1.318 1 .01Zm-.014 1.318c-.004.36-.003.688.002.928a8.031 8.031 0 0 0 .013.33l-.005-.025a.446.446 0 0 0-.017-.058c-.004-.01-.035-.101-.121-.184l-.692.722c-.088-.084-.12-.178-.125-.192a.555.555 0 0 1-.033-.145 1.937 1.937 0 0 1-.01-.115 8.945 8.945 0 0 1-.01-.314 34.137 34.137 0 0 1-.002-.957l1 .01Zm10.562 1.671 1.423.562-.368.93-1.422-.562.367-.93Zm1.423.562 1.619.64-.37.93-1.617-.64.368-.93Zm1.619.64.195.078-.371.93-.195-.079.371-.928Zm-.49.547-.014-1.48 1-.009.013 1.48-1 .01Zm-.014-1.48-.014-1.48 1-.008.014 1.48-1 .009Zm.299-1.02-1.449-.584.374-.928 1.449.585-.374.927Zm-1.449-.584c-.395-.16-.767-.305-1.046-.41a14.27 14.27 0 0 0-.423-.152l-.008-.003.017.004c.007.001.03.005.061.007l.046-1c.058.003.107.016.116.018l.06.017c.035.01.078.025.124.041.093.032.217.078.36.132.288.108.666.256 1.067.418l-.374.928Zm-8.538-7.967.1-.04.372.928-.1.04-.372-.928Zm.472.888-.1.04-.372-.928.1-.04.372.928Zm-.819-1.639 2.353-.94.371.928-2.353.941-.37-.929Zm2.989-.694.36.744-.9.436-.36-.744.9-.436Zm4.514-2.306.903-.361.368.93-.9.36-.371-.93Zm.32.764a65.118 65.118 0 0 1 .438-.17.508.508 0 0 1 .202-.02c.02.003.171.015.3.143l-.705.71a.499.499 0 0 0 .463.133l.035-.01.01-.003.004-.001-.01.004-.075.028-.294.116-.368-.93Zm.327-.492.319.765-.923.384-.32-.765.924-.384Zm-7.703 3.439.007-.003.372.928-.007.003-.372-.928Zm0 0 .007-.003.372.928-.007.003-.372-.928Zm-.313 2.564 7.586 3.093-.377.926-7.586-3.093.377-.926Zm.303 3.95a685.212 685.212 0 0 0 3.492 1.386l.237.093.062.025.016.006.004.002h.001l-.182.466-.183.465h-.001l-.004-.002-.016-.006-.063-.025-.238-.093a614.945 614.945 0 0 1-3.497-1.388l.372-.928Zm3.818 1.514 3.246 1.316-.375.926-3.247-1.315.376-.927Zm.017.932 3.035 1.194-.366.93-3.035-1.194.366-.93Zm-3.818-8.963.01-.004.371.928-.01.004-.371-.928Zm2.63.024-2.24.897-.373-.928c.539-.216 1.347-.54 2.242-.897l.371.928Zm-2.241.897-.008.004-.371-.929.007-.003.372.928Zm-.38-.925.005-.001.003-.002.372.928-.004.002-.004.002-.371-.929Zm-.009.004.01-.004.371.928a.393.393 0 0 0-.01.004l-.371-.928Zm-.482 3.386 2.659 1.07-.373.927-2.66-1.07.374-.927Zm2.659 1.07 5.065 2.036-.373.928-5.065-2.037.373-.928Zm-.271.957c.002.001.002.002 0 0a.133.133 0 0 0-.014-.003l-.004-.001.205-.98c.07.016.134.037.175.052l-.362.932Zm-.018-.004c-.018-.004.023.008.09-.002a.47.47 0 0 0 .39-.46h-1a.53.53 0 0 1 .468-.53.75.75 0 0 1 .257.013l-.205.979Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M16.212 5.732c.989.525 1.539 1.409 1.53 2.459l-.004.31.403.167c.518.216.73.361 1.124.767.668.69 1.02 1.653.93 2.543l-.03.294c-.075.938-.654 1.515-.828 1.686-.174.17-.817.688-1.235.844-1.29.482-2.657.167-3.62-.834-.504-.526-.9-1.56-.875-2.292-.027-.527.044-.766.212-1.164.027-.006.075-.09.107-.185.079-.234.35-.622.646-.92a3.179 3.179 0 0 1 1.883-.938c.445-.055.436-.04.364-.614-.083-.666-.638-1.261-1.425-1.528-.25-.084-.315-.129-.39-.265a.471.471 0 0 1 .065-.524c.146-.177.58-.104 1.143.194Zm.632 4.754c.16-.007.333-.235.512-.673l.174-.428.25.087c.575.2 1.046.649 1.322 1.26.183.406.24.727.21 1.183-.055.81-.502 1.499-1.23 1.898-.633.347-1.27.406-1.942.18-1.189-.4-1.876-1.667-1.548-2.855.198-.713.606-1.242 1.193-1.546.245-.126.717-.277.79-.253.016.005-.041.168-.126.362-.147.337-.15.361-.07.522a.495.495 0 0 0 .465.263Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m16.212 5.732.234-.441-.234.441Zm1.53 2.459-.5-.005.5.005Zm-.004.31-.192.46-.31-.129.002-.336.5.004Zm.403.167.192-.461-.192.461Zm1.124.767.358-.349-.358.349Zm.93 2.543.497.051-.497-.05Zm-.03.294-.5-.04.002-.011.497.05Zm-6.346-1.76-.46-.195.099-.233.247-.058.114.486Zm.753-1.106.356.352-.356-.352Zm1.883-.937.061.496-.061-.496Zm.364-.614.496-.061-.496.061Zm-1.425-1.528.16-.473-.16.473Zm-.39-.265-.438.24.439-.24Zm.065-.524.386.318-.386-.318Zm2.287 4.275.463.189-.463-.189Zm-.512.673.022.5-.022-.5Zm-.465-.263.447-.223-.447.223Zm.07-.522-.458-.2.458.2Zm-.664-.109-.23-.444.23.444Zm-1.193 1.546.482.133-.482-.133Zm1.548 2.855.16-.474-.16.474Zm1.942-.18-.24-.438.24.438Zm1.23-1.898-.5-.034.5.034Zm-.21-1.183.455-.206-.455.206Zm-1.323-1.26-.164.472.164-.472Zm-.249-.087-.463-.188.18-.44.448.156-.165.472Zm.572 5.417.175.468-.175-.468Zm-3.62-.834.361-.347-.36.347Zm-.875-2.292.5-.026V11.692l-.5-.016Zm2.839-6.385c1.14.604 1.806 1.652 1.795 2.904l-1-.009c.008-.848-.426-1.568-1.264-2.012l.469-.883Zm1.795 2.904-.003.31-1-.01.003-.309 1 .009Zm-.31-.156.402.168-.385.923-.402-.168.385-.923Zm.402.168c.272.113.49.219.698.36.208.142.386.307.592.52l-.717.696a2.84 2.84 0 0 0-.438-.39 2.809 2.809 0 0 0-.52-.264l.385-.922Zm1.29.88c.763.786 1.176 1.893 1.069 2.942l-.995-.102c.075-.73-.217-1.552-.791-2.144l.718-.697Zm1.069 2.942-.03.294-.995-.102.03-.294.995.102Zm-6.987-2.003a.47.47 0 0 0-.261.168.11.11 0 0 0-.006.01l.005-.01a.259.259 0 0 0 .01-.025l.948.317c-.025.075-.059.15-.097.217a.77.77 0 0 1-.082.118c-.016.018-.114.137-.288.178l-.229-.973Zm-.253.143c.062-.185.182-.387.306-.565.13-.186.29-.38.458-.55l.712.704a3.362 3.362 0 0 0-.35.42c-.106.15-.161.259-.177.308l-.949-.317Zm.764-1.114a3.679 3.679 0 0 1 2.177-1.082l.123.992a2.68 2.68 0 0 0-1.588.793l-.712-.703Zm2.177-1.082c.06-.007.101-.012.138-.018a.653.653 0 0 0 .057-.01c.005 0-.022.005-.059.027a.36.36 0 0 0-.128.13.323.323 0 0 0-.044.119c-.002.014 0 .015-.001-.01a1.8 1.8 0 0 0-.01-.11l-.023-.184.992-.123c.017.131.034.263.04.367a.793.793 0 0 1-.094.451.672.672 0 0 1-.43.304c-.098.025-.223.038-.315.05l-.123-.993Zm-.07-.056c-.053-.426-.432-.893-1.09-1.116l.32-.947c.917.31 1.65 1.034 1.762 1.94l-.992.123Zm-1.09-1.116a1.556 1.556 0 0 1-.38-.174.893.893 0 0 1-.287-.325l.877-.48c.01.018.01.016.003.007a.157.157 0 0 0-.03-.028l.02.009c.024.01.06.024.118.044l-.32.947Zm-.667-.499a.97.97 0 0 1 .117-1.082l.772.636c-.005.006-.004.008-.003.003 0-.006 0-.02-.009-.037l-.877.48Zm.117-1.082c.257-.312.657-.295.885-.256.27.046.571.164.878.327l-.469.883a2.086 2.086 0 0 0-.576-.224c-.063-.01-.084-.006-.077-.007a.243.243 0 0 0 .131-.087l-.772-.636Zm3.136 4.782a2.724 2.724 0 0 1-.328.612c-.11.143-.314.358-.625.371l-.044-.999a.274.274 0 0 0-.143.044c-.014.01-.007.008.016-.022.047-.062.116-.183.198-.384l.926.378Zm-.953.983a.995.995 0 0 1-.934-.538l.894-.447c-.006-.012-.012-.016-.011-.015l.007.001.044 1Zm-.934-.538c-.043-.085-.13-.253-.1-.486.022-.155.098-.322.159-.46l.916.4a4.31 4.31 0 0 0-.086.21l.003-.017a.273.273 0 0 0-.009-.112l-.004-.014a.824.824 0 0 0 .015.032l-.895.447Zm.059-.946c.04-.09.07-.167.087-.217l.01-.03a.296.296 0 0 0-.009.068.497.497 0 0 0 .338.491l.317-.948a.504.504 0 0 1 .344.51.632.632 0 0 1-.017.112c-.01.044-.026.09-.04.128-.028.08-.068.182-.114.287L15.99 9.5Zm.427.312a.437.437 0 0 0 .162.022c.006 0 0 0-.019.004a2.785 2.785 0 0 0-.547.197l-.459-.888a3.74 3.74 0 0 1 .795-.286c.039-.009.085-.017.132-.022.023-.002.133-.015.252.025l-.317.948Zm-.403.223c-.448.232-.776.639-.94 1.236l-.964-.267c.229-.83.718-1.482 1.444-1.857l.46.888Zm-.94 1.236c-.256.924.28 1.93 1.225 2.247l-.319.948c-1.434-.482-2.272-2.011-1.87-3.462l.963.266Zm1.225 2.247c.536.18 1.029.136 1.541-.144l.481.877c-.752.412-1.535.486-2.341.215l.319-.948Zm1.541-.144c.583-.32.929-.86.972-1.494l.997.068c-.066.984-.615 1.824-1.488 2.303l-.48-.877Zm.972-1.494a1.735 1.735 0 0 0-.167-.943l.911-.412c.219.483.29.887.253 1.423l-.997-.068Zm-.167-.943c-.226-.5-.598-.843-1.031-.994L17.944 9c.719.25 1.287.804 1.613 1.526l-.91.412Zm-1.031-.994-.25-.087.33-.944.249.087-.33.944Zm.378-.37-.174.428-.926-.378.174-.427.926.377Zm1.694 4.74c-.11.11-.336.297-.583.476-.24.174-.55.377-.826.48l-.35-.937c.14-.053.36-.186.59-.353.223-.161.406-.317.47-.38l.7.715Zm-1.41.956c-1.478.553-3.056.188-4.155-.956l.721-.693c.826.859 1.984 1.124 3.084.712l.35.937Zm-4.155-.956c-.312-.325-.568-.78-.743-1.236-.174-.457-.287-.967-.271-1.419l1 .034c-.01.28.062.653.206 1.028.143.375.337.7.53.9l-.722.693Zm6.54-2.003c-.089 1.13-.784 1.817-.975 2.004l-.7-.714c.158-.155.62-.621.679-1.369l.997.08Zm-7.554-.61a2.963 2.963 0 0 1 .042-.754c.045-.226.122-.423.209-.63l.92.39a2.235 2.235 0 0 0-.149.437 1.983 1.983 0 0 0-.023.506l-.999.051Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_SweetsWorkIcon = (SweetsWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FloweryWorkIcon.tsx



const FloweryWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#D3FCB8"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.5 17a1 1 0 0 0-2 0h2Zm-2 13a1 1 0 1 0 2 0h-2Zm0-13v13h2V17h-2Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M15.079 3.058a3.318 3.318 0 0 0-.54.205c-.252.123-.382.218-.654.482-.29.282-.363.38-.51.676-.193.39-.284.769-.284 1.176 0 .367.065.972.146 1.362.037.177.065.324.063.327a6.403 6.403 0 0 1-.352-.188c-.352-.196-1.152-.522-1.456-.593a2.677 2.677 0 0 0-.972-.045A2.615 2.615 0 0 0 8.536 7.86c-.223.443-.29.766-.264 1.276l.02.398-.181.194c-.229.246-.376.498-.506.868-.091.258-.103.346-.105.766-.002.398.012.517.085.747.146.46.324.75.674 1.097.36.358.699.544 1.282.708.361.1 1.103.235 1.299.235.066 0 .127.008.137.017.01.01-.177.21-.415.447-.932.924-1.237 1.5-1.24 2.342-.001.572.126.988.447 1.464.37.547 1.047.974 1.695 1.07.147.02.168.039.277.232.255.45.626.794 1.108 1.024.388.186.696.254 1.152.254.456 0 .764-.068 1.152-.254.403-.193.678-.42.962-.79.255-.333.623-.953.77-1.296.049-.114.098-.208.108-.208.01 0 .085.143.167.317.338.717.773 1.34 1.162 1.66.258.212.72.44 1.05.515.343.08.926.073 1.271-.013.687-.172 1.298-.637 1.614-1.226l.099-.184.29-.059c.925-.187 1.695-.918 1.951-1.85.088-.32.089-.956.002-1.274-.151-.552-.449-.993-1.149-1.7a6.51 6.51 0 0 1-.437-.464c0-.013.057-.024.127-.024.2 0 .938-.133 1.304-.235.584-.164.922-.35 1.283-.708.478-.474.72-.992.767-1.642.05-.708-.21-1.446-.67-1.897l-.13-.127.021-.389c.025-.44-.018-.723-.165-1.087a2.615 2.615 0 0 0-1.243-1.343c-.44-.216-.708-.276-1.22-.274-.38.002-.468.015-.798.121-.449.145-.93.35-1.287.548-.146.082-.274.14-.285.13-.01-.01.009-.154.042-.32.194-.96.172-1.799-.06-2.342a3.04 3.04 0 0 0-.58-.848c-.505-.496-1.106-.736-1.846-.737-.417 0-.697.058-1.048.218l-.232.106-.233-.106a3.239 3.239 0 0 0-.453-.162c-.279-.07-.924-.07-1.228.002Zm1.514 1.32a2.192 2.192 0 0 0-.401-.21c-.24-.088-.687-.099-.937-.022a1.573 1.573 0 0 0-.876.738c-.149.292-.187.525-.16.992.075 1.356.553 2.57 1.445 3.675.102.126.204.222.228.212.023-.01.154-.053.292-.096l.251-.079a3.572 3.572 0 0 1 1.115-.004l.303.097c.166.054.305.094.31.088.003-.005.11-.146.238-.312.79-1.027 1.207-2.038 1.343-3.25.026-.224.037-.546.026-.717a1.457 1.457 0 0 0-.483-1.017c-.287-.255-.535-.355-.924-.374-.387-.018-.59.038-.931.26-.204.131-.262.152-.44.152-.175 0-.231-.018-.4-.134ZM14.12 9.371c-.714-.799-1.912-1.55-2.846-1.785a2.045 2.045 0 0 0-.41-.065 1.537 1.537 0 0 0-1.347.854c-.16.334-.178.61-.068 1.05l.085.342-.081.164a.77.77 0 0 1-.23.266 1.41 1.41 0 0 0-.495.598c-.104.215-.115.273-.114.585 0 .406.085.658.313.941.264.328.646.504 1.45.667.462.094 1.46.13 1.957.07a7.901 7.901 0 0 0 1.481-.34l.372-.124v-.643c.084-.486.17-.705.351-1.045.034 0 .373-.45.373-.494 0-.053-.52-.738-.791-1.041Zm10.42.05c.247-.866-.27-1.704-1.15-1.867-.361-.066-.61-.024-1.176.2a6.55 6.55 0 0 0-2.368 1.64c-.247.277-.772.971-.772 1.02 0 .045.341.492.375.492.196.368.277.593.35 1.047l-.011.303c-.008.217.002.31.037.332.098.062.952.32 1.311.396.275.058.556.083 1.078.097.613.017.769.01 1.178-.059.59-.098 1.112-.257 1.345-.408.228-.148.44-.41.549-.678.067-.166.085-.282.086-.558.001-.33-.006-.363-.138-.624a1.423 1.423 0 0 0-.316-.43l-.278-.245c-.167-.146-.195-.328-.1-.658Zm-6.342 1.725a1.56 1.56 0 0 0-.68-.42c-.438-.145-1.03-.078-1.412.159-.2.124-.463.397-.574.598-.462.832-.13 1.831.75 2.258.247.12.311.134.632.147.54.02.931-.128 1.284-.489a1.605 1.605 0 0 0 0-2.253ZM14.9 14.1c-.01-.026-.09-.14-.176-.253-.087-.114-.176-.206-.199-.205-.066.002-.803.235-1.015.32a7.05 7.05 0 0 0-1.723 1.01c-.542.444-1.114 1.108-1.254 1.457-.227.565-.08 1.187.378 1.612.296.275.5.353 1.027.394.437.034.495.085.707.61.118.294.39.576.699.725.233.113.269.12.657.12.389 0 .423-.007.659-.12.314-.152.565-.418.878-.933.39-.644.629-1.251.79-2.016.055-.26.081-.559.096-1.106l.02-.749-.307-.099a2.364 2.364 0 0 0-.314-.089c-.436-.173-.63-.326-.923-.678Zm8.298 1.903c-.772-1.007-1.906-1.794-3.158-2.193-.648-.207-.595-.211-.794.063-.095.13-.172.245-.172.257-.281.304-.5.457-.91.648a2.318 2.318 0 0 0-.316.09l-.307.099.02.748c.036 1.267.279 2.119.892 3.13.307.506.56.774.873.925.235.113.27.12.658.12.366 0 .431-.01.622-.098.385-.177.69-.527.812-.933.057-.191.286-.408.434-.411.802-.019 1.262-.265 1.551-.829.27-.524.197-1.093-.205-1.616Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m15.079 3.058-.092-.39.092.39Zm-.54.205-.173-.36.174.36Zm-.654.482-.279-.287.28.287Zm-.51.676-.358-.178.358.178Zm-.138 2.538.392-.082-.392.082Zm.063.327-.276-.29-.002.002.278.288Zm-.352-.188.195-.35-.195.35Zm-1.456-.593.092-.39-.091.39Zm-.972-.045-.056-.396.056.396ZM8.536 7.86l.357.18-.357-.18Zm-.264 1.276-.4.02.4-.02Zm.02.398.293.273.115-.124-.009-.17-.4.021Zm-.181.194-.293-.273.293.273Zm-.506.868.377.133-.377-.133Zm-.105.766.4.001-.4-.001Zm.085.747-.382.12.382-.12Zm.674 1.097-.282.284.282-.284Zm1.282.708.108-.386-.108.386Zm1.436.252.28-.285-.28.285Zm-.415.447-.282-.284.282.284Zm-1.24 2.342.4.002-.4-.002Zm.447 1.464.332-.224-.332.224Zm1.695 1.07-.058.395.058-.396Zm.277.232-.348.196.348-.196Zm1.108 1.024-.173.361.173-.36Zm2.304 0-.173-.36.173.36Zm.962-.79.318.243-.318-.243Zm.77-1.296-.368-.157.368.157Zm.275.109.362-.17-.362.17Zm1.162 1.66-.254.309.254-.309Zm1.05.515-.09.39.09-.39Zm1.271-.013.098.388-.098-.388Zm1.614-1.226-.353-.189.353.19Zm.099-.184-.08-.392-.184.038-.089.165.353.19Zm.29-.059.08.392-.08-.392Zm1.951-1.85-.386-.106.386.106Zm.002-1.274.386-.105-.386.105Zm-1.149-1.7.284-.281-.284.281Zm.994-.723-.108-.386.108.386Zm1.283-.708.281.284-.281-.284Zm.767-1.642.398.029-.398-.029Zm-.67-1.897.28-.286-.28.286Zm-.13-.127-.4-.023-.01.181.13.127.28-.285Zm.021-.389.4.023-.4-.023Zm-.165-1.087.37-.15-.37.15Zm-1.243-1.343.177-.359-.177.36Zm-1.22-.274-.001-.4.002.4Zm-.798.121.123.381-.123-.38Zm-1.287.548-.194-.35.194.35Zm-.285.13-.28.285.28-.285Zm.042-.32-.392-.08.392.08Zm-.06-2.342-.368.157.368-.157Zm-.58-.848-.28.286.28-.286ZM18.274 3v.4V3Zm-1.048.218.166.363-.166-.363Zm-.232.106-.166.363.166.076.166-.076-.166-.363Zm-.233-.106-.166.363.166-.363Zm-.453-.162-.098.387.098-.387Zm-.115 1.112.137-.376-.137.376Zm.4.21.227-.33-.226.33Zm.4.133v-.4.4Zm.44-.153-.218-.335.218.335Zm.93-.259.02-.4-.02.4Zm.925.374-.265.299.265-.3Zm.483 1.017.4-.026-.4.026Zm-.026.717.398.045-.398-.045Zm-1.343 3.25-.317-.243.317.243Zm-.548.224-.123.381.123-.38Zm-.303-.097.123-.381-.035-.011-.036-.005-.052.397Zm-1.115.004-.053-.396-.034.004-.032.01.12.382Zm-.25.079-.12-.382.12.382Zm-.293.096-.155-.369.155.369Zm-.228-.212-.31.252.31-.252Zm-1.446-3.675-.4.022.4-.022Zm.161-.992-.356-.182.356.182Zm.876-.738-.117-.383.117.383Zm-3.981 3.441.097-.388-.097.388Zm2.846 1.785.298-.266-.298.266Zm.418 1.535v-.4h-.24l-.113.212.353.188Zm-.351 1.045-.394-.069-.006.034v.035h.4Zm0 .643.126.38.274-.091v-.289h-.4Zm-.372.123-.126-.38.126.38Zm-1.48.342-.048-.397.047.397Zm-1.958-.07-.08.391h.001l.08-.392Zm-1.45-.668-.312.251.312-.25Zm-.313-.941h-.4.4Zm.114-.585.36.174-.36-.174Zm.495-.598-.225-.33.225.33Zm.23-.266.359.178-.36-.178Zm.081-.164.359.177.065-.132-.036-.142-.388.097Zm-.085-.342-.388.097.388-.097Zm.068-1.05.36.172-.36-.172Zm1.347-.854.012.4-.012-.4Zm12.525.033.073-.393-.073.393Zm1.15 1.867-.384-.11.385.11Zm.1.658-.263.3v.001l.264-.3Zm.28.245-.264.3.263-.3Zm.315.43.357-.18-.357.18Zm.138.624-.4-.002.4.002Zm-.086.558.37.15-.37-.15Zm-.549.678-.218-.335.218.335Zm-1.345.408-.066-.394.066.394Zm-1.178.06-.01.4.01-.4Zm-1.078-.098.083-.392-.083.392Zm-1.311-.396-.214.338.214-.338Zm-.037-.332-.4-.015.4.015Zm.01-.303.4.015.002-.039-.006-.038-.395.063Zm-.348-1.047.353-.188-.113-.212h-.24v.4Zm.396-1.512-.298-.266.298.266Zm2.368-1.64.147.372-.147-.372Zm-4.697 2.971-.125.38.125-.38Zm.68.421-.285.28.286-.28Zm0 2.253-.285-.28.286.28Zm-1.283.489.016-.4-.016.4Zm-.632-.147-.174.36.174-.36Zm-.75-2.258.35.194-.35-.194Zm.574-.598-.21-.34.21.34Zm-1.382 2.96.318-.242-.318.243Zm.176.254-.373.146.024.06.041.05.308-.256Zm.923.678-.147.372.293.116.181-.258-.327-.23Zm.314.09.123-.381-.123.38Zm.307.098.4.011.008-.3-.285-.091-.123.38Zm-.02.75.4.01-.4-.01Zm-.096 1.105.392.083-.392-.083Zm-.79 2.015.341.208-.341-.207Zm-.878.934-.174-.36.174.36Zm-1.316 0-.174.36.174-.36Zm-.7-.724-.37.149.37-.15Zm-.706-.611.031-.399-.03.399Zm-1.027-.394-.272.293.272-.293Zm-.378-1.612-.372-.149.372.15Zm1.254-1.456.253.31-.253-.31Zm1.723-1.012.148.372-.148-.372Zm1.015-.32-.016-.399.016.4Zm5.515.169-.121.38.121-.38Zm3.158 2.193-.317.243.317-.243Zm.205 1.616-.356-.182.356.182Zm-1.551.829-.01-.4.01.4Zm-.434.41-.383-.114.383.115Zm-.812.934.167.363-.167-.363Zm-1.28-.022.174-.36-.174.36Zm-.873-.926.342-.207-.342.207Zm-.891-3.129.4-.01-.4.01Zm-.021-.748-.123-.381-.286.092.009.3.4-.011Zm.307-.1.123.38-.123-.38Zm.316-.089-.31.254.198.24.28-.131-.168-.363Zm.91-.648.294.271.106-.115v-.156h-.4Zm.172-.258-.324-.235.324.236ZM14.986 2.67a3.676 3.676 0 0 0-.62.234l.348.72c.16-.077.373-.156.457-.176l-.184-.778Zm-.62.234c-.303.146-.467.271-.76.555l.558.574c.25-.244.346-.31.55-.409l-.348-.72Zm-.76.555a3.365 3.365 0 0 0-.349.378 2.43 2.43 0 0 0-.24.407l.717.355c.07-.14.111-.213.162-.28.053-.07.125-.147.268-.286l-.558-.574Zm-.59.785a2.985 2.985 0 0 0-.325 1.354h.8c0-.341.075-.66.243-.999l-.717-.355Zm-.325 1.354c0 .396.068 1.03.154 1.443l.784-.163a7.596 7.596 0 0 1-.138-1.28h-.8Zm.154 1.443a14.364 14.364 0 0 1 .057.285v.004a.311.311 0 0 1-.002-.068.398.398 0 0 1 .124-.265l.552.58c.089-.086.11-.186.113-.199a.406.406 0 0 0 .01-.068c.002-.023 0-.042 0-.048a.848.848 0 0 0-.009-.069 15.885 15.885 0 0 0-.062-.315l-.783.163Zm.177-.042a.4.4 0 0 1 .188-.102c.043-.01.08-.01.1-.01a.398.398 0 0 1 .128.025l.015.006a.143.143 0 0 1 .006.002l-.008-.003a18.095 18.095 0 0 1-.309-.167l-.388.699a18.287 18.287 0 0 0 .37.198l.032.014a.414.414 0 0 0 .233.016.4.4 0 0 0 .189-.103l-.556-.575Zm.12-.25a8.152 8.152 0 0 0-.789-.364 6.23 6.23 0 0 0-.768-.269l-.185.779c.12.028.37.117.651.231.277.113.548.237.703.323l.389-.7Zm-1.557-.633a3.077 3.077 0 0 0-1.121-.051l.113.792c.265-.038.559-.025.823.038l.184-.779Zm-1.121-.051A3.015 3.015 0 0 0 8.178 7.68l.715.36c.32-.636.942-1.08 1.684-1.185l-.113-.792ZM8.178 7.68c-.255.507-.335.9-.306 1.476l.8-.04c-.023-.443.03-.697.221-1.076l-.715-.36Zm-.306 1.476.02.398.8-.04-.02-.398-.8.04ZM8 9.262l-.18.194.585.546.18-.194L8 9.262Zm-.18.194a2.699 2.699 0 0 0-.592 1.008l.755.266c.115-.327.236-.53.422-.728l-.586-.546Zm-.592 1.008a1.93 1.93 0 0 0-.104.401 3.879 3.879 0 0 0-.023.496l.8.003c0-.212.005-.314.015-.39.01-.067.025-.124.067-.244l-.755-.266Zm-.127.897c-.002.416.012.583.103.87l.763-.242c-.055-.173-.068-.245-.066-.625l-.8-.003Zm.103.87c.167.523.38.87.774 1.26l.563-.568a2.023 2.023 0 0 1-.574-.934l-.763.242Zm.774 1.26c.418.414.82.63 1.457.809l.215-.77c-.53-.15-.804-.305-1.109-.607l-.563.568Zm1.457.809c.197.055.487.117.747.164.247.045.518.086.659.086v-.8a8.41 8.41 0 0 1-1.19-.22l-.216.77Zm1.406.25.04.002-.016-.003a.328.328 0 0 1-.088-.036.387.387 0 0 1-.078-.06l.559-.572a.418.418 0 0 0-.2-.109 1.162 1.162 0 0 0-.218-.022v.8Zm-.143-.097a.398.398 0 0 1-.086-.444c.014-.032.029-.053.03-.055.007-.01.01-.012.002-.003a11.338 11.338 0 0 1-.363.378l.563.569c.122-.121.232-.234.312-.32.04-.042.075-.082.102-.114a.801.801 0 0 0 .045-.06.41.41 0 0 0 .072-.187.402.402 0 0 0-.117-.335l-.56.57Zm-.417-.123c-.476.472-.819.88-1.04 1.299-.227.43-.316.85-.318 1.326l.8.002c.002-.365.067-.654.225-.954.165-.312.44-.653.896-1.105l-.563-.568Zm-1.358 2.625c-.002.652.15 1.147.516 1.689l.663-.448a1.982 1.982 0 0 1-.379-1.239l-.8-.002Zm.516 1.689a3.022 3.022 0 0 0 1.968 1.241l.117-.791a2.224 2.224 0 0 1-1.422-.898l-.663.448Zm1.968 1.241a.746.746 0 0 1 .03.005.199.199 0 0 1-.037-.015.229.229 0 0 1-.06-.048l.002.003.02.032.032.056.696-.393c-.043-.077-.11-.203-.215-.29-.133-.111-.28-.13-.351-.141l-.117.791Zm-.013.034c.296.524.73.924 1.283 1.188l.345-.721a2.062 2.062 0 0 1-.932-.861l-.696.394Zm1.283 1.188a2.8 2.8 0 0 0 1.325.293v-.8c-.4 0-.648-.056-.98-.214l-.345.721Zm1.325.293c.513 0 .88-.08 1.325-.293l-.346-.721c-.33.158-.579.214-.979.214v.8Zm1.325-.293c.462-.222.786-.49 1.107-.908l-.636-.486a2.07 2.07 0 0 1-.817.672l.346.722Zm1.107-.908a8.112 8.112 0 0 0 .82-1.381l-.736-.315a7.37 7.37 0 0 1-.72 1.21l.636.486Zm.82-1.381c.021-.051.042-.094.055-.12l.007-.013s-.01.016-.027.035a.376.376 0 0 1-.14.1.398.398 0 0 1-.174.032l.037-.8a.403.403 0 0 0-.325.14.488.488 0 0 0-.044.06 1.017 1.017 0 0 0-.044.077c-.025.049-.054.11-.081.174l.736.315Zm-.279.034a.4.4 0 0 1-.259-.113c-.02-.02-.033-.036-.036-.04-.008-.012-.012-.019-.01-.014a5.335 5.335 0 0 1 .128.255l.725-.341a6.063 6.063 0 0 0-.168-.329.635.635 0 0 0-.078-.101.403.403 0 0 0-.264-.116l-.038.799Zm-.176.087c.35.744.817 1.425 1.27 1.799l.509-.617c-.325-.268-.73-.831-1.055-1.522l-.724.34Zm1.27 1.799c.305.252.825.507 1.213.596l.18-.78a2.603 2.603 0 0 1-.884-.433l-.509.617Zm1.213.596c.214.05.48.068.73.066.25-.003.516-.028.73-.081l-.195-.776c-.132.033-.33.055-.544.057a2.489 2.489 0 0 1-.541-.045l-.18.78Zm1.46-.015c.788-.198 1.496-.73 1.868-1.424l-.705-.379c-.259.484-.773.88-1.358 1.027l.195.776Zm1.868-1.424.1-.185-.706-.378-.099.184.705.379Zm-.174.018.291-.059-.159-.784-.29.06.158.783Zm.291-.059c1.077-.218 1.962-1.063 2.257-2.136l-.772-.212c-.217.791-.872 1.408-1.644 1.564l.16.784Zm2.257-2.136c.057-.21.08-.49.08-.743a3.01 3.01 0 0 0-.078-.742l-.772.21c.03.11.05.307.05.53 0 .225-.021.423-.052.533l.772.212Zm.002-1.486c-.178-.65-.533-1.15-1.25-1.875l-.57.563c.684.69.924 1.07 1.048 1.523l.772-.21Zm-1.25-1.875a17.571 17.571 0 0 1-.387-.403c-.01-.011-.012-.015-.011-.014l.003.005a.371.371 0 0 1 .054.107c.007.02.02.064.02.122h-.8c0 .098.037.17.04.176a.423.423 0 0 0 .054.085 4.73 4.73 0 0 0 .142.16c.082.086.194.202.316.325l.568-.563Zm-.322-.183a.394.394 0 0 1-.23.357c-.034.015-.059.02-.06.02h.017v-.8a.913.913 0 0 0-.163.013.529.529 0 0 0-.114.034.406.406 0 0 0-.25.376h.8Zm-.273.376c.142 0 .413-.04.661-.086.26-.047.55-.108.75-.164l-.215-.77a8.378 8.378 0 0 1-1.196.22v.8Zm1.412-.25c.637-.178 1.038-.395 1.456-.81l-.563-.567c-.304.302-.578.458-1.109.606l.216.77Zm1.456-.81c.545-.539.831-1.147.884-1.896l-.797-.057c-.04.549-.238.977-.65 1.386l.563.568Zm.884-1.896c.059-.812-.236-1.67-.789-2.212l-.56.572c.367.36.595.978.552 1.583l.797.057Zm-.789-2.212-.13-.127-.56.571.13.128.56-.572Zm-.01.181.022-.388-.8-.046-.021.389.799.045Zm.022-.388c.027-.492-.022-.835-.194-1.26l-.742.3c.123.303.159.526.137.915l.799.045Zm-.194-1.26a3.014 3.014 0 0 0-1.437-1.552l-.353.718c.46.226.852.649 1.048 1.133l.742-.299Zm-1.437-1.552a2.979 2.979 0 0 0-.672-.25 3.176 3.176 0 0 0-.726-.065l.003.8c.24-.001.402.013.547.046.145.032.29.087.495.187l.353-.718Zm-1.398-.315c-.19 0-.333.004-.476.026-.146.022-.276.06-.443.115l.245.761c.163-.052.241-.073.318-.085.078-.012.17-.016.36-.017l-.004-.8Zm-.92.14a8.03 8.03 0 0 0-1.358.58l.388.699a7.234 7.234 0 0 1 1.216-.517l-.245-.761Zm-1.358.58a2.47 2.47 0 0 1-.165.084c-.021.01-.029.012-.026.011a.206.206 0 0 1 .044-.01.375.375 0 0 1 .184.015c.04.013.098.04.152.093l-.56.572a.405.405 0 0 0 .355.109.522.522 0 0 0 .081-.02 1.1 1.1 0 0 0 .101-.042c.064-.029.142-.069.222-.113l-.388-.7Zm.19.194a.397.397 0 0 1 .116.267v.006l.001-.01.004-.028c.006-.047.017-.115.032-.191l-.784-.158a3.76 3.76 0 0 0-.042.245 1.33 1.33 0 0 0-.01.103.575.575 0 0 0 .013.145c.004.018.026.11.109.19l.56-.57Zm.153.044c.2-.992.194-1.926-.084-2.578l-.736.314c.186.434.223 1.178.036 2.106l.784.158Zm-.084-2.578a3.427 3.427 0 0 0-.667-.977l-.56.572c.177.173.395.493.491.719l.736-.314ZM20.4 3.45c-.584-.573-1.287-.85-2.126-.851l-.001.8c.64 0 1.139.203 1.567.623l.56-.572ZM18.274 2.6c-.47 0-.808.068-1.215.254l.332.727c.294-.134.517-.182.882-.181v-.8Zm-1.215.254-.232.106.332.727.232-.106-.332-.727Zm.1.106-.232-.106-.333.727.233.106.332-.727Zm-.232-.106a3.626 3.626 0 0 0-.522-.186l-.197.775c.097.025.278.089.386.138l.332-.727Zm-.522-.186a3.136 3.136 0 0 0-.704-.064c-.245 0-.518.019-.714.065l.184.778a2.71 2.71 0 0 1 .532-.043c.226 0 .416.017.506.04l.196-.776Zm-.351 1.875c.079.03.23.108.312.164l.453-.66a2.584 2.584 0 0 0-.49-.255l-.275.751Zm.312.164c.086.06.182.122.297.16.121.04.233.044.33.044l-.002-.8c-.077 0-.081-.005-.074-.003 0 0-.016-.004-.098-.06l-.453.66Zm.628.204a.996.996 0 0 0 .34-.05c.113-.039.215-.102.315-.167l-.435-.671a.841.841 0 0 1-.143.083c-.002 0-.004.002-.011.002a.621.621 0 0 1-.069.003l.003.8Zm.655-.217c.155-.1.252-.145.338-.17.085-.023.185-.033.357-.025l.038-.8a1.877 1.877 0 0 0-.61.055 2.008 2.008 0 0 0-.558.269l.435.671Zm.694-.195c.164.008.277.032.37.07.094.037.19.097.309.203l.53-.599a1.853 1.853 0 0 0-.54-.346c-.199-.08-.405-.116-.63-.127l-.039.799Zm.679.273c.205.182.33.436.35.743l.798-.05a1.857 1.857 0 0 0-.618-1.292l-.53.599Zm.35.743c.008.142-.002.44-.025.647l.795.09c.027-.24.04-.587.028-.788l-.799.051Zm-.025.647c-.128 1.136-.516 2.079-1.263 3.052l.634.487c.83-1.081 1.279-2.16 1.424-3.45l-.795-.089Zm-1.263 3.052c-.121.158-.239.31-.249.325l.655.46.011-.015.052-.067.165-.216-.634-.487Zm-.249.325a.399.399 0 0 1 .325-.17c.028 0 .049.004.053.004l.013.003a6.253 6.253 0 0 1-.25-.075l-.246.761a6.98 6.98 0 0 0 .315.093c.011.003.03.007.052.01.008.001.033.005.063.005.014 0 .047 0 .088-.01.022-.005.151-.032.242-.16l-.655-.46Zm.14-.238-.302-.098-.246.761.303.098.246-.761Zm-1.66-.095-.25.079.239.763.25-.078-.238-.764Zm-.25.079c-.128.04-.283.09-.328.109l.31.738.01-.004.063-.02c.05-.017.116-.039.184-.06l-.24-.763Zm-.328.11a.39.39 0 0 1 .281-.008c.036.013.058.028.063.031.012.008.013.01 0-.003a1.208 1.208 0 0 1-.106-.115l-.622.503c.06.073.124.143.182.198a.833.833 0 0 0 .105.084.416.416 0 0 0 .406.046l-.31-.737Zm.238-.095c-.842-1.043-1.286-2.178-1.357-3.446l-.8.044c.082 1.444.593 2.738 1.535 3.905l.622-.503Zm-1.357-3.446c-.024-.425.011-.58.117-.788l-.712-.364c-.192.376-.233.687-.204 1.196l.799-.044Zm.117-.788c.12-.235.39-.462.638-.538l-.235-.765a1.97 1.97 0 0 0-1.115.939l.712.364Zm.638-.538c.068-.02.195-.036.345-.033.15.004.273.025.336.048l.275-.75a1.935 1.935 0 0 0-.592-.098 1.98 1.98 0 0 0-.599.068l.235.765Zm-4.197 3.447c.849.213 1.98.917 2.646 1.663l.596-.532c-.76-.852-2.026-1.65-3.047-1.907l-.195.776Zm2.646 1.663a11.178 11.178 0 0 1 .725.935l-.001-.002a.286.286 0 0 1-.014-.033c-.003-.01-.02-.058-.02-.125h.8a.42.42 0 0 0-.047-.192 2.36 2.36 0 0 0-.111-.179 11.845 11.845 0 0 0-.736-.937l-.597.533Zm.69.775a.387.387 0 0 1 .029-.147l.008-.016a3.333 3.333 0 0 1-.26.346l-.006.007.005-.004a.307.307 0 0 1 .069-.048.383.383 0 0 1 .181-.044v.8a.408.408 0 0 0 .253-.087.565.565 0 0 0 .054-.048c.025-.024.05-.052.07-.076a4.01 4.01 0 0 0 .33-.452.625.625 0 0 0 .03-.059c.002-.005.037-.078.037-.172h-.8Zm-.725 1.539v.321h.8v-.321h-.8Zm0 .321v.322h.8v-.322h-.8Zm.274-.058-.372.124.252.759.372-.123-.252-.76Zm-.372.124a7.509 7.509 0 0 1-1.402.324l.095.794a8.294 8.294 0 0 0 1.56-.359l-.253-.76Zm-1.402.324a6.789 6.789 0 0 1-.93.019 6.305 6.305 0 0 1-.9-.085l-.159.784c.263.053.654.087 1.03.1.378.014.775.01 1.054-.024l-.095-.794Zm-1.83-.066c-.787-.16-1.047-.313-1.219-.526l-.623.502c.358.444.861.641 1.683.808l.16-.784Zm-1.219-.526a.944.944 0 0 1-.173-.3 1.233 1.233 0 0 1-.051-.391l-.8.002c0 .23.024.44.092.642.068.204.173.38.31.55l.622-.503Zm-.224-.691c0-.161.003-.215.01-.251a.656.656 0 0 1 .064-.16l-.72-.347a1.402 1.402 0 0 0-.129.353 2.1 2.1 0 0 0-.025.407l.8-.002Zm.074-.41c.106-.219.212-.34.36-.44l-.45-.662c-.282.191-.474.43-.63.754l.72.348Zm.36-.44c.145-.1.286-.263.364-.42l-.718-.355a.385.385 0 0 1-.096.112l.45.662Zm.364-.42.08-.165-.717-.354-.08.164.717.354Zm.11-.439-.085-.342-.776.194.085.341.776-.193Zm-.085-.342a1.451 1.451 0 0 1-.056-.442.893.893 0 0 1 .097-.34l-.722-.344a1.688 1.688 0 0 0-.173.632 2.23 2.23 0 0 0 .078.688l.776-.194Zm.04-.781c.173-.362.558-.613.999-.626l-.024-.8c-.724.022-1.387.434-1.696 1.081l.722.345Zm1-.626.02.002.08.01c.063.01.136.025.2.041l.194-.776a3.234 3.234 0 0 0-.269-.054 1.452 1.452 0 0 0-.25-.023l.024.8Zm12.44.026c.647.12 1.021.723.838 1.364l.77.22c.311-1.09-.348-2.164-1.463-2.37l-.145.786Zm.838 1.364a1.345 1.345 0 0 0-.059.568c.032.21.135.374.28.5l.528-.6c-.015-.013-.018-.019-.017-.017.002.002.001.003 0-.003a.613.613 0 0 1 .037-.228l-.769-.22Zm.221 1.07.279.243.527-.601-.278-.244-.528.601Zm.279.243c.068.06.147.161.222.31l.715-.36a1.819 1.819 0 0 0-.41-.551l-.527.601Zm.222.31a.91.91 0 0 1 .085.192c.007.031.01.075.01.25l.8.003c0-.154 0-.292-.029-.425a1.595 1.595 0 0 0-.151-.38l-.715.36Zm.095.442c0 .25-.016.309-.057.409l.741.301c.094-.232.115-.405.116-.707l-.8-.003Zm-.057.409c-.08.198-.241.393-.396.494l.436.67c.301-.195.564-.524.701-.863l-.74-.301Zm-.396.494c-.068.044-.214.109-.437.176a6.148 6.148 0 0 1-.756.173l.131.789c.31-.052.605-.12.857-.196.245-.074.477-.165.64-.272l-.435-.67Zm-1.193.349c-.375.062-.503.07-1.1.053l-.023.8c.627.017.811.01 1.254-.064l-.131-.79Zm-1.1.053c-.516-.014-.768-.038-1.007-.089l-.165.783c.31.066.62.092 1.15.106l.021-.8Zm-1.007-.089a10.542 10.542 0 0 1-.721-.194 10.368 10.368 0 0 1-.457-.15c-.037-.015-.027-.013-.002.002l-.428.676a.828.828 0 0 0 .137.066 11.19 11.19 0 0 0 .519.171c.273.083.59.17.787.212l.165-.783Zm-1.18-.341c.095.06.13.14.139.166.01.03.011.045.01.034a2.75 2.75 0 0 1 0-.18l-.8-.03a2.12 2.12 0 0 0 .005.298c.005.042.014.1.036.159.02.056.07.157.182.228l.428-.675Zm.148.02.011-.303-.8-.029-.01.302.8.03Zm-.738-1.765a.397.397 0 0 1 .249.09l.005.005-.006-.007a3.108 3.108 0 0 1-.26-.343l.007.016a.337.337 0 0 1 .024.077.39.39 0 0 1 .006.07h-.8c0 .095.035.168.037.174.01.024.022.044.03.058.017.03.037.06.055.088a4.097 4.097 0 0 0 .348.439.574.574 0 0 0 .119.088c.02.01.09.045.186.045v-.8Zm.025-.092c0 .07-.02.123-.023.13a.3.3 0 0 1-.013.032c-.004.007-.005.008 0 0l.05-.075a10.82 10.82 0 0 1 .657-.841l-.597-.532a11.504 11.504 0 0 0-.792 1.03.785.785 0 0 0-.057.114c-.005.013-.025.069-.025.142h.8Zm.67-.754a6.151 6.151 0 0 1 2.217-1.534l-.294-.744c-.932.369-1.87 1.018-2.52 1.746l.598.532Zm2.217-1.534c.278-.11.45-.164.585-.187a.982.982 0 0 1 .37.008l.146-.786a1.777 1.777 0 0 0-.65-.01c-.22.037-.456.117-.745.231l.294.744Zm-4.97 2.979c.226.075.365.162.52.32l.573-.558a1.959 1.959 0 0 0-.842-.522l-.25.76Zm.52.32c.464.475.464 1.22 0 1.694l.573.56a2.006 2.006 0 0 0 0-2.812l-.572.559Zm0 1.694c-.266.274-.545.386-.981.369l-.031.8c.643.024 1.147-.162 1.585-.61l-.572-.559Zm-.981.369a1.533 1.533 0 0 1-.269-.023.988.988 0 0 1-.205-.084l-.348.72c.125.06.238.112.372.143.129.03.26.037.419.043l.03-.799Zm-.474-.107c-.683-.332-.92-1.082-.575-1.704l-.699-.388c-.579 1.042-.15 2.29.926 2.812l.348-.72Zm-.575-1.704c.034-.06.102-.15.193-.245.09-.095.18-.169.243-.207l-.421-.68c-.139.085-.28.21-.399.333-.118.123-.237.27-.315.41l.7.39Zm.436-.452c.279-.173.747-.228 1.075-.12l.25-.76c-.546-.18-1.26-.101-1.746.2l.42.68Zm-1.911 2.863a4.279 4.279 0 0 1 .136.19l.003.005a.324.324 0 0 1-.018-.039l.746-.29c-.02-.049-.048-.093-.055-.103a4.962 4.962 0 0 0-.176-.247l-.636.484Zm1.744.919a.4.4 0 0 1-.326.17c-.028 0-.048-.004-.052-.004l-.013-.003.05.014c.051.014.124.037.205.063l.246-.761a6.999 6.999 0 0 0-.319-.095.699.699 0 0 0-.052-.01c-.008 0-.032-.004-.062-.005-.014 0-.047 0-.088.01-.02.004-.152.031-.243.161l.654.46Zm-.136.24.307.099.246-.761-.307-.1-.246.762Zm.03-.292-.02.748.8.022.02-.749-.8-.021Zm-.02.748c-.015.543-.04.811-.087 1.035l.783.165c.063-.298.089-.626.104-1.178l-.8-.022Zm-.087 1.035a5.716 5.716 0 0 1-.741 1.89l.684.415c.414-.683.67-1.333.84-2.14l-.783-.165Zm-.741 1.89c-.299.491-.5.679-.71.78l.348.721c.418-.202.718-.547 1.046-1.086l-.684-.415Zm-.71.78a.662.662 0 0 1-.17.07c-.043.008-.109.01-.315.01v.8c.183 0 .329 0 .459-.023.146-.027.257-.08.373-.136l-.347-.72Zm-.485.08a2.1 2.1 0 0 1-.315-.01.651.651 0 0 1-.169-.069l-.347.72c.116.056.227.11.373.136.13.023.275.024.458.024v-.8Zm-.484-.079a1.065 1.065 0 0 1-.501-.514l-.742.299c.158.394.505.747.896.936l.347-.72Zm-.501-.514a3.788 3.788 0 0 0-.156-.35.99.99 0 0 0-.222-.293c-.209-.18-.466-.201-.668-.217l-.063.798c.234.018.225.04.207.024-.004-.004.009.005.04.062.03.059.067.143.12.274l.742-.298Zm-1.046-.86c-.255-.02-.39-.046-.49-.084a.9.9 0 0 1-.297-.204l-.544.586c.17.157.337.281.556.365.209.08.439.113.712.135l.063-.798Zm-.787-.288c-.342-.317-.441-.765-.279-1.17l-.743-.298c-.29.725-.098 1.52.478 2.054l.544-.586Zm-.279-1.17c.044-.11.184-.321.408-.581.215-.25.477-.51.728-.715l-.506-.62a6.886 6.886 0 0 0-.828.813c-.233.27-.448.566-.545.805l.743.298Zm1.136-1.296a6.653 6.653 0 0 1 1.618-.95l-.297-.742a7.453 7.453 0 0 0-1.827 1.073l.506.62Zm1.618-.95c.09-.035.314-.11.534-.18a12.36 12.36 0 0 1 .377-.111c.04-.01.014-.001-.028 0l-.032-.799c-.058.002-.121.02-.135.023a13.501 13.501 0 0 0-1.012.325l.296.743Zm.883-.29a.387.387 0 0 1-.237-.072l.01.01c.022.023.056.062.092.11l.636-.486a2.075 2.075 0 0 0-.154-.181.906.906 0 0 0-.085-.078.525.525 0 0 0-.072-.049c-.015-.008-.102-.059-.222-.054l.032.8Zm5.378.149c1.177.376 2.241 1.116 2.962 2.055l.635-.487c-.824-1.073-2.027-1.907-3.354-2.33l-.243.762Zm2.962 2.055c.322.419.355.823.166 1.191l.712.365c.35-.682.238-1.416-.243-2.043l-.635.487Zm.166 1.191a.98.98 0 0 1-.416.448c-.176.095-.423.155-.788.163l.018.8c.436-.01.82-.083 1.147-.257.335-.179.576-.447.751-.79l-.712-.364Zm-1.204.611a.673.673 0 0 0-.306.088c-.079.044-.15.099-.211.157-.116.11-.236.268-.291.45l.766.231.004-.01a.404.404 0 0 1 .118-.128c.003 0 .001 0-.007.003a.2.2 0 0 1-.055.009l-.018-.8Zm-.808.696c-.09.296-.315.555-.596.684l.334.727c.49-.225.873-.665 1.028-1.18l-.766-.231Zm-.596.684a.475.475 0 0 1-.14.05c-.05.008-.126.012-.315.012v.8c.177 0 .317-.002.439-.021.14-.022.242-.064.35-.114l-.334-.727Zm-.455.062c-.206 0-.272-.003-.315-.011a.662.662 0 0 1-.17-.07l-.347.721c.116.056.228.11.374.136.13.024.275.024.458.024v-.8Zm-.484-.08c-.21-.102-.413-.29-.705-.773l-.684.415c.322.532.624.877 1.04 1.078l.349-.72Zm-.705-.773c-.575-.947-.8-1.73-.834-2.933l-.8.023c.038 1.33.298 2.25.95 3.325l.684-.415Zm-.834-2.933-.02-.749-.8.023.02.749.8-.023Zm-.297-.357.307-.1-.246-.76-.307.099.245.761Zm.307-.1a6.316 6.316 0 0 1 .256-.075c.005-.002-.002 0-.014.002-.004 0-.023.003-.05.004a.398.398 0 0 1-.308-.146l.617-.508a.403.403 0 0 0-.375-.141 1.943 1.943 0 0 0-.14.033 6.958 6.958 0 0 0-.232.07l.246.762Zm1.503-1.117a.394.394 0 0 1-.04.171l-.004.008.027-.041c.027-.042.067-.098.112-.16l-.647-.47a5.85 5.85 0 0 0-.178.26.713.713 0 0 0-.042.084c-.002.004-.028.066-.028.148h.8Zm.095-.022c.034-.046.042-.06.064-.088.016-.023.021-.028.02-.026a.249.249 0 0 1-.146.066c-.022.001-.031-.002-.018 0a.768.768 0 0 1 .073.019c.08.022.187.058.357.112l.243-.762c-.155-.05-.285-.093-.383-.12a.974.974 0 0 0-.336-.047.56.56 0 0 0-.37.18c-.057.06-.118.15-.15.195l.646.47Zm-3.08-4.123a3.183 3.183 0 0 1 1.01-.005l.103-.793a3.963 3.963 0 0 0-1.22.005l.107.793Zm-2.304.734c-.2.376-.3.635-.392 1.164l.788.137c.077-.442.149-.621.31-.925l-.706-.376Zm.407 3.637c.155.186.3.34.477.471.177.132.37.23.607.323l.294-.744a1.776 1.776 0 0 1-.424-.22 1.993 1.993 0 0 1-.338-.341l-.616.51Zm3.74.785c.452-.21.715-.392 1.036-.74l-.588-.542c-.24.26-.414.384-.785.556l.337.726Zm1.862-3.25a3.22 3.22 0 0 0-.391-1.172l-.707.376c.176.33.243.513.308.922l.79-.125Zm4.988-1.867-.278-.244-.528.601.279.244.527-.6ZM18.5 27.558l-.989-.15-.122.797.755.288.356-.935Zm8.459-4.474-.132.992.132-.992Zm.366.606-.931-.363.931.363Zm-7.837 4.02c.032-.21.183-.592.542-1.068.346-.46.846-.953 1.487-1.386 1.275-.863 3.08-1.477 5.31-1.18l.264-1.983c-2.76-.367-5.052.395-6.694 1.506a8.26 8.26 0 0 0-1.965 1.84c-.473.628-.821 1.317-.92 1.968l1.976.302Zm6.906-4.383c-1.029 2.635-4.378 4.502-7.538 3.297l-.713 1.869c4.28 1.632 8.723-.876 10.114-4.44l-1.863-.726Zm.433.749a.552.552 0 0 1-.433-.75l1.863.727c.354-.907-.264-1.84-1.166-1.96l-.264 1.983Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_FloweryWorkIcon = (FloweryWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/TaxiWorkIcon.tsx



const TaxiWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#FFEF99"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M9.425 9.89a3 3 0 0 0-2.854 2.077l-2.426 7.5a3 3 0 0 0 2.854 3.923h20.933c2.093 0 3.542-2.087 2.811-4.048l-2.796-7.5a3 3 0 0 0-2.811-1.951H9.426Z",
                stroke: "#080914",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: "#080914",
                strokeWidth: 1.5,
                strokeLinecap: "round",
                d: "M25.253 19.198v-4.589M22.671 19.21l-3.024-4.46M19.942 19.21l3.024-4.46M8.851 14.573h3.972M10.806 19.198V15.1M14.658 17.66h2.01"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M13.197 19.02a.75.75 0 1 0 1.423.477l-1.423-.476Zm3.737.469a.75.75 0 1 0 1.427-.46l-1.427.46Zm-.652-4.475-.714.23.714-.23Zm-1.662 4.483 1.423-4.25-1.422-.477-1.424 4.25 1.423.477Zm.948-4.254 1.366 4.246 1.427-.46-1.365-4.245-1.428.46Zm.475.003a.25.25 0 0 1-.475-.003l1.428-.46c-.37-1.148-1.992-1.158-2.375-.013l1.422.476Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_TaxiWorkIcon = (TaxiWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/RestaurantWorkIcon.tsx



const RestaurantWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#CDE0FF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M23.133 8.18c.288-.096.671-.096 1.054-.096 2.875 0 5.271 2.395 5.271 5.27 0 2.875-2.396 5.271-5.27 5.271l.479 8.625H9.332l.48-8.625c-2.876 0-5.272-2.396-5.272-5.27 0-2.876 2.396-5.271 5.271-5.271.384 0 .767 0 1.055.095",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M23.708 10.958A6.667 6.667 0 0 0 17 4.25a6.667 6.667 0 0 0-6.709 6.708M23.708 23.13l-13.438-.006",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        ]
    });
/* harmony default export */ const icons_RestaurantWorkIcon = (RestaurantWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/IcecreamWorkIcon.tsx



const IcecreamWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#F7B3CA"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M22.693 13.707c.56-.934.84-2.054.84-3.174A6.493 6.493 0 0 0 17 4a6.493 6.493 0 0 0-6.534 6.533c0 1.12.28 2.24.84 3.174-1.12.653-1.773 1.493-1.773 2.426 0 2.054 3.36 2.8 7.467 2.8 4.107 0 7.466-.746 7.466-2.8 0-.933-.653-1.773-1.773-2.426Z",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M11.4 18.933 17 32l5.6-13.067M11.4 13.52c1.4.56 3.36.747 5.6.747",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        ]
    });
/* harmony default export */ const icons_IcecreamWorkIcon = (IcecreamWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ShopWorkIcon.tsx



const ShopWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#99F5C8"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M5.934 8.292c-.2.093-.384.276-.449.448-.141.374.04.86.389 1.041.061.032.757.177 1.547.322.79.146 1.444.273 1.454.282.01.01.566 2.789 1.235 6.174.669 3.386 1.247 6.238 1.285 6.338a.81.81 0 0 0 .596.484c.147.03 2.124.041 6.127.033l5.909-.011.183-.098c.35-.187.307-.041 1.387-4.716 1.094-4.732 1.072-4.606.83-4.91a1.153 1.153 0 0 0-.317-.258l-.189-.096H11.167l-.377-1.923c-.207-1.058-.415-2.005-.46-2.104a.825.825 0 0 0-.53-.439c-.263-.074-3.434-.649-3.572-.648-.067 0-.2.037-.294.081Zm18.758 6.763c0 .03-.346 1.542-.767 3.362l-.767 3.31-5.16.01-5.16.012-.047-.226-.647-3.277c-.33-1.679-.611-3.095-.624-3.148L11.498 15h6.597c5.25 0 6.598.01 6.597.054ZM14.295 25.466a2.23 2.23 0 0 0-1.542 2.883 2.232 2.232 0 0 0 3.718.828c.383-.395.585-.863.616-1.429a2.233 2.233 0 0 0-2.792-2.282Zm6.671-.016c-.434.105-.898.4-1.2.763-.17.202-.392.65-.455.916a2.838 2.838 0 0 0-.044.52c0 .608.218 1.115.671 1.564.692.686 1.676.844 2.553.41a2.225 2.225 0 0 0 1.223-2.246c-.059-.539-.243-.911-.655-1.324-.328-.33-.638-.51-1.04-.604a2.845 2.845 0 0 0-1.053.001ZM15.31 26.86c.292.186.432.437.433.777.003.768-.937 1.17-1.487.636a.777.777 0 0 1-.272-.578.849.849 0 0 1 .494-.867c.24-.115.626-.1.832.032Zm6.553-.047c.41.187.62.688.47 1.127-.063.187-.265.399-.47.495-.473.22-1.045-.035-1.214-.542-.142-.428.082-.906.511-1.093.163-.07.534-.064.703.013Z",
                fill: "#000",
                stroke: "#000",
                strokeWidth: 0.5
            })
        ]
    });
/* harmony default export */ const icons_ShopWorkIcon = (ShopWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CleaningWorkIcon.tsx



const CleaningWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#CCF2F7"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M24.91 27.106V16.36a4.626 4.626 0 0 0-3.51-4.6v-.091a.888.888 0 0 0 .878-.889v-.865h1.743a.889.889 0 0 0 .764-.436l.002-.004a.888.888 0 0 0 .003-.885l-1.644-2.967a2.787 2.787 0 0 0-2.437-1.433h-7.215a.889.889 0 0 0-.766.439H11.3a.888.888 0 0 0-.888.888v2.632a.888.888 0 0 0 .508.803c.033.569.011 1.14-.066 1.705a9.1 9.1 0 0 1-1.6 3.994.888.888 0 0 0 .733 1.404.888.888 0 0 0 .492-.15 8.125 8.125 0 0 0 3.452-4.934l.002-.008.002-.007c.068-.344.112-.692.13-1.041h.294v.865a.889.889 0 0 0 .877.889v.44l-2.61 4.32-.001.002a6.318 6.318 0 0 0-.898 3.271v7.405a2.906 2.906 0 0 0 2.813 2.983h7.555a2.906 2.906 0 0 0 2.813-2.983Zm-3.318-20.62a1.01 1.01 0 0 0-.883-.52h-6.326v2.17h1.754v1.205c0 .303.246.55.55.55h3.263a.55.55 0 0 0 .55-.55V8.136h2.01l-.918-1.65Zm1.54 9.868V19.1h-9.59a4.58 4.58 0 0 1 .29-1.115l.445-.845.787-1.305.263-.438v-.001l.53-.876.663-1.099h3.952c1.432 0 2.66 1.28 2.66 2.932Zm-9.626 4.524v2.61h9.626v-2.61h-9.626Zm0 6.254v-1.868h9.626v1.868a1.133 1.133 0 0 1-1.063 1.18h-7.5a1.133 1.133 0 0 1-1.064-1.18Zm-.9-20.727h-.416v.854h.416v-.854Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_CleaningWorkIcon = (CleaningWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ConstructionWorkIcon.tsx



const ConstructionWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#F77045"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M27.4 27a.6.6 0 0 0 .591-.704c0-.003-.242-1.377-.45-2.824-.35-2.458-3.358-3.196-3.72-3.277h-.002s-2.464-.541-3.082-.731a2.418 2.418 0 0 1-1.506-1.366c2.216-1.017 3.391-3.535 3.58-6.07v-.3h.875a.6.6 0 1 0 0-1.2h-.578l-.065-.659a4.296 4.296 0 0 0-3.066-3.71l-.891-.265V5.6a.6.6 0 0 0-.6-.6h-2.96a.6.6 0 0 0-.6.598v.293l-.912.27a4.299 4.299 0 0 0-3.065 3.694l-.07.674h-.565a.6.6 0 0 0 0 1.2h.9v.344c.187 2.493 1.356 4.996 3.558 6.016a2.42 2.42 0 0 1-1.508 1.375c-.618.19-3.083.731-3.083.731h-.001c-.362.08-3.37.82-3.722 3.277a102.247 102.247 0 0 1-.447 2.811l-.002.013A.602.602 0 0 0 6.6 27h20.8Zm-4.858-5.858c.534.12.84.147.944.178l1.543.63c.614.357 1.212.898 1.325 1.692.117.819.245 1.614.336 2.158H7.31c.09-.544.218-1.34.335-2.158.114-.794.711-1.335 1.325-1.692l1.2-.512c.069-.02.092-.043.445-.122.193-.044.682-.138.873-.181l.574-.13 1.166-.285a9.33 9.33 0 0 0 .924-.328l2.497 2.017a.599.599 0 0 0 .755 0l2.466-2.004c.165.08.76.278.904.316l1.166.285.6.136ZM19.635 7.309a3.102 3.102 0 0 1 2.214 2.68l.054.54h-2.817V7.146l.55.163ZM17.885 6.2v4.329h-1.77l.01-4.329h1.76Zm-5.743 3.778a3.104 3.104 0 0 1 2.212-2.666l.569-.17-.007 3.387h-2.83l.056-.551Zm.27 2.05v-.3h9.201v.255c-.201 2.682-1.702 5.388-4.601 5.388s-4.4-2.706-4.6-5.343Zm4.6 6.543c.371 0 .72-.041 1.055-.105.18.46.451.872.79 1.217l-1.83 1.488-1.869-1.508c.325-.338.587-.743.772-1.202.343.067.7.11 1.082.11Z",
                fill: "#000"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M6.01 26.296A.602.602 0 0 0 6.6 27h20.8a.6.6 0 0 0 .591-.704c0-.003-.242-1.377-.45-2.824-.35-2.458-3.358-3.196-3.72-3.277h-.002s-2.464-.541-3.082-.731a2.418 2.418 0 0 1-1.506-1.366c2.216-1.017 3.391-3.535 3.58-6.07v-.3h.875a.6.6 0 1 0 0-1.2h-.578l-.065-.659a4.296 4.296 0 0 0-3.066-3.71l-.891-.265V5.6a.6.6 0 0 0-.6-.6h-2.96a.6.6 0 0 0-.6.598v.293l-.912.27a4.299 4.299 0 0 0-3.065 3.694l-.07.674h-.565a.6.6 0 0 0 0 1.2h.9v.344c.187 2.493 1.356 4.996 3.558 6.016a2.42 2.42 0 0 1-1.508 1.375c-.618.19-3.083.731-3.083.731h-.001c-.362.08-3.37.82-3.722 3.277a102.247 102.247 0 0 1-.447 2.811m-.002.013.002-.013m-.002.013.002-.013m17.476-4.963 1.542.63c.614.357 1.212.898 1.325 1.692.117.819.245 1.614.336 2.158H21.72m1.765-4.48c-.103-.031-.41-.058-.944-.178m.944.178-1.765 4.48m-.957 0h-7.48m7.48 0 1.778-4.658M20.763 25.8h.958m-8.437 0-1.795-4.665m1.795 4.665h-1.04m10.298-4.658-.602-.136-1.165-.285a9.606 9.606 0 0 1-.904-.316l-2.466 2.003a.598.598 0 0 1-.755.001l-2.497-2.017a9.33 9.33 0 0 1-.924.328l-1.165.285-.575.13m0 0c-.191.043-.68.137-.873.18m1.628 4.485H7.311c.09-.544.218-1.34.335-2.158.114-.794.711-1.335 1.325-1.692l1.2-.512c.069-.02.092-.043.445-.122m1.628 4.484-1.628-4.484m9.02-14.007a3.102 3.102 0 0 1 2.213 2.68l.054.54h-2.817V7.146l.55.163ZM17.885 6.2v4.329h-1.77l.01-4.329h1.76Zm-5.743 3.778a3.104 3.104 0 0 1 2.211-2.666l.569-.17-.007 3.387h-2.83l.056-.551Zm.269 2.05v-.3h9.201v.255c-.201 2.682-1.702 5.388-4.601 5.388s-4.4-2.706-4.6-5.343Zm4.6 6.543c.371 0 .72-.041 1.055-.105.18.46.451.872.79 1.217l-1.83 1.488-1.869-1.508c.325-.338.587-.743.772-1.202.343.067.7.11 1.082.11Z",
                stroke: "#000"
            })
        ]
    });
/* harmony default export */ const icons_ConstructionWorkIcon = (ConstructionWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WorkshopWorkIcon.tsx



const WorkshopWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#7F6ABF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m20.13 17.218-.71-.59 2.541-2.594a1.374 1.374 0 0 1 1.256-.371 3.56 3.56 0 0 0 1.686-.037 3.62 3.62 0 0 0 2.616-2.488 3.72 3.72 0 0 0 .133-1.466l-1.302 1.324a1.411 1.411 0 0 1-1.947 0L23.107 9.69a1.376 1.376 0 0 1 0-1.947l1.278-1.301a3.555 3.555 0 0 0-1.48.137 3.633 3.633 0 0 0-2.465 2.584 3.565 3.565 0 0 0-.037 1.673 1.375 1.375 0 0 1-.37 1.25L17.25 14.85l-.513-.783 2.666-2.612a.458.458 0 0 0 .124-.426A4.581 4.581 0 0 1 22.662 5.7a4.655 4.655 0 0 1 1.833-.174.916.916 0 0 1 .756.596.916.916 0 0 1-.216.953l-1.278 1.301a.459.459 0 0 0-.137.33.458.458 0 0 0 .133.335l1.282 1.278a.457.457 0 0 0 .651 0l1.274-1.301a.916.916 0 0 1 1.567.536 4.582 4.582 0 0 1-5.503 4.99.46.46 0 0 0-.412.119l-1.595 1.649-.887.907Zm-7.148.47 1.396-1.424.494.799-2.833 2.903a1.374 1.374 0 0 1-1.256.371 3.56 3.56 0 0 0-1.686.037 3.62 3.62 0 0 0-2.616 2.488 3.72 3.72 0 0 0-.133 1.466l1.301-1.324a1.411 1.411 0 0 1 1.947 0l1.297 1.306a1.377 1.377 0 0 1 0 1.947l-1.278 1.301a3.555 3.555 0 0 0 1.48-.137 3.632 3.632 0 0 0 2.465-2.584c.144-.547.157-1.12.036-1.673a1.375 1.375 0 0 1 .371-1.25l2.423-2.407.538.754-2.333 2.285a.46.46 0 0 0-.123.426 4.582 4.582 0 0 1-3.134 5.329 4.657 4.657 0 0 1-1.833.174.916.916 0 0 1-.756-.596.916.916 0 0 1 .215-.953l1.278-1.301a.458.458 0 0 0 .138-.33.459.459 0 0 0-.133-.335l-1.283-1.278a.46.46 0 0 0-.65 0L7.04 24.983a.917.917 0 0 1-1.567-.536 4.582 4.582 0 0 1 5.503-4.99.458.458 0 0 0 .412-.119l1.594-1.65Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m19.42 16.628-.357-.35-.38.389.418.346.32-.385Zm.71.59-.32.384.355.295.323-.33-.358-.35Zm1.831-3.184-.353-.354-.004.004.357.35Zm.58-.345-.141-.48.142.48Zm.675-.026.108-.489h-.004l-.104.489Zm1.687-.037-.118-.486-.011.003.129.483Zm1.64-.894.345.362-.345-.362Zm.976-1.594-.48-.143.48.143Zm.133-1.466.497-.054-.115-1.049-.739.752.357.35Zm-1.302 1.324.345.362.006-.006.006-.005-.357-.35Zm-1.947 0-.355.352.01.01.345-.362ZM23.107 9.69l.354-.352-.002-.002-.352.354Zm-.3-.446-.461.191.461-.191Zm0-1.055-.461-.191.461.191Zm.3-.446.352.354.004-.004-.357-.35Zm1.278-1.301.356.35.715-.727-1.012-.12-.06.497Zm-1.48.137.145.479.004-.002-.15-.477ZM20.44 9.163l.483.128.002-.005-.485-.123Zm-.037 1.673.49-.103-.001-.004-.489.107Zm-.027.672-.48-.142.48.142Zm-.344.579.352.354.003-.002-.355-.352Zm-2.781 2.762-.418.274.335.513.435-.432-.352-.355Zm-.513-.783-.35-.357-.294.287.225.344.419-.274Zm2.666-2.612.35.357.003-.002-.353-.355Zm.117-.197.48.14-.48-.14Zm.007-.229-.49.104.002.007.488-.11Zm.533-3.272-.431-.254.431.254Zm2.601-2.057-.145-.478h-.002l.147.478Zm1.833-.174.057-.496-.005-.001-.052.497Zm.462.19.31-.392-.31.393Zm.294.406.471-.167-.002-.005-.47.172Zm.03.508-.488-.11.488.11Zm-.245.445-.354-.353-.003.003.357.35Zm-1.279 1.301.35.357.007-.006-.357-.35Zm-.102.151-.462-.192.462.192Zm-.035.18.5.012v-.016l-.5.003Zm.032.18-.465.185.465-.185Zm.1.154-.354.352.002.002.353-.354Zm1.284 1.278.354-.352-.002-.002-.353.354Zm.149.1-.193.462.193-.462Zm.352 0-.192-.461.192.461Zm.15-.1.354.352.002-.002-.357-.35Zm1.273-1.301.357.35.001-.001-.358-.35Zm.443-.252-.116-.487.116.487Zm.51.024.162-.473-.162.473Zm.418.293-.39.313.39-.313Zm.196.47.497-.055-.497.056Zm-.17 1.834-.478-.146.478.146Zm-2.052 2.617-.254-.43.254.43Zm-3.281.54.103-.49-.103.49Zm-.221.008.139.48-.139-.48Zm-.191.11-.348-.359-.006.006-.006.006.36.348Zm-1.595 1.65.358.35.002-.002-.36-.348Zm-6.639-.047.425-.263-.336-.543-.446.456.357.35Zm-1.396 1.425-.357-.35-.002.002.36.348Zm1.89-.626.358.349.273-.28-.206-.332-.425.263Zm-2.833 2.903.353.354.004-.005-.357-.349Zm-.581.345-.142-.48.142.48Zm-.675.026-.108.489h.004l.104-.489Zm-1.686.037.118.486.01-.003-.128-.483Zm-1.64.894-.345-.362.345.362Zm-.976 1.594.479.143-.48-.143Zm-.133 1.466-.497.054.114 1.049.74-.753-.357-.35Zm1.301-1.324-.345-.362-.006.006-.006.006.357.35Zm1.947 0 .355-.353-.01-.009-.345.362Zm1.297 1.306-.355.352.002.002.353-.354Zm.3.446.461-.192-.462.192Zm0 1.055-.463-.192.462.192Zm-.3.446-.353-.354-.004.004.357.35Zm-1.278 1.301-.357-.35-.714.727 1.012.12.059-.497Zm1.48-.137-.146-.479-.004.002.15.477Zm2.465-2.584-.484-.128-.001.005.485.123Zm.036-1.673-.49.103.002.004.488-.107Zm.028-.672-.48-.142.48.142Zm.343-.579-.352-.354-.002.002.354.352Zm2.423-2.406.407-.29-.342-.48-.417.415.352.355Zm.538.754.35.357.306-.3-.249-.348-.407.29Zm-2.333 2.285-.35-.357-.002.002.352.355Zm-.117.197-.48-.14.48.14Zm-.006.229.489-.104-.002-.007-.487.11Zm-.533 3.272.43.254-.43-.254Zm-2.601 2.057.144.478h.003l-.147-.478Zm-1.833.174-.057.496.005.001.052-.497Zm-.756-.596-.472.167.002.005.47-.172Zm-.03-.508-.488-.11.488.11Zm.245-.445.354.353.003-.003-.357-.35Zm1.278-1.301-.35-.357-.006.006.356.35Zm.138-.33-.5-.013v.016l.5-.003Zm-.133-.335.355-.352-.002-.002-.353.354Zm-1.283-1.278-.355.352.002.002.353-.354Zm-.149-.1-.192.461.192-.461Zm-.352 0-.193-.462.193.462Zm-.15.1-.355-.352-.002.002.357.35ZM7.04 24.983l-.358-.35v.001l.358.35Zm-.444.252.116.486-.116-.486Zm-.51-.024.162-.473-.161.473Zm-.417-.293.39-.313-.39.313Zm-.196-.47-.497.055.497-.056Zm.17-1.834.477.146-.478-.146Zm2.051-2.617-.255-.43.255.43Zm3.282-.54-.104.49h.001l.103-.49Zm.22-.008-.138-.48.139.48Zm.192-.11.348.359.006-.006.005-.006-.36-.348Zm7.784-2.373-.403-.296-.311.423.438.29.276-.417Zm.766.507-.275.417.392.26.283-.377-.4-.3Zm-.837-.46.71.59.639-.77-.71-.59-.639.77Zm2.503-3.329-2.54 2.595.714.7 2.54-2.595-.714-.7Zm.796-.474c-.299.088-.571.25-.792.47l.706.708a.874.874 0 0 1 .37-.22l-.284-.958Zm.92-.036a1.875 1.875 0 0 0-.92.036l.284.959a.874.874 0 0 1 .429-.017l.207-.978Zm1.454-.031a3.06 3.06 0 0 1-1.45.031l-.215.977a4.06 4.06 0 0 0 1.923-.042l-.258-.966Zm1.424-.774a3.12 3.12 0 0 1-1.413.771l.236.972a4.12 4.12 0 0 0 1.867-1.018l-.69-.725Zm.841-1.373a3.12 3.12 0 0 1-.84 1.373l.689.725a4.12 4.12 0 0 0 1.11-1.814l-.959-.284Zm.116-1.27a3.22 3.22 0 0 1-.115 1.27l.958.285a4.22 4.22 0 0 0 .15-1.663l-.993.108Zm-.448 1.62 1.301-1.324-.713-.7-1.301 1.324.713.7Zm-1.33.54c.49 0 .963-.19 1.318-.528l-.69-.724a.91.91 0 0 1-.628.252v1Zm-1.319-.528c.356.339.828.528 1.319.528v-1a.91.91 0 0 1-.629-.252l-.69.724Zm-1.306-1.316 1.296 1.306.71-.704-1.297-1.306-.71.705Zm-.406-.607c.094.228.233.435.408.61l.705-.709a.874.874 0 0 1-.19-.284l-.923.383Zm-.144-.718c0 .246.049.49.143.718l.924-.383a.873.873 0 0 1-.067-.335h-1Zm.143-.72a1.875 1.875 0 0 0-.143.72h1c0-.116.023-.23.067-.336l-.923-.383Zm.409-.608a1.874 1.874 0 0 0-.409.609l.924.383a.874.874 0 0 1 .19-.284l-.705-.708Zm1.274-1.298L22.75 7.393l.713.7 1.278-1.3-.713-.702Zm-.974.965c.411-.128.845-.168 1.272-.118l.118-.993a4.056 4.056 0 0 0-1.688.157l.298.954Zm-1.36.837c.373-.39.84-.678 1.356-.835l-.29-.957a4.133 4.133 0 0 0-1.789 1.101l.724.69Zm-.77 1.393a3.132 3.132 0 0 1 .77-1.393l-.723-.69a4.133 4.133 0 0 0-1.016 1.838l.97.245Zm-.032 1.443a3.065 3.065 0 0 1 .031-1.438l-.966-.256a4.065 4.065 0 0 0-.042 1.907l.977-.213Zm-.037.921c.088-.298.101-.613.038-.917l-.98.205a.875.875 0 0 1-.017.428l.959.284Zm-.468.79c.219-.22.38-.492.468-.79l-.959-.284a.875.875 0 0 1-.218.368l.709.705Zm-2.784 2.764 2.781-2.763-.704-.71-2.782 2.764.705.71Zm-1.284-.864.514.783.836-.547-.513-.784-.837.548Zm2.736-3.243-2.667 2.612.7.714 2.666-2.611-.7-.715Zm-.014.02a.041.041 0 0 1 .01-.017l.706.709a.959.959 0 0 0 .244-.412l-.96-.28Zm0 .022a.042.042 0 0 1 0-.021l.96.279a.958.958 0 0 0 .015-.48l-.976.222Zm.589-3.637a5.082 5.082 0 0 0-.591 3.63l.978-.207a4.082 4.082 0 0 1 .475-2.916l-.862-.507Zm2.885-2.28a5.082 5.082 0 0 0-2.885 2.28l.862.507a4.082 4.082 0 0 1 2.317-1.832l-.294-.955Zm2.032-.194a5.155 5.155 0 0 0-2.03.193l.29.957a4.155 4.155 0 0 1 1.636-.155l.104-.995Zm.72.295a1.416 1.416 0 0 0-.715-.294l-.114.993c.077.009.15.039.21.087l.619-.786Zm.453.626a1.416 1.416 0 0 0-.453-.626l-.62.786c.062.047.108.111.134.184l.94-.344Zm.049.79c.058-.26.042-.533-.047-.785l-.943.334c.027.074.031.154.014.23l.976.22Zm-.38.688c.19-.189.32-.428.38-.688l-.976-.22a.417.417 0 0 1-.111.202l.707.706Zm-1.275 1.299 1.278-1.302-.713-.7-1.278 1.3.713.702Zm.002-.007a.043.043 0 0 1-.009.013l-.7-.714a.96.96 0 0 0-.214.316l.923.385Zm.004-.017a.044.044 0 0 1-.004.017l-.923-.385a.957.957 0 0 0-.073.374l1-.006Zm-.003 0a.04.04 0 0 1 .002.016l-1-.026a.96.96 0 0 0 .068.379l.93-.37Zm-.01-.015a.042.042 0 0 1 .01.014l-.93.37c.048.12.12.23.21.32l.71-.704Zm1.281 1.277-1.283-1.279-.705.709 1.283 1.278.705-.708Zm-.011-.007c.005.002.01.005.014.009l-.71.704c.088.09.194.161.311.21l.385-.923Zm-.016-.004c.005 0 .01.002.016.004l-.385.923a.96.96 0 0 0 .369.073v-1Zm-.016.004a.042.042 0 0 1 .016-.004v1a.96.96 0 0 0 .368-.073l-.384-.923Zm-.014.009a.042.042 0 0 1 .014-.01l.384.924a.957.957 0 0 0 .312-.21l-.71-.704Zm1.272-1.3-1.274 1.302.714.7 1.274-1.302-.714-.7Zm.684-.388c-.26.063-.498.198-.685.39l.716.698a.416.416 0 0 1 .202-.115l-.233-.973Zm.788.038a1.417 1.417 0 0 0-.788-.038l.233.973a.416.416 0 0 1 .231.011l.324-.946Zm.645.453a1.416 1.416 0 0 0-.645-.453l-.324.946c.075.026.14.072.19.133l.78-.626Zm.304.727a1.417 1.417 0 0 0-.304-.727l-.78.626c.05.062.081.136.09.214l.994-.113Zm-.189 2.035c.201-.658.266-1.35.189-2.034l-.994.112a4.04 4.04 0 0 1-.15 1.63l.956.292Zm-2.275 2.902a5.082 5.082 0 0 0 2.276-2.903l-.957-.29a4.081 4.081 0 0 1-1.828 2.332l.51.86Zm-3.64.599a5.082 5.082 0 0 0 3.64-.6l-.51-.86c-.88.521-1.922.693-2.923.481l-.206.979Zm.022 0a.042.042 0 0 1-.02 0l.204-.979a.958.958 0 0 0-.462.017l.278.961Zm.017-.011a.042.042 0 0 1-.017.01l-.278-.96a.957.957 0 0 0-.4.231l.695.719Zm-1.582 1.638 1.594-1.65-.719-.695-1.594 1.65.719.695Zm-.89.908.888-.906-.715-.7-.887.907.715.7Zm-6.466-1.653-1.396 1.425.715.7 1.395-1.425-.714-.7Zm1.276.886L14.803 16l-.85.526.494.799.85-.526Zm-2.9 3.515 2.833-2.903-.716-.699-2.833 2.904.715.698Zm-.797.475c.299-.088.57-.25.792-.47l-.706-.708a.875.875 0 0 1-.37.22l.284.958Zm-.92.036c.304.065.62.053.92-.036l-.284-.959a.874.874 0 0 1-.43.017l-.207.978Zm-1.454.031c.474-.126.97-.137 1.45-.031l.215-.977a4.062 4.062 0 0 0-1.923.042l.258.966Zm-1.425.774a3.12 3.12 0 0 1 1.414-.771l-.236-.972a4.12 4.12 0 0 0-1.867 1.018l.69.725Zm-.84 1.373c.154-.523.444-.997.84-1.373l-.689-.725a4.12 4.12 0 0 0-1.11 1.814l.958.284Zm-.116 1.27a3.22 3.22 0 0 1 .115-1.27l-.958-.285a4.22 4.22 0 0 0-.151 1.663l.994-.108Zm.447-1.62-1.3 1.324.712.7 1.302-1.324-.714-.7Zm1.33-.54c-.49 0-.962.19-1.318.528l.69.724a.91.91 0 0 1 .629-.252v-1Zm1.32.528a1.911 1.911 0 0 0-1.32-.528v1c.235 0 .46.09.63.252l.69-.724Zm1.306 1.315L9.95 22.652l-.71.704 1.297 1.306.71-.705Zm.406.607a1.873 1.873 0 0 0-.408-.608l-.706.708a.874.874 0 0 1 .19.284l.924-.384Zm.143.72c0-.247-.048-.492-.143-.72l-.924.384c.045.106.067.22.067.335h1Zm-.143.718c.095-.228.143-.472.143-.719h-1c0 .115-.022.23-.067.336l.924.383Zm-.408.61c.175-.175.313-.382.408-.61l-.924-.383a.874.874 0 0 1-.19.284l.706.708Zm-1.275 1.297 1.279-1.302-.714-.7-1.278 1.3.713.702Zm.974-.965c-.41.128-.844.168-1.271.118l-.118.993a4.054 4.054 0 0 0 1.688-.157l-.299-.954Zm1.36-.837c-.373.39-.84.678-1.356.835l.291.957a4.133 4.133 0 0 0 1.788-1.101l-.723-.69Zm.77-1.393a3.134 3.134 0 0 1-.77 1.393l.723.69a4.133 4.133 0 0 0 1.016-1.838l-.969-.245Zm.033-1.443c.104.475.093.968-.032 1.438l.967.256c.165-.624.18-1.277.042-1.907l-.977.213Zm.037-.921a1.875 1.875 0 0 0-.038.917l.979-.205a.874.874 0 0 1 .017-.428l-.958-.284Zm.468-.79c-.219.22-.38.492-.468.79l.958.284a.874.874 0 0 1 .219-.368l-.709-.705Zm2.425-2.408-2.423 2.407.705.71 2.422-2.407-.704-.71Zm1.297.818-.538-.754-.814.581.538.754.814-.58Zm-2.39 2.933 2.333-2.285-.7-.715-2.333 2.286.7.714Zm.014-.02a.042.042 0 0 1-.011.017l-.705-.709a.957.957 0 0 0-.245.412l.96.28Zm0-.022a.041.041 0 0 1 0 .021l-.96-.279a.958.958 0 0 0-.015.48l.975-.222Zm-.59 3.637a5.082 5.082 0 0 0 .592-3.63l-.979.208a4.082 4.082 0 0 1-.474 2.915l.862.507Zm-2.884 2.28a5.082 5.082 0 0 0 2.885-2.28l-.862-.507a4.081 4.081 0 0 1-2.318 1.832l.295.955Zm-2.032.194a5.156 5.156 0 0 0 2.03-.193l-.29-.957c-.53.16-1.086.213-1.636.155l-.104.995Zm-.72-.295c.206.162.454.264.715.294l.114-.993a.416.416 0 0 1-.21-.087l-.62.786Zm-.454-.626c.09.247.247.463.454.626l.619-.786a.416.416 0 0 1-.134-.184l-.939.344Zm-.048-.79c-.059.26-.043.533.046.785l.943-.334a.417.417 0 0 1-.013-.23l-.976-.22Zm.38-.688c-.19.189-.321.428-.38.688l.976.22a.416.416 0 0 1 .111-.202l-.708-.706Zm1.275-1.299-1.279 1.302.714.7 1.278-1.3-.713-.702Zm-.003.007a.042.042 0 0 1 .01-.013l.7.714a.958.958 0 0 0 .213-.316l-.923-.385Zm-.003.017c0-.006.001-.011.003-.017l.923.385a.96.96 0 0 0 .074-.374l-1 .006Zm.003 0a.042.042 0 0 1-.003-.016l1 .026a.96.96 0 0 0-.068-.379l-.929.37Zm.01.015a.041.041 0 0 1-.01-.014l.93-.37a.96.96 0 0 0-.211-.32l-.71.704ZM8.61 24.036l1.283 1.279.706-.709-1.283-1.278-.706.708Zm.012.007a.04.04 0 0 1-.014-.009l.71-.704a.957.957 0 0 0-.312-.21l-.384.923Zm.016.004a.042.042 0 0 1-.016-.004l.384-.923a.957.957 0 0 0-.368-.073v1Zm.016-.004a.042.042 0 0 1-.016.004v-1a.957.957 0 0 0-.369.073l.385.923Zm.013-.009a.04.04 0 0 1-.013.01l-.385-.924a.957.957 0 0 0-.312.21l.71.704Zm-1.271 1.299 1.274-1.301-.715-.7-1.274 1.302.715.699Zm-.685.389c.261-.063.499-.198.686-.39l-.716-.698a.416.416 0 0 1-.202.115l.232.973Zm-.787-.038c.253.087.527.1.787.037l-.232-.972a.417.417 0 0 1-.232-.011l-.323.946Zm-.646-.453c.168.21.392.366.646.453l.323-.946a.417.417 0 0 1-.19-.133l-.779.626Zm-.303-.727c.03.266.135.518.303.727l.78-.626a.417.417 0 0 1-.09-.214l-.993.113Zm.188-2.036a5.04 5.04 0 0 0-.188 2.035l.994-.112a4.04 4.04 0 0 1 .15-1.63l-.956-.293Zm2.275-2.9a5.082 5.082 0 0 0-2.275 2.902l.957.29a4.082 4.082 0 0 1 1.828-2.332l-.51-.86Zm3.64-.6a5.082 5.082 0 0 0-3.64.6l.51.86a4.082 4.082 0 0 1 2.923-.481l.207-.979Zm-.021 0a.041.041 0 0 1 .02 0l-.205.979a.958.958 0 0 0 .462-.017l-.277-.961Zm-.018.011a.042.042 0 0 1 .018-.01l.277.96a.958.958 0 0 0 .4-.231l-.695-.719Zm1.583-1.638-1.595 1.65.72.695 1.594-1.65-.72-.695Zm6.273.042.767.507.551-.835-.766-.506-.552.834Zm1.442.39.192-.255-.8-.6-.191.254.799.601Zm-1.32-1.44-.249.337.806.592.248-.337-.805-.593Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m16.673 19.154-.895 1.032-.134-.234.961-.919.068.121ZM7.793 6.411c-.177.08-1.6 1.565-1.659 1.722a.701.701 0 0 0-.039.228c0 .18 1.69 4.266 1.874 4.451.116.117.343.205 1.495.585l1.358.448 1.566 1.561c.861.859 1.561 1.577 1.555 1.595l.475.825.944-1.014-.392-.699c-.017 0-.78-.75-1.695-1.667s-1.734-1.703-1.818-1.746c-.084-.044-.7-.26-1.367-.482l-1.213-.403-.787-1.542-.675-1.646.483-.494.423-.439 1.687.61c.833.423 1.537.79 1.564.818.028.026.242.63.476 1.34l.427 1.293 1.752 1.757 1.751 1.757.623.43.975-.872-.606-.408-1.673-1.672-1.673-1.672-.453-1.369c-.384-1.16-.474-1.39-.59-1.505-.202-.2-4.435-1.826-4.627-1.824a.283.283 0 0 0-.161.034ZM18.896 24.378a1446.315 1446.315 0 0 0-2.401-2.934l-.717-1.258.895-1.032.726 1.295c.077.162.902 1.12.934 1.084 0 0 2.666-2.707 2.713-2.759l-.616-.414a50.05 50.05 0 0 0-.525-.378l-.292-.206-.949-.654.902-.955.918.618c.01.009 1.419 1.01 3.13 2.224 3.424 2.43 3.658 2.622 4.068 3.314.452.761.661 1.706.563 2.542-.225 1.92-1.686 3.386-3.597 3.61-1.098.129-2.286-.245-3.139-.987-.134-.117-1.31-1.517-2.613-3.11Zm5.002-3.551c1.145.815 2.166 1.57 2.27 1.676.728.75.972 1.813.642 2.796a2.382 2.382 0 0 1-.601 1.005 2.637 2.637 0 0 1-1.126.735c-.335.118-.427.132-.878.13-.425 0-.559-.019-.858-.118a3.107 3.107 0 0 1-1.013-.585c-.235-.207-3.03-3.699-3.009-3.755.048-.126 2.869-3.042 2.913-3.025.027.01.516.325 1.66 1.14Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m17.083 16.031.991-.868-.498-.336-.975.872.482.332Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m19.395 16.052-1.321-.89-.991.87 1.446.997c.35-.397.639-.724.866-.977Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M19.395 16.052c-.227.253-.517.58-.866.977l.135.093.902-.955-.171-.116ZM15.632 17.295l-1.013.878 1.025 1.779.961-.919-.973-1.738ZM14.619 18.173l1.013-.878-.27-.483-.944 1.014.2.347Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m15.778 20.186.895-1.032m-.895 1.032.717 1.258c.018.02 1.099 1.34 2.401 2.934 1.303 1.593 2.48 2.993 2.613 3.11.853.742 2.041 1.116 3.139.987 1.91-.224 3.372-1.69 3.597-3.61.098-.836-.111-1.78-.563-2.542-.41-.692-.644-.883-4.068-3.314-1.711-1.215-3.12-2.215-3.13-2.224l-.918-.618m-3.788 4.019-.134-.234m1.03-.798.725 1.295c.077.162.902 1.12.934 1.084 0 0 2.666-2.707 2.713-2.759l-.616-.414a50.05 50.05 0 0 0-.525-.378l-.292-.206-.949-.654m-1.99 2.032-.069-.121m-.973-1.738-1.013.878m1.013-.878-.27-.483m.27.483.973 1.738m-1.986-.86-.2-.347m.2.347 1.025 1.779m3.75-3.9-1.32-.89m1.32.89c-.226.253-.516.58-.865.977m.866-.977.171.115m-1.492-1.005-.991.87m.991-.87-.498-.335m-.493 1.204 1.446.998m-1.446-.998-.482-.332m1.928 1.33.135.093m-4.246.704L13.943 17c.006-.018-.694-.736-1.555-1.595l-1.566-1.561-1.358-.448c-1.152-.38-1.379-.468-1.495-.585-.185-.185-1.874-4.272-1.874-4.451 0-.072.014-.16.039-.228.058-.157 1.482-1.642 1.659-1.722a.283.283 0 0 1 .161-.034C8.146 6.375 12.379 8 12.58 8.201c.117.116.207.344.591 1.505l.453 1.369 1.673 1.672 1.673 1.672.606.408m-3.158 2.999.944-1.014m0 0-.392-.699c-.017 0-.78-.75-1.695-1.667s-1.734-1.703-1.818-1.746c-.084-.044-.7-.26-1.367-.482l-1.213-.403-.787-1.542-.675-1.646.483-.494.423-.439 1.687.61c.833.423 1.537.79 1.564.818.028.026.242.63.476 1.34l.427 1.293 1.752 1.757 1.751 1.757.623.43m0 0 .975-.872m1.99 1.34-.902.955m-3.02 2.83.961-.919m7.293 1.794c1.145.815 2.166 1.57 2.27 1.676.728.75.972 1.813.642 2.796a2.382 2.382 0 0 1-.601 1.005 2.637 2.637 0 0 1-1.126.735c-.335.118-.427.132-.878.13-.425 0-.559-.019-.858-.118a3.107 3.107 0 0 1-1.013-.585c-.235-.207-3.03-3.699-3.009-3.755.048-.126 2.869-3.042 2.913-3.025.027.01.516.325 1.66 1.14Z",
                stroke: "#080914",
                strokeWidth: 0.5
            })
        ]
    });
/* harmony default export */ const icons_WorkshopWorkIcon = (WorkshopWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HairWorkIcon.tsx



const HairWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#ACB9FF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M22.024 3.165c.549-.837 1.84-.565 2.004.423l.453 2.714c.04.24 0 .485-.115.699l-4.426 8.3 2.265 3.45c3.122.043 4.996 3.007 4.996 5.766 0 2.778-1.901 5.765-5.063 5.765-3.163 0-5.063-2.987-5.063-5.765 0-.866.184-1.752.534-2.562L17 20.813l-.61 1.142c.35.81.535 1.696.535 2.562 0 2.778-1.9 5.765-5.063 5.765-3.162 0-5.063-2.987-5.063-5.765 0-2.759 1.874-5.723 4.996-5.765L14.06 15.3 9.634 7a1.1 1.1 0 0 1-.115-.698l.453-2.714c.164-.988 1.455-1.26 2.004-.423L17 10.82l5.024-7.655Zm-6.22 9.478-4.238-6.457-.024.143 3.768 7.066.494-.752Zm-.829 7.305a4.738 4.738 0 0 0-1.089-.737l8.548-13.025.024.143-7.321 13.727-.162-.108Zm-2.056 1.034a2.555 2.555 0 0 0-1.057-.23c-1.691 0-3.063 1.685-3.063 3.765s1.372 3.765 3.063 3.765c1.692 0 3.063-1.686 3.063-3.765 0-1.237-.484-2.334-1.233-3.02l-.773-.515Zm5.214-2.294.73 1.368.162-.107c.326-.294.69-.544 1.089-.739l-1.247-1.899-.734 1.377Zm2.948 2.294-.773.515c-.749.686-1.233 1.784-1.233 3.02 0 2.08 1.371 3.765 3.063 3.765 1.691 0 3.063-1.686 3.063-3.765 0-2.08-1.372-3.765-3.063-3.765-.372 0-.728.08-1.057.23Zm-9.166 4.297s-.003 0-.008-.004l.008.004Zm-.021-.078a.58.58 0 0 1-.032.036.613.613 0 0 1-.031-.036c-.098-.12-.208-.355-.208-.684 0-.33.11-.565.208-.684a.613.613 0 0 1 .031-.036l.032.036c.097.12.207.355.207.684 0 .329-.11.564-.207.684Zm.02-1.446-.007.004.008-.004Zm-.104 0 .008.004-.008-.004Zm.008 1.52-.008.004.008-.004Zm-2.195-.758c0 1.52 1.003 2.752 2.24 2.752 1.236 0 2.238-1.232 2.238-2.752 0-1.52-1.002-2.752-2.239-2.752-1.236 0-2.239 1.232-2.239 2.752Zm12.567.762s-.003 0-.008-.004l.008.004Zm-.02-.078a.58.58 0 0 1-.032.036.548.548 0 0 1-.032-.036c-.097-.12-.207-.355-.207-.684 0-.33.11-.565.207-.684a.548.548 0 0 1 .032-.036c.01.01.02.021.031.036.098.12.208.355.208.684 0 .329-.11.564-.208.684Zm.019-1.445.001-.001h-.002l-.001.001-.005.003.002-.001.005-.002Zm-.104-.001s.003 0 .008.004l-.008-.004Zm.008 1.52-.008.004.008-.004Zm-2.194-.758c0 1.52 1.002 2.752 2.239 2.752 1.236 0 2.239-1.232 2.239-2.752 0-1.52-1.003-2.752-2.24-2.752-1.236 0-2.238 1.232-2.238 2.752Z",
                fill: "#000"
            })
        ]
    });
/* harmony default export */ const icons_HairWorkIcon = (HairWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/BeautyWorkIcon.tsx



const BeautyWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#D9F"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M15.823 5.222c.495-.463 1.462-.913 2.4-1.116.78-.17 2.174-.13 2.934.08 1.31.365 2.3 1.054 2.518 1.752.174.56.123.763-.692 2.788l-.731 1.817-.04 1.102c-.074 2.107-.297 4.078-.67 5.917l-.183.907-.03 5.1-.03 5.1-.14.281a2.029 2.029 0 0 1-.88.878c-.232.113-.372.138-.765.139-.414 0-.524-.021-.778-.153a1.873 1.873 0 0 1-.859-.886l-.148-.316-.03-5.1-.031-5.1-.177-.85c-.359-1.726-.601-3.865-.672-5.921l-.035-1.049-.745-1.87c-.708-1.777-.745-1.889-.744-2.266.002-.508.168-.898.528-1.234Zm6.879.761c-.246-.329-1.31-.828-2.124-.995-.537-.111-1.63-.112-2.141-.002-.822.176-1.912.699-2.12 1.017-.23.35-.211.429.535 2.3l.699 1.751h.471c.26 0 .472-.021.472-.048 0-.026-.077-.425-.17-.887-.094-.462-.17-.887-.17-.946 0-.165.253-.385.444-.385.346 0 .408.12.632 1.224.275 1.354.313 1.357.568.038.215-1.11.29-1.262.622-1.262.213 0 .453.22.453.413 0 .075-.076.513-.17.975-.093.461-.17.848-.17.859 0 .01.212.02.472.02h.47l.7-1.752c.75-1.882.774-1.988.527-2.32ZM14.217 16.77c-.113-.246-.226-.362-.488-.5a1.042 1.042 0 0 0-.4-.093c-.27-.002-1.293.33-1.637.532-.323.188-.691.699-.872 1.084l-.112.444V19.9c-.014 1.677-.028 1.94-.101 1.94-.047 0-.148.063-.224.14l-.14.139v7.603l.14.139.139.139H14.499l.139-.14.139-.138v-7.604l-.14-.139c-.076-.076-.178-.139-.226-.139-.077 0-.088-.276-.089-2.422 0-2.23-.01-2.44-.105-2.65Zm-2.525 1.391c.173-.349.406-.684 1.08-.912.541-.183.552-.185.607-.13.021.021.038 1.092.038 2.38v2.342H11.604V18.471l.088-.31Zm8.583 10.515c.115-.155.117-.21.132-4.856l.015-4.699h-1.815v4.624c0 4.322-.015 4.81.221 5.04.045.044.1.079.165.128.164.125.26.153.526.153.352 0 .535-.094.756-.39Zm-9.125-4.328v-1.6h2.72v1.6h-2.72Zm0 4.746v-3.846h2.72v3.846h-2.72Zm10.082-15.937c.02-.288.053-.9.074-1.36l.038-.835h-3.66l.04.835c.091 1.949.317 3.903.646 5.596l.154.794.995.015.995.015.18-.978c.147-.804.402-2.439.405-2.608l.133-1.474Z",
                fill: "#080914",
                stroke: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_BeautyWorkIcon = (BeautyWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/GymWorkIcon.tsx



const GymWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#6E7DCF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M20.696 5.565c-.552.149-1.093.571-1.33 1.04l-.116.228-.219-.105a2.1 2.1 0 0 0-2.392.43c-.65.65-.807 1.574-.413 2.427.093.2.342.477 1.308 1.45l1.193 1.204-3.245 3.245-3.245 3.245-1.204-1.193c-.973-.966-1.25-1.215-1.45-1.308-.853-.394-1.777-.237-2.427.413a2.11 2.11 0 0 0-.412 2.432l.088.178-.229.116c-.332.169-.725.582-.892.938a2.132 2.132 0 0 0 .003 1.848c.114.243.258.417.797.963l.657.667-.39.418c-.469.5-.684.894-.738 1.35-.172 1.447.962 2.58 2.408 2.409.456-.055.85-.27 1.35-.738l.419-.39.666.657c.737.726.994.89 1.553.985.846.145 1.818-.332 2.196-1.077l.116-.228.215.105c.31.15.66.213 1.047.186 1.26-.089 2.177-1.278 1.935-2.508-.114-.582-.191-.685-1.481-1.986l-1.194-1.203 3.246-3.245 3.245-3.246 1.203 1.194c.976.968 1.25 1.215 1.452 1.308.94.435 2.031.167 2.629-.645.469-.637.554-1.46.223-2.164l-.101-.215.228-.116c.745-.377 1.222-1.35 1.077-2.196-.096-.56-.259-.816-.986-1.553l-.658-.667.352-.373c.637-.676.808-1.075.777-1.824-.015-.39-.035-.473-.179-.773-.194-.403-.404-.654-.725-.868a2.18 2.18 0 0 0-2.294-.06c-.103.06-.366.277-.583.481l-.396.37-.66-.652c-.445-.44-.738-.692-.896-.771-.49-.246-1.047-.313-1.528-.183Zm.832 1.348c.229.095 5.413 5.27 5.539 5.53.114.234.112.436-.006.68-.171.354-.683.532-1.02.353-.147-.078-5.462-5.4-5.532-5.54a.885.885 0 0 1-.05-.31.767.767 0 0 1 1.07-.713Zm4.684.54c.26.13.414.392.411.696-.002.287-.073.409-.453.784l-.319.314-.549-.55-.55-.549.315-.318c.172-.175.354-.34.403-.368a.812.812 0 0 1 .742-.01Zm-7.76.492c.192.09 7.563 7.47 7.623 7.632.244.655-.456 1.296-1.067.977-.208-.108-7.479-7.386-7.578-7.584-.306-.614.4-1.32 1.023-1.025Zm1.805 5.82.539.54-3.247 3.247-3.247 3.246-.55-.55-.55-.55 3.235-3.236c1.78-1.78 3.246-3.236 3.259-3.236.013 0 .265.242.561.54ZM8.99 17.447c.207.108 7.478 7.386 7.577 7.585.298.598-.353 1.283-.992 1.045-.161-.06-7.541-7.43-7.632-7.622-.303-.639.42-1.334 1.047-1.008Zm-1.055 3.064c.139.07 5.46 5.386 5.539 5.532a.868.868 0 0 1 .064.333.767.767 0 0 1-1.069.713c-.23-.096-5.422-5.273-5.541-5.526a.764.764 0 0 1 .692-1.101c.119 0 .26.022.315.049Zm.772 4.804.537.539-.313.318c-.374.379-.508.457-.786.457-.312 0-.567-.162-.719-.455-.071-.139-.071-.5 0-.639.055-.107.672-.76.719-.76.013 0 .266.243.562.54Z",
                fill: "#080914",
                stroke: "#080914",
                strokeWidth: 0.5
            })
        ]
    });
/* harmony default export */ const icons_GymWorkIcon = (GymWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/SpaWorkIcon.tsx



const SpaWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#99D5CF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M10.438 13.819a4.33 4.33 0 0 1-1.26-.17 3.085 3.085 0 0 1-1.07-.62.788.788 0 0 1-.2-.25.62.62 0 0 1-.07-.28c0-.154.053-.287.16-.4a.555.555 0 0 1 .42-.18c.126 0 .24.04.34.12.253.206.503.363.75.47.253.106.563.16.93.16.246 0 .473-.037.68-.11.206-.08.373-.184.5-.31a.637.637 0 0 0 .19-.45c0-.2-.06-.37-.18-.51s-.304-.257-.55-.35c-.247-.1-.56-.177-.94-.23a4.385 4.385 0 0 1-.95-.24 2.411 2.411 0 0 1-.69-.42 1.75 1.75 0 0 1-.41-.6 2.083 2.083 0 0 1-.14-.78c0-.434.11-.804.33-1.11.226-.307.53-.54.91-.7.38-.16.8-.24 1.26-.24.433 0 .833.066 1.2.2.373.126.676.29.91.49.193.153.29.33.29.53a.57.57 0 0 1-.17.4.533.533 0 0 1-.4.18c-.1 0-.19-.03-.27-.09a1.704 1.704 0 0 0-.43-.26 3.227 3.227 0 0 0-.57-.21 2.13 2.13 0 0 0-1.29.02.992.992 0 0 0-.44.3.69.69 0 0 0-.15.44c0 .2.056.366.17.5.12.126.29.23.51.31.22.073.483.14.79.2.4.073.75.16 1.05.26.306.1.56.23.76.39.2.153.35.35.45.59.1.233.15.52.15.86 0 .433-.12.806-.36 1.12-.24.313-.557.553-.95.72-.387.166-.807.25-1.26.25Zm6.606-7.1c.347 0 .67.1.97.3.307.2.554.47.74.81.187.34.28.72.28 1.14 0 .413-.093.79-.28 1.13-.186.34-.433.613-.74.82-.3.2-.623.3-.97.3h-1.84l.1-.18v2.07c0 .173-.053.32-.16.44a.55.55 0 0 1-.42.17.538.538 0 0 1-.41-.17.638.638 0 0 1-.16-.44v-5.78a.599.599 0 0 1 .61-.61h2.28Zm0 3.36c.127 0 .25-.054.37-.16a1.282 1.282 0 0 0 .42-.95c0-.194-.04-.374-.12-.54-.08-.167-.18-.3-.3-.4a.555.555 0 0 0-.37-.16h-1.86l.12-.18v2.55l-.11-.16h1.85Zm5.305-1.79-2.16 5.08a.632.632 0 0 1-.22.3.521.521 0 0 1-.31.1c-.18 0-.313-.05-.4-.15a.545.545 0 0 1-.13-.37c0-.06.01-.124.03-.19l2.49-5.98a.663.663 0 0 1 .24-.31.542.542 0 0 1 .36-.09c.12 0 .23.036.33.11a.557.557 0 0 1 .23.29l2.46 5.86c.034.086.05.166.05.24 0 .18-.06.323-.18.43a.541.541 0 0 1-.71.05.734.734 0 0 1-.22-.3l-2.15-5.01.29-.06Zm-1.85 3.86.55-1.15h2.7l.19 1.15H20.5Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M16.388 17.256c-.74.714-1.372 1.517-1.794 2.28a8.72 8.72 0 0 1-.144.255 3.06 3.06 0 0 1-.367-.156c-.786-.363-2.138-.725-2.96-.793a9 9 0 0 1-.432-.044l-.126-.019-.088.383c-.178.775-.226 1.232-.23 2.169a15.93 15.93 0 0 0 .033 1.208l.035.31-.26.05c-1.018.193-2.23.667-3.167 1.238a3.97 3.97 0 0 0-.337.217c0 .07.49 1.071.682 1.392.885 1.48 1.92 2.538 3.059 3.126.919.475 1.548.625 2.585.617 1.22-.01 2.373-.287 3.616-.871.251-.118.458-.19.53-.184.066.005.294.092.508.193 1.207.572 2.379.853 3.591.862 1.038.008 1.667-.142 2.586-.617 1.138-.588 2.173-1.645 3.059-3.126.192-.32.682-1.321.682-1.392 0-.006-.152-.104-.337-.217-.936-.571-2.149-1.045-3.167-1.238l-.26-.05.035-.31c.02-.17.034-.714.032-1.208-.003-.937-.051-1.394-.23-2.169l-.087-.383-.126.019a9 9 0 0 1-.432.044c-.823.068-2.174.43-2.96.793a3.06 3.06 0 0 1-.368.156 10.658 10.658 0 0 0-1.078-1.615c-.385-.48-1.366-1.437-1.471-1.437-.041 0-.316.233-.612.517Zm.994 1.531c.768.902 1.302 1.864 1.54 2.776.125.478.151 1.276.059 1.768-.126.67-.474 1.477-.942 2.184-.282.424-.712.97-.916 1.163l-.13.122-.219-.234c-.885-.948-1.559-2.192-1.757-3.247-.09-.474-.063-1.285.058-1.743.207-.79.628-1.612 1.224-2.388.29-.379.666-.814.705-.815.013 0 .183.186.378.414Zm-5.137 1.507c.493.126 1.189.374 1.515.54l.21.105-.1.4c-.142.565-.176 1.541-.074 2.115.157.892.586 1.916 1.162 2.776.157.235.277.427.265.427-.063 0-.78-.298-1.08-.449-1.498-.752-2.28-1.814-2.599-3.52-.077-.414-.103-1.892-.041-2.325l.033-.233.13.024c.071.014.332.077.579.14Zm10.239-.034c.013.073.036.463.05.867.06 1.62-.278 2.89-1.009 3.783-.41.502-1.006.966-1.668 1.298-.3.151-1.017.45-1.08.45-.012 0 .107-.193.265-.428.576-.86 1.005-1.884 1.162-2.776.101-.574.068-1.55-.073-2.115l-.1-.4.209-.106c.46-.233 1.567-.587 2.194-.701.014-.003.037.055.05.128Zm-11.79 3.98c.498 1.324 1.492 2.364 2.959 3.093.397.197 1.168.508 1.261.508.022 0 .05.016.062.036.027.043-.618.226-1.086.308-1.37.239-2.542.007-3.539-.7-.354-.25-1.15-1.047-1.464-1.464-.244-.324-.744-1.107-.744-1.164 0-.092 1.435-.608 2.082-.748.392-.085.388-.086.47.13Zm13.265-.087c.6.147 1.898.628 1.898.704 0 .054-.474.804-.712 1.127-.33.446-1.06 1.184-1.442 1.46a4.37 4.37 0 0 1-2.845.828c-.645-.044-1.981-.34-1.817-.403l.469-.173c1.885-.69 3.21-1.898 3.796-3.46l.074-.196.167.027c.092.014.277.053.412.086Z",
                fill: "#080914",
                stroke: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_SpaWorkIcon = (SpaWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/TatooWorkIcon.tsx



const TatooWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#AEB9BE"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M5.12 19.5a.643.643 0 0 1-.46-.17.599.599 0 0 1-.18-.44v-5.8h1.3v5.8c0 .173-.063.32-.19.44a.657.657 0 0 1-.47.17Zm-2.21-5.85a.639.639 0 0 1-.44-.16.55.55 0 0 1-.17-.42c0-.173.057-.31.17-.41a.639.639 0 0 1 .44-.16h4.44c.173 0 .317.053.43.16.12.107.18.247.18.42s-.06.313-.18.42a.626.626 0 0 1-.43.15H2.91Zm8.884.4c.173 0 .316.057.43.17.113.113.17.26.17.44v4.23c0 .173-.057.32-.17.44a.583.583 0 0 1-.43.17.583.583 0 0 1-.43-.17.617.617 0 0 1-.17-.44v-.49l.22.09c0 .087-.047.193-.14.32-.094.12-.22.24-.38.36s-.35.223-.57.31c-.214.08-.447.12-.7.12a2.31 2.31 0 0 1-1.25-.35 2.582 2.582 0 0 1-.89-.98c-.214-.42-.32-.9-.32-1.44 0-.547.106-1.027.32-1.44.22-.42.513-.747.88-.98a2.18 2.18 0 0 1 1.22-.36 2.31 2.31 0 0 1 1.41.46c.18.133.316.27.41.41.1.133.15.247.15.34l-.36.13v-.73c0-.173.056-.317.17-.43a.566.566 0 0 1 .43-.18Zm-2.02 4.45c.293 0 .55-.073.77-.22.22-.147.39-.347.51-.6.126-.253.19-.537.19-.85 0-.32-.064-.607-.19-.86a1.45 1.45 0 0 0-.51-.6 1.355 1.355 0 0 0-.77-.22c-.287 0-.54.073-.76.22-.22.147-.394.347-.52.6-.12.253-.18.54-.18.86 0 .313.06.597.18.85.126.253.3.453.52.6.22.147.473.22.76.22Zm3.479-4.25h2.37a.543.543 0 0 1 .56.56.531.531 0 0 1-.16.39c-.107.1-.24.15-.4.15h-2.37a.542.542 0 0 1-.4-.16.543.543 0 0 1-.16-.4c0-.153.053-.28.16-.38a.542.542 0 0 1 .4-.16Zm1.07-1.25c.173 0 .313.06.42.18.113.113.17.257.17.43v4.45c0 .093.017.17.05.23.04.06.09.103.15.13a.587.587 0 0 0 .43 0 .508.508 0 0 1 .23-.05c.093 0 .177.043.25.13a.51.51 0 0 1 .12.36c0 .187-.103.34-.31.46-.2.12-.417.18-.65.18-.14 0-.297-.01-.47-.03a1.427 1.427 0 0 1-.48-.17 1.094 1.094 0 0 1-.37-.42c-.1-.187-.15-.443-.15-.77v-4.5a.598.598 0 0 1 .61-.61Zm2.522 1.25h2.37a.543.543 0 0 1 .56.56.531.531 0 0 1-.16.39c-.107.1-.24.15-.4.15h-2.37a.542.542 0 0 1-.4-.16.543.543 0 0 1-.16-.4c0-.153.053-.28.16-.38a.542.542 0 0 1 .4-.16Zm1.07-1.25c.173 0 .313.06.42.18.113.113.17.257.17.43v4.45c0 .093.016.17.05.23.04.06.09.103.15.13a.587.587 0 0 0 .43 0 .508.508 0 0 1 .23-.05c.093 0 .176.043.25.13a.51.51 0 0 1 .12.36c0 .187-.104.34-.31.46-.2.12-.417.18-.65.18-.14 0-.297-.01-.47-.03a1.427 1.427 0 0 1-.48-.17 1.094 1.094 0 0 1-.37-.42c-.1-.187-.15-.443-.15-.77v-4.5a.598.598 0 0 1 .61-.61Zm7.603 3.83c0 .547-.124 1.03-.37 1.45-.24.413-.567.737-.98.97-.407.233-.864.35-1.37.35-.507 0-.967-.117-1.38-.35a2.681 2.681 0 0 1-.98-.97c-.24-.42-.36-.903-.36-1.45 0-.547.12-1.027.36-1.44.246-.42.573-.747.98-.98.413-.24.873-.36 1.38-.36.506 0 .963.12 1.37.36.413.233.74.56.98.98.246.413.37.893.37 1.44Zm-1.2 0c0-.34-.07-.633-.21-.88a1.47 1.47 0 0 0-1.31-.8c-.28 0-.537.07-.77.21-.227.14-.41.337-.55.59-.134.247-.2.54-.2.88 0 .333.066.627.2.88.14.247.323.44.55.58.233.14.49.21.77.21s.533-.07.76-.21c.233-.14.416-.333.55-.58.14-.253.21-.547.21-.88Zm6.94 0c0 .547-.123 1.03-.37 1.45-.24.413-.567.737-.98.97-.407.233-.863.35-1.37.35-.507 0-.967-.117-1.38-.35a2.68 2.68 0 0 1-.98-.97c-.24-.42-.36-.903-.36-1.45 0-.547.12-1.027.36-1.44.247-.42.573-.747.98-.98.413-.24.873-.36 1.38-.36.507 0 .963.12 1.37.36.413.233.74.56.98.98.247.413.37.893.37 1.44Zm-1.2 0c0-.34-.07-.633-.21-.88a1.47 1.47 0 0 0-1.31-.8c-.28 0-.537.07-.77.21-.227.14-.41.337-.55.59-.133.247-.2.54-.2.88 0 .333.067.627.2.88.14.247.323.44.55.58.233.14.49.21.77.21s.533-.07.76-.21c.233-.14.417-.333.55-.58.14-.253.21-.547.21-.88Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_TatooWorkIcon = (TatooWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/RenovationWorkIcon.tsx



const RenovationWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        width: 34,
                        height: 34,
                        rx: 17,
                        fill: "#CCF2F7"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M17.497 4.228a2.125 2.125 0 0 0-3.005 0L3.974 14.746a2.125 2.125 0 0 0 0 3.006l1.503 1.502a2.125 2.125 0 0 0 3.005 0L19 8.736a2.125 2.125 0 0 0 0-3.005 1.062 1.062 0 0 1 1.503 0l.751.751a1.063 1.063 0 0 1 0 1.503l-5.26 5.259a3.187 3.187 0 0 0 0 4.508l.752.75-.751.752a1.062 1.062 0 0 0 0 1.503l7.513 7.513a1.062 1.062 0 0 0 1.503 0l3.005-3.005a1.063 1.063 0 0 0 0-1.503l-7.513-7.513a1.063 1.063 0 0 0-1.503 0L18.25 17l-.752-.751a1.062 1.062 0 0 1 0-1.503l5.26-5.259a3.188 3.188 0 0 0 0-4.507l-.752-.752a3.188 3.188 0 0 0-4.508 0ZM6.98 17.752l-1.502-1.503L15.995 5.731l1.502 1.502L6.98 17.752Zm18.783 6.761-1.503 1.503-6.01-6.01 1.502-1.503 6.01 6.01Z",
                        fill: "#080914"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                        width: 34,
                        height: 34,
                        rx: 17,
                        fill: "#fff"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_RenovationWorkIcon = (RenovationWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CoffeeWorkIcon.tsx



const CoffeeWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#C07946"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M14.875 23.875h3.5A4.375 4.375 0 0 0 22.75 19.5v-.875h.875a2.625 2.625 0 0 0 0-5.25h-.875V12.5a.875.875 0 0 0-.875-.875h-10.5a.875.875 0 0 0-.875.875v7a4.375 4.375 0 0 0 4.375 4.375Zm7.875-8.75h.875a.875.875 0 1 1 0 1.75h-.875v-1.75Zm-10.5-1.75H21V19.5a2.625 2.625 0 0 1-2.625 2.625h-3.5A2.625 2.625 0 0 1 12.25 19.5v-6.125Zm13.125 12.25H9.625a.875.875 0 0 0 0 1.75h15.75a.875.875 0 1 0 0-1.75Z",
                fill: "#000"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M17.457 5.065c-.834.247-1.401.704-1.768 1.422-.157.309-.235.553-.354 1.115-.062.29-.136.596-.165.679-.146.416-.356.662-.72.841-.123.06-.263.154-.31.208-.38.422.067 1.168.7 1.168.302 0 .67-.182 1.017-.506.475-.442.701-.899.925-1.866.062-.27.133-.558.158-.64.071-.237.236-.522.383-.664.144-.138.444-.294.672-.347.395-.093.589-.324.587-.7a.832.832 0 0 0-.233-.555c-.226-.221-.506-.27-.892-.155Zm3.584-.003c-.523.145-.94.38-1.273.719-.487.493-.689.925-.89 1.909-.179.87-.363 1.178-.855 1.43-.234.12-.379.246-.427.371-.058.149-.036.353.055.533.153.299.436.474.768.474.155 0 .22-.016.396-.098a2.38 2.38 0 0 0 .996-.858c.244-.37.375-.721.545-1.462.168-.737.271-.988.508-1.24.132-.14.412-.287.693-.364.277-.076.413-.171.511-.359.071-.135.078-.172.068-.355-.02-.348-.217-.623-.518-.724-.17-.057-.31-.05-.577.024Z",
                fill: "#000"
            })
        ]
    });
/* harmony default export */ const icons_CoffeeWorkIcon = (CoffeeWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FoodtruckWorkIcon.tsx



const FoodtruckWorkIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 34,
        height: 34,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 34,
                height: 34,
                rx: 17,
                fill: "#F7D663"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M11.72 25.28H21.5M21.5 8H6.472C5.66 8 5 9.097 5 10.449V25.28h1.751",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M10.28 14.958v-3.7c0-.11.034-.201.101-.272a.343.343 0 0 1 .26-.106c.104 0 .19.036.258.106.067.071.101.161.101.271v3.701c.217-.079.392-.214.523-.406.131-.193.197-.41.197-.654v-2.64c0-.11.034-.2.101-.271a.343.343 0 0 1 .26-.106c.104 0 .19.035.258.106.067.07.101.16.101.27v2.64a1.937 1.937 0 0 1-.405 1.19 1.804 1.804 0 0 1-1.035.66v5.316c0 .11-.034.2-.101.271a.342.342 0 0 1-.259.106.342.342 0 0 1-.259-.106.377.377 0 0 1-.1-.271v-5.315a1.801 1.801 0 0 1-1.036-.66 1.938 1.938 0 0 1-.405-1.19v-2.64c0-.11.034-.2.101-.271a.342.342 0 0 1 .26-.106c.104 0 .19.035.258.106.067.07.101.16.101.27v2.64c0 .244.066.462.197.655.131.192.306.327.523.406Z",
                fill: "#000",
                stroke: "#000",
                strokeWidth: 0.5
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M26.006 25.28H29v-5.926m0 0c0-.577-1.075-6.275-1.497-8.333M29 19.354h-7.2V11.02h5.703m0 0C27.08 8.964 26.832 8 26.006 8H21.8m-1.44 17.28h.802",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M9.518 26.591a1.786 1.786 0 1 0 0-3.572 1.786 1.786 0 0 0 0 3.572ZM23.64 26.591a1.786 1.786 0 1 0 0-3.572 1.786 1.786 0 0 0 0 3.572Z",
                stroke: "#080914",
                strokeWidth: 2,
                strokeMiterlimit: 10,
                strokeLinecap: "round"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M15.92 16.867c-.525-.134-.954-.471-1.288-1.014-.334-.542-.504-1.194-.512-1.956.015-.857.225-1.568.63-2.133.405-.566.915-.86 1.53-.884.615.023 1.125.318 1.53.884.405.566.615 1.277.63 2.133-.007.762-.178 1.414-.512 1.956-.334.543-.763.88-1.288 1.014v4.195c0 .11-.034.2-.101.271a.342.342 0 0 1-.259.107.342.342 0 0 1-.259-.107.376.376 0 0 1-.1-.27v-4.196Zm.36-.707c.383-.016.715-.232.996-.648.281-.417.43-.955.444-1.615-.015-.66-.163-1.198-.444-1.614-.281-.417-.613-.633-.996-.649-.382.016-.714.232-.996.649-.28.416-.429.954-.444 1.614.015.66.163 1.198.444 1.615.281.416.613.632.996.648Z",
                fill: "#000",
                stroke: "#000",
                strokeWidth: 0.5
            })
        ]
    });
/* harmony default export */ const icons_FoodtruckWorkIcon = (FoodtruckWorkIcon);

;// CONCATENATED MODULE: ./src/assets/icons/BlankCandidate.tsx



const BlankCandidateIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 49,
        height: 49,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 24.021,
                        cy: 24.758,
                        r: 24,
                        fill: "#E2E6EF"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M12.364 37.59h-1.5a1.5 1.5 0 0 0 1.5 1.5v-1.5Zm23.314 0v1.5a1.5 1.5 0 0 0 1.5-1.5h-1.5Zm-21.814 0c0-5.609 4.548-10.156 10.157-10.156v-3c-7.266 0-13.157 5.89-13.157 13.157h3Zm10.157-10.156c5.61 0 10.157 4.547 10.157 10.157h3c0-7.267-5.89-13.157-13.157-13.157v3ZM12.364 39.09h23.314v-3H12.364v3Z",
                        fill: "#8789A2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M29.18 18.39c0 2.85-2.31 5.161-5.16 5.161v3a8.161 8.161 0 0 0 8.16-8.161h-3Zm-5.16 5.161a5.161 5.161 0 0 1-5.162-5.161h-3a8.161 8.161 0 0 0 8.161 8.161v-3Zm-5.162-5.161c0-2.85 2.311-5.162 5.161-5.162v-3a8.161 8.161 0 0 0-8.16 8.162h3Zm5.161-5.162c2.85 0 5.162 2.311 5.162 5.162h3a8.161 8.161 0 0 0-8.162-8.162v3Z",
                        fill: "#8789A2"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M46.93 11.747v-1.98h-7.919v-7.92h-1.98v7.92h-7.92v1.98h7.92v7.92h1.98v-7.92h7.92Z",
                        fill: "#F5F9FD"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M45.092 3.686A10 10 0 1 0 30.95 17.828 10 10 0 0 0 45.092 3.686Z",
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M39.097 16.754H37.09l.007-4.999H32.09V9.761l4.999-.007.007-5h1.994l.007 5 5.006.014.008 2.001-5.042.036.028 4.95Z",
                        fill: "#F5F9FD"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M39.097 16.754H37.09l.007-4.999H32.09V9.761l4.999-.007.007-5h1.994l.007 5 5.006.014.008 2.001-5.042.036.028 4.95Z",
                        fill: "#F5F9FD"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.021 .758)",
                        d: "M0 0h48v48H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const BlankCandidate = (BlankCandidateIcon);

;// CONCATENATED MODULE: ./src/assets/icons/MapMarkerIcon.tsx



const MapMarkerIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 17,
        height: 22,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M8.55 1.098c-3.87 0-7 2.973-7 6.65 0 4.987 7 12.35 7 12.35s7-7.363 7-12.35c0-3.677-3.13-6.65-7-6.65Zm0 9.025c-1.38 0-2.5-1.064-2.5-2.375s1.12-2.375 2.5-2.375 2.5 1.064 2.5 2.375c0 1.31-1.12 2.375-2.5 2.375Z",
            stroke: "#8789A2",
            strokeWidth: 2
        })
    });
/* harmony default export */ const icons_MapMarkerIcon = (MapMarkerIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PromotedStarIcon.tsx



const PromotedStarIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 14,
        height: 14,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M6.58.649a.5.5 0 0 1 .84 0l.873 1.35a.5.5 0 0 0 .6.195l1.5-.58a.5.5 0 0 1 .68.494l-.087 1.606a.5.5 0 0 0 .37.51l1.555.414a.5.5 0 0 1 .26.799l-1.015 1.248a.5.5 0 0 0 0 .63l1.014 1.248a.5.5 0 0 1-.26.799l-1.553.414a.5.5 0 0 0-.37.51l.086 1.606a.5.5 0 0 1-.68.493l-1.5-.579a.5.5 0 0 0-.6.195l-.873 1.35a.5.5 0 0 1-.84 0l-.873-1.35a.5.5 0 0 0-.6-.195l-1.5.58a.5.5 0 0 1-.68-.494l.087-1.606a.5.5 0 0 0-.37-.51l-1.555-.414a.5.5 0 0 1-.26-.799l1.015-1.248a.5.5 0 0 0 0-.63L.83 5.437a.5.5 0 0 1 .26-.799l1.553-.414a.5.5 0 0 0 .37-.51l-.086-1.606a.5.5 0 0 1 .68-.493l1.5.579a.5.5 0 0 0 .6-.195L6.58.649Z",
            fill: "#4A32CD"
        })
    });
/* harmony default export */ const icons_PromotedStarIcon = (PromotedStarIcon);

;// CONCATENATED MODULE: ./src/assets/icons/MoneyIcon.tsx



const MoneyIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 37,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.043,
                y: 0.924,
                width: 36,
                height: 36,
                rx: 18,
                fill: "#EFF4FC"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 17.973,
                cy: 19.424,
                r: 11.5,
                stroke: "#080914",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M18.027 24.209c-.664 0-1.254-.092-1.77-.277-.517-.184-1.01-.488-1.48-.912a.795.795 0 0 1-.235-.263.857.857 0 0 1-.07-.332.67.67 0 0 1 .194-.47.66.66 0 0 1 .899-.055c.35.322.715.566 1.093.732.387.166.839.25 1.355.25.369 0 .705-.06 1.01-.18a1.91 1.91 0 0 0 .747-.485c.184-.202.276-.438.276-.705 0-.332-.097-.604-.29-.816-.185-.221-.457-.4-.816-.54a6.814 6.814 0 0 0-1.273-.373 6.411 6.411 0 0 1-1.244-.345 3.387 3.387 0 0 1-.927-.553 2.358 2.358 0 0 1-.595-.817 2.686 2.686 0 0 1-.207-1.092c0-.563.147-1.046.442-1.452.296-.406.697-.72 1.204-.94.507-.222 1.078-.332 1.715-.332.58 0 1.124.092 1.631.276.508.175.918.415 1.231.72.222.193.332.4.332.622a.68.68 0 0 1-.207.47.605.605 0 0 1-.457.207.514.514 0 0 1-.332-.11 1.994 1.994 0 0 0-.594-.415 4.406 4.406 0 0 0-.802-.318 2.786 2.786 0 0 0-.802-.125c-.415 0-.77.06-1.065.18-.295.11-.521.267-.678.47a1.065 1.065 0 0 0-.235.692c0 .313.087.571.263.774.184.203.438.369.76.498.323.12.692.23 1.107.332.507.11.959.235 1.355.373.406.139.747.318 1.023.54.277.212.49.48.637.802.147.323.22.724.22 1.203 0 .553-.156 1.037-.47 1.452a3.118 3.118 0 0 1-1.244.968 4.065 4.065 0 0 1-1.701.346Zm.802 1.01c0 .193-.07.36-.207.497a.65.65 0 0 1-.498.208.635.635 0 0 1-.484-.208.704.704 0 0 1-.194-.498V13.63c0-.203.065-.369.194-.498a.695.695 0 0 1 .511-.207c.194 0 .355.069.484.207.13.13.194.295.194.498v11.59Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_MoneyIcon = (MoneyIcon);

;// CONCATENATED MODULE: ./src/assets/icons/MapMarker2Icon.tsx



const MapMarker2Icon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 37,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.043,
                y: 0.846,
                width: 36,
                height: 36,
                rx: 18,
                fill: "#EFF4FC"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                clipPath: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M18.043 8.846c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z",
                    stroke: "#080914",
                    strokeWidth: 2
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(6.043 6.846)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_MapMarker2Icon = (MapMarker2Icon);

;// CONCATENATED MODULE: ./src/assets/icons/MeetingIcon.tsx



const MeetingIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Mask, {
                id: "a",
                fill: "#fff",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M5.731 5a1 1 0 0 1 1-1h11.867a1 1 0 0 1 1 1v15H5.731V5Z"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M5.731 5a1 1 0 0 1 1-1h11.867a1 1 0 0 1 1 1v15H5.731V5Z",
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 4,
                mask: "url(#a)"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 8.932,
                y: 7.2,
                width: 3.2,
                height: 2.133,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 13.198,
                y: 7.2,
                width: 3.2,
                height: 2.133,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 8.932,
                y: 10.4,
                width: 3.2,
                height: 2.133,
                rx: 1,
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 11.065,
                y: 13.6,
                width: 3.2,
                height: 5.333,
                rx: 1,
                fill: props.fill ? props.fill : "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 13.198,
                y: 10.4,
                width: 3.2,
                height: 2.133,
                rx: 1,
                fill: props.fill ? props.fill : "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 2,
                strokeLinecap: "round",
                d: "M3.531 19h18.267M5.665 5.133h14"
            })
        ]
    });
/* harmony default export */ const icons_MeetingIcon = (MeetingIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ThreeDotsIcon.tsx



const ThreeDotsIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M12.469 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z",
            fill: "#000"
        })
    });
/* harmony default export */ const icons_ThreeDotsIcon = (ThreeDotsIcon);

;// CONCATENATED MODULE: ./src/assets/icons/RemoveIcon.tsx



const RemoveIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 23,
        height: 23,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "m19.521 5.158-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M12.521.758a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z",
                fill: "#E2E6EF"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M13.552 11.748h-6.98V9.705l5-.008h2.008l5.006.015.007 2-5.041.036Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M13.552 11.748h-6.98V9.705l5-.008h2.008l5.006.015.007 2-5.041.036Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_RemoveIcon = (RemoveIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CalendarIcon.tsx



const CalendarIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 25,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M4.86 5h16v3h-16V5Zm4-2h8V2a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-16a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2a1 1 0 0 1 2 0v1Zm-4 7h16v11h-16V10Zm2.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm3.5-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm3.5-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        })
    });
/* harmony default export */ const icons_CalendarIcon = (CalendarIcon);

;// CONCATENATED MODULE: ./src/assets/icons/FileDocumentCircleIcon.tsx



const FileDocumentCircleIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 37,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.57,
                y: 0.258,
                width: 36,
                height: 36,
                rx: 18,
                fill: "#EFF4FC"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M12.219 27.176v-1 1Zm12.706 0v1-1Zm1.059-1h-1 1Zm0-11.208h1-1Zm-.282-.68-.714.7.714-.7Zm-4.698-4.792.714-.7-.714.7Zm-.777-.32v-1 1Zm-8.008 0v1-1Zm-1.059 1h1-1Zm0 16h-1 1Zm1.059 2h12.706v-2H12.219v2Zm14.765-2V14.968h-2v11.208h2Zm-.568-12.588-4.698-4.792-1.428 1.4 4.698 4.792 1.428-1.4Zm-6.189-5.412h-8.008v2h8.008v-2Zm-10.067 2v16h2v-16h-2Zm2.059-2c-1.082 0-2.059.842-2.059 2h2a.051.051 0 0 1-.004.02c-.002.004-.003.003 0 0 .009-.008.028-.02.063-.02v-2Zm9.499.62a2.088 2.088 0 0 0-1.491-.62v2c.016 0 .03.003.042.008.012.005.018.01.02.012l1.429-1.4Zm5.266 6.172a1.97 1.97 0 0 0-.568-1.38l-1.428 1.4c.002.003 0 .002 0-.002a.047.047 0 0 1-.004-.018h2Zm-2.06 13.208c1.083 0 2.06-.843 2.06-2h-2c0-.007.001-.014.004-.02.002-.004.003-.004-.001 0-.008.007-.027.02-.062.02v2Zm-12.705-2c-.035 0-.054-.013-.062-.02-.004-.004-.003-.004-.001 0a.051.051 0 0 1 .004.02h-2c0 1.157.976 2 2.059 2v-2ZM15.379 22.176a1 1 0 1 0 0 2v-2Zm6.353 2a1 1 0 1 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2ZM15.379 19.172a1 1 0 1 0 0 2v-2Zm6.353 2a1 1 0 1 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M25.978 16.176a1 1 0 1 0 0-2v2Zm-5.294-1v1-1Zm-1.059-1h-1 1Zm1-5a1 1 0 1 0-2 0h2Zm5.353 5h-5.294v2h5.294v-2Zm-5.353 0v-5h-2v5h2Zm.059 0c-.035 0-.055-.013-.062-.02-.004-.004-.003-.004-.001 0a.051.051 0 0 1 .004.02h-2c0 1.157.976 2 2.059 2v-2Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_FileDocumentCircleIcon = (FileDocumentCircleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/UkraineFlagIcon.tsx



const UkraineFlagIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 36,
        height: 27,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#FFEB3B",
                d: "M0 .82h36v25.333H0z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#0288D1",
                d: "M0 .82h36v12.667H0z"
            })
        ]
    });
/* harmony default export */ const icons_UkraineFlagIcon = (UkraineFlagIcon);

;// CONCATENATED MODULE: ./src/assets/icons/BagIcon.tsx



const BagIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 25,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M5.56 9.843a2 2 0 0 1 1.974-1.671h10.31a2 2 0 0 1 1.967 1.64l1.804 9.874a2 2 0 0 1-1.967 2.36H5.888a2 2 0 0 1-1.972-2.329l1.645-9.874Z",
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 2
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M16.587 11.132V5.895a2 2 0 0 0-2-2h-3.583a2 2 0 0 0-2 2v5.237",
                stroke: props.fill ? props.fill : "#080914",
                strokeWidth: 2,
                strokeLinecap: "round"
            })
        ]
    });
/* harmony default export */ const icons_BagIcon = (BagIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowRightSmallIcon.tsx



const ArrowRightSmallIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 9,
        height: 13,
        ...props,
        fill: "none",
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M.91 11.09 5.49 6.5.91 1.91 2.32.5l6 6-6 6-1.41-1.41Z",
            fill: "#AEB2C6"
        })
    });
/* harmony default export */ const icons_ArrowRightSmallIcon = (ArrowRightSmallIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CreateCircleSmallIcon.tsx




const CreateCircleSmallIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
            clipPath: "url(#a)",
            children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M10.905 11.034V6.5h2v4.534H17.5v2h-4.595V17.5h-2v-4.466H6.5v-2h4.405ZM12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z",
                fill: props.fill ? props.fill : Colors/* default */.Z.White
            })
        })
    });
/* harmony default export */ const icons_CreateCircleSmallIcon = (CreateCircleSmallIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ColorCircle.tsx



const ColorCircleIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 20,
        height: 20,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
            cx: 10,
            cy: 10,
            r: 10,
            fill: props.fill ? props.fill : "red"
        })
    });
/* harmony default export */ const ColorCircle = (ColorCircleIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ColorCircleSelected.tsx




const ColorCircleSelectedIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 28,
        height: 28,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 14,
                cy: 14,
                r: 10,
                fill: props.fill ? props.fill : "#171937"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "m12 19.42-5-5 1.41-1.41L12 16.59 19.59 9 21 10.42l-9 9Z",
                fill: props.fill === Colors/* default */.Z.Basic800 || props.fill === Colors/* default */.Z.Blue500 ? Colors/* default */.Z.White : "#171937"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 14,
                cy: 14,
                r: 13,
                stroke: "#171937",
                strokeWidth: 2
            })
        ]
    });
/* harmony default export */ const ColorCircleSelected = (ColorCircleSelectedIcon);

;// CONCATENATED MODULE: ./src/assets/icons/Shadow.tsx



const Shadow = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 400,
        height: 577,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "url(#a)",
                d: "M0 0h400v577H0z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.LinearGradient, {
                    id: "a",
                    x1: 200,
                    y1: -9.467,
                    x2: 200,
                    y2: 577,
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            stopColor: "#100E27",
                            stopOpacity: 0.3
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 0.149,
                            stopColor: "#100E27",
                            stopOpacity: 0
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 0.68,
                            stopColor: "#100E27",
                            stopOpacity: 0
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(cjs.Stop, {
                            offset: 1,
                            stopColor: "#100E27",
                            stopOpacity: 0.5
                        })
                    ]
                })
            })
        ]
    });
/* harmony default export */ const icons_Shadow = (Shadow);

;// CONCATENATED MODULE: ./src/assets/icons/PlayIcon.tsx



const PlayIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 66,
        height: 66,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 33,
                cy: 33,
                r: 28,
                fill: "#fff",
                fillOpacity: 0.3
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 33,
                cy: 33,
                r: 31.5,
                stroke: "#fff",
                strokeWidth: 3
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                filter: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M49 32.268c1.333.77 1.333 2.694 0 3.464L28 47.856c-1.333.77-3-.192-3-1.732V21.876c0-1.54 1.667-2.502 3-1.732l21 12.124Z",
                    fill: "#fff"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {})
        ]
    });
/* harmony default export */ const icons_PlayIcon = (PlayIcon);

;// CONCATENATED MODULE: ./src/assets/icons/VisaIcon.tsx



const VisaIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 28,
        height: 21,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.602,
                y: 0.514,
                width: 26.667,
                height: 20,
                rx: 4,
                fill: "#172B85"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7.934 14.784H5.857L4.299 8.578c-.074-.285-.23-.538-.462-.657a6.564 6.564 0 0 0-1.903-.656v-.24H5.28c.461 0 .808.36.865.776l.809 4.477L9.03 7.026h2.019l-3.115 7.758Zm4.27 0h-1.962l1.615-7.758h1.962l-1.616 7.758Zm4.152-5.609c.058-.418.404-.657.809-.657a3.52 3.52 0 0 1 1.904.358l.346-1.67a4.78 4.78 0 0 0-1.789-.36c-1.904 0-3.289 1.075-3.289 2.567 0 1.135.982 1.73 1.674 2.09.75.357 1.038.596.98.954 0 .537-.577.776-1.153.776-.693 0-1.385-.18-2.02-.478l-.346 1.671a5.448 5.448 0 0 0 2.135.418c2.135.06 3.462-1.014 3.462-2.626 0-2.03-2.712-2.148-2.712-3.043Zm9.578 5.61-1.558-7.76h-1.673a.871.871 0 0 0-.808.597l-2.884 7.162h2.02l.402-1.133h2.481l.231 1.133h1.789Zm-2.942-5.67.576 2.924h-1.615l1.039-2.924Z",
                fill: "#fff"
            })
        ]
    });
/* harmony default export */ const icons_VisaIcon = (VisaIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PolishIcon.tsx



const PolishIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 17,
        height: 13,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#F5F8FB",
                        d: "M.566.91h16v6h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#E31D1C",
                        d: "M.566 6.91h16v6h-16z"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.566 .91)",
                        d: "M0 0h16v12H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_PolishIcon = (PolishIcon);

;// CONCATENATED MODULE: ./src/assets/icons/EnglishIcon.tsx



const EnglishIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 17,
        height: 13,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M.566.91h16v12h-16v-12Z",
                fill: "#41479B"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M16.566 11.348 10.65 6.91l5.916-4.437V.91h-2.083L8.566 5.348 2.65.91H.566v1.563L6.483 6.91.566 11.348v1.562H2.65l5.916-4.437 5.917 4.437h2.083v-1.562Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M.567.91v.625L7.732 6.91.566 12.285v.625H1.4l7.167-5.375 7.166 5.375h.833v-.625L9.4 6.91l7.166-5.375V.91h-.833L8.567 6.285 1.4.91H.567Z",
                fill: "#DC251C"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6.566 4.91v-4h4v4h6v4h-6v4h-4v-4h-6v-4h6Z",
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7.566 5.91v-5h2v5h7v2h-7v5h-2v-5h-7v-2h7Z",
                fill: "#DC251C"
            })
        ]
    });
/* harmony default export */ const icons_EnglishIcon = (EnglishIcon);

;// CONCATENATED MODULE: ./src/assets/icons/UkrainianIcon.tsx



const UkrainianIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 17,
        height: 13,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#3273D3",
                        d: "M.566.91h16v6h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#FFD018",
                        d: "M.566 6.91h16v6h-16z"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.566 .91)",
                        d: "M0 0h16v12H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_UkrainianIcon = (UkrainianIcon);

;// CONCATENATED MODULE: ./src/assets/icons/RussianIcon.tsx



const RussianIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 17,
        height: 13,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#F5F8FB",
                d: "M.566.91h16v4h-16z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#41479B",
                d: "M.566 4.91h16v4h-16z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#DC251C",
                d: "M.566 8.91h16v4h-16z"
            })
        ]
    });
/* harmony default export */ const icons_RussianIcon = (RussianIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CzechIcon.tsx



const CzechIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 17,
        height: 13,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#F5F8FB",
                        d: "M.566.91h16v12h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#F5F8FB",
                        d: "M.566.91h16v6h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#DC251C",
                        d: "M.566 6.91h16v6h-16z"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "m8.566 6.91-8-6v12l8-6Z",
                        fill: "#41479B"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "translate(.566 .91)",
                        d: "M0 0h16v12H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_CzechIcon = (CzechIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HelpIcon.tsx



const HelpIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#494c4e",
                d: "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2m0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                fill: "#494c4e",
                cx: 12,
                cy: 19,
                r: 1
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fill: "#494c4e",
                d: "M17 9a5 5 0 0 1-4 4.9V16c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1 1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76 2.24-5 5-5s5 2.24 5 5z"
            })
        ]
    });
/* harmony default export */ const icons_HelpIcon = (HelpIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HamburgerIcon.tsx



const HamburgerIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        viewBox: "0 0 24 24",
        width: 25,
        height: 25,
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            d: "M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3zm0 6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3zm0 6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3z"
        })
    });
/* harmony default export */ const icons_HamburgerIcon = (HamburgerIcon);

;// CONCATENATED MODULE: ./src/assets/icons/HorizontalMenuIcon.tsx




const HorizontalMenuIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 14,
        height: 14,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                width: 14,
                height: 4,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                y: 5,
                width: 14,
                height: 4,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                y: 10,
                width: 14,
                height: 4,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            })
        ]
    });
/* harmony default export */ const icons_HorizontalMenuIcon = (HorizontalMenuIcon);

;// CONCATENATED MODULE: ./src/assets/icons/GridMenuIcon.tsx




const GridMenuIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 15,
        height: 15,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.765,
                y: 0.445,
                width: 6,
                height: 6,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.765,
                y: 8.445,
                width: 6,
                height: 6,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 8.765,
                y: 0.445,
                width: 6,
                height: 6,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 8.765,
                y: 8.445,
                width: 6,
                height: 6,
                rx: 1,
                fill: props.fill ? props.fill : Colors/* default */.Z.Basic600
            })
        ]
    });
/* harmony default export */ const icons_GridMenuIcon = (GridMenuIcon);

;// CONCATENATED MODULE: ./src/assets/icons/WorkIcon2.tsx



const WorkIcon2 = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 37,
        height: 37,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                x: 0.043,
                y: 0.846,
                width: 36,
                height: 36,
                rx: 18,
                fill: "#EFF4FC"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M25.001 14.928H10.785a1 1 0 0 0-1 1V25a1 1 0 0 0 1 1h14.216a1 1 0 0 0 1-1v-9.072a1 1 0 0 0-1-1Zm-14.216-2a3 3 0 0 0-3 3V25a3 3 0 0 0 3 3h14.216a3 3 0 0 0 3-3v-9.072a3 3 0 0 0-3-3H10.785Z",
                fill: "#080914"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M12.82 12a4 4 0 0 1 4-4h2.15a4 4 0 0 1 4 4v1.57h-2V12a2 2 0 0 0-2-2h-2.15a2 2 0 0 0-2 2v1.57h-2V12Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_WorkIcon2 = (WorkIcon2);

;// CONCATENATED MODULE: ./src/assets/icons/NotificationIcon.tsx



const NotificationIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 24,
        height: 24,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M22 19c2.5.5-21.5.5-19.5 0S6 15 6 13V8.5C6 5.5 8.5 3 12 3s6 2.5 6 5.5V13c0 1 1.5 5.5 4 6Z",
                        stroke: "#080914",
                        strokeWidth: 2,
                        strokeLinejoin: "round",
                        fill: "none"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M9 19a3 3 0 0 0 6 0",
                        stroke: "#080914",
                        fill: "none",
                        strokeWidth: 2
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 12,
                        cy: 2,
                        r: 1,
                        fill: "#080914"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_NotificationIcon = (NotificationIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowBackgroundIcon.tsx



const ArrowBackgroundIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 40,
        height: 41,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Rect, {
                y: 0.068,
                width: 40,
                height: 40,
                rx: 20,
                fill: "#fff"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M8.717 19.068a1 1 0 1 0 0 2v-2Zm23.273 1.707a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.415 1.415l5.657 5.656-5.657 5.657a1 1 0 0 0 1.415 1.414l6.364-6.363Zm-23.273.293h22.566v-2H8.716v2Z",
                fill: "#080914"
            })
        ]
    });
/* harmony default export */ const icons_ArrowBackgroundIcon = (ArrowBackgroundIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ArrowBottomIcon.tsx



const ArrowBottomIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 25,
        height: 25,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                clipPath: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "m17.445 8.709-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6-1.41-1.41Z",
                    fill: props.fill
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        transform: "matrix(-1 0 0 1 24.855 .12)",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_ArrowBottomIcon = (ArrowBottomIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PhoneCallBigIcon.tsx



/* SVGR has dropped some elements not supported by react-native-svg: filter */ const PhoneCallBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 36,
        height: 36,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                filter: "url(#b)",
                clipPath: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M20.653 8.458a6.822 6.822 0 0 1 5.39 5.39M20.652 3A12.28 12.28 0 0 1 31.5 13.833m-1.364 10.888v4.094a2.73 2.73 0 0 1-2.975 2.729 27.002 27.002 0 0 1-11.775-4.19A26.607 26.607 0 0 1 7.2 19.169 27.002 27.002 0 0 1 3.01 7.338a2.729 2.729 0 0 1 2.715-2.974H9.82a2.729 2.729 0 0 1 2.73 2.347c.172 1.31.492 2.596.954 3.834a2.729 2.729 0 0 1-.614 2.88l-1.732 1.732a21.83 21.83 0 0 0 8.186 8.186l1.733-1.732a2.728 2.728 0 0 1 2.879-.614c1.238.462 2.524.782 3.834.955a2.729 2.729 0 0 1 2.347 2.77Z",
                    stroke: "#F5F9FD",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    //@ts-ignore
                    shapeRendering: "crispEdges"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M0 0h36v36H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_PhoneCallBigIcon = (PhoneCallBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/PinBigIcon.tsx



/* SVGR has dropped some elements not supported by react-native-svg: filter */ const PinBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 36,
        height: 36,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                filter: "url(#b)",
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "m13.264 20.799 1.414 1.414-8.485 8.485-2.122.707.707-2.12 8.486-8.486Z",
                        fill: props.fill || "#F5F9FD"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        stroke: props.fill || "#F5F9FD",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        d: "m21.041 1.707 12.728 12.728"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "m14.677 20.8-5.724-5.725c-.363-.363-.396-.95-.033-1.313 1.916-1.924 3.867-2.037 5.057-1.722.432.115.918.056 1.234-.26l7.952-7.951 4.242 4.242",
                        stroke: props.fill || "#F5F9FD",
                        strokeWidth: 2
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "m14.677 20.8 5.724 5.723c.364.364.95.396 1.314.034 1.923-1.917 2.037-3.867 1.721-5.058-.114-.431-.056-.917.26-1.233l7.952-7.952-4.243-4.243",
                        stroke: props.fill || "#F5F9FD",
                        strokeWidth: 2
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M0 0h36v36H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_PinBigIcon = (PinBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/ShareArowIcon.tsx



const ShareArowIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 36,
        height: 36,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.G, {
                clipPath: "url(#a)",
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                    d: "M31.5 18.75 18.779 31.5v-9.208c-9.2.498-11.283 1.91-14.279 9.208v-5c0-6.627 5.373-12 12-12h2.279V6L31.5 18.75Z",
                    stroke: "#fff",
                    strokeWidth: 2,
                    strokeLinejoin: "round"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M0 0h36v36H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_ShareArowIcon = (ShareArowIcon);

;// CONCATENATED MODULE: ./src/assets/icons/AddBigIcon.tsx



const AddBigIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 49,
        height: 49,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                cx: 24.861,
                cy: 24.361,
                r: 24,
                fill: "#4A32CD"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                stroke: "#fff",
                strokeLinecap: "round",
                strokeWidth: 2,
                d: "M24.861 16.361v16M16.861 24.361h16"
            })
        ]
    });
/* harmony default export */ const icons_AddBigIcon = (AddBigIcon);

;// CONCATENATED MODULE: ./src/assets/icons/CoinsIcon.tsx



const CoinsIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        height: 24,
        width: 24,
        viewBox: "0 0 512 512",
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M176 224c-61.758 0-112 50.242-112 112s50.242 112 112 112 112-50.242 112-112-50.242-112-112-112zm0 192c-44.109 0-80-35.891-80-80s35.891-80 80-80 80 35.891 80 80-35.891 80-80 80z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M192 352v-48c0-8.836-7.164-16-16-16h-16c-8.836 0-16 7.164-16 16s7.164 16 16 16v32c-8.836 0-16 7.164-16 16s7.164 16 16 16h32c8.836 0 16-7.164 16-16s-7.164-16-16-16z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                d: "M319.867 0C224.523 0 128 27.477 128 80v86.823C54.238 187.788 0 255.609 0 336c0 97.047 78.953 176 176 176 38.672 0 74.352-12.685 103.426-33.908C292.816 479.226 306.359 480 320 480c95.414 0 192-27.477 192-80V80c0-52.523-96.656-80-192.133-80zM32 336c0-79.398 64.602-144 144-144s144 64.602 144 144-64.602 144-144 144S32 415.398 32 336zm448 64c0 19.109-63.813 48-160 48-2.818 0-5.371-.215-8.121-.271 11.822-14.352 21.262-30.675 28.102-48.289 54.863-2.231 107.734-13.47 140.02-33.425V400zm0-80c0 17.095-51.244 41.965-130.906 47.021C350.898 356.932 352 346.6 352 336c0-5.804-.32-11.534-.871-17.195 50.795-3.225 98.785-14.192 128.871-32.789V320zm0-80c0 17.386-53.023 42.789-135.02 47.236a175.074 175.074 0 0 0-21.707-47.316c60.66-.418 121.17-11.927 156.727-33.904V240zm0-80c0 19.109-63.945 48-160.133 48-8.367 0-16.383-.296-24.227-.713C264.203 178.047 222.219 160 176 160c-5.344 0-10.607.333-15.832.802-.023-.263-.168-.542-.168-.802v-33.887C196.221 148.439 258.207 160 319.867 160c61.772 0 123.869-11.57 160.133-33.914V160zm-160.133-32C223.758 128 160 99.109 160 80s63.758-48 159.867-48C416.133 32 480 60.891 480 80s-63.867 48-160.133 48z"
            })
        ]
    });
/* harmony default export */ const icons_CoinsIcon = (CoinsIcon);

;// CONCATENATED MODULE: ./src/assets/icons/RefreshIcon.tsx



const RefreshIcon = (props)=>/*#__PURE__*/ jsx_runtime.jsx(cjs.Svg, {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        ...props,
        children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M2.06 10.893C2.596 5.91 6.73 2 11.786 2c2.86 0 5.428 1.253 7.213 3.24V4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1h-4a1 1 0 1 1 0-2h1.867c-1.432-1.835-3.627-3-6.08-3-3.987 0-7.306 3.09-7.74 7.107a1 1 0 1 1-1.988-.214Zm18.994 1.113a1 1 0 0 1 .887 1.101C21.403 18.09 17.27 22 12.213 22 9.353 22 6.785 20.747 5 18.76V20a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H6.133c1.432 1.835 3.627 3 6.08 3 3.988 0 7.306-3.09 7.74-7.107a1 1 0 0 1 1.1-.887Z",
            fill: "#0F1729"
        })
    });
/* harmony default export */ const icons_RefreshIcon = (RefreshIcon);

;// CONCATENATED MODULE: ./src/assets/icons/EventsHistoryIcon.tsx



const EventsHistoryIcon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.Svg, {
        width: 24,
        height: 24,
        ...props,
        fill: "none",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(cjs.G, {
                clipPath: "url(#a)",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M18.338 11.647c0 3.519-2.787 6.335-6.18 6.335s-6.18-2.816-6.18-6.335c0-3.518 2.787-6.335 6.18-6.335s6.18 2.817 6.18 6.335Z",
                        stroke: "#000",
                        strokeWidth: 2
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M8.575 2.104a1 1 0 0 0-1.743.98l1.642 2.92a1 1 0 1 0 1.743-.98l-1.642-2.92Zm7.925 4.11A1 1 0 0 0 17.942 7.6l3.623-3.774a1 1 0 0 0-1.443-1.385L16.5 6.215Zm1.236 7.915a1 1 0 0 1 1.36-.387l3.013 1.675a1 1 0 1 1-.972 1.748l-3.013-1.675a1 1 0 0 1-.388-1.36Zm-5.768 7.882a1 1 0 0 1-1-1v-2.36a1 1 0 1 1 2 0v2.36a1 1 0 0 1-1 1ZM1.635 15.722a1 1 0 0 1 .582-1.289l3.39-1.281a1 1 0 1 1 .708 1.87l-3.39 1.282a1 1 0 0 1-1.29-.582Z",
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M15.826 16.657v0c0-1.099-.89-1.989-1.988-1.989h-3.676c-1.098 0-1.988.89-1.988 1.989v0",
                        stroke: "#080914",
                        strokeWidth: 2,
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 11.834,
                        cy: 10.19,
                        r: 1.869,
                        stroke: "#080914",
                        strokeWidth: 2
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 22.011,
                        cy: 16.993,
                        r: 1.989,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 1.989,
                        cy: 15.661,
                        r: 1.989,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 12,
                        cy: 22.012,
                        r: 1.989,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Circle, {
                        cx: 22.011,
                        cy: 1.989,
                        r: 1.989,
                        fill: "#080914"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        d: "M9.419 2.067a1.989 1.989 0 1 1-3.978 0 1.989 1.989 0 0 1 3.978 0Z",
                        fill: "#080914"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx(cjs.Defs, {
                children: /*#__PURE__*/ jsx_runtime.jsx(cjs.ClipPath, {
                    id: "a",
                    children: /*#__PURE__*/ jsx_runtime.jsx(cjs.Path, {
                        fill: "#fff",
                        d: "M0 0h24v24H0z"
                    })
                })
            })
        ]
    });
/* harmony default export */ const icons_EventsHistoryIcon = (EventsHistoryIcon);

;// CONCATENATED MODULE: ./src/components/atoms/SvgIcon.tsx






























































































































const icons = [
    {
        name: "appleLittle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_AppleLittleIcon, {})
    },
    {
        name: "user",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_UserIcon, {})
    },
    {
        name: "arrowForward",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowForwardIcon, {})
    },
    {
        name: "arrowLeft",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowLeftIcon, {})
    },
    {
        name: "arrowRight",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowRightIcon, {})
    },
    {
        name: "arrowTop",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowTopIcon, {})
    },
    {
        name: "calculator",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CalculatorIcon, {})
    },
    {
        name: "candidates",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CandidatesIcon, {})
    },
    {
        name: "cardFilled",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CardFilledIcon, {})
    },
    {
        name: "cardOutlined",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CardOutlinedIcon, {})
    },
    {
        name: "check",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CheckIcon, {})
    },
    {
        name: "closeCircle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CloseCircleIcon, {})
    },
    {
        name: "closeX",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CloseXIcon, {})
    },
    {
        name: "createCircle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CreateCircleIcon, {})
    },
    {
        name: "createCircleSmall",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CreateCircleSmallIcon, {})
    },
    {
        name: "crossBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CrossBigIcon, {})
    },
    {
        name: "crossSmall",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CrossSmallIcon, {})
    },
    {
        name: "crossCircleBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CrossCircleBigIcon, {})
    },
    {
        name: "crossCircleSmall",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CrossCircleSmallIcon, {})
    },
    {
        name: "email",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_EmailIcon, {})
    },
    {
        name: "eyeOff",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_EyeOffIcon, {})
    },
    {
        name: "eyeOn",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_EyeOnIcon, {})
    },
    {
        name: "facebook",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FacebookIcon, {})
    },
    {
        name: "facebookLittle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FacebookLittleIcon, {})
    },
    {
        name: "fileDocument",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FileDocumentIcon, {})
    },
    {
        name: "filterList",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FilterListIcon, {})
    },
    {
        name: "googleLittle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_GoogleLittleIcon, {})
    },
    {
        name: "heart",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HeartIcon, {})
    },
    {
        name: "home",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HomeIcon, {})
    },
    {
        name: "instagram",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_InstagramIcon, {})
    },
    {
        name: "internet",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_InternetIcon, {})
    },
    {
        name: "like",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_LikeIcon, {})
    },
    {
        name: "list",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ListIcon, {})
    },
    {
        name: "logo",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_LogoIcon, {})
    },
    {
        name: "messengerBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MessengerBigIcon, {})
    },
    {
        name: "messenger",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MessengerIcon, {})
    },
    {
        name: "metting2",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_Metting2Icon, {})
    },
    {
        name: "metting1",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_Metting1Icon, {})
    },
    {
        name: "moreVert",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MoreVertIcon, {})
    },
    {
        name: "packets",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PacketsIcon, {})
    },
    {
        name: "payment",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PaymentIcon, {})
    },
    {
        name: "pencil",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PencilIcon, {})
    },
    {
        name: "phoneCall2",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PhoneCall2Icon, {})
    },
    {
        name: "phoneCall1",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PhoneCall1Icon, {})
    },
    {
        name: "photo",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PhotoIcon, {})
    },
    {
        name: "pin",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PinIcon, {})
    },
    {
        name: "privacy",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PrivacyIcon, {})
    },
    {
        name: "search",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_SearchIcon, {})
    },
    {
        name: "settings",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_SettingsIcon, {})
    },
    {
        name: "share",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ShareIcon, {})
    },
    {
        name: "starFill",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_StarFillIcon, {})
    },
    {
        name: "starHalf",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_StarHalfIcon, {})
    },
    {
        name: "starOutline",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_StarOutlineIcon, {})
    },
    {
        name: "telegram",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_TelegramIcon, {})
    },
    {
        name: "viber",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ViberIcon, {})
    },
    {
        name: "video",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_VideoIcon, {})
    },
    {
        name: "weight",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WeightIcon, {})
    },
    {
        name: "whatsapp",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WhatsappIcon, {})
    },
    {
        name: "work",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WorkIcon, {})
    },
    {
        name: "work2",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WorkIcon2, {})
    },
    {
        name: "time",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_TimeIcon, {})
    },
    {
        name: "woman",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WomanIcon, {})
    },
    {
        name: "man",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ManIcon, {})
    },
    {
        name: "logoBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_LogoBigIcon, {})
    },
    {
        name: "animalWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_AnimalWorkIcon, {})
    },
    {
        name: "transportWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_TransportWorkIcon, {})
    },
    {
        name: "officeWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_OfficeWorkIcon, {})
    },
    {
        name: "barWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_BarWorkIcon, {})
    },
    {
        name: "sweetsWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_SweetsWorkIcon, {})
    },
    {
        name: "floweryWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FloweryWorkIcon, {})
    },
    {
        name: "taxiWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_TaxiWorkIcon, {})
    },
    {
        name: "restaurantWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_RestaurantWorkIcon, {})
    },
    {
        name: "icecreamWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_IcecreamWorkIcon, {})
    },
    {
        name: "shopWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ShopWorkIcon, {})
    },
    {
        name: "cleaningWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CleaningWorkIcon, {})
    },
    {
        name: "constructionWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ConstructionWorkIcon, {})
    },
    {
        name: "workshopWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_WorkshopWorkIcon, {})
    },
    {
        name: "hairWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HairWorkIcon, {})
    },
    {
        name: "beautyWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_BeautyWorkIcon, {})
    },
    {
        name: "gymWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_GymWorkIcon, {})
    },
    {
        name: "animalWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_AnimalWorkIcon, {})
    },
    {
        name: "spaWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_SpaWorkIcon, {})
    },
    {
        name: "tatooWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_TatooWorkIcon, {})
    },
    {
        name: "renovationWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_RenovationWorkIcon, {})
    },
    {
        name: "bakeryWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_SweetsWorkIcon, {})
    },
    {
        name: "coffeeWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CoffeeWorkIcon, {})
    },
    {
        name: "foodtruckWorkIcon",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FoodtruckWorkIcon, {})
    },
    {
        name: "blank",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CardOutlinedIcon, {})
    },
    {
        name: "cardFilled",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CardFilledIcon, {})
    },
    {
        name: "blankCandidate",
        value: /*#__PURE__*/ jsx_runtime.jsx(BlankCandidate, {})
    },
    {
        name: "mapMarker",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MapMarkerIcon, {})
    },
    {
        name: "mapMarker2",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MapMarker2Icon, {})
    },
    {
        name: "promotedStar",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PromotedStarIcon, {})
    },
    {
        name: "money",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MoneyIcon, {})
    },
    {
        name: "meeting",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_MeetingIcon, {})
    },
    {
        name: "threeDots",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ThreeDotsIcon, {})
    },
    {
        name: "remove",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_RemoveIcon, {})
    },
    {
        name: "calendar",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CalendarIcon, {})
    },
    {
        name: "fileDocumentCircle",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_FileDocumentCircleIcon, {})
    },
    {
        name: "ukraine",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_UkraineFlagIcon, {})
    },
    {
        name: "bag",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_BagIcon, {})
    },
    {
        name: "arrowRightSmall",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowRightSmallIcon, {})
    },
    {
        name: "colorCircle",
        value: /*#__PURE__*/ jsx_runtime.jsx(ColorCircle, {})
    },
    {
        name: "colorCircleSelected",
        value: /*#__PURE__*/ jsx_runtime.jsx(ColorCircleSelected, {})
    },
    {
        name: "shadow",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_Shadow, {})
    },
    {
        name: "play",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PlayIcon, {})
    },
    {
        name: "visa",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_VisaIcon, {})
    },
    {
        name: "polish",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PolishIcon, {})
    },
    {
        name: "english",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_EnglishIcon, {})
    },
    {
        name: "ukrainian",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_UkrainianIcon, {})
    },
    {
        name: "russian",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_RussianIcon, {})
    },
    {
        name: "czech",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CzechIcon, {})
    },
    {
        name: "help",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HelpIcon, {})
    },
    {
        name: "hamburger",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HamburgerIcon, {})
    },
    {
        name: "horizontal",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_HorizontalMenuIcon, {})
    },
    {
        name: "grid",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_GridMenuIcon, {})
    },
    {
        name: "notification",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_NotificationIcon, {})
    },
    {
        name: "arrowBackground",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowBackgroundIcon, {})
    },
    {
        name: "arrowBottom",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ArrowBottomIcon, {})
    },
    {
        name: "phoneCallBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PhoneCallBigIcon, {})
    },
    {
        name: "pinBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_PinBigIcon, {})
    },
    {
        name: "shareArow",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_ShareArowIcon, {})
    },
    {
        name: "addBig",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_AddBigIcon, {})
    },
    {
        name: "coins",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_CoinsIcon, {})
    },
    {
        name: "refresh",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_RefreshIcon, {})
    },
    {
        name: "eventsHistory",
        value: /*#__PURE__*/ jsx_runtime.jsx(icons_EventsHistoryIcon, {})
    }
];
const SvgIcon = ({ icon, ...props })=>/*#__PURE__*/ external_react_default().cloneElement(icons.find((current)=>current.name === icon)?.value, {
        fill: Colors/* default */.Z.Basic900,
        ...props
    });
/* harmony default export */ const atoms_SvgIcon = (SvgIcon);


/***/ }),

/***/ 86852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83849);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8750);




const sizes = {
    h1: 40,
    h2: 30,
    h3: 24,
    h4: 18,
    h5: 16,
    main: 14,
    small: 12
};
const Typography = ({ variant = "main", weight = "Medium", textAlign = "auto", italic = false, color = null, size = null, children, ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_3__.Text, {
        ...props,
        style: [
            {
                fontFamily: `RedHatDisplay${weight !== "CAPS" ? `-${weight}` : "-Bold"}${italic ? "Italic" : ""}`,
                color: color || _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.TextDark,
                fontStyle: italic ? "italic" : "normal",
                textTransform: weight === "CAPS" ? "uppercase" : "none",
                fontSize: size || sizes[variant],
                textAlign
            },
            props.style
        ],
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);


/***/ }),

/***/ 85258:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83849);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8750);
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72026);
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9012);
/* harmony import */ var _atoms_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86852);



// import { ActivityIndicator, TouchableRipple } from 'react-native-paper';

// import Typography from '../../atoms/Typography/Typography';
// import AnimatedColorView from 'react-native-animated-colors';


const variants = {
    primary: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic600,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic100
    },
    secondary: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic400,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic400,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    },
    light: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic200,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic200,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    },
    white: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    },
    info: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Sea200,
        disabledColor: "transparent",
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    },
    info_alter: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Sea300,
        disabledColor: "transparent",
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    },
    text: {
        activeColor: "transparent",
        disabledColor: "transparent",
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic600
    },
    disabled: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic400,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic400,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White
    },
    active: {
        activeColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic300,
        disabledColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic400,
        contentColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900
    }
};
const Button = ({ children, variant = "primary", contentWeight = "CAPS", contentVariant = "main", color = null, contentColor = null, withLoading = false, fullwidth = true, borderTop, ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(tamagui__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .zx, {
        hoverStyle: {
            bg: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic800
        },
        pressStyle: {
            bg: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900,
            opacity: .5
        },
        height: props.h ?? 50,
        borderRadius: 0,
        bg: props.bg || props.backgroundColor || variants[variant].activeColor,
        ...borderTop ? {
            style: {
                borderTopWidth: 1,
                borderTopColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic300
            }
        } : {},
        icon: withLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(tamagui__WEBPACK_IMPORTED_MODULE_5__/* .Spinner */ .$, {
            size: "large"
        }) : undefined,
        width: props.w ?? (fullwidth ? "100%" : undefined),
        ...props,
        children: !!children && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_Typography__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            variant: contentVariant,
            weight: contentWeight,
            color: contentColor || variants[variant].contentColor,
            children: children
        })
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_6__.StyleSheet.create({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 24576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ ScrollView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83849);


function ScrollView({ disableWindowScroll = false, ...props }) {
    const Component = react_native__WEBPACK_IMPORTED_MODULE_1__.Platform.select({
        web: disableWindowScroll ? react_native__WEBPACK_IMPORTED_MODULE_1__.ScrollView : react_native__WEBPACK_IMPORTED_MODULE_1__.View,
        default: react_native__WEBPACK_IMPORTED_MODULE_1__.ScrollView
    });
    //@ts-ignore
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
        ...props,
        ...react_native__WEBPACK_IMPORTED_MODULE_1__.Platform.OS === "web" ? {
            style: {
                ...props.style,
                ...props.contentContainerStyle
            }
        } : {}
    });
}


/***/ }),

/***/ 26528:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(83849);
/* harmony import */ var react_native_reanimated__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2957);
/* harmony import */ var react_native_reanimated__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55633);
/* harmony import */ var react_native_reanimated__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63156);
/* harmony import */ var react_native_reanimated__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(82735);
/* harmony import */ var _navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1371);
/* harmony import */ var _atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(80761);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8750);
/* harmony import */ var _molecules_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85258);
/* harmony import */ var solito_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(61476);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_2__, _molecules_Button__WEBPACK_IMPORTED_MODULE_5__]);
([_navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_2__, _molecules_Button__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

// import { Badge } from 'native-base';








// } & BottomTabBarProps;
const icons = {
    AdvertStack: "work",
    AuthStack: "googleLittle",
    CandidatesStack: "candidates",
    CalendarStack: "calendar",
    MenuStack: "home",
    MessengerStack: "messenger",
    ProfileStack: "pencil"
};
const hiddenTabbarScreens = {
    AdvertStack: [
        "ProfileScreen",
        "VideoScreen",
        "AdvertScreen",
        "EditAdvertScreen",
        "JobScreen",
        "NewAdvertScreen",
        "CandidatesScreen",
        "JobCategoryScreen",
        "MapScreen",
        "OptionsDrawerScreen"
    ],
    AuthStack: [
        "MainScreen",
        "LoginScreen",
        "RegistrationScreen",
        "RememberPasswordScreen",
        "FillUserDataScreen"
    ],
    CandidatesStack: [
        "ProfileScreen",
        "VideoScreen",
        "FavouritesScreen",
        "FavSettingsScreen",
        "FilterScreen",
        "JobScreen",
        "MapScreen",
        "ProfileScreen",
        "SearchScreen",
        "VideoScreen"
    ],
    CalendarStack: [
        "ProfileScreen",
        "VideoScreen",
        "CallScreen",
        "EditEventScreen",
        "EventScreen",
        "MapScreen",
        "AddPersonScreen",
        "ChooseAdvertScreen",
        "ChooseCandidateScreen"
    ],
    MenuStack: [
        "ProfileScreen",
        "VideoScreen",
        "CallsScreen",
        "EventsScreen",
        "NewsScreen",
        "QuestionsScreen"
    ],
    MessengerStack: [],
    ProfileStack: [
        "PaymentTemporalScreen",
        "SettingsScreen",
        "PackagesScreen",
        "CompanyInvoiceScreen",
        "CompanyDescriptionScreen",
        "NoCompanyScreen",
        "AddCompanyScreen",
        "AddPaymentScreen",
        "CompanyScreen",
        "CookieScreen",
        "EditPaymentScreen",
        "HelpCenterScreen",
        "JobCategoryScreen",
        "JobScreen",
        "LanguageScreen",
        "MapScreen",
        "MethodsScreen",
        "NotificationScreen",
        "PaymentScreen",
        "PointsScreen",
        "PrivacyScreen",
        "AccountDataScreen",
        "ToolsScreen",
        "AddConractPersonsScreen"
    ]
};
const BottomTabs = ({ routes, currentScreen, profileFocused, setProfileFocused })=>{
    const animation = (0,react_native_reanimated__WEBPACK_IMPORTED_MODULE_6__/* .useSharedValue */ .y)({
        height: 45
    });
    // const { isTabbarVisible, currentScreen } = useTypedSelector(state => state.general);
    // const { setIsTabbarVisible } = useActions();
    const [isTabbarVisible, setIsTabbarVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const animationStyle = (0,react_native_reanimated__WEBPACK_IMPORTED_MODULE_7__/* .useAnimatedStyle */ .l)(()=>({
            height: (0,react_native_reanimated__WEBPACK_IMPORTED_MODULE_8__/* .withTiming */ .j)(animation.value.height, {
                duration: 10
            })
        }), []);
    const badgeNumbers = {
        MenuStack: 0,
        CandidatesStack: 0,
        CalendarStack: 0,
        AdvertStack: 0,
        MessengerStack: 0,
        ProfileStack: 0,
        AuthStack: 0
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentScreen) {
            const [stack, screen] = currentScreen.split("-");
            //@ts-ignore
            setIsTabbarVisible(!hiddenTabbarScreens[stack].includes(screen));
        }
    }, [
        currentScreen
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        animation.value = {
            height: isTabbarVisible ? 45 : 0
        };
    }, [
        isTabbarVisible
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native_reanimated__WEBPACK_IMPORTED_MODULE_9__["default"].View, {
        style: [
            {
                flexDirection: "row",
                backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.White,
                height: isTabbarVisible ? 45 : 0,
                visibility: isTabbarVisible ? "visible" : "hidden"
            }
        ],
        children: routes.map((route)=>{
            const label = route;
            const href = (_navigators_RootNavigator__WEBPACK_IMPORTED_MODULE_2__/* .navigationLinking */ .TQ.config?.screens[label])?.path;
            const isFocused = currentScreen.split("-")[0] === route;
            if (label === "ProfileStack") setProfileFocused(isFocused);
            const excludedStacks = [
                "AuthStack",
                "ProfileStack"
            ];
            if (excludedStacks.includes(label)) return null;
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_molecules_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                variant: "white",
                accessibilityState: isFocused ? {
                    selected: true
                } : {},
                style: {
                    height: "100%",
                    flex: 1
                },
                ...!!href ? (0,solito_link__WEBPACK_IMPORTED_MODULE_10__/* .useLink */ .n)({
                    href: "/" + href
                }) : {},
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_11__.View, {
                    style: {
                        position: "relative",
                        width: "100%",
                        height: "100%"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        icon: icons[label],
                        fill: _colors_Colors__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z[isFocused || label === "MenuStack" && profileFocused ? "Basic900" : "Basic600"]
                    })
                })
            });
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BottomTabs);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 56089:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export screensTitles */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83849);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(80761);
/* harmony import */ var _atoms_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(86852);
/* harmony import */ var _molecules_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85258);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8750);
/* harmony import */ var solito_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54403);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_molecules_Button__WEBPACK_IMPORTED_MODULE_4__]);
_molecules_Button__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const screensTitles = {
    AuthStack: {
        MainScreen: "Autoryzacja",
        LoginScreen: "Zaloguj się",
        RegistrationScreen: "Zarejestruj się",
        RememberPasswordScreen: "Resetowanie hasła",
        FillUserDataScreen: "Dane konta"
    },
    CalendarStack: {
        MainScreen: "",
        QuestionsScreen: "Pytania",
        AddPersonScreen: "Dodaj osobę do wydarzenia",
        CallScreen: "",
        EditEventScreen: "",
        EventScreen: "Zaplanuj wydarzenie",
        ResumesScreen: "CV Kandydat\xf3w",
        VacationScreen: "Urlop",
        MapScreen: "",
        ChooseAdvertScreen: "Wybierz ogłoszenie",
        ChooseCandidateScreen: "Wybierz kandydata",
        ProfileScreen: "",
        VideoScreen: ""
    },
    CandidatesStack: {
        MainScreen: "Kandydaci",
        FavouritesScreen: "Wyr\xf3żnione",
        FavSettingsScreen: "Ustawienia",
        FilterScreen: "Filtry",
        JobScreen: "Kategorie",
        ProfileScreen: "Profil kandydata",
        SearchScreen: "Stanowiska",
        MapScreen: "",
        VideoScreen: ""
    },
    MessengerStack: {
        MainScreen: "Jobassistant"
    },
    ProfileStack: {
        MainScreen: "Profil",
        NoCompanyScreen: "Profil firmy",
        AddCompanyScreen: "Dodaj profil firmy",
        AddPaymentScreen: "Dodaj kartę płatniczą",
        CompanyScreen: "",
        CookieScreen: "Pliki Cookies",
        EditPaymentScreen: "Płatności",
        HelpCenterScreen: "Centrum pomocy",
        JobCategoryScreen: "Wybierz branzę",
        JobScreen: "Stanowiska",
        LanguageScreen: "Preferowane języki",
        MethodsScreen: "Wykorzystywane metody",
        NotificationScreen: "Powiadomienia",
        PaymentScreen: "Płatności",
        PointsScreen: "Twoje punkty",
        PrivacyScreen: "Polityka prywatności",
        AccountDataScreen: "Twoje dane",
        ToolsScreen: "Wykorzystywane metody",
        AddAdvert: "",
        AddCall: "",
        AddEvent: "",
        CreateCompanyProfile: "",
        PaymentMethods: "",
        Register: "",
        RODO: "Polityka prywatności",
        SendingOffers: "Polityka prywatności",
        ShareCamera: "Polityka prywatności",
        ShareContacts: "Polityka prywatności",
        ShareLocation: "Polityka prywatności",
        MapScreen: "",
        AddConractPersonsScreen: "Dane do kontaktu",
        CompanyDescriptionScreen: "Opis firmy",
        CompanyInvoiceScreen: "Dane do faktury",
        PackagesScreen: "Pakiety",
        SettingsScreen: "Ustawienia",
        PaymentTemporalScreen: "Tw\xf3j pakiet"
    },
    AdvertStack: {
        MainScreen: "Moje ogłoszenia",
        AdvertScreen: "",
        CandidatesScreen: "Kandydaci",
        EditAdvertScreen: "Edytuj ogłoszenie",
        JobCategoryScreen: "Stanowiska",
        JobScreen: "Kategorie",
        NewAdvertScreen: "Nowe ogłoszenie",
        OptionsDrawerScreen: "",
        MapScreen: "",
        ProfileScreen: "",
        VideoScreen: ""
    },
    MenuStack: {
        MainScreen: "Menu gł\xf3wne",
        CallsScreen: "Zaplanowane połączenia",
        EventsScreen: "Twoje wydarzenia",
        NewsDetailsScreen: "",
        NewsScreen: "Artykuły i nowości",
        QuestionsScreen: "Lista pytań do kandydata",
        ProfileScreen: "",
        VideoScreen: ""
    }
};
const HEIGHT = 50;
const ScreenHeaderProvider = ({ children, mode = "backAction", mainTitlePosition = "center", title = null, actions = null, otherActions = null, transparent = false, staticContentHeight = false, alterTitle = null, currentStack })=>{
    const { back } = (0,solito_router__WEBPACK_IMPORTED_MODULE_6__/* .useRouter */ .t)();
    // const navigation = useNavigation();
    // const history = navigation.getState().routes;
    // const previousScreen: string | null =
    //   history.length > 1
    //     ? history[history.length - 2].name
    //     : null;
    // const previousTitle = previousScreen ? screensTitles[currentStack][previousScreen] : '';
    // @ts-ignore
    const currentTitle = "blabla" //screensTitles[currentStack][useRoute().name];
    ;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
        style: [
            styles.Wrapper
        ],
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                style: [
                    styles.Header
                ],
                children: [
                    mode === "backAction" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                        style: {
                            flex: 1,
                            height: "100%",
                            alignItems: "flex-start",
                            flexDirection: "row"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_molecules_Button__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                bg: "transparent",
                                // px={15}
                                // py={14.5}
                                p: 0,
                                alignItems: "center",
                                width: 50,
                                height: "100%",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                    icon: "arrowLeft"
                                }),
                                onPress: back
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_Typography__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                variant: "h4",
                                weight: "Bold",
                                style: {
                                    alignSelf: "center"
                                },
                                children: title || currentTitle
                            })
                        ]
                    }),
                    mode === "mainTitle" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                        style: {
                            alignItems: mainTitlePosition,
                            position: "absolute",
                            width: "100%"
                        },
                        children: alterTitle ? alterTitle : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_Typography__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            variant: "h4",
                            weight: "Bold",
                            style: {
                                paddingLeft: mainTitlePosition === "center" ? 0 : 15
                            },
                            children: title || currentTitle
                        })
                    }),
                    actions && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                        style: styles.Actions,
                        children: actions.map(({ icon, onPress })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                                style: {
                                    marginLeft: 20
                                },
                                children: typeof icon === "object" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_7__.TouchableOpacity, {
                                    style: {
                                        padding: 5
                                    },
                                    onPress: onPress
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_molecules_Button__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                    circular: true,
                                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                        icon: icon
                                    }),
                                    onPress: onPress,
                                    children: " "
                                })
                            }))
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_7__.View, {
                style: [
                    {
                        height: staticContentHeight ? react_native__WEBPACK_IMPORTED_MODULE_7__.Dimensions.get("window").height - (transparent ? 0 : HEIGHT) : undefined,
                        flex: !staticContentHeight ? 1 : undefined,
                        paddingTop: transparent ? 0 : HEIGHT,
                        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.White
                    }
                ],
                children: children
            })
        ]
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_7__.StyleSheet.create({
    Wrapper: {
        flex: 1,
        minHeight: react_native__WEBPACK_IMPORTED_MODULE_7__.Dimensions.get("window").height
    },
    Header: {
        position: react_native__WEBPACK_IMPORTED_MODULE_7__.Platform.select({
            native: "absolute",
            web: "fixed"
        }),
        top: 0,
        height: HEIGHT,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1,
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.White
    },
    ButtonBack: {
        flexDirection: "row",
        alignItems: "center"
    },
    Actions: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        right: 12,
        flex: 1
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScreenHeaderProvider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 12684:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _molecules_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85258);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8750);
/* harmony import */ var _atoms_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86852);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_molecules_Button__WEBPACK_IMPORTED_MODULE_2__]);
_molecules_Button__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const BAR_HEIGHT = 20;
const SwipeablePanel = (props)=>{
    const { buttons, title, children, subTitle, hideBar = false, onClose, isActive } = props;
    const [height, setHeight] = useState(0);
    const contentExists = !!buttons || !!title || !!children || !!subTitle;
    useEffect(()=>{
        const handler = BackHandler.addEventListener("hardwareBackPress", ()=>{
            onClose();
            return true;
        });
        return ()=>{
            handler.remove();
        };
    }, [
        isActive
    ]);
    useEffect(()=>{
        if (!contentExists) setHeight(0);
    }, [
        props
    ]);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(View, {
                onLayout: (e)=>{
                    if (contentExists) {
                        const windowHeight = Dimensions.get("window").height;
                        setHeight((e.nativeEvent.layout.height / windowHeight + (hideBar ? 0 : BAR_HEIGHT / windowHeight)) * 100);
                    }
                },
                style: {
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: -100000,
                    visibility: "hidden"
                },
                children: /*#__PURE__*/ _jsx(Content, {
                    ...props
                })
            }),
            /*#__PURE__*/ _jsxs(Sheet, {
                modal: true,
                open: isActive && !!height,
                onOpenChange: onClose,
                snapPoints: [
                    Math.min(height, 100)
                ],
                dismissOnSnapToBottom: true,
                children: [
                    !hideBar && /*#__PURE__*/ _jsx(Sheet.Handle, {
                        h: 4,
                        bg: Colors.White,
                        opacity: 1,
                        mx: "45%",
                        my: 8
                    }),
                    /*#__PURE__*/ _jsx(Sheet.Overlay, {}),
                    /*#__PURE__*/ _jsx(Sheet.Frame, {
                        br: 0,
                        userSelect: "none",
                        children: /*#__PURE__*/ _jsx(Sheet.ScrollView, {
                            children: /*#__PURE__*/ _jsx(Content, {
                                ...props
                            })
                        })
                    })
                ]
            })
        ]
    });
};
const Content = (props)=>{
    const { buttons, title, children, subTitle, hideBar = false, onClose, isActive, closeButton } = props;
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            title && /*#__PURE__*/ _jsxs(View, {
                style: {
                    paddingVertical: 24,
                    paddingHorizontal: 16
                },
                children: [
                    title && /*#__PURE__*/ _jsx(Typography, {
                        variant: "h5",
                        style: {
                            textAlign: "center"
                        },
                        weight: "Bold",
                        children: title
                    }),
                    subTitle && /*#__PURE__*/ _jsx(Typography, {
                        style: {
                            marginTop: 12
                        },
                        children: subTitle
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(View, {
                children: [
                    children,
                    buttons?.map(({ children, borderTop = true, contentWeight = "SemiBold", contentVariant = "h5", variant = "text", onPress = ()=>{}, contentColor = Colors.Basic900, noCloseAction, ...propsBtn }, i)=>/*#__PURE__*/ _jsx(Button, {
                            borderTop,
                            contentWeight,
                            contentVariant,
                            variant,
                            contentColor,
                            onPress: (e)=>{
                                onPress?.(e);
                                !noCloseAction && onClose();
                            },
                            ...propsBtn,
                            children: children
                        }, i)),
                    closeButton && /*#__PURE__*/ _jsx(Button, {
                        borderTop: true,
                        contentWeight: "SemiBold",
                        contentVariant: "h5",
                        onPress: onClose,
                        variant: "text",
                        children: "Anuluj"
                    })
                ]
            })
        ]
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (SwipeablePanel)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 43120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28924);
/* harmony import */ var react_player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_player__WEBPACK_IMPORTED_MODULE_2__);



const index = ({ paused })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_player__WEBPACK_IMPORTED_MODULE_2___default()), {
        url: "https://www.wondarbag.com/media/campaigns/videos/Untitled_design.mp4",
        playing: !paused,
        loop: true,
        // onDuration={(duration) => setDuration(duration)}
        onError: (err)=>console.log(err),
        width: "100%",
        height: "100%",
        progressInterval: 100
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ 601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10477);



const AdvertStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__/* .createNativeStackNavigator */ .bO)();
const AdvertNavigator = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AdvertStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AdvertStack.Screen, {
            name: "MainScreen",
            component: ()=>null
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvertNavigator);


/***/ }),

/***/ 37801:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _screens_AuthScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37087);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10477);
/* harmony import */ var _hooks_useTypedSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42163);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_screens_AuthScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__]);
_screens_AuthScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// import { Spinner } from 'native-base';





const AuthStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_4__/* .createNativeStackNavigator */ .bO)();
const AuthNavigator = ()=>{
    const { token } = (0,_hooks_useTypedSelector__WEBPACK_IMPORTED_MODULE_3__/* .useTypedSelector */ .i)((state)=>state.general);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthStack.Screen, {
            name: "MainScreen",
            component: _screens_AuthScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthNavigator);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 90096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10477);



const CalendarStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__/* .createNativeStackNavigator */ .bO)();
const CalendarNavigator = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CalendarStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CalendarStack.Screen, {
            name: "MainScreen",
            component: ()=>null
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalendarNavigator);


/***/ }),

/***/ 60881:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10477);
/* harmony import */ var _screens_CandidatesScreens_VideoScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73433);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_screens_CandidatesScreens_VideoScreen__WEBPACK_IMPORTED_MODULE_2__]);
_screens_CandidatesScreens_VideoScreen__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const CandidatesStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__/* .createNativeStackNavigator */ .bO)();
const CandidatesNavigator = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CandidatesStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CandidatesStack.Screen, {
                name: "MainScreen",
                component: ()=>null
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CandidatesStack.Screen, {
                name: "VideoScreen",
                component: _screens_CandidatesScreens_VideoScreen__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CandidatesNavigator);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 65404:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   x: () => (/* binding */ MenuStackLinking)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10477);
/* harmony import */ var _screens_MenuScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39869);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_screens_MenuScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__]);
_screens_MenuScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const MenuStackLinking = {
    MainScreen: "",
    CallsScreen: "CallsScreen",
    EventsScreen: "EventsScreen",
    NewsDetailsScreen: "NewsDetailsScreen",
    NewsScreen: "NewsScreen",
    ProfileScreen: "ProfileScreen",
    QuestionsScreen: "QuestionsScreen",
    VideoScreen: "VideoScreen"
};
const MenuStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__/* .createNativeStackNavigator */ .bO)();
const MenuNavigator = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MenuStack.Screen, {
            name: "MainScreen",
            component: _screens_MenuScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuNavigator);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 17407:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10477);
/* harmony import */ var _screens_MessengerScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45558);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_screens_MessengerScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__]);
_screens_MessengerScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const MessengerStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_3__/* .createNativeStackNavigator */ .bO)();
const MessengerNavigator = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MessengerStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MessengerStack.Screen, {
            name: "MainScreen",
            component: _screens_MessengerScreens_MainScreen__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessengerNavigator);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 71417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10477);



const ProfileStack = (0,_react_navigation_native_stack__WEBPACK_IMPORTED_MODULE_2__/* .createNativeStackNavigator */ .bO)();
const ProfileNavigator = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProfileStack.Navigator, {
        initialRouteName: "MainScreen",
        screenOptions: {
            headerShown: false
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProfileStack.Screen, {
            name: "MainScreen",
            component: ()=>null
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileNavigator);


/***/ }),

/***/ 1371:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TQ: () => (/* binding */ navigationLinking)
/* harmony export */ });
/* unused harmony export screens */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AuthNavigator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37801);
/* harmony import */ var _CalendarNavigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(90096);
/* harmony import */ var _CandidatesNavigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60881);
/* harmony import */ var _ProfileNavigator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71417);
/* harmony import */ var _AdvertNavigator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(601);
/* harmony import */ var _MessengerNavigator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17407);
/* harmony import */ var _MenuNavigator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(65404);
/* harmony import */ var _react_navigation_bottom_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(2125);
/* harmony import */ var _hooks_useTypedSelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(42163);
/* harmony import */ var _hooks_useActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26752);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(83849);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8750);
/* harmony import */ var _components_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(26528);
/* harmony import */ var _components_organismes_SwipeablePanel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(12684);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AuthNavigator__WEBPACK_IMPORTED_MODULE_2__, _CandidatesNavigator__WEBPACK_IMPORTED_MODULE_4__, _MessengerNavigator__WEBPACK_IMPORTED_MODULE_7__, _MenuNavigator__WEBPACK_IMPORTED_MODULE_8__, _components_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_13__, _components_organismes_SwipeablePanel__WEBPACK_IMPORTED_MODULE_14__]);
([_AuthNavigator__WEBPACK_IMPORTED_MODULE_2__, _CandidatesNavigator__WEBPACK_IMPORTED_MODULE_4__, _MessengerNavigator__WEBPACK_IMPORTED_MODULE_7__, _MenuNavigator__WEBPACK_IMPORTED_MODULE_8__, _components_organismes_BottomTabs__WEBPACK_IMPORTED_MODULE_13__, _components_organismes_SwipeablePanel__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











// import BottomTabs from '../components/organisms/BottomTabs/BottomTabs';



// import SplashScreen from "react-native-splash-screen";
// import AsyncStorage from '@react-native-community/async-storage';
// import SwipeablePanel from '../components/organisms/SwipeablePanel/SwipeablePanel';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';




const RootStack = (0,_react_navigation_bottom_tabs__WEBPACK_IMPORTED_MODULE_15__/* .createBottomTabNavigator */ .vw)();
const navigationLinking = {
    prefixes: [
        "localhost"
    ],
    config: {
        screens: {
            "MenuStack": {
                initialRouteName: "MainScreen",
                path: "home",
                screens: _MenuNavigator__WEBPACK_IMPORTED_MODULE_8__/* .MenuStackLinking */ .x
            },
            "CandidatesStack": {
                initialRouteName: "MainScreen",
                path: "candidates",
                screens: {
                    MainScreen: "",
                    VideoScreen: "video"
                }
            },
            "CalendarStack": {
                initialRouteName: "MainScreen",
                path: "calendar",
                screens: {
                    MainScreen: ""
                }
            },
            "AdvertStack": {
                initialRouteName: "MainScreen",
                path: "adverts",
                screens: {
                    MainScreen: ""
                }
            },
            "MessengerStack": {
                initialRouteName: "MainScreen",
                path: "messenger",
                screens: {
                    MainScreen: ""
                }
            },
            "AuthStack": {
                initialRouteName: "MainScreen",
                path: "auth",
                screens: {
                    MainScreen: ""
                }
            },
            "ProfileStack": {
                initialRouteName: "MainScreen",
                path: "profile",
                screens: {
                    MainScreen: ""
                }
            }
        }
    }
};
const screens = [
    {
        name: "MenuStack",
        component: _MenuNavigator__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z,
        options: {
            lazy: false
        }
    },
    {
        name: "CandidatesStack",
        component: _CandidatesNavigator__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
        options: {
            lazy: false
        }
    },
    {
        name: "CalendarStack",
        component: _CalendarNavigator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
        options: {
            lazy: false
        }
    },
    {
        name: "AdvertStack",
        component: _AdvertNavigator__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
        options: {
            lazy: false
        }
    },
    {
        name: "MessengerStack",
        component: _MessengerNavigator__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z
    },
    {
        name: "ProfileStack",
        component: _ProfileNavigator__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
    },
    {
        name: "AuthStack",
        component: _AuthNavigator__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
    }
];
const isDarkMode = false;
const RootNavigator = ()=>{
    const dispatch = useDispatch();
    const [profileFocused, setProfileFocused] = useState(false);
    const { appLoading, isTabbarVisible, token, swipeablePanelProps, userCompany, candidateNotes, currentScreen } = useTypedSelector((state)=>state.general);
    const { setCurrentScreen, setIsTabbarVisible, setToken, setSwipeablePanelProps, setUserCompany } = useActions();
    const tempKeyboardAccess = useRef(false);
    const appDataLoaded = useRef(false);
    const prevToken = useRef("default");
    // useEffect(() => {
    //   if (!appLoading) {
    //     setTimeout(() => {
    //       SplashScreen.hide();
    //     }, 100);
    //   }
    // }, [appLoading]);
    // useEffect(() => {
    //   (async () => {
    //     console.log('token: ', token);
    //     if (!appDataLoaded.current || (token && !prevToken.current)) {
    //       const [
    //         [k1, token],
    //         [k2, refresh_token],
    //       ] = await AsyncStorage.multiGet([
    //         'token',
    //         'refresh_token',
    //       ]);
    //       const isOk = await dispatch(generalServices.getAppData(token));
    //       if (!!isOk) {
    //         appDataLoaded.current = true;
    //         setToken({ refresh_token, token });
    //       }
    //     }
    //     prevToken.current = token;
    //   })();
    // }, [token]);
    // useEffect(() => {
    //   if (userCompany?.id && token) {
    //     let logo: MediaType | null = null;
    //     let video: MediaType | null = null;
    //     let photos: MediaType[] | null = null;
    //     let certificates: MediaType[] | null = null;
    //     let contactPersons: ContactPersonType[] | null = null;
    //     dispatch(candidatesServices.getCandidateMarks(token, userCompany.id));
    //     dispatch(candidatesServices.getCandidateNotes(token, userCompany.id));
    //     if (userCompany.logo === undefined || userCompany.photos === undefined || userCompany.certificates === undefined || userCompany.contactPersons === undefined || userCompany.video === undefined) {
    //       Promise.all([
    //         ...(userCompany.logo === undefined ? [
    //           dispatch(companyServices.getUserCompanyLogo(userCompany.id, token))
    //         ] : []),
    //         ...(userCompany.video === undefined ? [
    //           dispatch(companyServices.getUserCompanyVideo(userCompany.id, token))
    //         ] : []),
    //         ...(userCompany.photos === undefined ? [
    //           dispatch(companyServices.getUserCompanyPhotos(userCompany.id, token))
    //         ] : []),
    //         ...(userCompany.certificates === undefined ? [
    //           dispatch(companyServices.getUserCompanyCertificates(userCompany.id, token))
    //         ] : []),
    //         ...(userCompany.contactPersons === undefined ? [
    //           dispatch(companyServices.getUserCompanyContactPersons(userCompany.id, token))
    //         ] : []),
    //       ]).then((res) => {
    //         const [getLogo, getVideo, getPhotos, getCertificates, getcompanyContactPersons] = res as any;
    //         if (getLogo) logo = getLogo;
    //         if (getVideo) video = getVideo;
    //         if (getPhotos && getPhotos.length) photos = getPhotos;
    //         if (getCertificates && getCertificates.length) certificates = getCertificates;
    //         if (getcompanyContactPersons && getcompanyContactPersons.length) contactPersons = getcompanyContactPersons;
    //         setUserCompany({ ...userCompany, logo, video, photos, certificates, contactPersons });
    //       }).catch(() => { });
    //     }
    //   }
    // }, [userCompany, token]);
    useEffect(()=>{
        if (tempKeyboardAccess.current || isTabbarVisible) {
            const showSubscription = Keyboard.addListener("keyboardDidShow", ()=>{
                tempKeyboardAccess.current = true;
                setIsTabbarVisible(false);
            });
            const hideSubscription = Keyboard.addListener("keyboardDidHide", ()=>{
                tempKeyboardAccess.current = false;
                setIsTabbarVisible(true);
            });
            return ()=>{
                showSubscription.remove();
                hideSubscription.remove();
            };
        }
    }, [
        isTabbarVisible
    ]);
    const setCurrentScreenHandler = (route)=>{
        const history = route.state?.routes;
        const screenByParams = route.params?.screen && route.params?.screen !== "MainScreen" ? route.params?.screen : null;
        const screenByHistory = history && history[history?.length - 1] ? history[history.length - 1].name : null;
        const stack = route.name;
        const screen = screenByParams && screenByHistory ? screenByHistory : screenByParams || screenByHistory || "MainScreen";
        setCurrentScreen(stack + "-" + screen);
    };
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(NavigationContainer, {
                theme: isDarkMode ? DarkTheme : DefaultTheme,
                linking: navigationLinking,
                children: /*#__PURE__*/ _jsx(RootStack.Navigator, {
                    backBehavior: "history",
                    initialRouteName: "MenuStack",
                    screenOptions: {
                        headerShown: false
                    },
                    tabBar: (props)=>{
                        const { state } = props;
                        return /*#__PURE__*/ _jsx(BottomTabs, {
                            profileFocused,
                            setProfileFocused,
                            currentScreen,
                            routes: state.routes.map(({ name })=>name)
                        });
                    },
                    children: screens.map((screen)=>/*#__PURE__*/ _jsx(RootStack.Screen, {
                            ...screen,
                            listeners: ({ route, navigation })=>({
                                    state: ()=>setCurrentScreenHandler(route),
                                    blur: ()=>navigation.setParams({
                                            screen: undefined,
                                            params: undefined
                                        })
                                })
                        }))
                })
            }),
            useMemo(()=>/*#__PURE__*/ _jsx(SwipeablePanel, {
                    onlySmall: true,
                    closeButton: true,
                    isActive: !!swipeablePanelProps,
                    onClose: ()=>setSwipeablePanelProps(null),
                    ...swipeablePanelProps
                }), [
                swipeablePanelProps
            ])
        ]
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_16__.StyleSheet.create({
    Loading: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z.White,
        opacity: .6,
        zIndex: 2
    }
});
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (RootNavigator)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 74867:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var raf_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40106);
/* harmony import */ var raf_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(raf_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_fonts_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61957);
/* harmony import */ var _public_fonts_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_fonts_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _public_global_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85415);
/* harmony import */ var _public_global_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_global_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(83849);
/* harmony import */ var react_native_gesture_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20349);
/* harmony import */ var react_native_safe_area_context__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(30971);
/* harmony import */ var react_native_safe_area_context__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_native_safe_area_context__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8913);
/* harmony import */ var _tamagui_next_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(70552);
/* harmony import */ var _tamagui_next_theme__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_tamagui_next_theme__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _tamagui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43581);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4298);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84399);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tamagui__WEBPACK_IMPORTED_MODULE_7__, _components_Layout__WEBPACK_IMPORTED_MODULE_9__]);
([_tamagui__WEBPACK_IMPORTED_MODULE_7__, _components_Layout__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// import '@tamagui/core/reset.css';
// import '@tamagui/font-silkscreen/css/400.css';
// import '@tamagui/font-inter/css/400.css';
// import '@tamagui/font-inter/css/700.css';
// import '@tamagui/font-inter/css/800.css';
// import '@tamagui/font-inter/css/900.css';












const insets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
const frame = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
const initialMetrics = {
    insets,
    frame
};
const Providers = ({ children })=>{
    const [theme, setTheme] = (0,_tamagui_next_theme__WEBPACK_IMPORTED_MODULE_10__.useRootTheme)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tamagui_next_theme__WEBPACK_IMPORTED_MODULE_10__.NextThemeProvider, {
        enableSystem: false,
        onChangeTheme: setTheme,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(tamagui__WEBPACK_IMPORTED_MODULE_11__/* .TamaguiProvider */ .r, {
            config: _tamagui__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z,
            disableInjectCSS: true,
            // disableRootThemeClass
            defaultTheme: theme,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native_safe_area_context__WEBPACK_IMPORTED_MODULE_12__.SafeAreaProvider, {
                initialMetrics: initialMetrics,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native_gesture_handler__WEBPACK_IMPORTED_MODULE_6__/* .GestureHandlerRootView */ .cS, {
                    style: styles.container,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_9__/* .Layout */ .A, {
                        children: children
                    })
                })
            })
        })
    });
};
function MyApp({ Component, pageProps }) {
    const contents = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(()=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        });
    }, [
        pageProps
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_4___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "ELF Biznes"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "description",
                        content: "ELF Biznes"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        type: "png",
                        href: "/favicon.png"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_script__WEBPACK_IMPORTED_MODULE_8___default()), {
                type: "text/javascript",
                dangerouslySetInnerHTML: {
                    // avoid flash of animated things on enter
                    __html: "document.documentElement.classList.add('t_unmounted')"
                }
            }, "tamagui-animations-mount"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Providers, {
                children: contents
            })
        ]
    });
}
const styles = react_native__WEBPACK_IMPORTED_MODULE_13__.StyleSheet.create({
    container: {
        flex: 1
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 14893:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83849);
/* harmony import */ var _app_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53346);
/* harmony import */ var _tamagui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43581);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tamagui__WEBPACK_IMPORTED_MODULE_4__]);
_tamagui__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function MyDocument() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {
        lang: "en",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {})
                ]
            })
        ]
    });
}
MyDocument.getInitialProps = async ({ renderPage })=>{
    react_native__WEBPACK_IMPORTED_MODULE_5__.AppRegistry.registerComponent(_app_json__WEBPACK_IMPORTED_MODULE_3__/* .name */ .u, ()=>next_document__WEBPACK_IMPORTED_MODULE_2__.Main);
    const { getStyleElement } = react_native__WEBPACK_IMPORTED_MODULE_5__.AppRegistry.getApplication(_app_json__WEBPACK_IMPORTED_MODULE_3__/* .name */ .u);
    const page = await renderPage();
    const styles = [
        getStyleElement(),
        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
            dangerouslySetInnerHTML: {
                __html: _tamagui__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.getCSS()
            }
        }, "tamagui-rn-web-style-tag")
    ];
    return {
        ...page,
        styles: react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(styles)
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 37087:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83849);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8750);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_atoms_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86852);
/* harmony import */ var _components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__]);
_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// import { View, Image, Spinner } from 'native-base';






const AuthScreen = ({ navigation })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    // const additionalButtons: Array<{ icon: IconTypes; color: string; onPress: () => void; }> = [
    //   {
    //     icon: 'facebookLittle',
    //     color: Colors.Link,
    //     onPress: () => dispatch(authServices.facebookSignin()),
    //   },
    //   {
    //     icon: 'googleLittle',
    //     color: Colors.White,
    //     onPress: () => dispatch(authServices.googleSignin()),
    //   },
    // ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
        style: styles.Wrapper,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
                style: styles.Content,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                        style: styles.InfoText,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            textAlign: "center",
                            variant: "h5",
                            weight: "SemiBold",
                            children: "Zał\xf3ż konto, żeby szybciej znaleźć pracownika."
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                        style: styles.Button,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            style: styles.loginButton,
                            onPress: ()=>navigation.navigate("LoginScreen"),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic100,
                                textAlign: "center",
                                variant: "h5",
                                weight: "Bold",
                                children: "ZALOGUJ SIĘ"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            style: styles.loginButton,
                            color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic500,
                            onPress: ()=>navigation.navigate("RegistrationScreen"),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900,
                                textAlign: "center",
                                variant: "h5",
                                weight: "Bold",
                                children: "ZAREJESTRUJ SIĘ"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    variant: "text",
                    onPress: ()=>navigation.goBack(),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic600,
                        textAlign: "center",
                        variant: "h5",
                        weight: "SemiBold",
                        children: "Anuluj"
                    })
                })
            })
        ]
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_6__.StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic200
    },
    Content: {
        flex: 1
    },
    Button: {
        paddingBottom: 40
    },
    Social: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    SocialButton: {
        flex: 1,
        width: 120,
        height: 65,
        shadowColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White
    },
    InfoText: {
        paddingHorizontal: 72,
        paddingVertical: 40
    },
    LogoContainer: {
        alignItems: "center"
    },
    Logo: {
        marginTop: 32
    },
    loginButton: {
        height: 56
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthScreen);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 73433:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8750);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83849);
/* harmony import */ var _components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56089);
/* harmony import */ var _components_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80761);
/* harmony import */ var _components_organismes_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(43120);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_3__]);
_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// import { useActions } from '../../hooks/useActions';




const notes = [
    {
        id: 1,
        title: "Mobilny",
        type: "positive"
    },
    {
        id: 2,
        title: "Kontaktowy",
        type: "positive"
    },
    {
        id: 3,
        title: "Rozmowa na plus",
        type: "positive"
    },
    {
        id: 4,
        title: "Zaangażowany",
        type: "positive"
    },
    {
        id: 5,
        title: "Doświadczony",
        type: "positive"
    },
    {
        id: 6,
        title: "Na przyszłość",
        type: "positive"
    },
    {
        id: 7,
        title: "Do podszkolenia",
        type: "neutral"
    },
    {
        id: 8,
        title: "Dopytać o metody",
        type: "neutral"
    },
    {
        id: 9,
        title: "Dopytać o dojazd",
        type: "neutral"
    },
    {
        id: 10,
        title: "Średni",
        type: "neutral"
    },
    {
        id: 11,
        title: "Dlaczego zmiana pracy",
        type: "neutral"
    },
    {
        id: 12,
        title: "Do negocjacji ceny",
        type: "neutral"
    },
    {
        id: 13,
        title: "Umiejętności do weryfikacji",
        type: "neutral"
    },
    {
        id: 14,
        title: "Rozmowa na minus",
        type: "negative"
    },
    {
        id: 15,
        title: "Nie odbiera",
        type: "negative"
    },
    {
        id: 16,
        title: "Zbyt daleko",
        type: "negative"
    },
    {
        id: 17,
        title: "Nie przyszedł",
        type: "negative"
    },
    {
        id: 18,
        title: "Brak kwalifikacji",
        type: "negative"
    }
];
const noteTitles = [
    {
        title: "Pozytywne",
        type: "positive",
        color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Green500
    },
    {
        title: "Neutralne",
        type: "neutral",
        color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic700
    },
    {
        title: "Negatywne",
        type: "negative",
        color: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Blue500
    }
];
// const VideoScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
const VideoScreen = ()=>{
    // const { candidateData } = route.params;
    // const { jobIndustries, jobExperiences, jobSalaryTaxes, swipeablePanelProps } = useTypedSelector(s => s.general);
    const [jobPositions, setJobPositions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [paused, setPaused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [duration, setDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const VideoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // const data = useTypedSelector(state => state.bookmark);
    // const bookmarkCategories = data.bookmarks.map(item => item.category);
    // const selectedBookmark = bookmarkCategories.indexOf(data.persons[1].bookmark);
    // const bookmarkCategory = data.bookmarks[selectedBookmark].category;
    // const bookmarkColor = data.bookmarks[selectedBookmark].color;
    // const { setSwipeablePanelProps } = useActions();
    const [openNotes, setOpenNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [candidateNotes, setCandidateNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (false) {}
    }, []);
    // useEffect(() => {
    //   setJobPositions(jobIndustries.reduce<JobPositionType[]>((prev, curr) => [...prev, ...curr.job_positions], []));
    // }, [jobIndustries]);
    // const contactsHandler = () => {
    //   setSwipeablePanelProps({
    //     title: 'Skontaktuj się',
    //     buttons: [
    //       {
    //         children: '+48 507 345 679',
    //         icon: 'phoneCall1',
    //         onPress: () => console.log('Kalkulator'),
    //       },
    //       {
    //         children: 'Messenger',
    //         icon: 'messenger',
    //         onPress: () => console.log('Kalkulator'),
    //       },
    //       {
    //         children: 'Email',
    //         icon: 'email',
    //         onPress: () => console.log('Kalkulator'),
    //       },
    //     ],
    //   })
    // };
    return open && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        currentStack: "CandidatesStack",
        transparent: true,
        staticContentHeight: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.TouchableHighlight, {
            onPress: ()=>setPaused((prev)=>!prev),
            style: {
                flex: 1
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                style: {
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic900,
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_organismes_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        paused: paused
                    }),
                    paused && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                        style: styles.playIcon,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            icon: "play"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_6__.View, {
                        style: {
                            position: "absolute",
                            bottom: 34,
                            right: 18,
                            alignItems: "center"
                        }
                    })
                ]
            })
        })
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_6__.StyleSheet.create({
    Video: {
        height: "100%",
        width: "100%"
    },
    text: {
    },
    shadow: {
        position: "absolute",
        top: 0
    },
    playIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    progressMarker: {
        position: "absolute",
        top: -7,
        zIndex: 100
    },
    iconContainer: {
        position: "absolute",
        bottom: 34,
        right: 18,
        alignItems: "center"
    },
    iconWithText: {
        alignItems: "center",
        marginBottom: 35
    },
    noteHeader: {
        marginLeft: 19,
        marginTop: 28,
        marginBottom: 4
    },
    note: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic200,
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 20,
        margin: 4
    },
    noteContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 12
    },
    menuOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic300,
        flexDirection: "row"
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoScreen);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 39869:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83849);
/* harmony import */ var _colors_Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8750);
/* harmony import */ var _components_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(80761);
/* harmony import */ var _components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56089);
/* harmony import */ var _components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85258);
/* harmony import */ var _components_atoms_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86852);
/* harmony import */ var _components_molecules_ScrollView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24576);
/* harmony import */ var solito_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61476);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_4__, _components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__]);
([_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_4__, _components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

// import { Badge } from 'native-base';









// const MainScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
const MainScreen = ({})=>{
    const ScrollViewRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // useScrollToTop(ScrollViewRef);
    // const { isMainMenuFlatList, userData, token, currentScreen } = useTypedSelector(state => state.general);
    // const { setIsMainMenuFlatList, setSwipeablePanelProps } = useActions();
    const sectionButtons = [
        {
            sectionTitle: "Aktualności",
            buttons: [
                {
                    title: "Historia wydarzeń",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Sea300,
                    icon: "eventsHistory",
                    onPress: ()=>{},
                    missedEvents: 0,
                    badge: ""
                },
                // {
                //   title: 'Zaplanowane spotkania',
                //   backgroundColor: Colors.Sea300,
                //   icon: 'meeting',
                //   onPress: () => {},//navigation.navigate('EventsScreen'),
                //   missedEvents: 0,
                //   badge: ''
                // },
                {
                    title: "Kalendarz",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Sea300,
                    icon: "calendar",
                    onPress: ()=>{},
                    missedEvents: 0,
                    badge: ""
                }
            ]
        },
        {
            sectionTitle: "Organizacja",
            buttons: [
                {
                    title: "Kandydaci",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Blue100,
                    icon: "candidates",
                    // onPress: () => navigation.navigate('CandidatesStack', { screen: 'MainScreen' }),
                    missedEvents: 0,
                    ...(0,solito_link__WEBPACK_IMPORTED_MODULE_8__/* .useLink */ .n)({
                        href: "/messenger"
                    }),
                    badge: ""
                },
                // {
                //   title: 'Twoi ulubieni kandydaci',
                //   backgroundColor: Colors.Blue100,
                //   icon: 'cardOutlined',
                //   onPress: () => {},//navigation.navigate('CandidatesStack', { screen: 'FavouritesScreen' }),
                //   missedEvents: 0,
                //   badge: ''
                // },
                {
                    title: "Ogłoszenia",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Blue100,
                    icon: "work",
                    // onPress: () => navigation.navigate('AdvertStack', { screen: 'MainScreen' }),
                    ...(0,solito_link__WEBPACK_IMPORTED_MODULE_8__/* .useLink */ .n)({
                        href: "/messenger/second"
                    }),
                    missedEvents: 0,
                    badge: ""
                },
                {
                    title: "Profil",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Blue100,
                    icon: "user",
                    // onPress: () => navigation.navigate('ProfileStack', { screen: 'MainScreen' }),
                    ...(0,solito_link__WEBPACK_IMPORTED_MODULE_8__/* .useLink */ .n)({
                        href: "/candidates/video"
                    }),
                    missedEvents: 0,
                    badge: ""
                },
                {
                    title: "Pakiety",
                    backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Blue100,
                    icon: "bag",
                    onPress: ()=>{},
                    missedEvents: 0,
                    badge: ""
                }
            ]
        }
    ];
    // useEffect(() => {
    //   console.log('userData: ', userData);
    //   if ((currentScreen !== 'AuthStack-FillUserDataScreen') && userData && !(userData.email && userData.first_name && userData.last_name)) {
    //     setSwipeablePanelProps({
    //       title: 'Brakuje nam twoich danych po zalogowaniu poprzez media społecznościowe!',
    //       subTitle: 'Nie będą Ci dostępne większość funkcji aplikacji dopóki nie uzupełnisz te dane.',
    //       buttons: [
    //         {
    //           children: 'Uzupełnij dane',
    //           onPress: () => {}//navigation.navigate('AuthStack', { screen: 'FillUserDataScreen' })
    //         },
    //       ]
    //     })
    //   }
    // }, [userData]);
    const optionsHandler = ()=>{
    // setSwipeablePanelProps({
    //   title: 'Co robimy tym razem?',
    //   buttons: [
    //     {
    //       children: 'Stwórz nowe wydarzenie',
    //       // icon: 'calendar',
    //       onPress: () => {}//navigation.navigate('CalendarStack', { screen: 'EventScreen', params: { isMainMenuSender: true } })
    //     },
    //     {
    //       children: 'Stwórz nowe ogłoszenie',
    //       // icon: 'work',
    //       onPress: () => {}//navigation.navigate('AdvertStack', { screen: 'NewAdvertScreen', params: { isMainMenuSender: true } })
    //     },
    //   ],
    // })
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
        style: styles.Wrapper,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
            currentStack: "ProfileStack",
            mode: "mainTitle",
            mainTitlePosition: "flex-start",
            alterTitle: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                style: {
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 15
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                        style: {
                            marginRight: 12
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            br: 4,
                            h: 30,
                            px: 8.5,
                            w: "auto",
                            contentWeight: "Regular",
                            variant: "secondary",
                            onPress: ()=>{} //navigation.navigate('AuthStack', { screen: 'MainScreen' })
                            ,
                            children: "Zaloguj"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                        style: {
                            marginRight: 12
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            variant: "h5",
                            weight: "Bold",
                            children: [
                                "Witaj, ",
                                "userData?.first_name"
                            ]
                        })
                    })
                ]
            }),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_ScrollView__WEBPACK_IMPORTED_MODULE_7__/* .ScrollView */ .p, {
                    ref: ScrollViewRef,
                    contentContainerStyle: {
                        alignItems: "center"
                    },
                    style: {
                        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic100,
                        flex: 1
                    },
                    children: sectionButtons.map(({ buttons, sectionTitle }, i)=>// <View style={[styles[isMainMenuFlatList ? 'FlatSectionWrapper' : 'GridSectionWrapper'], i !== 0 && { paddingTop: 15 }, i + 1 === sectionButtons.length && { paddingBottom: 25 }]}>
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                            style: [
                                styles[ false ? 0 : "GridSectionWrapper"],
                                i !== 0 && {
                                    paddingTop: 15
                                },
                                i + 1 === sectionButtons.length && {
                                    paddingBottom: 25
                                }
                            ],
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    weight: "Bold",
                                    size: 20,
                                    style: {
                                        width: "88%",
                                        marginLeft:  false ? 0 : 20,
                                        marginBottom:  false ? 0 : 0
                                    },
                                    children: sectionTitle
                                }),
                                buttons.map(({ backgroundColor, badge, icon, missedEvents, onPress, title })=> false ? /*#__PURE__*/ 0 : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                                        style: styles.GridButtonWrapper,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_9__.TouchableOpacity, {
                                            activeOpacity: 0.5,
                                            onPress: onPress,
                                            style: [
                                                styles.GridButton
                                            ],
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                                                    style: [
                                                        styles.GridIconBG,
                                                        {
                                                            backgroundColor
                                                        }
                                                    ],
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                                        icon: icon
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_Typography__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                                    variant: "h5",
                                                    weight: "Bold",
                                                    textAlign: "center",
                                                    style: {
                                                        marginHorizontal: 10,
                                                        marginTop: 7
                                                    },
                                                    children: title
                                                })
                                            ]
                                        })
                                    }))
                            ]
                        }))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.View, {
                    style: styles.createIcon,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_native__WEBPACK_IMPORTED_MODULE_9__.TouchableOpacity, {
                        onPress: optionsHandler,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_atoms_SvgIcon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            icon: "addBig"
                        })
                    })
                })
            ]
        })
    });
};
const styles = react_native__WEBPACK_IMPORTED_MODULE_9__.StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic200
    },
    FlatSectionWrapper: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 15,
        width: "100%",
        maxWidth: 450
    },
    GridSectionWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 10,
        maxWidth: 450,
        justifyContent: "center"
    },
    FlatButton: {
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White,
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 5,
        borderRadius: 10
    },
    GridButtonWrapper: {
        padding: 10,
        aspectRatio: 1,
        width: "44%",
        height: "44%"
    },
    GridButton: {
        backgroundColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.White,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 14,
        shadowColor: _colors_Colors__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.Basic600,
        shadowOpacity: 1,
        elevation: 15,
        width: "100%",
        height: "100%"
    },
    GridIconBG: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },
    FlatIconBG: {
        width: 31,
        height: 31,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 31
    },
    LayoutToggler: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20
    },
    createIcon: {
        position: react_native__WEBPACK_IMPORTED_MODULE_9__.Platform.select({
            native: "absolute",
            web: "fixed"
        }),
        bottom: react_native__WEBPACK_IMPORTED_MODULE_9__.Platform.select({
            native: 20,
            web: 50 + 20
        }),
        right: 20
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainScreen);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 45558:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56089);
/* harmony import */ var _components_molecules_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85258);
/* harmony import */ var solito_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61476);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_2__, _components_molecules_Button__WEBPACK_IMPORTED_MODULE_3__]);
([_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_2__, _components_molecules_Button__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const MainScreen = ()=>{
    // const MainScreen: React.FC<MainScreenProps> = () => {
    // const { token, refresh_token } = useTypedSelector(s => s.general);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_organismes_ScreenHeaderProvider__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        currentStack: "MessengerStack",
        mode: "mainTitle",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_molecules_Button__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            ...(0,solito_link__WEBPACK_IMPORTED_MODULE_4__/* .useLink */ .n)({
                href: "/messenger/second"
            }),
            children: "second"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainScreen);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Colors = {
    SuccessLight: "rgba(3, 214, 176, 1)",
    SuccessDark: "rgba(0, 184, 146, 1)",
    Warning: "rgba(236, 185, 4, 1)",
    Danger: "rgba(237, 9, 91, 1)",
    Danger10: "rgba(237, 9, 91, 0.1)",
    Link: "rgba(74, 50, 205, 1)",
    Link50: "rgba(74, 50, 205, 0.5)",
    White: "rgba(255, 255, 255, 1)",
    White30: "rgba(255, 255, 255, 0.3)",
    White50: "rgba(255, 255, 255, 0.5)",
    Basic100: "rgba(245, 249, 253, 1)",
    Basic200: "rgba(239, 244, 252, 1)",
    Basic300: "rgba(226, 230, 239, 1)",
    Basic400: "rgba(210, 215, 226, 1)",
    Basic500: "rgba(174, 178, 198, 1)",
    Basic600: "rgba(122, 124, 153, 1)",
    Basic700: "rgba(71, 72, 97, 1)",
    Basic800: "rgba(23, 25, 55, 1)",
    Basic900: "rgba(8, 9, 20, 1)",
    Basic90020: "rgba(8, 9, 20, 0.2)",
    Basic90050: "rgba(8, 9, 20, 0.5)",
    Sea200: "rgba(234, 255, 255, 1)",
    Sea300: "rgba(221, 255, 255, 1)",
    TextLight: "rgba(255, 255, 255, 1)",
    TextDark: "rgba(44, 47, 60, 1)",
    Blue100: "#E2DCFF",
    Blue200: "rgba(196, 185, 255, 1)",
    Blue500: "rgba(74, 50, 205, 1)",
    Transparent: "rgba(255, 255, 255, 0)",
    Green500: "rgba(3, 214, 176, 1)",
    Yellow500: "#ECB904"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Colors);


/***/ }),

/***/ 26752:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: useActions

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(86695);
;// CONCATENATED MODULE: ./src/store/actions/index.ts
var generalActionTypes;
(function(generalActionTypes) {
    generalActionTypes["SET_TOKEN"] = "SET_TOKEN";
    generalActionTypes["SET_IS_TABBAR_VISIBLE"] = "SET_IS_TABBAR_VISIBLE";
    generalActionTypes["SET_THEME"] = "SET_THEME";
    generalActionTypes["SET_CURRENT_SCREEN"] = "SET_CURRENT_SCREEN";
    generalActionTypes["SET_PROFILE_HELP_SCREEN_DISPLAYED"] = "SET_PROFILE_HELP_SCREEN_DISPLAYED";
    generalActionTypes["SET_IS_MAIN_MENU_FLAT_LIST"] = "SET_IS_MAIN_MENU_FLAT_LIST";
    generalActionTypes["SET_APP_LOADING"] = "SET_APP_LOADING";
    generalActionTypes["SET_SWIPEABLE_PANEL_PROPS"] = "SET_SWIPEABLE_PANEL_PROPS";
    generalActionTypes["SET_APP_DATA"] = "SET_APP_DATA";
    generalActionTypes["LOG_OUT"] = "LOG_OUT";
    generalActionTypes["SET_JOB_INDUSTRIES"] = "SET_JOB_INDUSTRIES";
    generalActionTypes["SET_USER_DATA"] = "SET_USER_DATA";
    generalActionTypes["SET_USER_ADVERTS"] = "SET_USER_ADVERTS";
    generalActionTypes["SET_USER_COMPANY"] = "SET_USER_COMPANY";
    generalActionTypes["SET_USER_EVENTS"] = "SET_USER_EVENTS";
    generalActionTypes["SET_CANDIDATE_MARKS"] = "SET_CANDIDATE_MARKS";
    generalActionTypes["SET_CANDIDATE_NOTES"] = "SET_CANDIDATE_NOTES";
    generalActionTypes["SET_USER_INVOICES"] = "SET_USER_INVOICES";
})(generalActionTypes || (generalActionTypes = {}));
var bookmarkActionTypes;
(function(bookmarkActionTypes) {
    bookmarkActionTypes["SET_SUPER"] = "SET_SUPER";
    bookmarkActionTypes["SET_CONSIDER"] = "SET_CONSIDER";
    bookmarkActionTypes["SET_FUTURE"] = "SET_FUTURE";
    bookmarkActionTypes["SET_HISTORY"] = "SET_HISTORY";
    bookmarkActionTypes["SET_BLANK"] = "SET_BLANK";
    bookmarkActionTypes["SET_COLOR"] = "SET_COLOR";
})(bookmarkActionTypes || (bookmarkActionTypes = {}));
var calendarActionTypes;
(function(calendarActionTypes) {
    calendarActionTypes["ADD_EVENT"] = "ADD_EVENT";
    calendarActionTypes["REMOVE_EVENT"] = "REMOVE_EVENT";
    calendarActionTypes["EDIT_EVENT"] = "EDIT_EVENT";
    calendarActionTypes["SAVE_QUESTIONS"] = "SAVE_QUESTIONS";
})(calendarActionTypes || (calendarActionTypes = {}));
var advertActionTypes;
(function(advertActionTypes) {
    advertActionTypes["ADD_ADVERT"] = "ADD_ADVERT";
    advertActionTypes["REMOVE_ADVERT"] = "REMOVE_ADVERT";
    advertActionTypes["EDIT_ADVERT"] = "EDIT_ADVERT";
})(advertActionTypes || (advertActionTypes = {}));
var companyActionTypes;
(function(companyActionTypes) {
    companyActionTypes["ADD_COMPANY"] = "ADD_COMPANY";
    companyActionTypes["REMOVE_COMPANY"] = "REMOVE_COMPANY";
    companyActionTypes["EDIT_COMPANY"] = "EDIT_COMPANY";
})(companyActionTypes || (companyActionTypes = {}));

;// CONCATENATED MODULE: ./src/store/actionCreators/general/actions.ts

const setToken = (payload)=>({
        type: generalActionTypes.SET_TOKEN,
        payload
    });
const setIsTabbarVisible = (payload)=>({
        type: generalActionTypes.SET_IS_TABBAR_VISIBLE,
        payload
    });
const setUserData = (payload)=>({
        type: generalActionTypes.SET_USER_DATA,
        payload
    });
const setUserAdverts = (payload)=>({
        type: generalActionTypes.SET_USER_ADVERTS,
        payload
    });
const setCandidateMarks = (payload)=>({
        type: generalActionTypes.SET_CANDIDATE_MARKS,
        payload
    });
const setCandidateNotes = (payload)=>({
        type: generalActionTypes.SET_CANDIDATE_NOTES,
        payload
    });
const setUserEvents = (payload)=>({
        type: generalActionTypes.SET_USER_EVENTS,
        payload
    });
const setUserInvoices = (payload)=>({
        type: generalActionTypes.SET_USER_INVOICES,
        payload
    });
const setUserCompany = (payload)=>({
        type: generalActionTypes.SET_USER_COMPANY,
        payload
    });
const setJobIndustries = (payload)=>({
        type: generalActionTypes.SET_JOB_INDUSTRIES,
        payload
    });
const setSwipeablePanelProps = (payload)=>({
        type: generalActionTypes.SET_SWIPEABLE_PANEL_PROPS,
        payload
    });
const setAppLoading = (payload)=>({
        type: generalActionTypes.SET_APP_LOADING,
        payload
    });
const setIsMainMenuFlatList = (payload)=>({
        type: generalActionTypes.SET_IS_MAIN_MENU_FLAT_LIST,
        payload
    });
const setProfileHelpScreenDisplayed = (payload)=>({
        type: generalActionTypes.SET_PROFILE_HELP_SCREEN_DISPLAYED,
        payload
    });
const setCurrentScreen = (payload)=>({
        type: generalActionTypes.SET_CURRENT_SCREEN,
        payload
    });
const setAppData = (payload)=>({
        type: generalActionTypes.SET_APP_DATA,
        payload
    });
const LogOut = ()=>({
        type: generalActionTypes.LOG_OUT
    });
const actions_generalActions = {
    setToken,
    setIsTabbarVisible,
    setCurrentScreen,
    setProfileHelpScreenDisplayed,
    setIsMainMenuFlatList,
    setAppLoading,
    setSwipeablePanelProps,
    setAppData,
    LogOut,
    setJobIndustries,
    setUserData,
    setUserCompany,
    setUserAdverts,
    setUserEvents,
    setCandidateMarks,
    setCandidateNotes,
    setUserInvoices
};
/* harmony default export */ const actions = ((/* unused pure expression or super */ null && (actions_generalActions)));

;// CONCATENATED MODULE: ./src/hooks/useActions.ts



const useActions = ()=>{
    const dispatch = useDispatch();
    return bindActionCreators(generalActions, dispatch);
};


/***/ }),

/***/ 42163:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ useTypedSelector)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

const useTypedSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;


/***/ }),

/***/ 75505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ animations)
/* harmony export */ });
/* harmony import */ var _tamagui_animations_react_native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18675);
/* harmony import */ var _tamagui_animations_react_native__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tamagui_animations_react_native__WEBPACK_IMPORTED_MODULE_0__);

const animations = (0,_tamagui_animations_react_native__WEBPACK_IMPORTED_MODULE_0__.createAnimations)({
    bouncy: {
        damping: 9,
        mass: 0.9,
        stiffness: 150
    },
    lazy: {
        damping: 18,
        stiffness: 50
    },
    slow: {
        damping: 15,
        stiffness: 40
    },
    quick: {
        damping: 20,
        mass: 1.2,
        stiffness: 250
    },
    tooltip: {
        damping: 10,
        mass: 0.9,
        stiffness: 100
    }
});


/***/ }),

/***/ 49621:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export createGenericFont */
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86872);
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tamagui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tamagui_font_silkscreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59297);
/* harmony import */ var _tamagui_font_inter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64901);



const genericFontSizes = {
    1: 10,
    2: 11,
    3: 12,
    4: 14,
    5: 15,
    6: 16,
    7: 20,
    8: 22,
    9: 30,
    10: 42,
    11: 52,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 124
};
function createGenericFont(family, font = {}, { sizeLineHeight = (val)=>val * 1.35 } = {}) {
    const size = font.size || genericFontSizes;
    return (0,tamagui__WEBPACK_IMPORTED_MODULE_2__.createFont)({
        family,
        size,
        lineHeight: Object.fromEntries(Object.entries(size).map(([k, v])=>[
                k,
                sizeLineHeight(+v)
            ])),
        weight: {
            0: "300"
        },
        letterSpacing: {
            4: 0
        },
        ...font
    });
}
const systemFamily =  false ? 0 : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const silkscreenFont = (0,_tamagui_font_silkscreen__WEBPACK_IMPORTED_MODULE_0__/* .createSilkscreenFont */ .m)();
const headingFont = (0,_tamagui_font_inter__WEBPACK_IMPORTED_MODULE_1__/* .createInterFont */ .e)({
    size: {
        5: 13,
        6: 15,
        9: 32,
        10: 44
    },
    transform: {
        6: "uppercase",
        7: "none"
    },
    weight: {
        6: "400",
        7: "700"
    },
    color: {
        6: "$colorFocus",
        7: "$color"
    },
    letterSpacing: {
        5: 2,
        6: 1,
        7: 0,
        8: 0,
        9: -1,
        10: -1.5,
        12: -2,
        14: -3,
        15: -4
    },
    // for native
    face: {
        700: {
            normal: "Inter-Bold"
        },
        800: {
            normal: "Inter-Bold"
        },
        900: {
            normal: "Inter-Bold"
        }
    }
}, {
    sizeLineHeight: (size)=>Math.round(size * 1.1 + (size < 30 ? 10 : 5))
});
const bodyFont = (0,_tamagui_font_inter__WEBPACK_IMPORTED_MODULE_1__/* .createInterFont */ .e)({
    family: systemFamily,
    weight: {
        1: "500",
        7: "600"
    },
    // for native
    face: {
        900: {
            normal: "Inter-Bold"
        }
    }
}, {
    sizeSize: (size)=>Math.round(size),
    sizeLineHeight: (size)=>Math.round(size * 1.1 + (size >= 12 ? 8 : 4))
});
const monoFont = createGenericFont('"ui-monospace", "SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace', {
    weight: {
        1: "500"
    },
    size: {
        1: 11,
        2: 12,
        3: 13,
        4: 14,
        5: 16,
        6: 18,
        7: 20,
        8: 22,
        9: 30,
        10: 42,
        11: 52,
        12: 62,
        13: 72,
        14: 92,
        15: 114,
        16: 124
    }
}, {
    sizeLineHeight: (x)=>x * 1.5
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    // noto: notoFont as any,
    heading: headingFont,
    body: bodyFont,
    mono: monoFont,
    silkscreen: silkscreenFont
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 43581:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tamagui_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36510);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tamagui_config__WEBPACK_IMPORTED_MODULE_0__]);
_tamagui_config__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_tamagui_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 25664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ mediaQueryDefaultActive),
/* harmony export */   B: () => (/* binding */ media)
/* harmony export */ });
/* harmony import */ var _tamagui_react_native_media_driver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82440);
/* harmony import */ var _tamagui_react_native_media_driver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tamagui_react_native_media_driver__WEBPACK_IMPORTED_MODULE_0__);

const media = (0,_tamagui_react_native_media_driver__WEBPACK_IMPORTED_MODULE_0__.createMedia)({
    // for site
    xl: {
        maxWidth: 1650
    },
    lg: {
        maxWidth: 1280
    },
    md: {
        maxWidth: 1020
    },
    sm: {
        maxWidth: 800
    },
    xs: {
        maxWidth: 660
    },
    xxs: {
        maxWidth: 390
    },
    gtXs: {
        minWidth: 660 + 1
    },
    gtSm: {
        minWidth: 800 + 1
    },
    gtMd: {
        minWidth: 1020 + 1
    },
    gtLg: {
        minWidth: 1280 + 1
    },
    gtXl: {
        minWidth: 1650 + 1
    },
    hoverNone: {
        hover: "none"
    },
    pointerCoarse: {
        pointer: "coarse"
    }
});
// note all the non "gt" ones should be true to start to match mobile-first
// were aiming for "xs" to be the default to "gtXs" true too
const mediaQueryDefaultActive = {
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true,
    // false
    xxs: false
};


/***/ }),

/***/ 36510:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tamagui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75280);
/* harmony import */ var _tamagui_shorthands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31087);
/* harmony import */ var _tamagui_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(77030);
/* harmony import */ var _tamagui_themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94668);
/* harmony import */ var _mediaQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25664);
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75505);
/* harmony import */ var _fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49621);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fonts__WEBPACK_IMPORTED_MODULE_3__]);
_fonts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const appConfig = (0,tamagui__WEBPACK_IMPORTED_MODULE_4__/* .createTamagui */ ._)({
    shouldAddPrefersColorThemes: true,
    // themeClassNameOnRoot: true,
    animations: _animations__WEBPACK_IMPORTED_MODULE_2__/* .animations */ .s,
    fonts: _fonts__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
    shorthands: _tamagui_shorthands__WEBPACK_IMPORTED_MODULE_0__/* .shorthands */ .q,
    themes: _tamagui_themes__WEBPACK_IMPORTED_MODULE_5__/* .themes */ .n,
    tokens: _tamagui_themes__WEBPACK_IMPORTED_MODULE_6__/* .tokens */ .TV,
    media: _mediaQueries__WEBPACK_IMPORTED_MODULE_1__/* .media */ .B
});
//@ts-ignore
appConfig.mediaQueryDefaultActive = _mediaQueries__WEBPACK_IMPORTED_MODULE_1__/* .mediaQueryDefaultActive */ .A;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appConfig);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 61957:
/***/ (() => {



/***/ }),

/***/ 85415:
/***/ (() => {



/***/ }),

/***/ 53346:
/***/ ((module) => {

"use strict";
module.exports = {"u":"elfemployer"};

/***/ })

};
;