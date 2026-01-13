import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProvider, useUserContext } from '../context/UserContext';
import * as userService from '../services/user.service';
import type { ReactNode } from 'react';

const mockUsers = [
  {
    id: 1,
    name: 'Agil Nugraha',
    username: 'agilnugraha',
    email: 'nugrahaagil13@gmail.com',
    phone: '123-456-7890',
    website: 'agilnugraha.com',
    avatar: 'https://picsum.photos/seed/1/200/200',
    address: {
      street: 'Jalan Komplek Lipi',
      suite: 'Home 86',
      city: 'Bogor',
      zipcode: '16911',
      geo: { lat: '0', lng: '0' },
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation',
      bs: 'technology',
    },
  },
];

describe('UserContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <UserProvider>{children}</UserProvider>
  );

  it('fetches users on mount', async () => {
    vi.spyOn(userService.userService, 'fetchUsers').mockResolvedValue(
      mockUsers
    );

    const { result } = renderHook(() => useUserContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.loading).toBe(false);
    });
  });

  it('handles loading state', async () => {
    vi.spyOn(userService.userService, 'fetchUsers').mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useUserContext(), { wrapper });

    expect(result.current.loading).toBe(true);
  });
});