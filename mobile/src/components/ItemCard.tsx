import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Item } from '../types/Item';
import { COLORS } from '../constants/colors';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{item.text}</Text>
        {item.category && (
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}
      </View>
      <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
    </View>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'Work': COLORS.redDeep,
    'Personal': COLORS.redMedium,
    'Learning': COLORS.redLight,
  };
  return colors[category] || COLORS.redVeryLight;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cleanWhite,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.redVeryLight,
    boxShadow: '0 1px 2px rgba(239, 68, 68, 0.08)',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.grayDark,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  date: {
    fontSize: 14,
    color: COLORS.grayMedium,
  },
});

export default ItemCard; 