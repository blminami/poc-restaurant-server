Pornire server: node server.js

Pentru a crea tabele in baza de date: https://app-restaurant-narcisaminca.c9users.io/create

Pentru a inregistra un nou user si pentru a genera token-ul de acces: https://app-restaurant-narcisaminca.c9users.io/users/register

Pentru a reseta parola: https://app-restaurant-narcisaminca.c9users.io/forgotPassword

Pentru metodele pentru restaurantele disponibile: https://app-restaurant-narcisaminca.c9users.io/restaurants/ -> get all https://app-restaurant-narcisaminca.c9users.io/restaurants/:id - >get restaurant by id including orders https://app-restaurant-narcisaminca.c9users.io/restaurants/ -> post (adauga un nou restaurant) https://app-restaurant-narcisaminca.c9users.io/restaurants/:id -> delete (sterge restaurantul) https://app-restaurant-narcisaminca.c9users.io/restaurants/:id -> put( update restaurant)

Pentru comenzi: https://app-restaurant-narcisaminca.c9users.io/orders/ - >//Get all orders https://app-restaurant-narcisaminca.c9users.io/orders/:id - >//Get order by ID https://app-restaurant-narcisaminca.c9users.io/orders/:trigger/:id //If trigger === 'restaurants' => get all orders where restaurantId = id //If trigger === 'users' => get all orders where userId = id

https://app-restaurant-narcisaminca.c9users.io/orders/restaurant/:rid/user/:uid -. create new order https://app-restaurant-narcisaminca.c9users.io/orders/:id -> update order https://app-restaurant-narcisaminca.c9users.io/orders/:id -> delete orderr

Pentru produsele din meniu: https://app-restaurant-narcisaminca.c9users.io/menuItems/ -> get all https://app-restaurant-narcisaminca.c9users.io/menuItems/:id -> get by id https://app-restaurant-narcisaminca.c9users.io/menuItems/byCategory/:category -> get (toate produsele din aceeasi categorie) https://app-restaurant-narcisaminca.c9users.io/menuItems/:category/:x/:y -> //GET items by Category and price between x and y https://app-restaurant-narcisaminca.c9users.io/menuItems/ -> add net item to the menu https://app-restaurant-narcisaminca.c9users.io/menuItems/:id ->//Update item: foodType, price, image, description (all except from category and id) https://app-restaurant-narcisaminca.c9users.io/menuItems/:id -> delete item

Intrucat intre tabela Orders si itemMenu exita o relatie n:n, am folosit p tabela intermediara Intermediate. Urmatoarele metode sunt aplcate pe aceasta tabela: https://app-restaurant-narcisaminca.c9users.io/intemediates/orders/:oid -> get by order Id https://app-restaurant-narcisaminca.c9users.io/intemediates/orders/:oid/menuItem/:mid ->add a new record https://app-restaurant-narcisaminca.c9users.io/intemediates/:oid/:mid ->delete a record


Database connection:
sudo service httpd start && sudo service httpd status
sudo service mysqld start && sudo service mysqld status
sudo mysql -uroot -p    // password: root

Server:
cd server/
node server.js

Client: 
npm run-script build


https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/