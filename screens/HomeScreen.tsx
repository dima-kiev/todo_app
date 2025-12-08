import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, removeTodo, toggleTodo, editTodo } from '../store/todoSlice';
import { useTheme } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import CategoryFilter from '../components/CategoryFilter';
import EditTodoModal from '../components/EditTodoModal';
import { Category, Todo } from '../types';

export default function HomeScreen() {
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const [filter, setFilter] = React.useState<Category | 'All'>('All');
    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
    const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);

    const filteredTodos = React.useMemo(() => {
        if (filter === 'All') return todos;
        return todos.filter(t => t.category === filter);
    }, [todos, filter]);

    const handleAddTodo = useCallback((text: string, category: Category) => {
        dispatch(addTodo({ text, category }));
    }, [dispatch]);

    const handleToggleTodo = useCallback((id: string) => {
        dispatch(toggleTodo(id));
    }, [dispatch]);

    const handleDeleteTodo = useCallback((id: string) => {
        dispatch(removeTodo(id));
    }, [dispatch]);

    const handleEditStart = useCallback((todo: Todo) => {
        setEditingTodo(todo);
        setIsEditModalVisible(true);
    }, []);

    const handleEditSave = useCallback((id: string, newText: string, newCategory: Category) => {
        dispatch(editTodo({ id, text: newText, category: newCategory }));
    }, [dispatch]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <CategoryFilter selectedCategory={filter} onSelect={setFilter} />
                <AddTodo submitHandler={handleAddTodo} />
                <View style={styles.list}>
                    <FlatList
                        data={filteredTodos}
                        renderItem={({ item }) => (
                            <TodoItem
                                item={item}
                                pressHandler={handleToggleTodo}
                                deleteHandler={handleDeleteTodo}
                                editHandler={() => handleEditStart(item)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>

            <EditTodoModal
                visible={isEditModalVisible}
                todo={editingTodo}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleEditSave}
            />
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
