import { Alert, Platform, Pressable, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import AppText from './AppText';
import theme from '../../theme';
import { commonStyles } from '../styles/common';

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 15,
    backgroundColor: theme.colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  topRow: {
    flexDirection: 'row',
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  info: {
    flexShrink: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
  },
  date: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  text: {
    marginTop: 6,
  },
  buttonRow:{
    flexDirection: 'row',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    marginLeft: 10,
  },
  redirectButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.white
  },
});

// Format the review date
const formatDate = (dateString) => {
  return format(new Date(dateString), 'd MMM yyyy');
};

// Review component
const ReviewItem = ({ review, showRepositoryName, showActions, onDelete }) => {
  const navigate = useNavigate();

  const confirmDelete = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this review?')) {
        onDelete(id);
      }
    } else {
      console.log('confirmDelete called with', id);
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
        ]
      );
    }
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{review.rating}</AppText>
        </View>
        <View style={styles.info}>
          <AppText style={styles.username}>
            {showRepositoryName ? review.repository.fullName : review.user.username}
          </AppText>
          <AppText style={styles.date}>{formatDate(review.createdAt)}</AppText>
          <AppText style={styles.text}>{review.text}</AppText>
        </View>
      </View>
      {showActions && (
          <View style={styles.buttonRow}>
            <Pressable style={[commonStyles.button, styles.redirectButton]} onPress={() => navigate(`/repositories/${review.repositoryId}`)}>
              <AppText style={styles.buttonText}>View repository</AppText>
            </Pressable>
            <Pressable style={[commonStyles.button, styles.deleteButton]} onPress={() => confirmDelete(review.id)}>
              <AppText style={styles.buttonText}>Delete review</AppText>
            </Pressable>
          </View>
        )}
    </View>
  );
};

export default ReviewItem;