export interface SchedulerJob extends Function {
    active?: boolean;
    allowRecurse?: boolean;
}
export declare function nextTick<R = void>(fn?: () => R): Promise<Awaited<R>>;
export declare function queueJob(job: SchedulerJob): void;
export declare function queuePostFlushCb(cb: SchedulerJob): void;
export declare function flushPostFlushCbs(): void;
