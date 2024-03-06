'use client'
import React from 'react'
import DataTable from '@/components/custom/data-table'
import { FetchLoading } from '@/components/custom/loading-helper'
import { columns } from './components/columns';
import UserEntryFormDialog from './components/user-entry-form-dialog'
import { useDisplayUsers } from '@/lib/hooks';

export default function Users() {
  const { isPending, error, users, isFetching, refetch } = useDisplayUsers();

  return <div className="m-5 flex-1 flex flex-col gap-3 overflow-y-hidden">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Users Manager</h1>
      <UserEntryFormDialog refetch={refetch}/>
    </div>
    <FetchLoading
      className="mx-auto mt-40 w-10 h-10"
      isPending={isPending} error={error}>
      <DataTable columns={columns} isLoading={isFetching} data={users} className="overflow-y-scroll"/>
    </FetchLoading>
  </div>
}
