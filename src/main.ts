import { generateStatsBK } from "./stats/StatsBK";
//import { exportStats } from "./stats/StatsAGS";
//import { Stats } from "./Stats/StatsOvermind";

import { deleteDeadCreeps } from "./utils/MemoryClean";
//import { mainSpawner } from "./old/Spawner";
//import { mainRoles } from "./old/Roles";

//import { Memory } from "./interfaces/Memory";

import { SpawnController } from "./controllers/SpawnController";
import { RolesController } from "./controllers/RolesController";

// Compilar: npm run push-main
export const loop = function () {
    console.log(`Current game tick is ${Game.time}`);
    
    deleteDeadCreeps();
    
    /*for (const nombreZona in Game.rooms) {
        const zona = Game.rooms[nombreZona].
        console.log(nombreZona);
    }*/

/*
    for (const nombreSpawn in Memory.spawns) {
        const spawn = Game.spawns[nombreSpawn];
        mainSpawner(spawn);
    }
    
    for (const nombreCreep in Memory.creeps) {
        const creep = Game.creeps[nombreCreep];
        mainRoles(creep);
    }
*/

    /*
    for (const creepName in Game.creeps) {
        if (Game.creeps.hasOwnProperty(creepName)) {
            const creep = Game.creeps[creepName];
        }
    }*/
    
    SpawnController.main();
    RolesController.main();

    generateStatsBK();
    //exportStats();
    //Stats.run(); 
};

// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html