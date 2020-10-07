export class Spawner {
    static generateOptions(role, room) {
        const options = {
            memory: {
                role,
                room,
                working: false
            }
        };
        return options;
    }
    static createHarvester(spawn) {
        const role = "Harvester";
        const time = String(Game.time);
        spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester " + time, Spawner.generateOptions(role, spawn.room.name));
    }
    static crearMejorador(spawn) {
        const role = "Upgrader";
        const time = String(Game.time);
        spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader " + time, Spawner.generateOptions(role, spawn.room.name));
    }
    static crearConstructor(spawn) {
        const role = "Builder";
        const time = String(Game.time);
        spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader " + time, Spawner.generateOptions(role, spawn.room.name));
    }
}
//# sourceMappingURL=Spawner.js.map