import { Category } from "../model/Category";

const API_URL = "https://YOUR_API_URL/categories"; // change later

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
