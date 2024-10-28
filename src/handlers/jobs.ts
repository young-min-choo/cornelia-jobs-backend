import { Request, Response } from "express-serve-static-core";
import { CreateJobDto } from "../dtos/CreateJob.dto";
import { Job } from "../types/jobResponse";
import { dbPromise } from "..";

export async function getJobs(request:Request, response: Response) {
    const db = await dbPromise
    const jobs = await db.all('SELECT * FROM Job;')
    response.status(201).json({ jobs })
}


export function getJobById(request:Request, response: Response) {
    response.send({});
}

export async function createJob(request:Request<Job, {}, CreateJobDto>, response: Response<Job>) {
    const job: Job = request.body;
    const postTime = job.postTime instanceof Date ? job.postTime : new Date(job.postTime);
    // save job
    const db = await dbPromise
    db.run('INSERT INTO Job (id, title, location, salary, postTime) VALUES (?, ?, ?, ?, ?)',
        [job.id, job.title, job.location, job.salary, postTime.toISOString()],
        function (err: string) {
            if (err) {
                console.error('Error inserting job:', err);
            } else {
                console.log(`Job inserted with ID ${job.id}`);
            }
        }
    )

    response.status(201).json(job);
}