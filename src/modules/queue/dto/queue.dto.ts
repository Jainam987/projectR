import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';



export type ModifyJob = {
  jobName: string,
  data: any,
  interval: number,
  repeatJobKey: string,
};


export type CleanJobs = {
  type: "completed" | "failed" | "active" | "delayed" | "prioritized" | "paused" | "wait";
};

export type RemoveRepeatableByKey = {
  repeatJobKey: string
}

