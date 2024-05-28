import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from '@/features/Auth/Login/page';
import AuthProvider from '@/features/Auth/AuthProvider';
import Home from '@/features/Home/page';
import ProtectedRoute from "@/features/Auth/ProtectedRoute";
import Books from "@/features/Books/page";

const router = createBrowserRouter([
    {
        path:'/',
        element: (<AuthProvider>
                    <Outlet />
                </AuthProvider>),
        children:[
            {
                path:'login',
                element:<Login />
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