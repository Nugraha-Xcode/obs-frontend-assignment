export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
  avatar?: string;
  position?: string;
  department?: string;
  employeeId?: string;
  salary?: number;
  joinDate?: string;
  accountNumber?: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  position: string;
  department: string;
  employeeId: string;
  salary: string;
  joinDate: string;
  accountNumber: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}