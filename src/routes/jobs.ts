import { Router } from "express";
import { createJob, getJobs } from "../handlers/jobs";

const router = Router();

// /api/jobs
router.get("/", getJobs)

// /api/jobs/123
router.get('/:id')

router.post('/', createJob)
export default router