export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  isModalOpen: boolean;
  modalMode: 'add' | 'edit' | 'view';
  fetchUsers: () => Promise<void>;
  addUser: (user: UserFormData) => void;
  updateUser: (id: number, user: UserFormData) => void;
  deleteUser: (id: number) => void;
  selectUser: (user: User | null) => void;
  openModal: (mode: 'add' | 'edit' | 'view', user?: User) => void;
  closeModal: () => void;
}

import type { User, UserFormData } from './user.types';