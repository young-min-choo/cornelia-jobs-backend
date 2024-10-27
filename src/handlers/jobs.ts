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

export function createJob(
    request:Request<{}, {}, CreateJobDto>, 
    response: Response<Job>) {
    response.status(201).send({
        id: '123',
        title: 'Test Job',
        location: 'Test Location',
        salary: 9999,
        postTime: new Date()
    });
    
}