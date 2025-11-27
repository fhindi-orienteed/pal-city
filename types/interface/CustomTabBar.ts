import { Ionicons } from "@expo/vector-icons";

export interface TabRoute {
    key: string;
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
}


export interface MoreMenuItem {
    key: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    route?: string;
    action?: () => void;
}