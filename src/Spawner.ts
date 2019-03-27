export function mainSpawner(spawn: StructureSpawn): void {
    if (spawn.energy >= 200 && Object.keys(Memory.creeps).length <= 6) {
        crearRecolector(spawn);
        crearMejorador(spawn);
        //crearConstructor(spawn);
    }
}

function crearRecolector(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            rol: 'Recolector',
            room: spawn.room.name,
            trabajando: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Recolector'+Date.now(), options );
}

function crearMejorador(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            rol: 'Mejorador',
            room: spawn.room.name,
            trabajando: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Mejorador'+Date.now(), options );
}

function crearConstructor(spawn: StructureSpawn): void {
    let options: SpawnOptions = {
        memory: {
            rol: 'Constructor',
            room: spawn.room.name,
            trabajando: false
        } 
    }
    spawn.spawnCreep([WORK, CARRY, MOVE], 'Constructor'+Date.now(), options );
}
