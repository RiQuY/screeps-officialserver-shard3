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
            Memory.stats.rooms = {};
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
            Memory.stats.rooms = {};
            Memory.stats.rooms[room.name] = {};
            Memory.stats.rooms[room.name].myRoom = undefined;
        }
    }
    Memory.stats.gcl = {};
    Memory.stats.gcl.progress = Game.gcl.progress;
    Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
    Memory.stats.gcl.level = Game.gcl.level;
    Memory.stats.spawns = {};
    for (let spawnKey in spawns) {
        let spawn = Game.spawns[spawnKey];
        Memory.stats.spawns[spawn.name] = {};
        Memory.stats.spawns[spawn.name].defenderIndex = spawn.memory;
        //Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory['defenderIndex'];
    }
    Memory.stats.cpu = {};
    /*
    Memory.stats['cpu.CreepManagers'] = creepManagement;
    Memory.stats['cpu.Towers'] = towersRunning;
    Memory.stats['cpu.Links'] = linksRunning;
    Memory.stats['cpu.SetupRoles'] = roleSetup;
    Memory.stats['cpu.Creeps'] = functionsExecutedFromCreeps;
    Memory.stats['cpu.SumProfiling'] = sumOfProfiller;
    Memory.stats['cpu.Start'] = startOfMain;*/
    Memory.stats.cpu.bucket = Game.cpu.bucket;
    Memory.stats.cpu.limit = Game.cpu.limit; /*
    Memory.stats['cpu.stats'] = Game.cpu.getUsed() - lastTick;*/
    Memory.stats.cpu.getUsed = Game.cpu.getUsed();
}

function deleteDeadCreeps() {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

class Spawner {
    static generateOptions(role, room) {
        let options = {
            memory: {
                role: role,
                room: room,
                working: false
            }
        };
        return options;
    }
    static createHarvester(spawn) {
        let role = 'Harvester';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester ' + Date.now(), Spawner.generateOptions(role, spawn.room.name));
    }
    static crearMejorador(spawn) {
        let role = 'Upgrader';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Upgrader ' + Game.time, Spawner.generateOptions(role, spawn.room.name));
    }
    static crearConstructor(spawn) {
        let role = 'Builder';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Upgrader ' + Game.time, Spawner.generateOptions(role, spawn.room.name));
    }
}

class SpawnController {
    static main() {
        for (const spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                const spawn = Game.spawns[spawnName];
                if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length <= 5) {
                    Spawner.createHarvester(spawn);
                }
            }
        }
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

Memory.stats = {};
delete Memory.spawns['Spawn1'];
// Compilar: npm run build
const loop = function () {
    deleteDeadCreeps();
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
