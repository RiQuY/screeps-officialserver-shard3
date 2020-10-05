'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Call this function at the end of your main loop
function exportStats() {
    // Reset stats object
    Memory.stats = {
        cpu: {
            bucket: 0,
            limit: 0,
            used: 0
        },
        gcl: {
            level: 0,
            progress: 0,
            progressTotal: 0
        },
        rooms: {},
        time: 0
    };
    Memory.stats.time = Game.time;
    // Collect room stats
    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        let isMyRoom = (room.controller ? room.controller.my : false);
        if (isMyRoom) {
            let roomStats = Memory.stats.rooms[roomName] = {
                energyAvailable: 0,
                energyCapacityAvailable: 0,
                controllerLevel: 0,
                controllerProgress: 0,
                controllerProgressTotal: 0,
                storageEnergy: 0,
                terminalEnergy: 0
            };
            if (room.controller !== undefined) {
                roomStats.energyAvailable = room.energyAvailable;
                roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
                roomStats.controllerProgress = room.controller.progress;
                roomStats.controllerProgressTotal = room.controller.progressTotal;
                roomStats.controllerLevel = room.controller.level;
                roomStats.storageEnergy = (room.storage ? room.storage.store.energy : 0);
                roomStats.terminalEnergy = (room.terminal ? room.terminal.store.energy : 0);
            }
        }
    }
    // Collect GCL stats
    Memory.stats.gcl.progress = Game.gcl.progress;
    Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
    Memory.stats.gcl.level = Game.gcl.level;
    // Collect CPU stats
    Memory.stats.cpu.bucket = Game.cpu.bucket;
    Memory.stats.cpu.limit = Game.cpu.limit;
    Memory.stats.cpu.used = Game.cpu.getUsed();
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
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester ' + Game.time, Spawner.generateOptions(role, spawn.room.name));
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
                //Memory.creeps.filter()
                if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length < 3) {
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

function mainRoles(creep) {
    harvest(creep);
    //llenarSpawn(creep);
    mejorarControlador(creep);
}
function harvest(creep) {
    //const creep = Game.creeps[nombreCreep];
    /*
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
    }
  
    if (creep.memory.working === true) {
      if (creep.memory.rol === "Recolector") {
        llenarSpawn(creep);
      }
      if (creep.memory.rol === "Mejorador") {
        mejorarControlador(creep);
      }
    }
    else {
      const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
      if (target) {
        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }*/
    if (!creep.memory.working) {
        if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}
function mejorarControlador(creep) {
    //const creep = Game.creeps[nombreCreep];
    /*
    if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    */
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.working && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
        creep.memory.working = true;
        creep.say('⚡ upgrade');
    }
    if (creep.memory.working) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}

//import { generateStatsBK } from "./stats/StatsBK";
// Compilar: npm run build
const loop = function () {
    deleteDeadCreeps();
    RolesController.main();
    SpawnController.main();
    for (const name in Memory.creeps) {
        mainRoles(Game.creeps[name]);
    }
    if (Game.cpu.bucket > 6000) {
        Game.cpu.generatePixel();
    }
    //generateStatsBK();
    exportStats();
    //Stats.run(); 
};
// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html

exports.loop = loop;
//# sourceMappingURL=main.js.map
