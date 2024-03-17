'use client'
import React from 'react'
import { FetchLoading } from '@/components/custom/loading-helper'
import { columns } from './components/columns'
import DataTable from '@/components/custom/data-table'
import RoleEntryFormDialog from './components/role-entry-form-dialog'
import { useRoles } from '@/lib/hooks'

export default function Roles() {
  const { isPending, isFetching, error, data, refetch } = useRoles();

  return <div className="flex-1 m-5 flex flex-col gap-3 overflow-y-hidden">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Roles Manager</h1>
      <RoleEntryFormDialog refetch={refetch} />
    </div>
    <FetchLoading
      className="mx-auto mt-40 w-10 h-10"
      isPending={isPending} error={error}>
      <DataTable columns={columns} isLoading={isFetching} data={data!} className="overflow-y-scroll" />
    </FetchLoading>
  </div>
}
