import Screen from "../../screens/ProfileScreens/CompanyScreen";
import { useRouter } from 'next/router';
import { useState } from 'react';
import getUrlSearchParam from '../../hooks/getUrlSearchParam';

const CompanyScreen = () => {
    const { asPath } = useRouter();
    const [newProfile] = useState(getUrlSearchParam(asPath, 'newProfile') || undefined);

    return (
        <Screen newProfileInitial={newProfile} />
    );
};

export default CompanyScreen;
