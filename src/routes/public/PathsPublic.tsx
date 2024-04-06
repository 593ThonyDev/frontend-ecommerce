import { lazy } from "react";
import { PATH_BLOG, PATH_BLOG_ARTICULO, PATH_CHECK_ORDER, PATH_EMPLOYE, PATH_HOME, PATH_LOGIN, PATH_MY_ORDERS, PATH_NOSOTROS, PATH_PAYMENT, PATH_PRODUCTO, PATH_PRODUCTOS, PATH_PRODUCTOS_CATEGORY, PATH_REGISTER } from "./Paths";
import { RouteProps } from "../routes";

export const PATHS_PUBLIC: RouteProps = {
    
    layout: lazy(async () => await import("../../layouts/public/PublicLayout")),
    children: [
        // ======== Inicio ========
        {
            path: PATH_HOME,
            element: lazy(async () => await import("../../pages/public/landing/Landing")),
        },       
        {
            path: PATH_PRODUCTOS,
            element: lazy(async () => await import("../../pages/public/products/ProductIndex")),
        },       
        {
            path: PATH_PRODUCTOS_CATEGORY,
            element: lazy(async () => await import("../../pages/public/products/product-category/ProductCategory")),
        },       
        {
            path: PATH_PRODUCTO,
            element: lazy(async () => await import("../../pages/public/products/ProductView")),
        },       
        {
            path: PATH_PAYMENT,
            element: lazy(async () => await import("../../pages/public/payment/PayPalPayment")),
        },       
        {
            path: PATH_CHECK_ORDER,
            element: lazy(async () => await import("../../pages/public/orders/OrderView")),
        },       
        {
            path: PATH_MY_ORDERS,
            element: lazy(async () => await import("../../pages/public/orders/MyOrdersIndex")),
        },       
        {
            path: PATH_NOSOTROS,
            element: lazy(async () => await import("../../pages/public/about/AboutIndex")),
        },       
        {
            path: PATH_EMPLOYE,
            element: lazy(async () => await import("../../pages/public/employe/EmployeView")),
        },       
        {
            path: PATH_BLOG,
            element: lazy(async () => await import("../../pages/public/blog/BlogIndex")),
        },       
        {
            path: PATH_BLOG_ARTICULO,
            element: lazy(async () => await import("../../pages/public/blog/ArticleView")),
        },       
        {
            path: PATH_LOGIN,
            element: lazy(async () => await import("../../pages/public/auth/Login")),
        },            
        {
            path: PATH_REGISTER,
            element: lazy(async () => await import("../../pages/public/auth/Register")),
        },       
        {
            path: "*",
            element: lazy(async () => await import("../../pages/error/NotFound")),
        },       
    ]
}