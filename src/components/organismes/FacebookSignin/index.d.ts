import { ReactElement } from "react";

export interface FacebookSigninButtonProps {
    onSuccess: (accessToken: string | null) => void,
    render: ReactElement;
}

declare const FacebookSigninButton: React.FC<FacebookSigninButtonProps>;
declare const facebookSignOut: () => void;

export {
    FacebookSigninButton,
    facebookSignOut
};