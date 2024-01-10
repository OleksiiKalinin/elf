import { useRouter } from "next/router";
import Screen from "../../screens/AdvertScreens/AdvertEditorScreen";
import { useState } from "react";
import getUrlSearchParam from "../../hooks/getUrlSearchParam";

const AdvertEditorScreen = () => {
    const { asPath } = useRouter();
    const [id] = useState(getUrlSearchParam(asPath, 'id') || undefined);
    const [step] = useState(getUrlSearchParam(asPath, 'step') || undefined) as any;

    return <Screen idInitial={id} stepInitial={step} />;
};

export default AdvertEditorScreen;
