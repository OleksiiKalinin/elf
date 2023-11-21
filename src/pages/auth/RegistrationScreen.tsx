import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/RegistrationScreen";
import useRouter from "../../hooks/useRouter";

const RegistrationScreen = () => {
    const { token } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (token) replace({ stack: 'AuthStack', screen: 'FillUserDataScreen' });
    }, [token]);

    return <Screen />;
};

export default RegistrationScreen;
