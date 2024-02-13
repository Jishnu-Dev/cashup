export const capitalize = (str) => {
  const capitalized = str
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  return capitalized;
};

export const createSlug = (word) => {
  const slug = word.toLowerCase().replace(/\s+/g, "-");
  const cleanSlug = slug.replace(/[^a-z0-9-]/g, "");
  return cleanSlug;
};
