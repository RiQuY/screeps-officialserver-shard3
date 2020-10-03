
export class RoomRoles {
    public harvesters: number;
    public upgraders: number;
    public repairers: number;
    public builders: number;

    constructor (harvesters: number, upgraders: number, repairers: number, builders: number ) {
        this.harvesters = harvesters;
        this.upgraders = upgraders;
        this.repairers = repairers;
        this.builders = builders;
    }
}