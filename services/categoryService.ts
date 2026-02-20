import { API_ENDPOINTS } from "@/config/apiConfig";
import { IGlobalProperties } from "@/types/interface/Common";
import { apiClient } from "./apiClient";

export class CategoryService {
    /**
     * Fetch categories list
     */
    public static async getCategories(): Promise<any> {
        try {
            const response = await apiClient.get<IGlobalProperties[]>(
                API_ENDPOINTS.CATEGORIES.LIST,
            );
    console.log("Categories Data:", response);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
}
