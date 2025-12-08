import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Category } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CategorySelectorProps {
    categories: Category[];
    selectedCategory: Category;
    onSelect: (category: Category) => void;
}

export const CATEGORIES: Category[] = ['Work', 'Personal', 'Shopping', 'Health'];

export default function CategorySelector({ categories = CATEGORIES, selectedCategory, onSelect }: CategorySelectorProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: selectedCategory === cat ? colors.primary : colors.card,
                                borderColor: colors.border,
                                borderWidth: 1
                            }
                        ]}
                        onPress={() => onSelect(cat)}
                    >
                        <Text style={[
                            styles.chipText,
                            { color: selectedCategory === cat ? '#fff' : colors.text }
                        ]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    scrollContent: {
        alignItems: 'center',
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        elevation: 2,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
