//import { generateStatsBK } from "./stats/StatsBK";
import { exportStats } from "./stats/StatsAGS";
//import { Stats } from "./Stats/StatsOvermind";

import { deleteDeadCreeps } from "./utils/MemoryClean";
import { SpawnController } from "./controllers/SpawnController";
import { RolesController } from "./controllers/RolesController";

// Temporal
import { mainRoles } from "./old/Roles";

// Compilar: npm run build
export const loop = function () {
    
    deleteDeadCreeps();
    
    RolesController.main();
    SpawnController.main();

    for (const name in Memory.creeps) {
        mainRoles(Game.creeps[name]);
    }

    if(Game.cpu.bucket > 6000) {
        Game.cpu.generatePixel();
    }

    //generateStatsBK();
    exportStats();
    //Stats.run(); 
};

// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html