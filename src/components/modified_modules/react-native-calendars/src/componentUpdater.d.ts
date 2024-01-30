/// <reference types="react" />
/// <reference types="xdate" />
import { CalendarProps } from './calendar';
import { CalendarListProps } from './calendar-list';
import { AgendaProps } from './agenda';
import { ReservationListProps } from './agenda/reservation-list';
import { MarkingProps } from './calendar/day/marking';
export declare function shouldUpdate(props: any, newProps: any, paths: string[]): boolean;
export declare function extractComponentProps(component: any, props: any, ignoreProps?: string[]): any;
export declare function extractDotProps(props: MarkingProps): {
    theme: import("./types").Theme | undefined;
    color: string | undefined;
    marked: boolean | undefined;
    selected: boolean | undefined;
    disabled: boolean | undefined;
    inactive: boolean | undefined;
    today: boolean | undefined;
};
export declare function extractDayProps(props: CalendarProps): {
    state: import("./types").DayState | undefined;
    marking: MarkingProps | undefined;
    markingType: import("./types").MarkingTypes | undefined;
    theme: import("./types").Theme | undefined;
    onPress: ((date?: import("./types").DateData | undefined) => void) | undefined;
    onLongPress: ((date?: import("./types").DateData | undefined) => void) | undefined;
    date: string | undefined;
    disableAllTouchEventsForDisabledDays: boolean | undefined;
    disableAllTouchEventsForInactiveDays: boolean | undefined;
    dayComponent: import("react").ComponentType<import("./calendar/day").DayProps & {
        date?: import("./types").DateData | undefined;
    }> | undefined;
    testID: string | undefined;
};
export declare function extractHeaderProps(props: CalendarProps): {
    month: import("xdate") | undefined;
    addMonth: ((num: number) => void) | undefined;
    theme: import("./types").Theme | undefined;
    firstDay: number | undefined;
    displayLoadingIndicator: boolean | undefined;
    showWeekNumbers: boolean | undefined;
    monthFormat: string | undefined;
    hideDayNames: boolean | undefined;
    hideArrows: boolean | undefined;
    renderArrow: ((direction: import("./types").Direction) => import("react").ReactNode) | undefined;
    onPressArrowLeft: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    onPressArrowRight: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    disableArrowLeft: boolean | undefined;
    disableArrowRight: boolean | undefined;
    disabledDaysIndexes: number[] | undefined;
    renderHeader: ((date?: import("xdate") | undefined) => import("react").ReactNode) | undefined;
    customHeaderTitle: JSX.Element | undefined;
    webAriaLevel: number | undefined;
    numberOfDays: number | undefined;
    current: string | undefined;
    timelineLeftInset: number | undefined;
    testID: string | undefined;
};
export declare function extractCalendarProps(props: CalendarListProps): {
    theme?: import("./types").Theme | undefined;
    firstDay?: number | undefined;
    displayLoadingIndicator?: boolean | undefined;
    showWeekNumbers?: boolean | undefined;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    current?: string | undefined;
    initialDate?: string | undefined;
    minDate?: string | undefined;
    maxDate?: string | undefined;
    markedDates?: import("./types").MarkedDates | undefined;
    hideExtraDays?: boolean | undefined;
    showSixWeeks?: boolean | undefined;
    onDayPress?: ((date: import("./types").DateData) => void) | undefined;
    onDayLongPress?: ((date: import("./types").DateData) => void) | undefined;
    onMonthChange?: ((date: import("./types").DateData) => void) | undefined;
    onVisibleMonthsChange?: ((months: import("./types").DateData[]) => void) | undefined;
    disableMonthChange?: boolean | undefined;
    enableSwipeMonths?: boolean | undefined;
    disabledByDefault?: boolean | undefined;
    headerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    customHeader?: any;
    allowSelectionOutOfRange?: boolean | undefined;
    month?: import("xdate") | undefined;
    addMonth?: ((num: number) => void) | undefined;
    monthFormat?: string | undefined;
    hideDayNames?: boolean | undefined;
    hideArrows?: boolean | undefined;
    renderArrow?: ((direction: import("./types").Direction) => import("react").ReactNode) | undefined;
    onPressArrowLeft?: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    onPressArrowRight?: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    arrowsHitSlop?: number | import("react-native").Insets | undefined;
    disableArrowLeft?: boolean | undefined;
    disableArrowRight?: boolean | undefined;
    disabledDaysIndexes?: number[] | undefined;
    renderHeader?: ((date?: import("xdate") | undefined) => import("react").ReactNode) | undefined;
    customHeaderTitle?: JSX.Element | undefined;
    webAriaLevel?: number | undefined;
    testID?: string | undefined;
    accessibilityElementsHidden?: boolean | undefined;
    importantForAccessibility?: "auto" | "yes" | "no" | "no-hide-descendants" | undefined;
    numberOfDays?: number | undefined;
    timelineLeftInset?: number | undefined;
    dayComponent?: import("react").ComponentType<import("./calendar/day").DayProps & {
        date?: import("./types").DateData | undefined;
    }> | undefined;
    state?: import("./types").DayState | undefined;
    marking?: MarkingProps | undefined;
    markingType?: import("./types").MarkingTypes | undefined;
    onPress?: ((date?: import("./types").DateData | undefined) => void) | undefined;
    onLongPress?: ((date?: import("./types").DateData | undefined) => void) | undefined;
    date?: string | undefined;
    disableAllTouchEventsForDisabledDays?: boolean | undefined;
    disableAllTouchEventsForInactiveDays?: boolean | undefined;
    accessibilityLabel?: string | undefined;
    children?: import("react").ReactNode;
    hitSlop?: import("react-native").Insets | undefined;
    id?: string | undefined;
    onLayout?: ((event: import("react-native").LayoutChangeEvent) => void) | undefined;
    pointerEvents?: "auto" | "none" | "box-none" | "box-only" | undefined;
    removeClippedSubviews?: boolean | undefined;
    nativeID?: string | undefined;
    collapsable?: boolean | undefined;
    needsOffscreenAlphaCompositing?: boolean | undefined;
    renderToHardwareTextureAndroid?: boolean | undefined;
    focusable?: boolean | undefined;
    shouldRasterizeIOS?: boolean | undefined;
    isTVSelectable?: boolean | undefined;
    hasTVPreferredFocus?: boolean | undefined;
    tvParallaxProperties?: import("react-native").TVParallaxProperties | undefined;
    tvParallaxShiftDistanceX?: number | undefined;
    tvParallaxShiftDistanceY?: number | undefined;
    tvParallaxTiltAngle?: number | undefined;
    tvParallaxMagnification?: number | undefined;
    onStartShouldSetResponder?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onMoveShouldSetResponder?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onResponderEnd?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderGrant?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderReject?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderMove?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderRelease?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderStart?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderTerminationRequest?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onResponderTerminate?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onStartShouldSetResponderCapture?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onMoveShouldSetResponderCapture?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onTouchStart?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchMove?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEnd?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchCancel?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEndCapture?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onPointerEnter?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerEnterCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeave?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeaveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMove?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMoveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancel?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancelCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerDown?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerDownCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerUp?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerUpCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    accessible?: boolean | undefined;
    accessibilityActions?: readonly Readonly<{
        name: string;
        label?: string | undefined;
    }>[] | undefined;
    'aria-label'?: string | undefined;
    accessibilityRole?: import("react-native").AccessibilityRole | undefined;
    accessibilityState?: import("react-native").AccessibilityState | undefined;
    'aria-busy'?: boolean | undefined;
    'aria-checked'?: boolean | "mixed" | undefined;
    'aria-disabled'?: boolean | undefined;
    'aria-expanded'?: boolean | undefined;
    'aria-selected'?: boolean | undefined;
    'aria-labelledby'?: string | undefined;
    accessibilityHint?: string | undefined;
    accessibilityValue?: import("react-native").AccessibilityValue | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    onAccessibilityAction?: ((event: import("react-native").AccessibilityActionEvent) => void) | undefined;
    'aria-hidden'?: boolean | undefined;
    'aria-live'?: "polite" | "assertive" | "off" | undefined;
    'aria-modal'?: boolean | undefined;
    role?: import("react-native").Role | undefined;
    accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
    accessibilityLabelledBy?: string | string[] | undefined;
    accessibilityViewIsModal?: boolean | undefined;
    onAccessibilityEscape?: (() => void) | undefined;
    onAccessibilityTap?: (() => void) | undefined;
    onMagicTap?: (() => void) | undefined;
    accessibilityIgnoresInvertColors?: boolean | undefined;
    accessibilityLanguage?: string | undefined;
    columnWrapperStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    extraData?: any;
    getItemLayout?: ((data: any[] | null | undefined, index: number) => {
        length: number;
        offset: number;
        index: number;
    }) | undefined;
    initialNumToRender?: number | undefined;
    initialScrollIndex?: number | null | undefined;
    legacyImplementation?: boolean | undefined;
    numColumns?: number | undefined;
    onRefresh?: (() => void) | null | undefined;
    onViewableItemsChanged?: ((info: {
        viewableItems: import("react-native").ViewToken[];
        changed: import("react-native").ViewToken[];
    }) => void) | null | undefined;
    refreshing?: boolean | null | undefined;
    viewabilityConfig?: any;
    fadingEdgeLength?: number | undefined;
    ItemSeparatorComponent?: import("react").ComponentType<any> | null | undefined;
    ListEmptyComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListFooterComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListFooterComponentStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    ListHeaderComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListHeaderComponentStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    debug?: boolean | undefined;
    disableVirtualization?: boolean | undefined;
    getItem?: ((data: any, index: number) => any) | undefined;
    getItemCount?: ((data: any) => number) | undefined;
    inverted?: boolean | null | undefined;
    maxToRenderPerBatch?: number | undefined;
    onScrollToIndexFailed?: ((info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => void) | undefined;
    progressViewOffset?: number | undefined;
    renderScrollComponent?: ((props: import("react-native").ScrollViewProps) => import("react").ReactElement<import("react-native").ScrollViewProps, string | import("react").JSXElementConstructor<any>>) | undefined;
    updateCellsBatchingPeriod?: number | undefined;
    viewabilityConfigCallbackPairs?: import("react-native").ViewabilityConfigCallbackPairs | undefined;
    windowSize?: number | undefined;
    CellRendererComponent?: import("react").ComponentType<any> | undefined;
    contentContainerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    decelerationRate?: number | "normal" | "fast" | undefined;
    invertStickyHeaders?: boolean | undefined;
    keyboardDismissMode?: "none" | "interactive" | "on-drag" | undefined;
    onContentSizeChange?: ((w: number, h: number) => void) | undefined;
    onScroll?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    onScrollBeginDrag?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    onScrollEndDrag?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    onMomentumScrollEnd?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    onMomentumScrollBegin?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    showsHorizontalScrollIndicator?: boolean | undefined;
    showsVerticalScrollIndicator?: boolean | undefined;
    stickyHeaderHiddenOnScroll?: boolean | undefined;
    refreshControl?: import("react").ReactElement<import("react-native").RefreshControlProps, string | import("react").JSXElementConstructor<any>> | undefined;
    snapToInterval?: number | undefined;
    snapToOffsets?: number[] | undefined;
    snapToStart?: boolean | undefined;
    snapToEnd?: boolean | undefined;
    stickyHeaderIndices?: number[] | undefined;
    disableIntervalMomentum?: boolean | undefined;
    disableScrollViewPanResponder?: boolean | undefined;
    StickyHeaderComponent?: import("react").ComponentType<any> | undefined;
    alwaysBounceHorizontal?: boolean | undefined;
    alwaysBounceVertical?: boolean | undefined;
    automaticallyAdjustContentInsets?: boolean | undefined;
    automaticallyAdjustKeyboardInsets?: boolean | undefined;
    automaticallyAdjustsScrollIndicatorInsets?: boolean | undefined;
    bounces?: boolean | undefined;
    bouncesZoom?: boolean | undefined;
    canCancelContentTouches?: boolean | undefined;
    centerContent?: boolean | undefined;
    contentInset?: import("react-native").Insets | undefined;
    contentOffset?: import("react-native").PointProp | undefined;
    contentInsetAdjustmentBehavior?: "never" | "always" | "automatic" | "scrollableAxes" | undefined;
    directionalLockEnabled?: boolean | undefined;
    indicatorStyle?: "white" | "default" | "black" | undefined;
    maintainVisibleContentPosition?: {
        autoscrollToTopThreshold?: number | null | undefined;
        minIndexForVisible: number;
    } | null | undefined;
    maximumZoomScale?: number | undefined;
    minimumZoomScale?: number | undefined;
    onScrollAnimationEnd?: (() => void) | undefined;
    pinchGestureEnabled?: boolean | undefined;
    scrollEventThrottle?: number | undefined;
    scrollIndicatorInsets?: import("react-native").Insets | undefined;
    scrollToOverflowEnabled?: boolean | undefined;
    snapToAlignment?: "center" | "end" | "start" | undefined;
    onScrollToTop?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    zoomScale?: number | undefined;
    endFillColor?: import("react-native").ColorValue | undefined;
    scrollPerfTag?: string | undefined;
    overScrollMode?: "auto" | "never" | "always" | undefined;
    persistentScrollbar?: boolean | undefined;
};
export declare function extractCalendarListProps(props: AgendaProps): {
    pastScrollRange?: number | undefined;
    futureScrollRange?: number | undefined;
    calendarWidth?: number | undefined;
    calendarHeight?: number | undefined;
    calendarStyle?: import("react-native").ViewStyle | undefined;
    staticHeader?: boolean | undefined;
    showScrollIndicator?: boolean | undefined;
    animateScroll?: boolean | undefined;
    theme?: import("./types").Theme | undefined;
    firstDay?: number | undefined;
    displayLoadingIndicator?: boolean | undefined;
    showWeekNumbers?: boolean | undefined;
    style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    current?: string | undefined;
    initialDate?: string | undefined;
    minDate?: string | undefined;
    maxDate?: string | undefined;
    markedDates?: import("./types").MarkedDates | undefined;
    hideExtraDays?: boolean | undefined;
    showSixWeeks?: boolean | undefined;
    onDayPress?: ((date: import("./types").DateData) => void) | undefined;
    onDayLongPress?: ((date: import("./types").DateData) => void) | undefined;
    onMonthChange?: ((date: import("./types").DateData) => void) | undefined;
    onVisibleMonthsChange?: ((months: import("./types").DateData[]) => void) | undefined;
    disableMonthChange?: boolean | undefined;
    enableSwipeMonths?: boolean | undefined;
    disabledByDefault?: boolean | undefined;
    headerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    customHeader?: any;
    allowSelectionOutOfRange?: boolean | undefined;
    month?: import("xdate") | undefined;
    addMonth?: ((num: number) => void) | undefined;
    monthFormat?: string | undefined;
    hideDayNames?: boolean | undefined;
    hideArrows?: boolean | undefined;
    renderArrow?: ((direction: import("./types").Direction) => import("react").ReactNode) | undefined;
    onPressArrowLeft?: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    onPressArrowRight?: ((method: () => void, month?: import("xdate") | undefined) => void) | undefined;
    arrowsHitSlop?: number | import("react-native").Insets | undefined;
    disableArrowLeft?: boolean | undefined;
    disableArrowRight?: boolean | undefined;
    disabledDaysIndexes?: number[] | undefined;
    renderHeader?: ((date?: import("xdate") | undefined) => import("react").ReactNode) | undefined;
    customHeaderTitle?: JSX.Element | undefined;
    webAriaLevel?: number | undefined;
    testID?: string | undefined;
    accessibilityElementsHidden?: boolean | undefined;
    importantForAccessibility?: "auto" | "yes" | "no" | "no-hide-descendants" | undefined;
    numberOfDays?: number | undefined;
    timelineLeftInset?: number | undefined;
    dayComponent?: import("react").ComponentType<import("./calendar/day").DayProps & {
        date?: import("./types").DateData | undefined;
    }> | undefined;
    state?: import("./types").DayState | undefined;
    marking?: MarkingProps | undefined;
    markingType?: import("./types").MarkingTypes | undefined;
    onPress?: ((date?: import("./types").DateData | undefined) => void) | undefined;
    onLongPress?: ((date?: import("./types").DateData | undefined) => void) | undefined;
    disableAllTouchEventsForDisabledDays?: boolean | undefined;
    disableAllTouchEventsForInactiveDays?: boolean | undefined;
    accessibilityLabel?: string | undefined;
    children?: import("react").ReactNode;
    hitSlop?: import("react-native").Insets | undefined;
    id?: string | undefined;
    onLayout?: ((event: import("react-native").LayoutChangeEvent) => void) | undefined;
    pointerEvents?: "auto" | "none" | "box-none" | "box-only" | undefined;
    removeClippedSubviews?: boolean | undefined;
    nativeID?: string | undefined;
    collapsable?: boolean | undefined;
    needsOffscreenAlphaCompositing?: boolean | undefined;
    renderToHardwareTextureAndroid?: boolean | undefined;
    focusable?: boolean | undefined;
    shouldRasterizeIOS?: boolean | undefined;
    isTVSelectable?: boolean | undefined;
    hasTVPreferredFocus?: boolean | undefined;
    tvParallaxProperties?: import("react-native").TVParallaxProperties | undefined;
    tvParallaxShiftDistanceX?: number | undefined;
    tvParallaxShiftDistanceY?: number | undefined;
    tvParallaxTiltAngle?: number | undefined;
    tvParallaxMagnification?: number | undefined;
    onStartShouldSetResponder?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onMoveShouldSetResponder?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onResponderEnd?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderGrant?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderReject?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderMove?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderRelease?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderStart?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onResponderTerminationRequest?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onResponderTerminate?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onStartShouldSetResponderCapture?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onMoveShouldSetResponderCapture?: ((event: import("react-native").GestureResponderEvent) => boolean) | undefined;
    onTouchStart?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchMove?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEnd?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchCancel?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchEndCapture?: ((event: import("react-native").GestureResponderEvent) => void) | undefined;
    onPointerEnter?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerEnterCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeave?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerLeaveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMove?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerMoveCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancel?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerCancelCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerDown?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerDownCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerUp?: ((event: import("react-native").PointerEvent) => void) | undefined;
    onPointerUpCapture?: ((event: import("react-native").PointerEvent) => void) | undefined;
    accessible?: boolean | undefined;
    accessibilityActions?: readonly Readonly<{
        name: string;
        label?: string | undefined;
    }>[] | undefined;
    'aria-label'?: string | undefined;
    accessibilityRole?: import("react-native").AccessibilityRole | undefined;
    accessibilityState?: import("react-native").AccessibilityState | undefined;
    'aria-busy'?: boolean | undefined;
    'aria-checked'?: boolean | "mixed" | undefined;
    'aria-disabled'?: boolean | undefined;
    'aria-expanded'?: boolean | undefined;
    'aria-selected'?: boolean | undefined;
    'aria-labelledby'?: string | undefined;
    accessibilityHint?: string | undefined;
    accessibilityValue?: import("react-native").AccessibilityValue | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    onAccessibilityAction?: ((event: import("react-native").AccessibilityActionEvent) => void) | undefined;
    'aria-hidden'?: boolean | undefined;
    'aria-live'?: "polite" | "assertive" | "off" | undefined;
    'aria-modal'?: boolean | undefined;
    role?: import("react-native").Role | undefined;
    accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
    accessibilityLabelledBy?: string | string[] | undefined;
    accessibilityViewIsModal?: boolean | undefined;
    onAccessibilityEscape?: (() => void) | undefined;
    onAccessibilityTap?: (() => void) | undefined;
    onMagicTap?: (() => void) | undefined;
    accessibilityIgnoresInvertColors?: boolean | undefined;
    accessibilityLanguage?: string | undefined;
    horizontal?: boolean | null | undefined;
    columnWrapperStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    keyboardShouldPersistTaps?: boolean | "never" | "always" | "handled" | undefined;
    extraData?: any;
    getItemLayout?: ((data: any[] | null | undefined, index: number) => {
        length: number;
        offset: number;
        index: number;
    }) | undefined;
    initialNumToRender?: number | undefined;
    initialScrollIndex?: number | null | undefined;
    keyExtractor?: ((item: any, index: number) => string) | undefined;
    legacyImplementation?: boolean | undefined;
    numColumns?: number | undefined;
    onEndReached?: ((info: {
        distanceFromEnd: number;
    }) => void) | null | undefined;
    onEndReachedThreshold?: number | null | undefined;
    onRefresh?: ((() => void) & (() => void)) | undefined;
    onViewableItemsChanged?: ((info: {
        viewableItems: import("react-native").ViewToken[];
        changed: import("react-native").ViewToken[];
    }) => void) | null | undefined;
    refreshing?: boolean | undefined;
    viewabilityConfig?: any;
    fadingEdgeLength?: number | undefined;
    ItemSeparatorComponent?: import("react").ComponentType<any> | null | undefined;
    ListEmptyComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListFooterComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListFooterComponentStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    ListHeaderComponent?: import("react").ComponentType<any> | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    ListHeaderComponentStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    debug?: boolean | undefined;
    disableVirtualization?: boolean | undefined;
    getItem?: ((data: any, index: number) => any) | undefined;
    getItemCount?: ((data: any) => number) | undefined;
    inverted?: boolean | null | undefined;
    maxToRenderPerBatch?: number | undefined;
    onScrollToIndexFailed?: ((info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => void) | undefined;
    progressViewOffset?: number | undefined;
    renderScrollComponent?: ((props: import("react-native").ScrollViewProps) => import("react").ReactElement<import("react-native").ScrollViewProps, string | import("react").JSXElementConstructor<any>>) | undefined;
    updateCellsBatchingPeriod?: number | undefined;
    viewabilityConfigCallbackPairs?: import("react-native").ViewabilityConfigCallbackPairs | undefined;
    windowSize?: number | undefined;
    CellRendererComponent?: import("react").ComponentType<any> | undefined;
    contentContainerStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    decelerationRate?: number | "normal" | "fast" | undefined;
    invertStickyHeaders?: boolean | undefined;
    keyboardDismissMode?: "none" | "interactive" | "on-drag" | undefined;
    onContentSizeChange?: ((w: number, h: number) => void) | undefined;
    onScroll?: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((yOffset: number) => void)) | undefined;
    onScrollBeginDrag?: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onScrollEndDrag?: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onMomentumScrollEnd?: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onMomentumScrollBegin?: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    pagingEnabled?: boolean | undefined;
    scrollEnabled?: boolean | undefined;
    showsHorizontalScrollIndicator?: boolean | undefined;
    showsVerticalScrollIndicator?: boolean | undefined;
    stickyHeaderHiddenOnScroll?: boolean | undefined;
    refreshControl?: (import("react").ReactElement<import("react-native").RefreshControlProps, string | import("react").JSXElementConstructor<any>> & JSX.Element) | undefined;
    snapToInterval?: number | undefined;
    snapToOffsets?: number[] | undefined;
    snapToStart?: boolean | undefined;
    snapToEnd?: boolean | undefined;
    stickyHeaderIndices?: number[] | undefined;
    disableIntervalMomentum?: boolean | undefined;
    disableScrollViewPanResponder?: boolean | undefined;
    StickyHeaderComponent?: import("react").ComponentType<any> | undefined;
    alwaysBounceHorizontal?: boolean | undefined;
    alwaysBounceVertical?: boolean | undefined;
    automaticallyAdjustContentInsets?: boolean | undefined;
    automaticallyAdjustKeyboardInsets?: boolean | undefined;
    automaticallyAdjustsScrollIndicatorInsets?: boolean | undefined;
    bounces?: boolean | undefined;
    bouncesZoom?: boolean | undefined;
    canCancelContentTouches?: boolean | undefined;
    centerContent?: boolean | undefined;
    contentInset?: import("react-native").Insets | undefined;
    contentOffset?: import("react-native").PointProp | undefined;
    contentInsetAdjustmentBehavior?: "never" | "always" | "automatic" | "scrollableAxes" | undefined;
    directionalLockEnabled?: boolean | undefined;
    indicatorStyle?: "white" | "default" | "black" | undefined;
    maintainVisibleContentPosition?: {
        autoscrollToTopThreshold?: number | null | undefined;
        minIndexForVisible: number;
    } | null | undefined;
    maximumZoomScale?: number | undefined;
    minimumZoomScale?: number | undefined;
    onScrollAnimationEnd?: (() => void) | undefined;
    pinchGestureEnabled?: boolean | undefined;
    scrollEventThrottle?: number | undefined;
    scrollIndicatorInsets?: import("react-native").Insets | undefined;
    scrollToOverflowEnabled?: boolean | undefined;
    scrollsToTop?: boolean | undefined;
    snapToAlignment?: "center" | "end" | "start" | undefined;
    onScrollToTop?: ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) | undefined;
    zoomScale?: number | undefined;
    endFillColor?: import("react-native").ColorValue | undefined;
    scrollPerfTag?: string | undefined;
    overScrollMode?: "auto" | "never" | "always" | undefined;
    nestedScrollEnabled?: boolean | undefined;
    persistentScrollbar?: boolean | undefined;
    renderDay?: ((date?: import("xdate") | undefined, item?: import("./types").AgendaEntry | undefined) => JSX.Element) | undefined;
    renderList?: ((listProps: ReservationListProps) => JSX.Element) | undefined;
};
export declare function extractReservationListProps(props: AgendaProps): {
    items: import("./types").AgendaSchedule | undefined;
    selectedDay: import("xdate") | undefined;
    topDay: import("xdate") | undefined;
    onDayChange: (((day: import("xdate")) => void) & ((data: import("./types").DateData) => void)) | undefined;
    showOnlySelectedDayItems: boolean | undefined;
    renderEmptyData: (() => JSX.Element) | undefined;
    onScroll: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((yOffset: number) => void)) | undefined;
    onScrollBeginDrag: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onScrollEndDrag: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onMomentumScrollBegin: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    onMomentumScrollEnd: (((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void) & ((event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void)) | undefined;
    refreshControl: (import("react").ReactElement<import("react-native").RefreshControlProps, string | import("react").JSXElementConstructor<any>> & JSX.Element) | undefined;
    refreshing: boolean | undefined;
    onRefresh: ((() => void) & (() => void)) | undefined;
    reservationsKeyExtractor: ((item: import("./types").DayAgenda, index: number) => string) | undefined;
    date: (string & import("xdate")) | undefined;
    item: import("./types").AgendaEntry | undefined;
    theme: import("./types").Theme | undefined;
    rowHasChanged: ((a: import("./types").AgendaEntry, b: import("./types").AgendaEntry) => boolean) | undefined;
    renderDay: ((date?: import("xdate") | undefined, item?: import("./types").AgendaEntry | undefined) => JSX.Element) | undefined;
    renderItem: ((reservation: import("./types").AgendaEntry, isFirst: boolean) => JSX.Element | import("react").Component<{}, {}, any>) | undefined;
    renderEmptyDate: ((date?: import("xdate") | undefined) => JSX.Element | import("react").Component<{}, {}, any>) | undefined;
};
export declare function extractReservationProps(props: ReservationListProps): {
    date: import("xdate") | undefined;
    item: import("./types").AgendaEntry | undefined;
    theme: import("./types").Theme | undefined;
    rowHasChanged: ((a: import("./types").AgendaEntry, b: import("./types").AgendaEntry) => boolean) | undefined;
    renderDay: ((date?: import("xdate") | undefined, item?: import("./types").AgendaEntry | undefined) => JSX.Element) | undefined;
    renderItem: ((reservation: import("./types").AgendaEntry, isFirst: boolean) => JSX.Element | import("react").Component<{}, {}, any>) | undefined;
    renderEmptyDate: ((date?: import("xdate") | undefined) => JSX.Element | import("react").Component<{}, {}, any>) | undefined;
};