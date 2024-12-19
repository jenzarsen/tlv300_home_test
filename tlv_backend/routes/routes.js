import express from "express";
import { getDomainInfo } from "../controllers/domain.controller.js";

const router = express.Router();

// Domain information endpoint with both parameters in path
router.get('/:domainName/:type', getDomainInfo);

export default router;