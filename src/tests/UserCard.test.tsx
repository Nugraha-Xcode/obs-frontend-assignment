import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from '../components/UserCard';
import type { User } from '../types';

const mockUser: User = {
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
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserCard
        user={mockUser}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Agil Nugraha')).toBeInTheDocument();
    expect(screen.getByText('@agilnugraha')).toBeInTheDocument();
    expect(screen.getByText('nugrahaagil13@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('agilnugraha.com')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserCard
        user={mockUser}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });
});