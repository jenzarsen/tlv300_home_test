import express from "express";
import { getDomainInfo } from "../controllers/domain.controller.js";
import {validateDomainRequest} from "../middleware/validateRequest.js";

const router = express.Router();

// Domain information endpoint with both parameters in path
router.get('/:domainName/:type', validateDomainRequest, getDomainInfo);

export default router;