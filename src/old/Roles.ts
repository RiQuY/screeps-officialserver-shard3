declare global {
    interface Creep {
        memory: CreepMemory;
    }

    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }
}

export function mainRoles(creep: Creep) {
    harvest(creep);
    //llenarSpawn(creep);
    mejorarControlador(creep);
}

function harvest(creep: Creep): void {
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

function llenarSpawn(creep: Creep): void {
    //const creep = Game.creeps[nombreCreep];
    if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns["Spawn1"]);
    }
}

function mejorarControlador(creep: Creep): void {
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
        if (creep.upgradeController(<StructureController> creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(<StructureController> creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}
