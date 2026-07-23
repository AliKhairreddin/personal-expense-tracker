const CATEGORY_COLORS = [
  "#f97316",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#22c55e",
  "#0ea5e9",
  "#d97706",
];

const CATEGORY_ICONS = [
  { pattern: /food|dining|grocery|restaurant/i, icon: "🍔" },
  { pattern: /transport|gas|car|transit/i, icon: "🚗" },
  { pattern: /housing|rent|home|utilities/i, icon: "🏠" },
  { pattern: /entertainment|movie|game/i, icon: "🎬" },
  { pattern: /health|medical|fitness|gym/i, icon: "💊" },
  { pattern: /shopping|clothing/i, icon: "🛍️" },
  { pattern: /education|school|book/i, icon: "📚" },
  { pattern: /salary|income|pension|pay/i, icon: "💰" },
  { pattern: /travel|flight|hotel/i, icon: "✈️" },
];

export function withCategoryPresentation(category = {}) {
  const id = category.id ?? category.categoryId;
  const name = category.name ?? category.categoryName ?? "Uncategorized";
  const type = category.type ?? category.categoryType ?? "expense";
  const iconMatch = CATEGORY_ICONS.find(({ pattern }) => pattern.test(name));

  return {
    ...category,
    name,
    type,
    color: category.color || CATEGORY_COLORS[getColorIndex(id, name)],
    icon: category.icon || iconMatch?.icon || (type === "income" ? "💰" : "•"),
  };
}

function getColorIndex(id, name) {
  const numericId = Number(id);

  if (Number.isInteger(numericId) && numericId > 0) {
    return (numericId - 1) % CATEGORY_COLORS.length;
  }

  const hash = [...String(name)].reduce(
    (value, character) => value + character.codePointAt(0),
    0,
  );

  return hash % CATEGORY_COLORS.length;
}
