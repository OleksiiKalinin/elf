import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/RememberPasswordScreen";
import useRouter from "../../hooks/useRouter";

const RememberPasswordScreen = () => {
    const { token } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (token) replace({ stack: 'MenuStack' });
    }, [token]);

    return <Screen />;
};

export default RememberPasswordScreen;
