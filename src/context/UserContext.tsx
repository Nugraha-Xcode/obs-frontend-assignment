import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import type { ReactNode } from 'react';
import type { User, UserFormData, UserContextType } from '../types';
import { userService } from '../services/user.service';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('view');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userService.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      ...userData,
      salary: userData.salary ? parseFloat(userData.salary) : undefined,
      address: {
        ...userData.address,
        geo: { lat: '0', lng: '0' },
      },
      avatar: `https://picsum.photos/seed/${Date.now()}/200/200`,
    };
    setUsers([newUser, ...users]);
    closeModal();
  };

  const updateUser = (id: number, userData: UserFormData) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              ...userData,
              salary: userData.salary ? parseFloat(userData.salary) : undefined,
              address: {
                ...userData.address,
                geo: user.address.geo,
              },
            }
          : user
      )
    );
    closeModal();
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  const selectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  const openModal = (mode: 'add' | 'edit' | 'view', user?: User) => {
    setModalMode(mode);
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const value: UserContextType = {
    users,
    loading,
    error,
    selectedUser,
    isModalOpen,
    modalMode,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    selectUser,
    openModal,
    closeModal,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};