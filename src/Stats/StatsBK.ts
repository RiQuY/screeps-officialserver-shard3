/*
declare global {
    interface Memory {
        stats: {
            cpu: {
                bucket: number;
                limit: number;
                used: number;
            };
            gcl: {
                progress: number;
                progressTotal: number;
                level: number;
            };
            rooms: {
                [name: string]: RoomStats;
            };
            spawns: {
                [name: string]: SpawnStats;
            };
            time: number;
        }
    }
}
*/

interface RoomStats {
  myRoom: number;
  energyAvailable: number;
  energyCapacityAvailable: number;
  controllerProgress: number;
  controllerProgressTotal: number;
  controllerLevel: number;
  storedEnergy: number;
}

interface SpawnStats {
  defenderIndex: any;
}

// Put in your main loop
export function generateStatsBK(): void {
  Memory.stats = {
    rooms: {},
    gcl: {
      progress: 0,
      progressTotal: 0,
      level: 0
    },
    // spawns: {},
    cpu: {
      bucket: 0,
      limit: 0,
      used: 0
    },
    time: 0
  };

  const rooms = Game.rooms;
  // const spawns = Game.spawns;
  for (const roomKey in rooms) {
    const room: Room = Game.rooms[roomKey];
    const isMyRoom = room.controller ? room.controller.my : 0;
    /*
        Memory.stats.rooms[room.name] = {
            //myRoom: 0,
            energyAvailable: 0,
            energyCapacityAvailable: 0,
            controllerProgress: 0,
            controllerProgressTotal: 0,
            controllerLevel: 0,
            //storedEnergy: 0
        };*/

    if (isMyRoom) {
      // Memory.stats.rooms[room.name].myRoom = 1;
      Memory.stats.rooms[room.name].energyAvailable = room.energyAvailable;
      Memory.stats.rooms[room.name].energyCapacityAvailable = room.energyCapacityAvailable;

      if (room.controller !== undefined) {
        Memory.stats.rooms[room.name].controllerProgress = room.controller.progress;
        Memory.stats.rooms[room.name].controllerProgressTotal = room.controller.progressTotal;
        Memory.stats.rooms[room.name].controllerLevel = room.controller.level;
      }
      // let stored = 0;
      // let storedTotal = 0;

      if (room.storage) {
        // stored = room.storage.store[RESOURCE_ENERGY];
        // storedTotal = room.storage.store.getCapacity();
      } else {
        // stored = 0;
        // storedTotal = 0;
      }
      // Memory.stats.rooms[room.name].storedEnergy = stored;
    } else {
      // Memory.stats.rooms[room.name].myRoom = 0;
    }
  }

  Memory.stats.gcl.progress = Game.gcl.progress;
  Memory.stats.gcl.progressTotal = Game.gcl.progressTotal;
  Memory.stats.gcl.level = Game.gcl.level;

  // for (const spawnKey in spawns) {
  // const spawn: StructureSpawn = Game.spawns[spawnKey];
  /*
        Memory.stats.spawns[spawn.name] = {
            defenderIndex: 0
        };
        Memory.stats.spawns[spawn.name].defenderIndex = spawn.memory;
        */
  // Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory['defenderIndex'];
  // }
  /*
  Memory.stats['cpu.CreepManagers'] = creepManagement;
    Memory.stats['cpu.Towers'] = towersRunning;
    Memory.stats['cpu.Links'] = linksRunning;
    Memory.stats['cpu.SetupRoles'] = roleSetup;
    Memory.stats['cpu.Creeps'] = functionsExecutedFromCreeps;
    Memory.stats['cpu.SumProfiling'] = sumOfProfiller;
    Memory.stats['cpu.Start'] = startOfMain;
    */
  Memory.stats.cpu.bucket = Game.cpu.bucket;
  Memory.stats.cpu.limit = Game.cpu.limit;
  // Memory.stats['cpu.stats'] = Game.cpu.getUsed() - lastTick;
  Memory.stats.cpu.used = Game.cpu.getUsed();

  Memory.stats.time = Game.time;
}
