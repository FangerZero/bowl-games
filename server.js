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
const TeamRank = require('./server/models/teamRank');

// Get our API routes
const bowlsRoutes = require('./server/routes/bowls');
const gamesRoutes = require('./server/routes/games');
// const teamRanksRoutes = require('./server/routes/team_ranks');
const teamsRoutes = require('./server/routes/teams');
// const userSelectionsRoutes = require('./server/routes/user_selections');
const usersRoutes = require('./server/routes/users');

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
// app.use('/api/teams/ranks', teamRanksRoutes);
app.use('/api/teams', teamsRoutes);
// app.use('/api/users/:id/selections', userSelectionsRoutes);
app.use('/api/users', usersRoutes);

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
// Team Ranks
TeamRank.belongsTo(Team);
Team.hasMany(TeamRank);
// Games
Game.belongsTo(Bowl);
Bowl.hasMany(Game);
Game.belongsTo(Team, { as: 'teamID1', foreignKey: 'id' });
Game.belongsTo(Team, { as: 'teamID2', foreignKey: 'id' });

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
