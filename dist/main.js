'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Put in your main loop
function generateStatsBK() {
    if (Memory.stats == undefined) {
        Memory.stats = {
            rooms: {},
            gcl: {
                progress: 0,
                progressTotal: 0,
                level: 0
            },
            spawns: {},
            cpu: {
                bucket: 0,
                limit: 0,
                getUsed: 0
            }
        };
    }
    let rooms = Game.rooms;
    let spawns = Game.spawns;
    for (let roomKey in rooms) {
        let room = Game.rooms[roomKey];
        let isMyRoom = (room.controller ? room.controller.my : 0);
        Memory.stats.rooms[room.name] = {
            myRoom: 0,
            energyAvailable: 0,
            energyCapacityAvailable: 0,
            controllerProgress: 0,
            controllerProgressTotal: 0,
            storedEnergy: 0
        };
        if (isMyRoom) {
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
            Memory.stats.rooms[room.name].myRoom = 0;
        }
    }
    Memory.stats.gcl.progress = Game.gcl.progress;
    Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
    Memory.stats.gcl.level = Game.gcl.level;
    for (let spawnKey in spawns) {
        let spawn = Game.spawns[spawnKey];
        Memory.stats.spawns[spawn.name] = {
            defenderIndex: 0
        };
        Memory.stats.spawns[spawn.name].defenderIndex = spawn.memory;
        //Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory['defenderIndex'];
    }
    /*Memory.stats['cpu.CreepManagers'] = creepManagement;
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
    recolectar(creep);
    //llenarSpawn(creep);
    mejorarControlador(creep);
}
function recolectar(creep) {
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

// Compilar: npm run build
const loop = function () {
    deleteDeadCreeps();
    RolesController.main();
    SpawnController.main();
    for (const name in Memory.creeps) {
        mainRoles(Game.creeps[name]);
    }
    generateStatsBK();
    //exportStats();
    //Stats.run(); 
};
// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html

exports.loop = loop;
//# sourceMappingURL=main.js.map
