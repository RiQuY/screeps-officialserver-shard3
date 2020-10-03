'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Put in your main loop
function generarStatsBK() {
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

function eliminarCreepsMuertos() {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
}

function mainSpawner(spawn) {
    if (spawn.energy >= 200 && Object.keys(Memory.creeps).length <= 10) {
        crearRecolector(spawn);
        crearMejorador(spawn);
        //crearConstructor(spawn);
    }
}
function crearRecolector(spawn) {
    let options = {
        memory: {
            rol: 'Recolector',
            room: spawn.room.name,
            trabajando: false
        }
    };
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Recolector' + Date.now(), options);
}
function crearMejorador(spawn) {
    let options = {
        memory: {
            rol: 'Mejorador',
            room: spawn.room.name,
            trabajando: false
        }
    };
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Mejorador' + Date.now(), options);
}

function mainRoles(creep) {
    recolectar(creep);
    //llenarSpawn(creep);
    mejorarControlador(creep);
}
function recolectar(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
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
    if (creep.memory.trabajando && creep.carry.energy == 0) {
        creep.memory.trabajando = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.trabajando && creep.carry.energy == creep.carryCapacity) {
        creep.memory.trabajando = true;
        creep.say('⚡ upgrade');
    }
    if (creep.memory.trabajando) {
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

// Compilar: npm run push-main
const loop = function () {
    console.log(`Current game tick is ${Game.time}`);
    eliminarCreepsMuertos();
    /*for (const nombreZona in Game.rooms) {
        const zona = Game.rooms[nombreZona].
        console.log(nombreZona);
    }*/
    for (const nombreSpawn in Memory.spawns) {
        const spawn = Game.spawns[nombreSpawn];
        mainSpawner(spawn);
    }
    for (const nombreCreep in Memory.creeps) {
        const creep = Game.creeps[nombreCreep];
        mainRoles(creep);
    }
    generarStatsBK();
    //exportStats();
    //Stats.run(); 
};
// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html

exports.loop = loop;
//# sourceMappingURL=main.js.map
