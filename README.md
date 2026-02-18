# Task Management System - Full Stack Application

A complete task management solution with a Node.js/TypeScript backend API and Next.js/TypeScript web frontend.

## Features

### Backend (Node.js + Express + Prisma)
- User Authentication with JWT (Access Token + Refresh Token)
- Secure Password Hashing with bcrypt
- Complete Task CRUD Operations
- Task Pagination, Filtering, and Searching
- Task Status Management (Pending, In Progress, Completed)
- User-scoped Task Management

### Frontend (Next.js 14 + TypeScript + TailwindCSS)
- Responsive Web Design (Mobile & Desktop)
- User Registration & Login
- Task Dashboard with Real-time Updates
- Create, Read, Update, Delete (CRUD) Operations
- Task Filtering by Status
- Task Search Functionality
- Toast Notifications for User Feedback
- Pagination Support

## Project Structure

```
earnest fintech/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── index.ts                    # Main server file
│   │   ├── middleware/
│   │   │   └── auth.ts                 # JWT authentication middleware
│   │   └── routes/
│   │       ├── auth.ts                 # Authentication endpoints
│   │       └── tasks.ts                # Task CRUD endpoints
│   ├── prisma/
│   │   └── schema.prisma               # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/         # Next.js Web App
    ├── app/
    │   ├── layout.tsx                  # Root layout
    │   ├── page.tsx                    # Home page
    │   ├── globals.css                 # Global styles
    │   ├── login/
    │   │   └── page.tsx                # Login page
    │   ├── register/
    │   │   └── page.tsx                # Register page
    │   └── dashboard/
    │       └── page.tsx                # Task dashboard
    ├── components/
    │   ├── LoginForm.tsx               # Login form component
    │   ├── RegisterForm.tsx            # Registration form component
    │   ├── TaskForm.tsx                # Create task form
    │   ├── TaskItem.tsx                # Individual task component
    │   ├── TaskList.tsx                # Task list with pagination
    │   └── Toast.tsx                   # Toast notification component
    ├── lib/
    │   └── api.ts                      # API client and utilities
    ├── hooks/
    │   ├── useAuth.ts                  # Auth state management
    │   └── useToast.ts                 # Toast state management
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── next.config.js
    └── .env.local
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (or update connection string in .env)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string
   - Update JWT secrets (use strong values in production)
   ```bash
   cp .env.example .env
   ```

4. **Setup database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

   The API will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update environment variables:**
   - The `.env.local` file is already configured to use `http://localhost:3000`
   - Update if your API runs on a different port

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The web app will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Create a new user account
- `POST /auth/login` - Login and get tokens
- `POST /auth/refresh` - Get new access token using refresh token
- `POST /auth/logout` - Logout (invalidate session on client)

### Tasks
- `GET /tasks` - Get all tasks (with pagination, filtering, searching)
  - Query params: `page`, `limit`, `status`, `search`
- `GET /tasks/:id` - Get a single task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `POST /tasks/:id/toggle` - Toggle task status

## Usage

1. **Register or Login:**
   - Go to `http://localhost:3000`
   - Click "Register" to create a new account or "Login" if you have one

2. **Manage Tasks:**
   - On the dashboard, fill in the task form on the left
   - View all your tasks on the right
   - Use filters and search to find specific tasks
   - Toggle task status with the ✓ button
   - Edit tasks with the ✏️ button
   - Delete tasks with the 🗑️ button

3. **Responsive Design:**
   - The application is fully responsive
   - It works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **CORS:** Enabled for all origins

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **State Management:** React Hooks

## Security Features

- JWT-based authentication with expiring access tokens
- Long-lived refresh tokens for seamless re-authentication
- Bcrypt password hashing (10 salt rounds)
- Protected API routes (require valid JWT)
- User-scoped task queries (users can only see their tasks)
- Secure token storage in localStorage
- CORS enabled for development flexibility

## Database Schema

### Users Table
- `id` - CUID (Primary Key)
- `email` - Email address (Unique)
- `name` - User's full name
- `password` - Hashed password
- `createdAt` - Account creation timestamp
- `updatedAt` - Last account update timestamp

### Tasks Table
- `id` - CUID (Primary Key)
- `title` - Task title
- `description` - Task description
- `status` - TaskStatus enum (PENDING, IN_PROGRESS, COMPLETED)
- `userId` - Foreign Key (User)
- `createdAt` - Task creation timestamp
- `updatedAt` - Last task update timestamp

## Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env` file
- Run `npm run prisma:migrate` to setup database

### Frontend can't connect to API
- Verify backend is running on `http://localhost:3000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is enabled on backend

### Tasks not loading on dashboard
- Check browser console for error messages
- Verify JWT token is valid (login should refresh it)
- Check API responses in Network tab

## Production Deployment

### Backend Production Checklist
1. Use environment variables for all secrets
2. Change JWT secrets to strong random values
3. Enable CORS with specific allowed origins
4. Use PostgreSQL managed service (e.g., AWS RDS, Azure Database)
5. Deploy on Node.js hosting (e.g., Heroku, Railway, Render)
6. Use HTTPS only

### Frontend Production Checklist
1. Update `NEXT_PUBLIC_API_URL` to production API URL
2. Run `npm run build` to create optimized build
3. Deploy to Vercel, Netlify, or static hosting
4. Configure environment variables in deployment platform
5. Use HTTPS only

## License

MIT

## Author

Task Management System - Full Stack Assessment
