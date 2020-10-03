import { generateStatsBK } from "./stats/StatsBK";
//import { exportStats } from "./stats/StatsAGS";
//import { Stats } from "./Stats/StatsOvermind";

import { deleteDeadCreeps } from "./utils/MemoryClean";
import { SpawnController } from "./controllers/SpawnController";
import { RolesController } from "./controllers/RolesController";

// Compilar: npm run build
export const loop = function () {
    console.log(`Current game tick is ${Game.time}`);
    
    deleteDeadCreeps();
    
    SpawnController.main();
    RolesController.main();

    generateStatsBK();
    //exportStats();
    //Stats.run(); 
};

// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html