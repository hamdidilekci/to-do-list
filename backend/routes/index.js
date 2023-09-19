import express from "express";

import authRoutes from "./auth.routes.js";
import todoRoutes from "./todo.routes.js";
import reminderRoutes from "./reminder.routes.js";

import isAuthenticated from "../middleware/is-authenticated.js";

const router = express.Router();

router.use("/auth", authRoutes);
// To use routes below isAuthenticated you need to be an athenticated user
router.use(isAuthenticated);
router.use("/todos", todoRoutes);
router.use("/reminder", reminderRoutes);

export default router;
