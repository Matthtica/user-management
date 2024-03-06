export interface RoleDisplay {
  value: string,
  label: string
}

export interface RoleDisplayMap {
  [key: number]: RoleDisplay
}

export interface UserDisplay {
  name: string,
  email: string,
  role: string,
}
