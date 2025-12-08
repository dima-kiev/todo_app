import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout, useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import SmartText from './SmartText';
import { useTheme } from '../context/ThemeContext';

const TodoItem = React.memo(({ item, pressHandler, deleteHandler }) => {
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
        <SmartText
          style={[
            styles.itemText,
            { color: colors.text },
            item.completed && styles.itemTextChecked
          ]}
          text={item.text}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteHandler(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
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
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '500',
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
});
