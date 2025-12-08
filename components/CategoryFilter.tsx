import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Category } from '../types';
import { CATEGORIES } from './CategorySelector';

interface FilterProps {
    selectedCategory: Category | 'All';
    onSelect: (category: Category | 'All') => void;
}

export default function CategoryFilter({ selectedCategory, onSelect }: FilterProps) {
    const { colors } = useTheme();
    const allCategories: (Category | 'All')[] = ['All', ...CATEGORIES];

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {allCategories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.tab,
                            {
                                borderBottomColor: selectedCategory === cat ? colors.primary : 'transparent',
                            }
                        ]}
                        onPress={() => onSelect(cat)}
                    >
                        <Text style={[
                            styles.tabText,
                            {
                                color: selectedCategory === cat ? colors.primary : colors.text,
                                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                            }
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
        marginBottom: 10,
    },
    scrollContent: {
        paddingHorizontal: 0,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 3,
        marginRight: 5,
    },
    tabText: {
        fontSize: 16,
    },
});
