import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Section } from './types';

interface Props {
    expanded: boolean;
    toggleSection: (section: Section) => void;
    children: React.ReactNode;
    section: Section;
    value: string | string[];
}

export default function Accordion({ expanded, toggleSection, children, section, value }: Props) {
    const renderTitle = () => {
        let title = section;
        if (typeof value === 'string') {
            title = title + ": " + value;
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                title = title + ": " + "All";
            } else {
                title = title + ": " + value.join(', ');
            }
        }
        return title;
    }

    return (
        <View style={styles.section}>
            <TouchableOpacity
                style={styles.accordionHeaderContainer}
                onPress={() => toggleSection(section)}
            >
                <ThemedText style={styles.accordionHeaderTitle}>{renderTitle()}</ThemedText>
                <IconSymbol
                    name={expanded ? "chevron.up" : "chevron.down"}
                    size={20}
                    color="#666"
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.accordionContentContainer}>
                    {children}
                </View>
            )}
        </View>

    );
}
