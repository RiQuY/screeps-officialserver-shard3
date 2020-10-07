export function mainSpawner(spawn) {
    if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Memory.creeps).length <= 10) {
        crearRecolector(spawn);
        crearMejorador(spawn);
        // crearConstructor(spawn);
    }
}
function crearRecolector(spawn) {
    const options = {
        memory: {
            role: "Recolector",
            room: spawn.room.name,
            working: false
        }
    };
    const time = String(Game.time);
    spawn.spawnCreep([WORK, CARRY, MOVE], "Recolector" + time, options);
}
function crearMejorador(spawn) {
    const options = {
        memory: {
            role: "Mejorador",
            room: spawn.room.name,
            working: false
        }
    };
    const time = String(Game.time);
    spawn.spawnCreep([WORK, CARRY, MOVE], "Mejorador" + time, options);
}
/*
function crearConstructor(spawn: StructureSpawn): void {
  const options: SpawnOptions = {
    memory: {
      role: "Constructor",
      room: spawn.room.name,
      working: false
    }
  };
  spawn.spawnCreep([WORK, CARRY, MOVE], "Constructor" + Game.time, options);
}
*/
//# sourceMappingURL=Spawner.js.map