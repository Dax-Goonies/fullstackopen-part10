import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import AppText from './AppText';
import { commonStyles } from '../styles/common';
import theme from '../../theme';

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
  },
  info: {
    marginLeft: 15,
    flexShrink: 1,
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 3,
  },
  description: {
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
  },
  count: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
  },
  label: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 4,
    padding: 7,
    textAlign: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.medium,
  },
});

// Formating the count (ex: 2700 -> 2.7K)
const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString();
};

// Generic element
const StatItem = ({ count, label, testID }) => (
  <View testID={testID} style={styles.statItem}>
    <AppText style={styles.count}>{formatCount(count)}</AppText>
    <AppText style={styles.label}>{label}</AppText>
  </View>
);

// Repository information rendered with link to GitHub
const RepositoryItem = ({ item, showGithubButton }) => {
  return (
    <View testID="repositoryItem" style={commonStyles.container}>
      <View style={styles.topRow}>
        <Image 
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 48, height: 48, borderRadius: 7 }}
        />
        <View style={styles.info}>
          <AppText testID="fullName" style={styles.fullName}>{item.fullName}</AppText>
          <AppText testID="description" style={styles.description}>{item.description}</AppText>
          <AppText testID="language" style={styles.language}>{item.language}</AppText>
      </View>
      </View>
      <View style={styles.bottomRow}>
        <StatItem testID="stars" count={item.stargazersCount} label="Stars" />
        <StatItem testID="forks" count={item.forksCount} label="Forks" />
        <StatItem testID="reviews" count={item.reviewCount} label="Reviews" />
        <StatItem testID="rating" count={item.ratingAverage} label="Rating" />
      </View>
      {showGithubButton && (
        <Pressable onPress={() => Linking.openURL(item.url)} style={styles.button}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;