const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const sequelize = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
}).catch(err => {
  console.error("Error connecting to the database:", err);
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    console.log('Received:', data);
    if (data.type === 'GET_EVENTS') {
      const events = await sequelize.models.Event.findAll();
      ws.send(JSON.stringify({ type: 'events', data: events }));
    } else if (data.type === 'GET_RESERVATIONS') {
      const reservations = await sequelize.models.Reservation.findAll();
      ws.send(JSON.stringify({ type: 'reservations', data: reservations }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
