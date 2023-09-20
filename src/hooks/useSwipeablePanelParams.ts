import { createParam } from 'solito'

export type SwipeablePanelParamsType = { subView: string, subViewMode: 'screen' | 'options' };

const { useParam } = createParam<SwipeablePanelParamsType>()

export const useSwipeablePanelParams = () => {
    const [subView, setSubView] = useParam('subView')
    const [subViewMode, setSubViewMode] = useParam('subViewMode')

    return {
        subView,
        setSubView,
        subViewMode,
        setSubViewMode,
    }
}