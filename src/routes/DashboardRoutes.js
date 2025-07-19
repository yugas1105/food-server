import { fetchCounters } from "../controllers/DashboardController.js";

import express from "express"

const counterRoutes = express.Router();

counterRoutes.get("/fetchcounter",fetchCounters);

export {counterRoutes}