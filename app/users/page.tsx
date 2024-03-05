'use client'
import React from 'react'
import DataTable from '@/components/custom/data-table'
import { FetchLoading } from '@/components/custom/loading-helper'
import { columns } from './components/columns';
import { type User, type Role } from '@/lib/db/schema';
import { useQuery } from '@tanstack/react-query'
import UserEntryFormDialog, { type RoleDisplayMap } from './components/user-entry-form-dialog'
import { staleTime } from '@/lib/constants';

interface UserDisplay {
  name: string,
  email: string,
  role: string,
}

export default function Users() {
  const { isPending, error, data, refetch, isSuccess } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => {
      return res.json()
    }).catch((err) => console.log(err)),
    staleTime
  });
  const {
    isPending: isPendingRole,
    error: errorRole,
    data: dataRole,
    isSuccess: isSuccessRole } = useQuery<Role[], Error, RoleDisplayMap>({
    queryKey: ['roles'],
    queryFn: () => fetch('/api/roles')
      .then((res) => res.json())
      .catch((err) => console.log(err)),
    select: (data) => {
      let result: RoleDisplayMap = {};
      data.forEach((role) => {
        result[role.id] = {
          value: role.id.toString(),
          label: role.name
        }
      })
      return result;
    },
    staleTime
  });

  const convertRoleIdToName = () => {
    if (isSuccess && isSuccessRole) {
      const result: UserDisplay[] = data.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: dataRole![user.roleId.toString()].label
        }
      })
      return result;
    } else {
      return []
    }
  }

  return <div className="m-5 flex-1 flex flex-col gap-3 overflow-y-hidden">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Users Manager</h1>
      <FetchLoading isPending={isPendingRole} error={errorRole}>
        <UserEntryFormDialog roles={dataRole!} refetch={refetch}/>
      </FetchLoading>
    </div>
    <FetchLoading
      className="mx-auto mt-40 w-10 h-10"
      isPending={isPending && isPendingRole} error={error}>
      <DataTable columns={columns} data={convertRoleIdToName()} className="overflow-y-scroll"/>
    </FetchLoading>
  </div>
}
