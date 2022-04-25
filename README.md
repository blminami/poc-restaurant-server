## About The Project

Sample server application for managing a restaurant group activity.

Here's why:

- Manage the restaurants that are part of the group and create custom menus based on their locations and clients
- Create custom restaurant menu that includes images, descriptions, categories, etc. of the dishes
- Track online orders and decide which restaurant can deliver the order faster based on latitude and longitude coordinates

## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/blminami/order-tracking-sample-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure and run mysql locally

   ```sh
   sudo service httpd start && sudo service httpd status
   sudo service mysqld start && sudo service mysqld status
   sudo mysql -uroot -p
   ```

4. Start the server

   ```sh
   node server.js
   ```

5. Database table creation: https://localhost:8080/create
