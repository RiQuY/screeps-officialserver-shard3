export class SpawnController {

    public static main () {
        
        for (const spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                const spawn = Game.spawns[spawnName];
                if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length <= 5) {
                    SpawnController.createHarvester(spawn);
                }
                
            }
        }
    }
        
    private static createHarvester(spawn: StructureSpawn) {
        let options: SpawnOptions = {
            memory: {
                role: 'Harvester',
                room: spawn.room.name,
                working: false
            } 
        }
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Harvester '+Date.now(), options );
    }
}