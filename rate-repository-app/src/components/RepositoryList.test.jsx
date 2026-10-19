import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from './RepositoryListContainer';
import { NativeRouter } from 'react-router-native';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: () => <View testID="mock-icon" />,
  };
});

// TEST: Valid display of repositories
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
    const repositories = {
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
        },
      ],
    };

      render(
        <NativeRouter>
          <RepositoryListContainer 
            repositories={repositories} 
            orderBy="CREATED_AT"
            orderDirection="DESC"
            onFilterChange={() => {}}
            searchKeyword=""
            onSearchChange={() =>  {}}          
          />
        </NativeRouter>
      );

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(within(firstRepositoryItem).getByTestId('fullName')).toHaveTextContent('jaredpalmer/formik');
      expect(within(firstRepositoryItem).getByTestId('description')).toHaveTextContent('Build forms in React, without the tears');
      expect(within(firstRepositoryItem).getByTestId('language')).toHaveTextContent('TypeScript');
      expect(within(firstRepositoryItem).getByTestId('forks')).toHaveTextContent('1.6kForks');
      expect(within(firstRepositoryItem).getByTestId('stars')).toHaveTextContent('21.9kStars');
      expect(within(firstRepositoryItem).getByTestId('rating')).toHaveTextContent('88Rating');
      expect(within(firstRepositoryItem).getByTestId('reviews')).toHaveTextContent('3Reviews');

      expect(within(secondRepositoryItem).getByTestId('fullName')).toHaveTextContent('async-library/react-async');
      expect(within(secondRepositoryItem).getByTestId('description')).toHaveTextContent('Flexible promise-based React data loader');
      expect(within(secondRepositoryItem).getByTestId('language')).toHaveTextContent('JavaScript');
      expect(within(secondRepositoryItem).getByTestId('forks')).toHaveTextContent('69Forks');
      expect(within(secondRepositoryItem).getByTestId('stars')).toHaveTextContent('1.8kStars');
      expect(within(secondRepositoryItem).getByTestId('rating')).toHaveTextContent('72Rating');
      expect(within(secondRepositoryItem).getByTestId('reviews')).toHaveTextContent('3Reviews');
    });
  });
});