import mongoose from "mongoose";

const mongodb_uri =
  "mongodb+srv://root:root@cluster0-3s0ia.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((db) => console.log("Database is connected"))
  .catch((error) => console.error(error));
