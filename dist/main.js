'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Put in your main loop
function generateStatsBK() {
    if (Memory.stats == undefined) {
        Memory.stats = {};
    }
    let rooms = Game.rooms;
    let spawns = Game.spawns;
    for (let roomKey in rooms) {
        let room = Game.rooms[roomKey];
        let isMyRoom = (room.controller ? room.controller.my : 0);
        if (isMyRoom) {
            Memory.stats['room.' + room.name + '.myRoom'] = 1;
            Memory.stats['room.' + room.name + '.energyAvailable'] = room.energyAvailable;
            Memory.stats['room.' + room.name + '.energyCapacityAvailable'] = room.energyCapacityAvailable;
            if (room.controller !== undefined) {
                Memory.stats['room.' + room.name + '.controllerProgress'] = room.controller.progress;
                Memory.stats['room.' + room.name + '.controllerProgressTotal'] = room.controller.progressTotal;
            }
            let stored = 0;
            let storedTotal = 0;
            if (room.storage) {
                stored = room.storage.store[RESOURCE_ENERGY];
                storedTotal = room.storage.storeCapacity;
                //storedTotal = room.storage.storeCapacity[RESOURCE_ENERGY];
            }
            else {
                stored = 0;
                storedTotal = 0;
            }
            Memory.stats['room.' + room.name + '.storedEnergy'] = stored;
        }
        else {
            Memory.stats['room.' + room.name + '.myRoom'] = undefined;
        }
    }
    Memory.stats['gcl.progress'] = Game.gcl.progress;
    Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
    Memory.stats['gcl.level'] = Game.gcl.level;
    for (let spawnKey in spawns) {
        let spawn = Game.spawns[spawnKey];
        Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory;
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
    Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    Memory.stats['cpu.limit'] = Game.cpu.limit; /*
    Memory.stats['cpu.stats'] = Game.cpu.getUsed() - lastTick;*/
    Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
}

function deleteDeadCreeps() {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

class SpawnController {
    static main() {
        for (const spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                const spawn = Game.spawns[spawnName];
                if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length <= 5) {
                    SpawnController.createHarvester(spawn);
                }
            }
        }
    }
    static createHarvester(spawn) {
        let options = {
            memory: {
                role: 'Harvester',
                room: spawn.room.name,
                working: false
            }
        };
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester ' + Date.now(), options);
    }
}

class RoomRoles {
    constructor(harvesters, upgraders, repairers, builders) {
        this.harvesters = harvesters;
        this.upgraders = upgraders;
        this.repairers = repairers;
        this.builders = builders;
    }
}

class RolesController {
    static main() {
        Memory.roomRoles = new RoomRoles(2, 2, 2, 1);
    }
}

// Compilar: npm run push-main
const loop = function () {
    console.log(`Current game tick is ${Game.time}`);
    deleteDeadCreeps();
    /*for (const nombreZona in Game.rooms) {
        const zona = Game.rooms[nombreZona].
        console.log(nombreZona);
    }*/
    /*
        for (const nombreSpawn in Memory.spawns) {
            const spawn = Game.spawns[nombreSpawn];
            mainSpawner(spawn);
        }
        
        for (const nombreCreep in Memory.creeps) {
            const creep = Game.creeps[nombreCreep];
            mainRoles(creep);
        }
    */
    /*
    for (const creepName in Game.creeps) {
        if (Game.creeps.hasOwnProperty(creepName)) {
            const creep = Game.creeps[creepName];
        }
    }*/
    SpawnController.main();
    RolesController.main();
    generateStatsBK();
    //exportStats();
    //Stats.run(); 
};
// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html

exports.loop = loop;
//# sourceMappingURL=main.js.map
