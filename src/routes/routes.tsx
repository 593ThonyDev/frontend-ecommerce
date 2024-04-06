import { FC, LazyExoticComponent, ReactNode, lazy } from "react";
import { PATHS_PUBLIC } from "./public/PathsPublic";
import { PATH_LOGIN, PATH_REGISTER, PATH_RESTORE_PASSWORD } from "./public/Paths";
import { PATHS_ADMIN } from "./private/admin/PathsAdmin";
import { PATHS_EMPLOYE } from "./private/employe/PathsEmploye";

interface LayoutComponentProps {
    children: ReactNode;
}

interface GuardComponentProps {
    children: ReactNode;
}

interface ElementComponentProps {
    children: ReactNode;
}

export interface RouteProps {
    path?: string;
    element?: LazyExoticComponent<FC<ElementComponentProps>> | null;
    layout?: LazyExoticComponent<FC<LayoutComponentProps>> | null;
    guard?: LazyExoticComponent<FC<GuardComponentProps>> | null;
    children?: RouteProps[];
}

export const routes: RouteProps[] = [
    {
        children: [
            {
                path: PATH_LOGIN,
                element: lazy(async () => await import("../pages/public/auth/Login")),
            },
            {
                path: PATH_REGISTER,
                element: lazy(async () => await import("../pages/public/auth/Register")),
            },        
            {
                path: PATH_RESTORE_PASSWORD,
                element: lazy(async () => await import("../pages/public/auth/RestorePassword")),
            },

        ]
    },
    PATHS_PUBLIC,
    PATHS_ADMIN,
    PATHS_EMPLOYE,
    {
        path: '*',
        element: lazy(async () => await import("../pages/error/NotFound")),
    }
];