import { User } from "../db/schema"

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

export interface TRoleDeleteReq {
  id: number
}

export interface TRoleDeleteRes {
  status: 200 | 400,
  data: undefined | User[]
}

export interface ResponseToastMessage {
  title: string,
  description: string
}
