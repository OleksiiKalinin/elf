import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/RememberPasswordScreen";
import useRouter from "../../hooks/useRouter";

const RememberPasswordScreen = () => {
    const { userData } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (userData) replace({ stack: 'MenuStack' });
    }, [userData]);

    return <Screen />;
};

export default RememberPasswordScreen;
