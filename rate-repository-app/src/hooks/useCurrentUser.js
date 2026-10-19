import { useQuery } from '@apollo/client/react';

import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { user: data?.me, loading, refetch };
};
export default useCurrentUser;