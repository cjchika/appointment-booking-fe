import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const Register = lazy(() => import('@/pages/register'));

const Login = lazy(() => import('@/pages/login'));

const UserBooking = lazy(() => import('@/pages/user-booking'));

const AdminDashboard = lazy(() => import('@/pages/admin-dashboard'));

export { Home, Register, Login, UserBooking, AdminDashboard };
