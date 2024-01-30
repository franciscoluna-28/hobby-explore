import {
  ACTIVITIES_CATEGORIES,
  ExistingActivityCategories,
} from "@/constants/activities/categories";

const DEFAULT_CATEGORY: ExistingActivityCategories = "Chess";

export function getCategoryNameById(
  id: number | null
): ExistingActivityCategories {
  const categoryName = Object.keys(ACTIVITIES_CATEGORIES).find(
    (key) => ACTIVITIES_CATEGORIES[key as ExistingActivityCategories] === id
  );
  return categoryName
    ? (categoryName as ExistingActivityCategories)
    : DEFAULT_CATEGORY;
}

const DEFAULT_CATEGORY_ID: number = 1;

export function getCategoryIdByName(
  name: ExistingActivityCategories
): number | null {
  return ACTIVITIES_CATEGORIES[name] || DEFAULT_CATEGORY_ID;
}
