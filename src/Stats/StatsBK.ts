declare global {
    interface Memory {
        stats: any;
    }
}

// Put in your main loop
export function generateStatsBK() {
    if (Memory.stats == undefined) {
        Memory.stats = {};
    }

    let rooms = Game.rooms;
    let spawns = Game.spawns;
    for (let roomKey in rooms) {
        let room: Room = Game.rooms[roomKey];
        let isMyRoom = (room.controller ? room.controller.my : 0);
        if (isMyRoom) {
            Memory.stats.rooms[room.name] = {};
            Memory.stats.rooms[room.name].myRoom = 1;
            Memory.stats.rooms[room.name].energyAvailable = room.energyAvailable;
            Memory.stats.rooms[room.name].energyCapacityAvailable = room.energyCapacityAvailable;
            if (room.controller !== undefined) {
                Memory.stats.rooms[room.name].controllerProgress = room.controller.progress;
                Memory.stats.rooms[room.name].controllerProgressTotal = room.controller.progressTotal;
            }
            let stored = 0;
            let storedTotal = 0;

            if (room.storage) {
                stored = room.storage.store[RESOURCE_ENERGY];
                storedTotal = room.storage.store.getCapacity();
            }
            else {
                stored = 0;
                storedTotal = 0;
            }

            Memory.stats.rooms[room.name].storedEnergy = stored;
        }
        else {
            Memory.stats.rooms[room.name] = {};
            Memory.stats.rooms[room.name].myRoom = undefined;
        }
    }
    Memory.stats.gcl.progress = Game.gcl.progress;
    Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
    Memory.stats.gcl.level = Game.gcl.level;
    Memory.stats.spawns = {};
    for (let spawnKey in spawns) {
        let spawn: StructureSpawn = Game.spawns[spawnKey];
        Memory.stats.spawns[spawn.name].defenderIndex = spawn.memory;
        //Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory['defenderIndex'];
    }
    /*
    Memory.stats['cpu.CreepManagers'] = creepManagement;
    Memory.stats['cpu.Towers'] = towersRunning;
    Memory.stats['cpu.Links'] = linksRunning;
    Memory.stats['cpu.SetupRoles'] = roleSetup;
    Memory.stats['cpu.Creeps'] = functionsExecutedFromCreeps;
    Memory.stats['cpu.SumProfiling'] = sumOfProfiller;
    Memory.stats['cpu.Start'] = startOfMain;*/
    Memory.stats.cpu.bucket = Game.cpu.bucket;
    Memory.stats.cpu.limit = Game.cpu.limit;/*
    Memory.stats['cpu.stats'] = Game.cpu.getUsed() - lastTick;*/
    Memory.stats.cpu.getUsed = Game.cpu.getUsed();
}
