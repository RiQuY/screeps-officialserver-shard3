export class CreepWorker {
    private creep: Creep;
    private role: string;
    private working: boolean;

    constructor (creep: Creep, role: string, working: boolean) {
        this.creep = creep;
        this.role = role;
        this.working = working;
    }
}