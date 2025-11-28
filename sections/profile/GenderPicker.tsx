import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const options = ['male', 'female'] as const;

const GenderPicker = ({ onChange }: { onChange: (gender: typeof options[number]) => void }) => {
    const { t } = useTranslation();
    const [gender, setGender] = useState<typeof options[number]>('male');

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{t('profile.gender')}</Text>
            <View style={styles.genderContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.genderButton,
                            gender === option && styles.genderButtonActive,
                        ]}
                        onPress={() => {
                            setGender(option);
                            onChange(option);
                        }}
                    >
                        <Text
                            style={[
                                styles.genderButtonText,
                                gender === option && styles.genderButtonTextActive,
                            ]}
                        >
                            {t(`profile.${option}`)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default GenderPicker;