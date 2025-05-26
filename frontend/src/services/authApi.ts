import api from "./api";
import { extractErrorMessage } from '../utils/error';

export async function login(userId: string, password: string) {
  try {
    const res = await api.post("/auth/login", { userId, password });
    return res.data;
  } catch (err) {
    throw extractErrorMessage(err);
  }
}

export async function join(userId: string, password: string) {
  try {
    const res = await api.post("/auth/join", { userId, password });
    return res.data;
  } catch (err: any) {
    throw extractErrorMessage(err);
  }
} 