import { RoomRoles } from "../models/RoomRoles";

declare global {
  interface Memory {
    roomRoles: RoomRoles;
  }
}

export class RolesController {
  public static main(): void {
    Memory.roomRoles = new RoomRoles(2, 2, 2, 1);
  }
}
