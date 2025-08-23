import express from "express";
import {read,post_read} from "../controllers/read.js"
const routes = express.Router();

routes.get("/read",read);
routes.get("/read/:id",post_read);


export default routes;