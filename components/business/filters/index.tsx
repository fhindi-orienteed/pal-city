import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import CategoryFilter from './categoryFilter';
import { defaultExpandedSections } from './config';
import RatingFilter from './ratingFilter';
import SortBy from './sortBy';
import styles from './styles';
import { RatingOption, Section, SortOption } from './types';

interface Props {
    visible: boolean;
    onClose: () => void;
    selectedSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    selectedRating: RatingOption;
    onRatingChange: (rating: RatingOption) => void;
    categories: string[];
    selectedCategory: string[];
    onCategoryChange: (category: string[]) => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.75;

const SWIPE_THRESHOLD = 100; // Minimum swipe distance to close

export default function FilterBottomSheet({
    visible,
    onClose,
    selectedSort,
    onSortChange,
    selectedRating,
    onRatingChange,
    categories,
    selectedCategory,
    onCategoryChange,
}: Props) {
    const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
    const panY = useRef(0);

    // Accordion state - all sections expanded by default
    const [expandedSections, setExpandedSections] = useState(defaultExpandedSections);

    const toggleSection = (section: Section) => {
        setExpandedSections(prev => {
            // If the section is already open, close it
            if (prev[section]) {
                return {
                    ...prev,
                    [section]: false,
                };
            }
            // Otherwise, close all sections and open only the selected one
            return {
                sortBy: false,
                rating: false,
                category: false,
                [section]: true,
            };
        });
    };

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SHEET_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    // Pan responder for swipe-down-to-close
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only respond to vertical swipes (down)
                return Math.abs(gestureState.dy) > 5 && gestureState.dy > 0;
            },
            onPanResponderMove: (_, gestureState) => {
                // Only allow downward movement
                if (gestureState.dy > 0) {
                    panY.current = gestureState.dy;
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                // If swiped down more than threshold, close the sheet
                if (gestureState.dy > SWIPE_THRESHOLD) {
                    Animated.timing(slideAnim, {
                        toValue: SHEET_HEIGHT,
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => {
                        onClose();
                    });
                } else {
                    // Snap back to original position
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 65,
                        friction: 11,
                    }).start();
                }
                panY.current = 0;
            },
        })
    ).current;


    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* Backdrop */}
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                {/* Bottom Sheet */}
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Draggable Handle Area */}
                    <View {...panResponder.panHandlers} style={styles.draggableArea}>
                        {/* Handle Bar */}
                        <View style={styles.handleBar} />

                        {/* Header */}
                        <View style={styles.header}>
                            <ThemedText style={styles.headerTitle}>Filters</ThemedText>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <IconSymbol name="chevron.down" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {/* Sort By Section */}
                        <SortBy
                            selectedSort={selectedSort}
                            onSortChange={onSortChange}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                        />

                        {/* Rating Filter Section */}
                        <RatingFilter
                            selectedRating={selectedRating}
                            onRatingChange={onRatingChange}
                            expandedSections={expandedSections}
                            toggleSection={toggleSection}
                        />

                        {/* Category Filter Section */}
                        {categories.length > 0 && (
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={onCategoryChange}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                            />
                        )}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}
