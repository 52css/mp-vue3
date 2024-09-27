export declare enum SchedulerJobFlags {
    QUEUED = 1,
    ALLOW_RECURSE = 4
}
export interface SchedulerJob extends Function {
    /**
     * Flags can technically be undefined, but it can still be used in bitwise
     * operations just like 0.
     */
    flags?: SchedulerJobFlags;
}
export declare function nextTick<R = void>(fn?: () => R): Promise<Awaited<R>>;
export declare function queueJob(job: SchedulerJob): void;
export declare function queuePostFlushCb(cb: SchedulerJob): void;
export declare function flushPostFlushCbs(): void;
