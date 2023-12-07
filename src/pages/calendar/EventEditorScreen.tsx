import { useRouter } from "next/router";
import Screen from "../../screens/CalendarScreens/EventEditorScreen";
import { useState } from "react";
import getUrlSearchParam from "../../hooks/getUrlSearchParam";

const EventEditorScreen = () => {
    const { asPath } = useRouter();
    const [id] = useState(getUrlSearchParam(asPath, 'id') || undefined);

    return <Screen idInitial={id} />;
};

export default EventEditorScreen;
