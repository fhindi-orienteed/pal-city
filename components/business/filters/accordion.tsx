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
    const renderTitleValue = () => {
        let title = '';
        if (typeof value === 'string') {
            title = value;
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                title = "All";
            } else {
                title = value.slice(0, 2).join(', ');
                if (value.length > 2) {
                    title += ' + ' + (value.length - 2);
                }
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
                <View style={styles.accordionHeaderTitleContainer}>
                    <ThemedText style={styles.accordionHeaderTitle}>{section}:</ThemedText>
                    <ThemedText style={styles.accordionHeaderValue}>{renderTitleValue()}</ThemedText>
                </View>
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
