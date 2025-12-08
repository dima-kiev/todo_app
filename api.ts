export const fetchPhrase = async (key: string): Promise<string> => {
    try {
        // Extract the ID from the key (e.g., "key1" -> "1")
        const id = key.replace('key', '');
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.title;
    } catch (error) {
        console.error('Error fetching phrase:', error);
        return key; // Return original key on error
    }
};
