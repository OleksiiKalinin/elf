import { useEffect } from "react";
import Screen from "../../screens/AuthScreens/MainScreen";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useRouter from "../../hooks/useRouter";

const index = () => {
    const { token } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (token) replace({ stack: 'AuthStack', screen: 'FillUserDataScreen' });
    }, [token]);

    return <Screen />;
};

export default index;
