'use client'
import React, { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingHelper from '@/components/custom/loading-helper'
import { columns, mock_data } from './columns'
import { DataTable } from './data-table'
import { type Role } from '@/lib/db/schema';
import NewRoleDialog from './new-role-dialog'

const Roles: FC = () => {
  /*
  const { isPending, error, data } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => fetch('/api/roles').then((res) => res.json()),
  });
  */

  return <div className="m-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Roles Manager</h1>
      <NewRoleDialog />
    </div>
    <DataTable columns={columns} data={mock_data} />
  </div>
}

export default Roles;
