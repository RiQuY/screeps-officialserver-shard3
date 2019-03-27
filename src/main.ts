import { generarStatsBK } from "./Stats/StatsBK";
import { exportStats } from "./Stats/StatsAGS";
//import { Stats } from "./Stats/StatsOvermind";

import { eliminarCreepsMuertos } from "./LimpiarMemoria";
import { mainSpawner } from "./Spawner";
import { mainRoles } from "./Roles";

export const loop = function () {
    console.log(`Current game tick is ${Game.time}`);
    
    eliminarCreepsMuertos();
    
    /*for (const nombreZona in Game.rooms) {
        const zona = Game.rooms[nombreZona].
        console.log(nombreZona);
    }*/
    for (const nombreSpawn in Memory.spawns) {
        const spawn = Game.spawns[nombreSpawn];
        mainSpawner(spawn);
    }
    
    for (const nombreCreep in Memory.creeps) {
        const creep = Game.creeps[nombreCreep];
        mainRoles(creep);
    }

    generarStatsBK();
    //exportStats();
    //Stats.run(); 
};

// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html