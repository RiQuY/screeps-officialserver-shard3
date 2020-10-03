export class Spawner {

    private static generateOptions(role: string, room: string) {
        let options: SpawnOptions = {
            memory: {
                role: role,
                room: room,
                working: false
            } 
        }

        return options;
    }
    
    public static createHarvester(spawn: StructureSpawn) {
        let role = 'Harvester';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester '+Date.now(), Spawner.generateOptions(role, spawn.room.name) );
    }

    public static crearMejorador(spawn: StructureSpawn): void {
        let role = 'Upgrader';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Upgrader '+Game.time, Spawner.generateOptions(role, spawn.room.name) );
    }
    
    public static crearConstructor(spawn: StructureSpawn): void {
        let role = 'Builder';
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Upgrader '+Game.time, Spawner.generateOptions(role, spawn.room.name) );
    }
}