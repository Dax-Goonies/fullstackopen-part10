import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryListContainer';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import theme from '../../theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
});

// Main component with all the routes
const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;