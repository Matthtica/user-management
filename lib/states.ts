import { create } from "zustand";
import { type Role } from "./db/schema";

const useRoleStore = create<Role[]>((set) => ({
  roles: [],
  fetch: async () => {
    const roles: Role[] = await fetch("/api/roles")
      .then((res) => res.json())
      .catch((err) => console.log(err));
    set({ roles });
  },
}))

export {
  useRoleStore
}
