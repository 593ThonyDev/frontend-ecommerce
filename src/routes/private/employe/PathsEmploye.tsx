import { lazy } from "react";
import { PATH_EMPLOYE_ABOUT, PATH_EMPLOYE_HOME, PATH_ARTICLE_EMPLOYE_VIEW, PATH_BLOG_EMPLOYE, PATH_EMPLEADO_EMPLOYE,  PATH_PRODUCTOS_EMPLOYE, PATH_PRODUCTO_EMPLOYE, PATH_ARTICLE_EMPLOYE_NEW, PATH_ARTICLE_EMPLOYE_EDIT } from "./PrivatePathsEmploye";
import { RouteProps } from "../../routes";

export const PATHS_EMPLOYE: RouteProps = {
    layout: lazy(async () => await import("../../../layouts/private/employe/EmployeLayout")),
    guard: lazy(async () => await import("../../../guards/EmployeGuard")),
    children: [
        // ======== Inicio ========
        {
            path: PATH_EMPLOYE_HOME,
            element: lazy(async () => await import("../../../pages/private/employe/home/HomeIndex")),
        },        
        // ======== About ========
        {
            path: PATH_EMPLOYE_ABOUT,
            element: lazy(async () => await import("../../../pages/private/employe/about/AboutIndex")),
        },        
        // ======== Employe ========      
        {
            path: PATH_EMPLEADO_EMPLOYE,
            element: lazy(async () => await import("../../../pages/private/employe/employe/EmployeView")),
        },        
        // ======== Blog ========
        {
            path: PATH_BLOG_EMPLOYE,
            element: lazy(async () => await import("../../../pages/private/employe/blog/BlogIndex")),
        },        
        {
            path: PATH_ARTICLE_EMPLOYE_NEW,
            element: lazy(async () => await import("../../../pages/private/employe/blog/ArticleNew")),
        },        
        {
            path: PATH_ARTICLE_EMPLOYE_EDIT,
            element: lazy(async () => await import("../../../pages/private/employe/blog/ArticleEdit")),
        },        
        {
            path: PATH_ARTICLE_EMPLOYE_VIEW,
            element: lazy(async () => await import("../../../pages/private/employe/blog/ArticleView")),
        },                
        {
            path: PATH_EMPLEADO_EMPLOYE,
            element: lazy(async () => await import("../../../pages/private/employe/employe/EmployeView")),
        },            
        // ======== Product ========
        {
            path: PATH_PRODUCTOS_EMPLOYE,
            element: lazy(async () => await import("../../../pages/private/employe/product/ProductIndex")),
        },       
        {
            path: PATH_PRODUCTO_EMPLOYE,
            element: lazy(async () => await import("../../../pages/private/employe/product/ProductView")),
        },        
    ]
}