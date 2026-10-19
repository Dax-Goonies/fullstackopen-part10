import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../../theme';


const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: 16,
    marginRight: 20,
  },
});

// Generic tab of the navigation bar, used in AppBar.jsx
const AppBarTab = ({ label, to }) => {
  return (
    <View>
      <Link to={to}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;