import { useTranslation } from "@/hooks/useTranslation";
import { CategoryService } from "@/services/categoryService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import CategoriesCard from "./card";
import styles from "./styles";

interface IExploreCategory {
  id: string;
  group: string;
  status: string;
  name: string;
  thumbnail: string;
  totalItems: number;
  sequence: number;
}

export default function Categories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await CategoryService.getCategories();
        const mappedData = data.map((item: any) => ({
          id: item.id?.toString(),
          group: item.group,
          status: item.status,
          name: item.name,
          thumbnail: item.thumbnail || "apps-outline",
          totalItems: item.totalItems || 0,
          sequence: item.sequence || 0,
        }));

        setCategories(mappedData);
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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{"categories"}</Text>
        <View style={styles.gridContainer}>
          {categories.map((category) => (
            <CategoriesCard key={category.id} category={category} />
          ))}
        </View>
      </View>
    </View>
  );
}
