import {List} from 'react-native-paper';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {isString} from 'lodash';

type AccordionProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
} & React.ComponentProps<typeof List.Accordion>;

const Accordion: React.FC<AccordionProps> = ({
  title,
  right = props => (
    <SvgIcon
      icon="arrowRightSmall"
      style={
        Platform.OS === 'web'
          ? {
              transform: props.isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)',
            }
          : {
              transform: props.isExpanded
                ? [{rotate: '-90deg'}]
                : [{rotate: '90deg'}],
            }
      }
    />
  ),
  children,
  style = {backgroundColor: Colors.Basic100, height: 58, paddingRight: 19},
  ...props
}) => {
  return (
    <List.Accordion
      title={
        isString(title) ? <Typography size={16}>{title}</Typography> : title
      }
      right={right}
      style={style}
      {...props}>
      {children}
    </List.Accordion>
  );
};

export default Accordion;
