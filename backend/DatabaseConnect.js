import mongoose from "mongoose";

async function DatabaseConnect(url) {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Database Error", err);
    });
}

export default DatabaseConnect;
