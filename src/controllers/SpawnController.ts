import { Spawner } from "../models/Spawner";

export class SpawnController {

    public static main () {
        
        for (const spawnName in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawnName)) {
                const spawn = Game.spawns[spawnName];

                //Memory.creeps.filter()

                if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length <= 5) {
                    Spawner.createHarvester(spawn);
                }
            }
        }
    }
}