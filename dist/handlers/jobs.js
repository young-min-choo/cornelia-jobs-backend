"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = getJobs;
exports.getJobById = getJobById;
exports.createJob = createJob;
const __1 = require("..");
function getJobs(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield __1.dbPromise;
        const jobs = yield db.all('SELECT * FROM Job;');
        response.status(201).json({ jobs });
    });
}
function getJobById(request, response) {
    response.send({});
}
function createJob(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = request.body;
        const postTime = job.postTime instanceof Date ? job.postTime : new Date(job.postTime);
        // save job
        const db = yield __1.dbPromise;
        db.run('INSERT INTO Job (id, title, location, salary, postTime, description) VALUES (?, ?, ?, ?, ?, ?)', [job.id, job.title, job.location, job.salary, postTime.toISOString(), job.description], function (err) {
            if (err) {
                console.error('Error inserting job:', err);
            }
            else {
                console.log(`Job inserted with ID ${job.id}`);
            }
        });
        response.status(201).json(job);
    });
}
