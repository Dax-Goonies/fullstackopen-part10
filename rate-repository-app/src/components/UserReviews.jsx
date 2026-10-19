import { FlatList, View } from 'react-native';
import { Link } from 'react-router-native';

import AppText from './AppText';
import ItemSeparator from '../utils/ItemSeparator';
import ReviewItem from './ReviewItem';


// List of user own reviws (default message if 0 review)
const UserReviews = ({ reviews, onDelete }) => {
  if (reviews.length === 0) {
    return (
      <View style={{ padding: 15 }}>
        <AppText>You have not reviewed any repositories yet.</AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repositories/${item.repositoryId}`}>
          <ReviewItem review={item} showRepositoryName showActions onDelete={onDelete} />
        </Link>
      )}
    />
  )
};

export default UserReviews;