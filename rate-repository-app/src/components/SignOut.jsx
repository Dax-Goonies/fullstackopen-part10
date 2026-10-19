import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client/react';

import useAuthStorage from '../hooks/useAuthStorage';


// Sign out component: Logging out removes auth
const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      navigate('/');

      try {
        await apolloClient.resetStore();
      } catch (e) {
        console.log(e);
      }
    };
    signOut();
  }, [authStorage, apolloClient, navigate]);

  return null;
};

export default SignOut;