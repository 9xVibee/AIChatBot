import app from "./app.js";
import { connectToDatabase } from "./db/connectDb.js";

// Connections and listeners
// Connecting to database
connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
