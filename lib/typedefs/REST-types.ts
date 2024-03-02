export interface RoleRestType {
  name: string,
  productPermission: boolean[],
  workspacePermission: boolean[]
}

export interface UserRestType {
  name: string,
  email: string,
  roleId: number
}
