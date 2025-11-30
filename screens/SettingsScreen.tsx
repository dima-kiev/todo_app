import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
    const { theme, setTheme, colors } = useTheme();

    const renderOption = (value: 'light' | 'dark' | 'system', label: string) => (
        <TouchableOpacity
            style={[
                styles.option,
                {
                    backgroundColor: theme === value ? colors.primary : colors.card,
                    borderColor: colors.border,
                },
            ]}
            onPress={() => setTheme(value)}
        >
            <Text
                style={[
                    styles.optionText,
                    { color: theme === value ? '#FFFFFF' : colors.text },
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>
            <View style={styles.optionsContainer}>
                {renderOption('light', 'Light Theme')}
                {renderOption('dark', 'Dark Theme')}
                {renderOption('system', 'System Default')}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionsContainer: {
        gap: 12,
    },
    option: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SettingsScreen;
