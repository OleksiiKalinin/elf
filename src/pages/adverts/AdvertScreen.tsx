import { useRouter } from "next/router";
import Screen from "../../screens/AdvertScreens/AdvertScreen";
import { useState } from "react";
import getUrlSearchParam from "../../hooks/getUrlSearchParam";

const AdvertScreen = () => {
    const { asPath } = useRouter();
    const [id] = useState(getUrlSearchParam(asPath, 'id') || undefined);

    return <Screen idInitial={id} />;
};

export default AdvertScreen;
