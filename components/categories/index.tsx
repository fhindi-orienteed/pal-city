import { useTranslation } from "@/hooks/useTranslation";
import { CategoryService } from "@/services/categoryService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import CategoriesCard from "./card";
import styles from "./styles";

interface ICategory {
  id: number;
  status: string;
  title: string;
  thumbnail: string;
  totalItems: number;
  sequence: number;
}

interface IGroup {
  id: number;
  title: string;
  status: string;
  totalItems: number;
  categories: ICategory[];
}

export default function Categories() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await CategoryService.getCategories();
        const filteredGroups = response.groups
        .filter((group: any) => group.status === "active").map((group: any) => ({
          ...group,
          categories: group.categories.filter((cat: any) => cat.status === "active"),
        }));

        setGroups(filteredGroups);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#009736" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
    {groups.map((group) => (
      <View key={group.id} style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{group.title}</Text>
      
        <View style={styles.gridContainer}>
          {group.categories.map((category) => (
            <CategoriesCard key={category.id} 
            category={{
              id:category.id.toString(),
              name:category.title,
              thumbnail:category.thumbnail.replace('icon:','')
            }} />
          ))}
        </View>
      </View>
    ))}
    </View>
  );
}
