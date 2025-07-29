import { fetchCategoryForChart, fetchCounters } from "../controllers/DashboardController.js";

import express from "express"

const counterRoutes = express.Router();

counterRoutes.get("/fetchcounter",fetchCounters);
counterRoutes.get("/fetchcategoryforchart",fetchCategoryForChart);

export {counterRoutes}