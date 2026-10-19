import { FlatList } from 'react-native';
import { Link } from 'react-router-native';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositoryListFilter from './RepositoryListFilter';
import ItemSeparator from '../utils/ItemSeparator';


// Container for the list of repositories, with filters
export const RepositoryListContainer = ({ onEndReached, orderBy, orderDirection, onFilterChange, onSearchChange, repositories, searchKeyword }) => {

  return (
    <FlatList
      data={repositories?.edges?.map((edge) => edge.node) || []}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
      <Link to={`/repositories/${item.id}`}>
        <RepositoryItem item={item} />
      </Link>
      )}
      ListHeaderComponent={
        <RepositoryListFilter
          orderBy={orderBy}
          orderDirection={orderDirection}
          onChange={onFilterChange}
          searchKeyword={searchKeyword}
          onSearchChange={onSearchChange}
        />
      }
    />
  );
};

// Component rendering the list of repositories
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories, fetchMore } = useRepositories({orderBy, orderDirection, searchKeyword, first: 5});

  const onFilterChange = ({ orderBy, orderDirection }) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      onEndReached={fetchMore}
      orderBy={orderBy}
      orderDirection={orderDirection}
      onFilterChange={onFilterChange}
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
    />
    );
};

export default RepositoryList;