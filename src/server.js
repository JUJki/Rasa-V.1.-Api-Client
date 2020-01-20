import express from "express";
import bodyParser from 'body-parser';
import router from "./routes";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);
app.listen(process.env.PORT || 3001);
export default app;
