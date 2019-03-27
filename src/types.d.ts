// example declaration file - remove these and add your own custom typings

interface Creep {
    memory: CreepMemory;
}

// memory extension samples
interface CreepMemory {
    rol: string;
    room: string;
    trabajando: boolean;
}

interface Memory {
    uuid: number;
    log: any;
    /*stats?: Stats;*/
}

/*
interface RoomStats {
    storageEnergy           : any;
    terminalEnergy          : any;
    energyAvailable         : any;
    energyCapacityAvailable : any;
    controllerProgress      : any;
    controllerProgressTotal : any;
    controllerLevel         : any;
}
*/
// `global` extension samples
declare namespace NodeJS {
    interface Global {
        log: any;
    }
}