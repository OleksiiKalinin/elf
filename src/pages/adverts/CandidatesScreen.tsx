import { useRouter } from "next/router";
import Screen from "../../screens/AdvertScreens/CandidatesScreen";
import { useState } from "react";
import getUrlSearchParam from "../../hooks/getUrlSearchParam";

const CandidatesScreen = () => {
    const { asPath } = useRouter();
    const [id] = useState(getUrlSearchParam(asPath, 'id') || undefined);

    return <Screen idInitial={id} />;
};

export default CandidatesScreen;
