import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Modal, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Todo, Category } from '../types';
import CategorySelector, { CATEGORIES } from './CategorySelector';

interface EditTodoModalProps {
    visible: boolean;
    todo: Todo | null;
    onClose: () => void;
    onSave: (id: string, newText: string, newCategory: Category) => void;
}

export default function EditTodoModal({ visible, todo, onClose, onSave }: EditTodoModalProps) {
    const { colors } = useTheme();
    const [text, setText] = useState('');
    const [category, setCategory] = useState<Category>('Personal');

    useEffect(() => {
        if (todo) {
            setText(todo.text);
            setCategory(todo.category || 'Personal');
        }
    }, [todo]);

    const handleSave = () => {
        if (todo && text.trim()) {
            onSave(todo.id, text, category);
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <Text style={[styles.title, { color: colors.text }]}>Edit Task</Text>

                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                        value={text}
                        onChangeText={setText}
                        placeholder="Task description"
                        placeholderTextColor={colors.text + '80'}
                    />

                    <Text style={[styles.label, { color: colors.text }]}>Category:</Text>
                    <CategorySelector
                        categories={CATEGORIES}
                        selectedCategory={category}
                        onSelect={setCategory}
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: colors.primary }]}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#FF6B6B',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
