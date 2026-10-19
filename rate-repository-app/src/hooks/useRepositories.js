import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first = 5 } = {}) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data?.repositories;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
 
    if (!canFetchMore) return;
    
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    });
  };

  return { repositories, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;