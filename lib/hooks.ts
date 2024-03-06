import { useQuery } from '@tanstack/react-query';
import { type Role, type User } from './db/schema';
import { staleTime } from './constants';
import { RoleDisplayMap, UserDisplay } from './typedefs/display-types';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ResponseToastMessage } from './typedefs/rest-types';

export function useRoles() {
  const { isPending, error, data, isFetching, refetch, isFetched } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => fetch('/api/roles')
      .then((res: Response) => res.json())
      .catch((err: any) => console.log(err)),
    staleTime,
  });
  return {
    isPending, isFetching, isFetched, error, data, refetch
  }
}

export function useUsers() {
  const { isPending, error, data: users, isFetching, refetch, isFetched } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => {
      return res.json()
    }).catch((err) => console.log(err)),
    staleTime,
  });

  return {
    isPending, isFetching, error, users, isFetched, refetch
  }
}

export function useDisplayUsers() {
  const {
    isPending: isUserPending,
    isFetching: isUserFetching,
    error: userError,
    users, isFetched: isUserFetched,
    refetch } = useUsers();

  const {
    isPending: isRolePending,
    isFetching: isRoleFetching,
    error: roleError,
    roles,
    isFetched: isRoleFetched } = useRolesMap();

  const [display_users, setDisplayUsers] = React.useState<UserDisplay[]>([]);

  const tranform_users_to_display = (data: User[]) => {
    console.log("tranform_users_to_display");
    const users_with_role_names = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roles![user.roleId].label
      }
    });
    setDisplayUsers(users_with_role_names);
  }

  React.useEffect(() => {
    console.log("recalled use effect");
    if (isUserFetched && isRoleFetched) {
      tranform_users_to_display(users!);
      console.log("Should work");
    }
    console.log(`isUserSuccess: ${isRoleFetched}, isRoleSuccess: ${isRoleFetched}`);
    console.log(`isUserPending: ${isUserFetching}, isRolePending: ${isRoleFetching}`);
  }, [isUserFetched && isRoleFetched])

  const reload = async () => {
    await refetch()
      .then(res => res.data)
      .then(data => {
        tranform_users_to_display(data!);
      }).catch(err => console.log(err));
  }

  return {
    isPending: isUserPending || isRolePending,
    isFetching: isUserFetching || isRoleFetching,
    error: userError || roleError,
    users: display_users,
    isSuccess: isUserFetched && isRoleFetched,
    refetch: reload
  }
}

export function useRolesMap() {
  const { isPending, isFetching, error, data, refetch, isFetched } = useQuery<Role[], Error, RoleDisplayMap>({
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
  return {
    isPending, isFetching, error, roles: data, isFetched, refetch
  }
}

export function useDelete(url: string, id: number, refetch: () => void) {
  const { toast } = useToast();

  const onDelete = async () => {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })
    .then(res => res.json())
    .then((msg: ResponseToastMessage) => {
      refetch();
      toast(msg)
    });
  }

  return onDelete
}
