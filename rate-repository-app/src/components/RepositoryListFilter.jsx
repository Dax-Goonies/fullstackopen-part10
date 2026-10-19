import { useState } from 'react';
import { Modal, Pressable, FlatList, View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppText from './AppText';
import theme from '../../theme';

const styles = StyleSheet.create({
  search: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },  
  trigger: {
    padding: 15,
    backgroundColor: theme.colors.white,
    margin: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  menu: {
    backgroundColor: theme.colors.white,
    margin: 20,
    borderRadius: 4,
  },
  option: {
    padding: 15,
  },
  info: {
    padding: 15,
    color: theme.colors.textSecondary,
  },
});

// Filters
const options = [
  {label: "Latest repositories", value: "CREATED_AT:DESC"},
  {label: "Highest rated repositories", value: "RATING_AVERAGE:DESC"},
  {label: "Lowest rated repositories", value: "RATING_AVERAGE:ASC" },
];

// Component with modal for filtering repositories
const RepositoryListFilter = ({ orderBy, orderDirection, onChange, searchKeyword, onSearchChange }) => {
  const [visible, setVisible] = useState(false);

  const selectedValue = `${orderBy}:${orderDirection}`;
  const selectedLabel = options.find((o) => o.value === selectedValue)?.label;

  const handleSelect = (value) => {
    const [newOrderBy, newOrderDirection] = value.split(':');
    onChange({ orderBy: newOrderBy, orderDirection: newOrderDirection });
    setVisible(false);
  };

  return (
    <View>
      <View style={styles.search}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by repository or username"
          value={searchKeyword}
          onChangeText={onSearchChange}
        />
        {searchKeyword.length > 0 && (
          <Pressable onPress={() => onSearchChange('')}>
            <Ionicons name="close" size={20} color={theme.colors.textSecondary} />
          </Pressable>
        )}
      </View>
      <Pressable style={styles.trigger} onPress={() => setVisible(true)}>
        <AppText>{selectedLabel}</AppText>
        <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <AppText style={styles.info}>Select an item...</AppText>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable style={styles.option} onPress={() => handleSelect(item.value)}>
                  <AppText>{item.label}</AppText>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default RepositoryListFilter;