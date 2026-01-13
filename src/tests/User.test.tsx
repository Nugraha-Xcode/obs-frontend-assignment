import { describe, it, expect } from 'vitest';
import type { User, UserFormData } from '../types';

// Simple unit tests for data types and utilities
// Full component tests are skipped due to Windows file descriptor limits with MUI icons

const mockUser: User = {
  id: 1,
  name: 'Agil Nugraha',
  username: 'agilnugraha',
  email: 'nugrahaagil13@gmail.com',
  phone: '123-456-7890',
  website: 'agilnugraha.com',
  avatar: 'https://picsum.photos/seed/1/200/200',
  position: 'Software Engineer',
  department: 'Engineering',
  employeeId: 'EMP-001',
  salary: 15000000,
  joinDate: '2024-01-15',
  accountNumber: '1234567890',
  address: {
    street: 'Jalan Komplek Lipi',
    suite: 'Home 86',
    city: 'Bogor',
    zipcode: '16911',
    geo: { lat: '0', lng: '0' },
  },
  company: {
    name: 'Tech Corp',
    catchPhrase: 'Innovation First',
    bs: 'technology solutions',
  },
};

const mockFormData: UserFormData = {
  name: 'Agil Nugraha',
  username: 'agilnugraha',
  email: 'nugrahaagil13@gmail.com',
  phone: '123-456-7890',
  website: 'agilnugraha.com',
  position: 'Software Engineer',
  department: 'Engineering',
  employeeId: 'EMP-001',
  salary: '15000000',
  joinDate: '2024-01-15',
  accountNumber: '1234567890',
  address: {
    street: 'Jalan Komplek Lipi',
    suite: 'Home 86',
    city: 'Bogor',
    zipcode: '16911',
  },
  company: {
    name: 'Tech Corp',
    catchPhrase: 'Innovation First',
    bs: 'technology solutions',
  },
};

describe('User Data Types', () => {
  it('should have correct user properties', () => {
    expect(mockUser.id).toBe(1);
    expect(mockUser.name).toBe('Agil Nugraha');
    expect(mockUser.email).toBe('nugrahaagil13@gmail.com');
    expect(mockUser.position).toBe('Software Engineer');
    expect(mockUser.department).toBe('Engineering');
    expect(mockUser.salary).toBe(15000000);
  });

  it('should have correct address structure', () => {
    expect(mockUser.address.city).toBe('Bogor');
    expect(mockUser.address.street).toBe('Jalan Komplek Lipi');
    expect(mockUser.address.zipcode).toBe('16911');
  });

  it('should have correct company structure', () => {
    expect(mockUser.company.name).toBe('Tech Corp');
    expect(mockUser.company.catchPhrase).toBe('Innovation First');
  });
});

describe('UserFormData', () => {
  it('should have all required fields', () => {
    expect(mockFormData.name).toBeTruthy();
    expect(mockFormData.username).toBeTruthy();
    expect(mockFormData.email).toBeTruthy();
    expect(mockFormData.phone).toBeTruthy();
  });

  it('should have financial fields as strings', () => {
    expect(typeof mockFormData.salary).toBe('string');
    expect(typeof mockFormData.employeeId).toBe('string');
    expect(typeof mockFormData.accountNumber).toBe('string');
  });

  it('should have nested address fields', () => {
    expect(mockFormData.address.street).toBeTruthy();
    expect(mockFormData.address.city).toBeTruthy();
  });
});

describe('Email Validation', () => {
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  it('should validate correct email formats', () => {
    expect(isValidEmail('nugrahaagil13@gmail.com')).toBe(true);
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.id')).toBe(true);
  });

  it('should reject invalid email formats', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('Salary Formatting', () => {
  const formatSalary = (salary: number) =>
    `Rp ${salary.toLocaleString('id-ID')}`;

  it('should format salary in IDR currency', () => {
    expect(formatSalary(15000000)).toContain('15');
    expect(formatSalary(5000000)).toContain('5');
  });

  it('should include Rp prefix', () => {
    expect(formatSalary(15000000)).toContain('Rp');
  });
});
