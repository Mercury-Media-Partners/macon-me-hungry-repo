export const categoryTranslations: Record<string, { en: string; es: string }> = {
  "Dive Bar": { en: "Dive Bar", es: "Bar de Copas" },
  "Dance Club": { en: "Dance Club", es: "Club de Baile" },
  "Drag Dinner Show": { en: "Drag Dinner Show", es: "Show Drag" },
  "Bear Bar": { en: "Bear Bar", es: "Bar Bear" },
  "Sports Bar": { en: "Sports Bar", es: "Bar Deportivo" },
  "Wine Bar": { en: "Wine Bar", es: "Bar de Vinos" },
  "Coffee Shop": { en: "Coffee Shop", es: "Cafetería" },
  "Bookstore": { en: "Bookstore", es: "Librería" },
  "Boutique": { en: "Boutique", es: "Tienda de Ropa" },
  "Gym & Training Studio": { en: "Gym & Training Studio", es: "Gimnasio" },
  "Barbershop": { en: "Barbershop", es: "Barbería" },
  "Real Estate Team": { en: "Real Estate Team", es: "Equipo Inmobiliario" },
  "Real Estate Agency": { en: "Real Estate Agency", es: "Agencia Inmobiliaria" },
  "Medical Clinic": { en: "Medical Clinic", es: "Clínica Médica" },
  "Theatre": { en: "Theatre", es: "Teatro" },
  "Park": { en: "Park", es: "Parque" }
};

export function getCategoryLabel(category: string, lang: string): string {
  const normalized = category.trim();
  const match = categoryTranslations[normalized];
  if (!match) return category;
  return lang === "es" ? match.es : match.en;
}
