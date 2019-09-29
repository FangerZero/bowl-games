# Bowl Games
Application built that will allow an admin to list bowls, teams, and games for users to select who they think will win. 

---
# Technologies
* MySQL 8
* Express
* Angular 8
* Node JS 10.16.3
* Ionic 4
* PWA
---
# Get Setup
- [ ] Download and install the latest version of VSCode (Just click next)	https://code.visualstudio.com/
- [ ] Download and install the 10.16.3 version of NodeJS (Just click next)	https://nodejs.org/en/
- [ ] Download and install the latest version of git (Just click next)	https://git-scm.com/download/win
- [ ] Download and install the latest version of MySQL Workbench (Just click next) https://dev.mysql.com/downloads/workbench/
- [ ] **Get Bash Terminal**
1. Open terminal
1. Open Command Palette: `Ctrl + Shift + P`
1. Type `Select Default Shell`
1. Select `Git Bash`
1. Open a New Terminal
---
# Setup Project
- [ ] **Clone Project**
1. `git clone https://github.com/FangerZero/bowl-games.git`
	You may need to login. 

- [ ] **Install Dependencies**
1. Run command `npm i`
1. Install Angular `npm install -g @angular/cli`
1. Insall Ionic `npm install -g ionic`
1. Install Express `npm install --save express`
1. Install web-push `npm install web-push -g`
---
# Setup MySQL Windows
Tables created when backend server runs

- [ ] Install MySQL Server
1. Download and install the latest version of MySQL Server https://dev.mysql.com/downloads/windows/installer/8.0.html
1. For help https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html
1. Keep Defaults until you get to "Select Products & Features"
1. Select Products & Features
	Install MySQL Servers > MySQL Server 8.0.17 -X64
	Install Application > MySQL Shell 8.0.17 -X64
1. Remember your root account password
1. Click Next/Execute until complete

- [ ] Start MySQL Server
1. Should auto start
1. If not go to windows button and type services
1. Look for the name of your database, right click and start

- [ ] **Setup Schema**
1. Open MySQL Workbench
1. Create a new new connection, if running local use `127.0.0.1:3306`
1. Use the password & user name you created earlier
1. Once connected on the left look for "Users and Privileges", it' sunder management
1. Click Add Account
1. Create a new account and give DBA privileges
1. Create a new Schema and call it bowl_games
1. In the code file server/util/database.js change the username and password to the account you just created

**You will create the table when you start the NodeJS server.**

--- 
# Setup MySQL Linux
Tables created when backend server runs

- [ ] **Install & Update MySQL Server**
1. Run command `apt update && sudo apt install mysql-server`
1. Press `Y` then `Enter`
1. Check the status `service mysql status`

- [ ] **Configure Server**
1. `mysql_secure_installation`
1. Press `Enter`
1. Put in the password and keep it handy
1. Press `Y`
1. Press `Enter`
1. Press `Y`
1. Press `Enter`
1. Press `Y`
1. Press `Enter`

- [ ] **Setup Schema**
1. You should be in `mysql>` command line
   Below replace <NAME> with the name of your database
1. Run command `CREATE DATABASE <NAME>;`
1. Run command `USE <NAME>;`
1. Create User account. Replace with the root user. Replace with the root user's password.
1. Run command `CREATE USER'<USER>'@localhost' IDENTIFIED BY '<PASSWORD>';`
1. Run command `GRANT ALL PRIVILEGES ON <NAME>.* TO '<USER>'@'localhost';`

- [ ] Start MySQL Server
1. Run command `` in terminal

**You will create the table when you start the NodeJS server.**

---
#Progress Web Application Setup (PWA)
You will need to set this up as there are certain pieces that necessary
- [ ] **Vapid Keys**
1. Generate Keys `web-push generate-vapid-keys`
---
# Start Servers

- [ ] **.env File**
1. You need to fill out the .env.sample file

- [ ] **Node JS Server**
1. Run command `node server.js`
	This will create your tables

- [ ] **Client Server w/out PWA**
1. Run command `ionic serve`
1. If the command is not found continue below
1. Open a folder
1. Right click on `This PC`
1. Go to `Properties`
1. In the left panel click `Advanced System Setting`
1. Click on `Environmental Variable`
1. Under `System Variable` select `path` variable
1. Click on `Edit`
1. Add variables `%AppData%\npm` and `%ProgramFiles%\nodejs\`
1. Click `OK`
1. Restart your machine
1. Run VSCode as Admin

- [ ] **Client Server w/ PWA**
1. Install http-server `npm install http-server -g`
1. If the commands are not found, follow steps 2-13 from **Client Server w/out PWA**
1. in the project root folder, `bowl-games`
1. Run command `ionic build --prod`
1. Go to the newly created folder, normally `www` or `build`
1. Run command `http-server -p 8081`
