# bowl-games
Attempting to build an application for a friend, and to help solidfy what I have learned

# Languages/Frameworks used
* NodeJS Express - Backend
* MySQL - Database
* Angular - Frontend
* Ionic - Styling

# Pre-reqruisites
1. Install Node JS
1. Install Ionic `npm install -g ionic`
1. Install Angular `npm install -g @angular/cli`
1. Install Express `npm install --save express`

# Installing
1. Download
1. Install dependencies `npm i`
1. Start Backend `node server.js`
1. Start project `ionic serve` 
1. Go to http://localhost:8100


# Installing & Setting up MySQL
1. Install and Update mysql-server
⋅⋅1. Run the following command in VS Code
⋅⋅⋅`sudo apt update && sudo apt install mysql-server`
⋅⋅1. Press `y` then enter
⋅⋅1. Check the status, you want a green Active status
⋅⋅⋅`sudo service mysql status`
1. Configure Security
⋅⋅1. `sudo mysql_secure_installation`
⋅⋅1. Press `Enter`
⋅⋅1. Put in the password you want to use
⋅⋅⋅ Remember this password
⋅⋅1. Press `Y` then enter
⋅⋅1. Press `Y` then enter
⋅⋅1. Press `Y` then enter
⋅⋅1. Press `Y` then enter
1. Setup Schema
⋅⋅1. You should be in the `mysql>` on your command line
⋅⋅1. Create a database, replace `<NAME>` with the name you want to use for your database
⋅⋅⋅ `CREATE DATABASE <NAME>;`
⋅⋅1. `USE <NAME>;`
⋅⋅1. Create User account. Replace <USER> with the root user. Replace <PASSWORD> with the root user's password.
⋅⋅⋅ `CREATE USER'<USER>'@localhost' IDENTIFIED BY '<PASSWORD>';`
⋅⋅1. Granting privledges
⋅⋅⋅ `GRANT ALL PRIVILEGES ON <NAME>.* TO '<USER>'@'localhost';`
1. 