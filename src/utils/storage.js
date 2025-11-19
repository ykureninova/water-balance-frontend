// src/utils/storage.js
export const STORAGE_KEYS = {
  USER: "water_user",
  DRINKS: "water_drinks", // масив всіх порцій
  NORM: "water_norm",
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearUser = () => {
  const user = getUser();
  if (user) {
    const key = `drinks_${user.username || user.email}`;
    localStorage.removeItem(key);
  }
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.NORM);
};

export const getDrinks = () => {
  const user = getUser();
  if (!user) return [];
  const key = `drinks_${user.username || user.email}`;
  const drinks = localStorage.getItem(key);
  return drinks ? JSON.parse(drinks) : [];
};

export const addDrink = (drink) => {
  const user = getUser();
  if (!user) return;

  const key = `drinks_${user.username || user.email}`;
  const drinks = getDrinks();
  drinks.push({ ...drink, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(drinks));
};

export const getTodayProgress = () => {
  const drinks = getDrinks();
  const today = new Date().toISOString().slice(0, 10);
  return drinks
    .filter(d => d.date.startsWith(today))
    .reduce((sum, d) => sum + d.amount, 0);
};

export const getNorm = () => {
  const norm = localStorage.getItem(STORAGE_KEYS.NORM);
  return norm ? parseInt(norm) : 2000; // дефолт 2000 мл
};

export const setNorm = (norm) => {
  localStorage.setItem(STORAGE_KEYS.NORM, norm);
};

export const updateUser = (updatedData) => {
  const user = getUser();
  if (!user) return;
  const newUser = { ...user, ...updatedData };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  const user = getUser();
  if (user) {
    const drinksKey = `drinks_${user.username || user.email}`;
    // Опціонально: можна видаляти напої при логауті, або залишати 
    // localStorage.removeItem(drinksKey);
  }
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.NORM);
};
