// import { generateStatsBK } from "./stats/StatsBK";
// import { Stats } from "./Stats/StatsOvermind";
import { ErrorMapper } from "./utils/ErrorMapper";

import { RolesController } from "./controllers/RolesController";
import { SpawnController } from "./controllers/SpawnController";
import { deleteDeadCreeps } from "./utils/MemoryClean";
import { exportStats } from "./stats/StatsAGS";

// Temporal
import { mainRoles } from "./old/Roles";

// Compilar: yarn build
// Subir a sim: yarn push-sim
// Subir a main: yarn push-main
export const loop = ErrorMapper.wrapLoop(() => {
  deleteDeadCreeps();

  RolesController.main();
  SpawnController.main();

  for (const name in Memory.creeps) {
    mainRoles(Game.creeps[name]);
  }

  if (Game.cpu.bucket > 6000) {
    Game.cpu.generatePixel();
  }

  exportStats();
  // generateStatsBK();
  // Stats.run();
});

// IMPORTANTE, LEER Y APLICAR CUANDO SEA POSIBLE
// https://docs.screeps.com/contributed/modifying-prototypes.html
