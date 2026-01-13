# User Management System

A modern, professional user management application built with React, TypeScript, and Material-UI for the OBS Frontend Assessment.

## Application Description

This application uses dummy APIs for development and demonstration purposes.
It provides a clean and intuitive interface to manage employee data with full CRUD (Create, Read, Update, Delete) operations.
User data is retrieved from JSONPlaceholder, while profile images are generated using Picsum Photos.

### Key Features

- **User List Display**: View all users in both list and grid layouts
- **Search Functionality**: Real-time search across user names, emails, and usernames
- **Add New User**: Create new users with comprehensive form validation
- **Edit User**: Update existing user information with pre-filled forms
- **Delete User**: Remove users with confirmation dialog
- **View Details**: Display complete user information including profile photo
- **Photo Viewer**: Click any avatar to view full-size profile photo
- **Success Notifications**: Formal toast messages for all operations
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Financial Company Fields**: Custom fields including Position, Department, Employee ID, Salary, Join Date, and Account Number

### Technology Stack

- **React 19.2.0** - Frontend framework
- **TypeScript 5.9.3** - Type-safe programming
- **Vite 7.2.4** - Build tool and dev server
- **Material-UI v7.3.7** - UI component library
- **React Context API** - State management
- **Vitest 4.0.17** - Testing framework
- **ESLint & Prettier** - Code quality tools

### API Integration

1. **JSONPlaceholder API** (`https://jsonplaceholder.typicode.com/users`)
   - Provides mock user data for testing
   - Returns 10 users with complete information (name, email, phone, address, company)

2. **Picsum Photos API** (`https://picsum.photos`)
   - Generates random profile pictures
   - Ensures consistent images per user using seeded URLs

## How to Run the Application

### Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Clone or extract the project**
   ```bash
   cd obs-frontend-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173` in your web browser

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Create optimized production build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Check code for errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:ui      # Open Vitest UI for tests
npm run test:coverage # Generate test coverage report
```

## Additional Information

### Project Structure

```
src/
├── components/              # React components
│   ├── Layout.tsx          # Main layout with header
│   ├── UserList.tsx        # User list with search and toggle view
│   ├── UserCard.tsx        # Grid view card component
│   ├── UserModal.tsx       # Add/Edit/View modal with photo viewer
│   └── DeleteConfirmDialog.tsx # Delete confirmation dialog
├── context/
│   └── UserContext.tsx     # Global state management
├── services/
│   └── user.service.ts     # API integration
├── types/
│   └── user.types.ts       # TypeScript interfaces
├── tests/                  # Unit tests
├── App.tsx                 # Root component
└── main.tsx                # Application entry point
```

### Features Detail

#### List/Grid Toggle View
- **List View** (Default): Horizontal cards showing complete employee information
- **Grid View**: Compact cards in responsive grid (1-3 columns based on screen size)

#### Financial Company Customization
The form includes custom fields specifically for financial companies:
- **Position**: Employee job title
- **Department**: Business unit or division
- **Employee ID**: Unique employee identifier
- **Salary**: Compensation in IDR format with thousands separator
- **Join Date**: Employment start date
- **Account Number**: Bank account for payroll

#### Success Notifications
All operations (Add, Update, Delete) display formal success messages:
- "User has been successfully added to the system."
- "User information has been successfully updated."
- "User has been successfully removed from the system."

#### Photo Viewing and Editing
- In View mode: Click the profile avatar to open full-size photo in modal dialog
- Full-size viewer with black background and responsive image sizing
- Close by clicking the close button or backdrop
- In Edit mode: Click edit button to change profile photo
- Upload a new photo
- Save to apply changes or cancel to keep the existing photo

### Design Philosophy

- **Professional UI**: Clean, modern design without gradients
- **Solid Colors**: Flat design with Material-UI color palette
- **Consistent Spacing**: 8px grid system for uniform layout
- **Smooth Transitions**: Hover effects and animations for better UX
- **Type Safety**: Full TypeScript implementation with strict mode

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Known Limitations

- Data is stored in memory only (resets on page refresh)
- Using mock API (JSONPlaceholder) - CRUD operations don't persist to server
- Profile photos are generated from external API (custom upload didn't change the photo)

---

## Developer

**Developed by:** Agil Nugraha  
**Email:** nugrahaagil13@gmail.com  
**Project:** OBS Frontend Assessment  
**Date:** January 2026  

---