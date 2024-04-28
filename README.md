# HomeWork 
# Final Work of Node

Desarrollar el backend para un comercio electrónico implica la creación de una serie de endpoints que faciliten la gestión de usuarios, el proceso de inicio de sesión, la visualización y filtrado de productos, así como la funcionalidad para agregar artículos al carrito y realizar compras.



# MODELOS Y ENDPOINTS

# Users
firstName
lastName
email
password
phone
# Endpoints
GET /users (privado)🔐
POST  /users (público)
DELETE  /users/:id (privado)🔐
PUT   /users/:id (privado)🔐
POST  /users/login (público)


# Category
name

# Endpoints
GET /categories (público)
POST  /categories (privado)🔐
DELETE /categories (privado)🔐



# Product
title
description
categoryId
price

# Endpoints
GET /products (público)
POST  /products (privado)🔐
GET /products/:id (público)
DELETE /products/:id (privado)🔐
PUT /products/:id (privado)🔐
POST  /products/:id/images (privado)🔐



# Cart
userId
productId
quantity
# Endpoints
GET /cart (privado)🔐 – Debe traer los productos en el carrito del usuario logueado.
GET /cart/:id  (privado)🔐 – Debe traer el producto seleccionadol usuario logueado.
POST /cart (privado)🔐 – Debe añadir los productos deseados por el usuario logueado en el carrito.
DELETE /cart (privado)🔐 – Debe eliminar los productos del usuario logueado en el carrito.
PUT /cart (privado)🔐 – Debe poder actualizar quantity, es decir la cantidad de productos.✅










# Purchase
userId
productId
quantity
Endpoints
GET /purchase (privado)🔐 – Debe traer las compras del usuario logueado.
POST /purchase (privado)🔐 – Debe tomar los productos del carrito del usuario logueado, pasarlos por  la tabla Purchase y eliminarlos de Cart.












# ProductImg
url
filename
productId
Endpoints
GET /product_images (privado)🔐
POST /product_images (privado)🔐
DELETE /product_images (privado)🔐




En total hay 23 endpoints. Cada uno de estos endpoints deben contar con sus respectivos tests. Excepto los tres endpoints de ProductImg (No obligatorios)



Render DB
postgres://node_gen34_final_homework_api_user:eyBibJ55hod67Ob6BS584BGB1AhieMmT@dpg-concs1ocmk4c73a34kq0-a/node_gen34_final_homework_api
