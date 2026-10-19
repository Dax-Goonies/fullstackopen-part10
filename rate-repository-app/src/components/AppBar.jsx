import { useQuery } from '@apollo/client/react';
import { View, ScrollView, StyleSheet } from 'react-native';

import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import theme from '../../theme';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.textPrimary,
    paddingTop: 27,
    paddingBottom: 12,
    paddingHorizontal: 12
  },
});

// Navigation bar with every tab added here
const AppBar = () => {
  const { data } = useQuery(ME);
  const isSignedIn = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" to="/" />
        {isSignedIn && (
          <>
            <AppBarTab label="My reviews" to="/myreviews" />
            <AppBarTab label="Create a review" to="/review" />
          </>
        )}
        {isSignedIn
          ? <AppBarTab label="Sign out" to="/signout" />
          : (
            <>
              <AppBarTab label="Sign in" to="/signin" />
              <AppBarTab label="Sign up" to="/signup" />
            </>
          )

        }
      </ScrollView>
    </View>
  );
};

export default AppBar;