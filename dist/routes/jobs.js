"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobs_1 = require("../handlers/jobs");
const router = (0, express_1.Router)();
// /api/jobs
router.get("/", jobs_1.getJobs);
// /api/jobs/123
router.get('/:id');
router.post('/create', jobs_1.createJob);
exports.default = router;
