import express from "express";
import {trainRasaModel, evaluateRasaModel, parseRasaModel} from "./controllers/postController";
import {
  getStatusRasa,
  getVersionRasa
} from './controllers/getController'
import {
  deleteModelRasa
} from './controllers/deleteController'
const router = express.Router();
router.get("/api/v1/status", getStatusRasa);
router.get("/api/v1/version", getVersionRasa);
router.post("/api/v1/train", trainRasaModel);
/*router.post("/api/v1/evaluate", evaluateRasaModel);*/
router.post("/api/v1/parse", parseRasaModel);
/*router.delete("/api/v1/delete", deleteModelRasa);*/
export default router;
