import { Text, TextInput, View } from 'react-native';
import styles from './styles';

interface FieldProps {
    label: string;
    value: string;
    editable?: boolean;
    multiline?: boolean;
    error?: string;
    placeholder: string;
    onChange: (text: string) => void;
}

export default function Field({
    label,
    value,
    editable = true,
    multiline = false,
    error,
    placeholder,
    onChange,
}: FieldProps) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    !editable && styles.inputDisabled,
                    multiline && styles.inputMultiline,
                    error && styles.inputError,
                ]}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                editable={editable}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}