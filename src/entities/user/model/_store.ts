import { atom } from 'jotai';
import { User } from './_types';

export const userStore = atom<null | User>(null);
export const adminStore = atom<null | string>(null)