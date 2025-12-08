import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CategorySelector from './CategorySelector';

export default function AddTodo({ submitHandler }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');
    const { colors } = useTheme();

    const changeHandler = (val) => {
        setText(val);
    };

    const handlePress = () => {
        if (text.trim().length > 3) {
            submitHandler(text, category);
            setText('');
            setCategory('Personal');
        } else {
            // Optional: Alert user if text is too short. 
            // Ideally we should use a proper alerting mechanism, keeping it simple for now or assuming HomeScreen handles validation logic if it was present.
            // Given the previous code didn't have validation in AddTodo (it just called submitHandler), we'll add a simple check.
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder='Add new task...'
                placeholderTextColor={colors.text + '80'}
                onChangeText={changeHandler}
                value={text}
            />
            <CategorySelector
                selectedCategory={category}
                onSelect={setCategory}
            />
            <TouchableOpacity
                onPress={handlePress}
                style={[styles.button, { backgroundColor: colors.primary }]}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 15,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: -2,
    }
});
