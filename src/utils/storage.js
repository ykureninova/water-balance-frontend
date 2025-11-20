// src/utils/storage.js
const STORAGE_KEYS = {
  USERS: "hydra_users",
  CURRENT_USER: "hydra_current_user",
  DRINKS: "hydra_drinks_v2", // нова версія ключа, щоб не ламати старі дані
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
  const allDrinks = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRINKS) || "[]");
  
  // Повертаємо ТІЛЬКИ напої поточного користувача
  return user ? allDrinks.filter(d => d.userId === user.id) : [];
};

// === НАПОЇ === тепер з userId!
export const addDrink = (drink) => {
  const user = getUser();
  if (!user) return;

  const drinks = getDrinks();
  drinks.push({
    ...drink,
    userId: user.id, // головне!
  });
  localStorage.setItem(STORAGE_KEYS.DRINKS, JSON.stringify(drinks));
};

// Прогрес за сьогодні тільки для поточного користувача
export const getTodayProgress = () => {
  const drinks = getDrinks();
  const today = new Date().toISOString().slice(0, 10);

  return drinks
    .filter(d => d.date && d.date.startsWith(today))
    .reduce((sum, d) => sum + d.amount, 0);
};

export const getNorm = () => {
  const user = getUser();
  return user?.dailyGoal || 2000;
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
