//Rutas privadas para listar la gestion de las interfaces

export const PATH_ADMIN_HOME = "/a";

export const PATH_ADMIN_COMPANY = PATH_ADMIN_HOME + "/company"
export const PATH_ADMIN_COMPANY_EDIT = PATH_ADMIN_HOME + "/company/edit"

export const PATH_ADMIN_HERO_EDIT = PATH_ADMIN_HOME + "/hero/edit"

export const PATH_ADMIN_ABOUT = PATH_ADMIN_HOME + "/about"
export const PATH_ADMIN_ABOUT_EDIT = PATH_ADMIN_HOME + "/about/edit"

export const PATH_PRODUCTOS_ADMIN = PATH_ADMIN_HOME + "/products"
export const PATH_PRODUCTO_ADMIN = PATH_ADMIN_HOME + "/product/:id/:name"
export const PATH_PRODUCTO_ADMIN_NEW = PATH_ADMIN_HOME + "/product/new"
export const PATH_PRODUCTO_ADMIN_ID = PATH_ADMIN_HOME + "/product/"
export const PATH_PRODUCTO_ADMIN_EDIT = PATH_ADMIN_HOME + "/product/edit/:id/:name"
export const PATH_PRODUCTO_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/product/edit/"

export const PATH_CATEGORIA_PRODUCTOS_ADMIN = PATH_ADMIN_HOME + "/products-category"
export const PATH_CATEGORIA_PRODUCTOS_ADMIN_NEW = PATH_ADMIN_HOME + "/products-category/new"
export const PATH_CATEGORIA_PRODUCTO_ADMIN = PATH_ADMIN_HOME + "/product-category/:id/:name"
export const PATH_CATEGORIA_PRODUCTO_ADMIN_ID = PATH_ADMIN_HOME + "/product-category/"
export const PATH_CATEGORIA_PRODUCTO_ADMIN_EDIT = PATH_ADMIN_HOME + "/product-category/edit/:id/:name"
export const PATH_CATEGORIA_PRODUCTO_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/product-category/edit/"

export const PATH_EMPLEADOS_ADMIN = PATH_ADMIN_HOME + "/employes"
export const PATH_EMPLEADO_ADMIN_NEW = PATH_ADMIN_HOME + "/employe/new"
export const PATH_EMPLEADO_ADMIN = PATH_ADMIN_HOME + "/employe/:id/:name"
export const PATH_EMPLEADO_ADMIN_ID = PATH_ADMIN_HOME + "/employe/"
export const PATH_EMPLEADO_ADMIN_EDIT = PATH_ADMIN_HOME + "/employe/edit/:id/:name"
export const PATH_EMPLEADO_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/employe/edit/"

export const PATH_CLIENTES_ADMIN = PATH_ADMIN_HOME + "/customers"
export const PATH_CLIENTE_ADMIN = PATH_ADMIN_HOME + "/customer/:id/:name"
export const PATH_CLIENTE_ADMIN_NEW = PATH_ADMIN_HOME + "/customer/new"
export const PATH_CLIENTE_ADMIN_ID = PATH_ADMIN_HOME + "/customer/"
export const PATH_CLIENTE_ADMIN_EDIT = PATH_ADMIN_HOME + "/customer/edit/:id/:name"
export const PATH_CLIENTE_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/customer/edit/"

export const PATH_ORDERS_ADMIN = PATH_ADMIN_HOME + "/orders"
export const PATH_ORDER_ADMIN = PATH_ADMIN_HOME + "/order/:idCustomer/:code"
export const PATH_ORDER_ADMIN_CODE = PATH_ADMIN_HOME + "/order/"
export const PATH_ORDER_ADMIN_EDIT = PATH_ADMIN_HOME + "/order/edit/:code"
export const PATH_ORDER_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/order/edit/"

export const PATH_BLOG_ADMIN = PATH_ADMIN_HOME + "/blog"
export const PATH_ARTICLE_ADMIN_NEW = PATH_ADMIN_HOME + "/article/new"
export const PATH_ARTICLE_ADMIN_VIEW = PATH_ADMIN_HOME + "/article/:id"
export const PATH_ARTICLE_ADMIN_VIEW_ID = PATH_ADMIN_HOME + "/article/"
export const PATH_ARTICLE_ADMIN_EDIT = PATH_ADMIN_HOME + "/article/edit/:id"
export const PATH_ARTICLE_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/article/edit/"

export const PATH_USERS_ADMIN = PATH_ADMIN_HOME + "/users"
export const PATH_USER_ADMIN_VIEW = PATH_ADMIN_HOME + "/user/:iduser/:role/:id/:fullname"
export const PATH_USER_ADMIN_VIEW_ID = PATH_ADMIN_HOME + "/user/"
export const PATH_USER_ADMIN_EDIT = PATH_ADMIN_HOME + "/user/edit/:id"
export const PATH_USER_ADMIN_EDIT_ID = PATH_ADMIN_HOME + "/user/edit/"
