import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout, useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import SmartText from './SmartText';
import { useTheme } from '../context/ThemeContext';
import dayjs from 'dayjs';

const TodoItem = React.memo(({ item, pressHandler, deleteHandler, editHandler }) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  console.log(`Rendering TodoItem: ${item.id}`);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
    pressHandler(item.id);
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
      style={[
        styles.itemContainer,
        { backgroundColor: colors.card, shadowColor: colors.text },
        animatedStyle
      ]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.itemTextContainer}>
        <View style={[styles.checkbox, { borderColor: colors.primary }, item.completed && { backgroundColor: colors.primary }]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.textWrapper}>
          <SmartText
            style={[
              styles.itemText,
              { color: colors.text },
              item.completed && styles.itemTextChecked
            ]}
            text={item.text}
          />
          <View style={styles.detailsRow}>
            {item.category && (
              <View style={[styles.categoryBadge, { borderColor: colors.border }]}>
                <Text style={[styles.categoryText, { color: colors.text }]}>{item.category}</Text>
              </View>
            )}
            <Text style={[styles.dateText, { color: colors.text }]}>
              {dayjs(item.createdAt).format('MMM D, h:mm A')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={editHandler} style={styles.actionButton}>
          <Text style={styles.actionText}>✎</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteHandler(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    marginTop: 16,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
  textWrapper: {
    marginLeft: 15,
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  categoryBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  actionButton: {
    padding: 5,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 20,
    color: '#4A90E2',
  },
});
