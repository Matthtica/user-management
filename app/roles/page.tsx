'use client'
import React, { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingHelper from '@/components/custom/loading-helper'
import { columns } from './columns'
import DataTable from '@/components/custom/data-table'
import { type Role } from '@/lib/db/schema';
import RoleEntryFormDialog from './role-entry-form-dialog'

const Roles: FC = () => {
  const { isPending, error, data, refetch } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => fetch('/api/roles')
      .then((res: Response) => res.json())
      .catch((err: any) => console.log(err)),
  });

  return <div className="m-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Roles Manager</h1>
      <RoleEntryFormDialog refetch={refetch}/>
    </div>
    <LoadingHelper
      className="mx-auto mt-42 w-10 h-10"
      isPending={isPending} error={error}>
      <DataTable columns={columns} data={data!} />
    </LoadingHelper>
  </div>
}

export default Roles;
