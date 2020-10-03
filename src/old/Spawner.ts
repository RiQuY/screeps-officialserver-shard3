export function mainSpawner(spawn: StructureSpawn): void {
    if (spawn.energy >= 200 && Object.keys(Memory.creeps).length <= 10) {
        crearRecolector(spawn);
        crearMejorador(spawn);
        //crearConstructor(spawn);
    }
}

function crearRecolector(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            role: 'Recolector',
            room: spawn.room.name,
            working: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Recolector'+Game.time, options );
}

function crearMejorador(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            role: 'Mejorador',
            room: spawn.room.name,
            working: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Mejorador'+Game.time, options );
}

function crearConstructor(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            role: 'Constructor',
            room: spawn.room.name,
            working: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Constructor'+Game.time, options );
}
