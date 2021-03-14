import "reflect-metadata";
import { startServer } from "./app";
import { connect } from "./config/typeorm";

const Main = async () => {
  await connect();
  const app = await startServer();
  app.listen(3000);
  console.log("server3000");
};

Main();
