// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get database information
const sequelize = require('./server/util/database');
const User = require('./server/models/user');
const Game = require('./server/models/game');
const Bowl = require('./server/models/bowl');
const Team = require('./server/models/team');
const UserSelection = require('./server/models/userSelection');

// Get our API routes
const bowlsRoutes = require('./server/routes/bowls');
const gamesRoutes = require('./server/routes/games');
const teamsRoutes = require('./server/routes/teams');
const userSelectionsRoutes = require('./server/routes/userSelections');
const ranksRoutes = require('./server/routes/ranks');
const usersRoutes = require('./server/routes/users');
const notificationsRoutes = require('./server/routes/notifications');
const supportRoutes  = require('./server/routes/support');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Determines and Sets the headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

// Point static path to dist/src (Prod/Dev)
app.use(express.static(path.join(__dirname, 'src')));

// Set our api routes
app.use('/api/bowls', bowlsRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/selections', userSelectionsRoutes);
app.use('/api/users/ranks', ranksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/support', supportRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// ******************
// ASSOCIATIONS
// UserSelection
UserSelection.belongsTo(Game);
Game.hasMany(UserSelection);
UserSelection.belongsTo(User);
User.hasMany(UserSelection);
UserSelection.belongsTo(Team);
Team.hasMany(UserSelection);
// Games
Game.belongsTo(Bowl);
Bowl.hasMany(Game);
Game.belongsTo(Team, { as: 'team1', foreignKey: 'teamId1' });
Game.belongsTo(Team, { as: 'team2', foreignKey: 'teamId2' });

// Seuqlize Sync, create table
sequelize
  // .sync({ force: true }).then(result => {
  .sync().then(result => {
    console.log(result);

    // Listen on provided port, on all network interfaces.
    server.listen(port, () => console.log(`API running on localhost:${port}`));
}).catch(err => {
    console.log(err);
    console.log('API Server not started');
});
