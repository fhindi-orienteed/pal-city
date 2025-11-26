import { RatingOption, SortOption } from "./types";

export const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: 'rating', label: 'Highest Rated', icon: 'star.fill' },
    { value: 'name', label: 'Name (A-Z)', icon: 'textformat.abc' },
    { value: 'newest', label: 'Newest First', icon: 'clock.fill' },
];

export const ratingOptions: { value: RatingOption; label: string; icon: string }[] = [
    { value: 'all', label: 'All Ratings', icon: 'star' },
    { value: '4+', label: '4+ Stars', icon: 'star.fill' },
    { value: '3+', label: '3+ Stars', icon: 'star.leadinghalf.filled' },
];

export const defaultExpandedSections = {
    sortBy: false,
    rating: false,
    category: false,
};

export const sections = ['sortBy', 'rating', 'category'];
