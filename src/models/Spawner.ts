export class Spawner {
  private static generateOptions(role: string, room: string) {
    const options: SpawnOptions = {
      memory: {
        role,
        room,
        working: false
      }
    };

    return options;
  }

  public static createHarvester(spawn: StructureSpawn): void {
    const role = "Harvester";
    const time = String(Game.time);
    spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester " + time, Spawner.generateOptions(role, spawn.room.name));
  }

  public static crearMejorador(spawn: StructureSpawn): void {
    const role = "Upgrader";
    const time = String(Game.time);
    spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader " + time, Spawner.generateOptions(role, spawn.room.name));
  }

  public static crearConstructor(spawn: StructureSpawn): void {
    const role = "Builder";
    const time = String(Game.time);
    spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader " + time, Spawner.generateOptions(role, spawn.room.name));
  }
}
