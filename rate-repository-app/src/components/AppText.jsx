import { Text } from 'react-native';

import theme from '../../theme';


// Wrapper component applying fonts internally
const AppText = ({ style, ...props }) => {
  return <Text style={[{ fontFamily: theme.fonts.main }, style]} {...props} />
};

export default AppText;