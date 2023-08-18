import React, { ComponentProps, FC } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import Colors from '../../colors/Colors';


type SwitchProps = {
    // label?: string,
} & ComponentProps<typeof ToggleSwitch>;

const Switch: FC<SwitchProps> = ({...props}) => {
    return (
        <ToggleSwitch
            onColor={props.offColor || props.disabled ? Colors.Basic600 : Colors.Basic900}
            offColor={props.offColor || Colors.Basic400}
            animationSpeed={props.animationSpeed || 200}
            {...props} 
        />
    );
};

export default Switch;