import { useEffect, useState, useCallback } from "react";

export type Expert = {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  bio: string;
  contact: string;
  contactType: "email" | "whatsapp" | "booking";
  available: boolean;
};

const KEY = "crowncare_experts_v2";

const seed: Expert[] = [];

const read = (): Expert[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    return JSON.parse(raw);
  } catch {
    return seed;
  }
};

const write = (list: Expert[]) => {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("crowncare-experts-updated"));
};

export const useExperts = () => {
  const [experts, setExperts] = useState<Expert[]>(() => read());

  useEffect(() => {
    const sync = () => setExperts(read());
    window.addEventListener("crowncare-experts-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("crowncare-experts-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((e: Omit<Expert, "id">) => {
    const next = [...read(), { ...e, id: Date.now().toString() }];
    write(next);
  }, []);

  const update = useCallback((id: string, patch: Partial<Expert>) => {
    const next = read().map((e) => (e.id === id ? { ...e, ...patch } : e));
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((e) => e.id !== id));
  }, []);

  return { experts, add, update, remove };
};

// Admin auth (simple password gate, localStorage)
const ADMIN_KEY = "crowncare_admin_session";
const ADMIN_PASSWORD = "crown2025"; // platform owner password

export const isAdmin = () => localStorage.getItem(ADMIN_KEY) === "true";

export const loginAdmin = (password: string) => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "true");
    window.dispatchEvent(new CustomEvent("crowncare-admin-changed"));
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_KEY);
  window.dispatchEvent(new CustomEvent("crowncare-admin-changed"));
};

export const useIsAdmin = () => {
  const [admin, setAdmin] = useState(isAdmin());
  useEffect(() => {
    const sync = () => setAdmin(isAdmin());
    window.addEventListener("crowncare-admin-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("crowncare-admin-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return admin;
};
