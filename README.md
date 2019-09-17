### WIP
This ReadMe File is a work in progress, I have not tested these instructions yet. Please use them at your own disgression.

------------

### bowl-games
Attempting to build an application to help solidfy what I have learned and test new technologies I'm trying to learn.

------------

### Languages/Frameworks used
* NodeJS Express Sequelize - Backend
* MySQL - Database
* Angular - Frontend
* Ionic - Styling

------------

### Pre-reqruisites
1. Install [Node JS](https://nodejs.org/en/download/ "Node JS")
1. Install Ionic `npm install -g ionic`
1. Install Angular `npm install -g @angular/cli`
1. Install Express `npm install --save express`
1. Install SQL Server

------------

### Installing & Setting up MySQL
1. **Install and Update mysql-server**
-- Run the following command in VS Code
-- `sudo apt update && sudo apt install mysql-server`
-- Press `y` then enter
-- Check the status, you want a green Active status
-- `sudo service mysql status`
1. ** Configure Security**
-- `sudo mysql_secure_installation`
-- Press `Enter`
-- Put in the password you want to use
-- Remember this password
-- Press `Y` then enter
-- Press `Y` then enter
-- Press `Y` then enter
-- Press `Y` then enter
1. **Setup Schema**
-- You should be in the `mysql>` on your command line
-- Create a database, replace `<NAME>` with the name you want to use for your database
-- `CREATE DATABASE <NAME>;`
-- `USE <NAME>;`
-- Create User account. Replace <USER> with the root user. Replace <PASSWORD> with the root user's password.
-- `CREATE USER'<USER>'@localhost' IDENTIFIED BY '<PASSWORD>';`
-- Granting privledges
-- `GRANT ALL PRIVILEGES ON <NAME>.* TO '<USER>'@'localhost';`
1. **Download/Install MySql Workbench**
-- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/ "MySQL Workbench")
-- Assuming you are running locally, you can connect using `127.0.0.1:3306`
-- You will not have any tables until you start the Node JS server

------------

### Installing
1. npm should have been installed with Node JS
-- Check the version `npm -v` Should be 6.11+
1. Install dependencies `npm i`
1. Start Backend `node server.js`
-- This will create the tables on the MySQL database you built
1. Start project `ionic serve` 
1. Go to http://localhost:8100
