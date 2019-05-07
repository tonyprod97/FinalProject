import { Log } from './../models/log';

export interface Statistic {
    min: Log,
    max: Log,
    average: number,
    from: Date,
    to: Date,
    totalLogs: number
}