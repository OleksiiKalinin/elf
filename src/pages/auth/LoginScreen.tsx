import useRouter from "../../hooks/useRouter";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/LoginScreen";
import { useEffect } from "react";

const LoginScreen = () => {
    const { userData } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (userData) replace({ stack: 'MenuStack' });
    }, [userData]);

    return <Screen />
}

export default LoginScreen;
