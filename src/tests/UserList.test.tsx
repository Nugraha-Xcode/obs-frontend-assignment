import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProvider } from '../context/UserContext';
import { UserList } from '../components/UserList';
import * as userService from '../services/user.service';

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

describe('UserList', () => {
  it('renders loading state initially', () => {
    vi.spyOn(userService.userService, 'fetchUsers').mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <UserProvider>
        <UserList />
      </UserProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders user list after loading', async () => {
    vi.spyOn(userService.userService, 'fetchUsers').mockResolvedValue(
      mockUsers
    );

    render(
      <UserProvider>
        <UserList />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays "Add New User" button', async () => {
    vi.spyOn(userService.userService, 'fetchUsers').mockResolvedValue(
      mockUsers
    );

    render(
      <UserProvider>
        <UserList />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });
  });
});