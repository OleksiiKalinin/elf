import { List } from 'react-native-paper';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import { Platform } from 'react-native';
import { isString } from 'lodash';

type AccordionProps = React.ComponentProps<typeof List.Accordion>;

const Accordion: React.FC<AccordionProps> = ({ title, children, style, ...props }) => {

  return (
    <List.Accordion
      title={isString(title) ? <Typography variant='h5'>{title}</Typography> : title}
      style={[{ backgroundColor: Colors.Basic100, height: 58, paddingRight: 19, paddingLeft: 2 }, style]}
      right={({ isExpanded }) => (
        <SvgIcon
          icon="arrowRightSmall"
          style={
            Platform.OS === 'web'
              ? {
                transform: isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)',
              }
              : {
                transform: isExpanded
                  ? [{ rotate: '-90deg' }]
                  : [{ rotate: '90deg' }],
              }
          }
        />
      )}
      {...props}
    >
      {children}
    </List.Accordion>
  );
};

export default Accordion;
