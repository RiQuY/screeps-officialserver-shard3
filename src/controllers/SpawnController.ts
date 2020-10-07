import { Game } from "../../test/unit/mock";
import { Spawner } from "../models/Spawner";

export class SpawnController {
  public static main(): void {
    for (const spawnName in Game.spawns) {
      if (Game.spawns.hasOwnProperty(spawnName)) {
        const spawn = Game.spawns[spawnName] as StructureSpawn;

        // Memory.creeps.filter()

        if (spawn.store[RESOURCE_ENERGY] >= 200 && Object.keys(Game.creeps).length < 3) {
          Spawner.createHarvester(spawn);
        }
      }
    }
  }
}
