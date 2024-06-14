import {lazy,Suspense} from 'react';
import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from '@/features/Auth/AuthProvider';
import ProtectedRoute from "@/features/Auth/ProtectedRoute";
import AppBootstrap from '@/libs/app/Bootstrap';

const Login = lazy(()=> import("@/features/Auth/Login/page"));
const Books = lazy(()=> import("@/features/Books/page"));
const Register = lazy(()=> import("@/features/Auth/Register/page"));
const Home = lazy(()=> import('@/features/Home/page'));

const router = createBrowserRouter([
    {
        path:'/',
        element: (<Suspense fallback={<p>Loading BookHaven...</p>}>
                <AuthProvider>
                   <AppBootstrap>
                    <Outlet />
                    </AppBootstrap>
                </AuthProvider>
                </Suspense>),
        children:[
            {
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<Register />
            },
            {
               path:'/',
               element:(<ProtectedRoute>
                <Home />
                </ProtectedRoute>),
               children:[
                {
                  index: true,
                  element:<Books />
                },
               ]
               
            },
            
        ]
    },
    {
        path:'*',
        element: <p>404 page</p>
    }
])

export default router;