import { useEffect } from "react";
import Screen from "../../screens/AuthScreens/MainScreen";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useRouter from "../../hooks/useRouter";

const index = () => {
    const { userData } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (userData) replace({ stack: 'MenuStack' });
    }, [userData]);

    return <Screen />;
};

export default index;
