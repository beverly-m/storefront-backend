# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: *'/products' [GET]*
- Show route: *'/products/:id' [GET]*
- Create route [token required]: *'/products' [POST]*

#### Users

- Index route [token required]: *'/users' [GET]*
- Show route [token required]: *'/users/:id' [GET]*
- Create route [token required]: *'/users' [POST]*

#### Orders

- Current Order by user (args: user id)[token required]: *'/orders/:user_id' [GET]*

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables

#### Products Table

- id: int [primary key]
- name: varchar
- price: numeric(5,2)

#### Users Table

- id: int [primary key]
- firstName: varchar
- lastName: varchar
- password: char

#### Order Products Table

###### This table keeps record of the products purchased in an order along with their quantities. It is a join table between the orders and products table

- id: int [primary key]
- order_id: int [foreign key to orders table]
- product_id: int [foreign key to products table]
- quantity: int

#### Orders Table

- id: int [primary key]
- status: varchar
- user_id: int [foreign key to users table]
