import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, removeTodo, toggleTodo } from '../store/todoSlice';
import { useTheme } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

export default function HomeScreen() {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const handleAddTodo = (text: string) => {
        dispatch(addTodo(text));
    };

    const handleToggleTodo = (id: string) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(removeTodo(id));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <AddTodo submitHandler={handleAddTodo} />
                <View style={styles.list}>
                    <FlatList
                        data={todos}
                        renderItem={({ item }) => (
                            <TodoItem
                                item={item}
                                pressHandler={handleToggleTodo}
                                deleteHandler={handleDeleteTodo}
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
