import { List } from 'react-native-paper';
import Typography from '../atoms/Typography';
import Colors from '../../colors/Colors';
import SvgIcon from '../atoms/SvgIcon';
import { Platform, View } from 'react-native';
import { isString } from 'lodash';
import { useEffect, useState } from 'react';

type AccordionProps = {
  initialExpanded?: boolean,
} & React.ComponentProps<typeof List.Accordion>;

const Accordion: React.FC<AccordionProps> = ({ initialExpanded, title, children, style, ...props }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (initialExpanded) {
      setExpanded(initialExpanded);
    };
  }, [initialExpanded]);

  return (
    <List.Accordion
      onPress={() => setExpanded(prev => !prev)}
      expanded={expanded}
      title={isString(title) ? <Typography variant='h5'>{title}</Typography> : title}
      style={[{ backgroundColor: Colors.Basic100, height: 58, paddingRight: 19, paddingLeft: 2, justifyContent: 'center' }, style]}
      titleStyle={{}}
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
