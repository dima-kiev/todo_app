import React, { useState, useEffect } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { fetchPhrase } from '../api';

interface SmartTextProps {
    text: string;
    style?: StyleProp<TextStyle>;
}

const SmartText: React.FC<SmartTextProps> = ({ text, style }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        const processText = async () => {
            const regex = /%key(\d+)%/g;
            let match;
            let newText = text;
            let hasMatches = false;

            // Find all matches first
            const matches: string[] = [];
            while ((match = regex.exec(text)) !== null) {
                matches.push(match[0]);
            }

            if (matches.length > 0) {
                hasMatches = true;
                // Process matches unique to avoid redundant calls
                const uniqueMatches = [...new Set(matches)];

                for (const keyPattern of uniqueMatches) {
                    // Extract "key1" from "%key1%"
                    const key = keyPattern.replace(/%/g, '');
                    const phrase = await fetchPhrase(key);
                    // Replace all occurrences of this pattern
                    newText = newText.split(keyPattern).join(phrase);
                }
            }

            if (hasMatches) {
                setDisplayText(newText);
            } else {
                setDisplayText(text);
            }
        };

        processText();
    }, [text]);

    return <Text style={style}>{displayText}</Text>;
};

export default SmartText;
