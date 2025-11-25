import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';

export default function App() {
    const [todos, setTodos] = useState([
        { text: 'Buy coffee', key: '1', completed: false },
        { text: 'Create an app', key: '2', completed: false },
        { text: 'Play on the switch', key: '3', completed: false },
    ]);

    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.map(todo =>
                todo.key === key ? { ...todo, completed: !todo.completed } : todo
            );
        });
    };

    const deleteHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
    };

    const submitHandler = (text) => {
        if (text.length > 3) {
            setTodos((prevTodos) => {
                return [
                    { text: text, key: Math.random().toString(), completed: false },
                    ...prevTodos
                ];
            });
        } else {
            Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ]);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Tasks</Text>
                    <Text style={styles.subtitle}>Stay organized, stay productive.</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.list}>
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} pressHandler={pressHandler} deleteHandler={deleteHandler} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.footer}>
                        <AddTodo submitHandler={submitHandler} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8', // Light blue-grey background
    },
    header: {
        height: 120,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#6C63FF', // Modern purple
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium', // Cleaner font on Android
    },
    subtitle: {
        color: '#E0E0E0',
        fontSize: 16,
        marginTop: 5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    list: {
        flex: 1,
        marginBottom: 20,
    },
    footer: {
        marginBottom: 20,
    }
});
