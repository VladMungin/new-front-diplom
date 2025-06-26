import { atom } from 'jotai';
import { User } from './_types';
import { atomWithStorage } from 'jotai/utils'
import {Role} from "@/entities/task";

export const userStore = atom<null | User>(null);
export const adminStore = atom<null | string>(null)
export const companyStore = atom<null | string>(null)
export const roleStore = atom<null | Role>(null)

export const userColumnOrderStore = atomWithStorage<null | string[]>('employeesTableColumnOrder', [])
