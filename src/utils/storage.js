// src/utils/storage.js

const STORAGE_KEYS = {
  USER: "hydra_user",
  TOKEN: "hydra_token",
  NORM: "hydra_norm",
};

// ===== AUTH TOKEN =====

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN) || null;
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
};

export const clearToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// ===== USER =====

export const getUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return;
  }
  const normalized =
    user && user._id && !user.id ? { ...user, id: user._id } : user;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(normalized));
};

export const updateUser = (updatedData) => {
  const user = getUser();
  if (!user) return null;
  const newUser = { ...user, ...updatedData };
  setUser(newUser);
  return newUser;
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// ===== NORM (daily goal) =====

export const getNorm = () => {
  const user = getUser();
  if (user && typeof user.waterNorm === "number") {
    return user.waterNorm;
  }
  const stored = localStorage.getItem(STORAGE_KEYS.NORM);
  return stored ? Number(stored) : 2000;
};

export const setNorm = (norm) => {
  const value = Number(norm);
  if (!Number.isFinite(value)) return;

  localStorage.setItem(STORAGE_KEYS.NORM, String(value));

  const user = getUser();
  if (user) {
    setUser({ ...user, waterNorm: value });
  }
};

// ===== DRINKS (тепер все через бек; тут заглушки, щоб не ламати імпорти) =====

export const getDrinks = () => {
  return [];
};

export const addDrink = () => {
  // no-op, напої зберігаються в бекенді
};

export const getTodayProgress = () => {
  return 0;
};

// ===== LOGOUT =====

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.NORM);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};
