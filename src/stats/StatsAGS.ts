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
      time: number;
    };
  }
}

interface RoomStats {
  energyAvailable: number;
  energyCapacityAvailable: number;
  controllerProgress: number;
  controllerProgressTotal: number;
  controllerLevel: number;
  storageEnergy: number;
  terminalEnergy: number;
}

// Call this function at the end of your main loop
export function exportStats(): void {
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
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    const isMyRoom = room.controller ? room.controller.my : false;
    if (isMyRoom) {
      const roomStats = (Memory.stats.rooms[roomName] = {
        energyAvailable: 0,
        energyCapacityAvailable: 0,
        controllerLevel: 0,
        controllerProgress: 0,
        controllerProgressTotal: 0,
        storageEnergy: 0,
        terminalEnergy: 0
      });
      if (room.controller !== undefined) {
        roomStats.energyAvailable = room.energyAvailable;
        roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
        roomStats.controllerProgress = room.controller.progress;
        roomStats.controllerProgressTotal = room.controller.progressTotal;
        roomStats.controllerLevel = room.controller.level;
        roomStats.storageEnergy = room.storage ? room.storage.store.energy : 0;
        roomStats.terminalEnergy = room.terminal ? room.terminal.store.energy : 0;
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
