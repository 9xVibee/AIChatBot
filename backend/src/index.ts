import express from "express";

const app = express();

// Middlewares
// this will tell app that we are taking json data from client side
app.use(express.json());

// Connections and listeners
app.listen(5000, () => {
  console.log(`Listening on: 5000`);
});
