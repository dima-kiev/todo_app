import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AddTodo({ submitHandler }) {
    const [text, setText] = useState('');
    const { colors } = useTheme();

    const changeHandler = (val) => {
        setText(val);
    };

    const handlePress = () => {
        submitHandler(text);
        setText('');
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder='Add new task...'
                placeholderTextColor={colors.text + '80'} // Adding transparency
                onChangeText={changeHandler}
                value={text}
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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: -2,
    }
});
