import { Route, Outlet } from "react-router-dom";
import { Suspense, Fragment } from "react";
import { RouteProps } from "./routes";
import Loader from "../loaders/Loader";

export const renderRoutes = (routes: RouteProps[]) => {
    return routes.map((route, index) => {
        const Component = route.element || Fragment;
        const Layout = route.layout || Fragment;
        const Guard = route.guard || Fragment;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Suspense fallback={<Loader/>}>
                        <Guard>
                            <Layout>
                                {route.children ? <Outlet /> : <Component children={undefined} />}
                            </Layout>
                        </Guard>
                    </Suspense>
                }
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};
