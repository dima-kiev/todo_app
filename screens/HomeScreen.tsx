import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useTodo } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

export default function HomeScreen() {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <AddTodo submitHandler={addTodo} />
                <View style={styles.list}>
                    <FlatList
                        data={todos}
                        renderItem={({ item }) => (
                            <TodoItem
                                item={item}
                                pressHandler={toggleTodo}
                                deleteHandler={deleteTodo}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 40,
        flex: 1,
    },
    list: {
        marginTop: 20,
        flex: 1,
    },
});
