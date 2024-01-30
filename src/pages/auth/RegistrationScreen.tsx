import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Screen from "../../screens/AuthScreens/RegistrationScreen";
import useRouter from "../../hooks/useRouter";

const RegistrationScreen = () => {
    const { userData } = useTypedSelector(s => s.general);
    const { replace } = useRouter();

    useEffect(() => {
        if (userData) replace({ stack: 'MenuStack' });
    }, [userData]);

    return <Screen />;
};

export default RegistrationScreen;
