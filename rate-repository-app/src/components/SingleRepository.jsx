import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { FlatList, StyleSheet, View } from 'react-native';

import { GET_REPO } from '../graphql/queries';
import ItemSeparator from '../utils/ItemSeparator';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Display of a single repository
const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPO, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return null;
  if (!data) return null;

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <FlatList 
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item ) => item.id}
        ListHeaderComponent={() => <RepositoryItem item={data.repository} showGithubButton />}
      />
    </View>
  )
};

export default SingleRepository;