import useRouter from "../../hooks/useRouter";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/LoginScreen";
import { useEffect } from "react";

const LoginScreen = () => {
    const { token } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (token) replace({ stack: 'MenuStack' });
    }, [token]);

    return <Screen />
}

export default LoginScreen;
