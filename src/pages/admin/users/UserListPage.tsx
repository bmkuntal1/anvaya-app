import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApi } from '@/hooks/use-api';
import { DataTable } from '@/components/custom/data-table';
import { PaginationState, Row, Updater } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserStatus } from '@/components/custom/user/UserStatus';
import { UserLastLogin } from '@/components/custom/user/UserLastLogin';
import { getQueryString, staticFileUrl } from '@/lib/utils';
import { SearchInput } from '@/components/custom/common/SearchInput';
import { UserListToolbar } from './UserListToolbar';
import { Card, CardContent } from '@/components/ui/card';
import { useConfirmDialog } from '@/hooks/use-dialog';
import { toast } from 'sonner';
import { UserListFilter } from './UserListToolbar';

type UserListItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  lastLoggedinAt: string;
};

type UserListResponse = {
  data: UserListItem[];
  total: number;
};



export const UserListPage = () => {
  const { useApiQuery, useApiMutation } = useApi();
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10, });
  const [filter, setFilter] = useState({ status: 'active', role: '' });
  const queryClient = useQueryClient();
  const { confirmDialog } = useConfirmDialog();

  const { data, isLoading, error } = useApiQuery<UserListResponse>(`/users?${getQueryString({ search, status: filter.status, roles: filter.role, page: pagination.pageIndex + 1, pageSize: pagination.pageSize })}`,
    {
      queryKey: ['users'],
    });

  const { mutate: updateUserStatus } = useApiMutation(`/users/status`, {
    method: 'put',
    onSuccess: () => {
      toast.success('User status updated successfully', {
        position: 'top-center',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error('Failed to update user status', {
        description: error.response?.data?.message || error.message,
        position: 'top-center',
      });
    }
  });

  const { mutate: deleteUser } = useApiMutation(`/users`, {
    method: 'delete',
    onSuccess: () => {
      toast.success('User deleted successfully', {
        position: 'top-center',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error('Failed to delete user', {
        description: error.response?.data?.message || error.message,
        position: 'top-center',
      });
    }
  });

  const handleSearch = (search: string) => {
    setSearch(search);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handlePaginationChange = (pagination: Updater<PaginationState>) => {
    setPagination(pagination);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handleFilterChange = (filterItem: Updater<UserListFilter>) => {
    setFilter(filterItem);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handleDelete = async (id: string) => {
    const result = await confirmDialog({
      type: 'delete',
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
    });

    if (result === true) {
      deleteUser(id);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    const result = await confirmDialog({
      type: 'confirm',
      title: 'Update User Status',
      message: 'Are you sure you want to update this user status?',
      cancelText: 'Cancel',
      confirmText: 'Update',
    });
    if (result === true) {
      updateUserStatus({ id, isActive: status === 'active' ? false : true });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  }

  const columns = [
    {
      accessorKey: 'fullName', header: <span className="ps-3">Name</span>, cell: ({ row }: { row: Row<UserListItem> }) => (
        <div className="flex items-center gap-2 ps-3">
          <Avatar>
            <AvatarImage src={staticFileUrl(row.original.avatar)} className="w-10 h-10 object-cover" />
            <AvatarFallback className="bg-gray-500 text-white">{row.original.firstName.charAt(0).toUpperCase()}{row.original.lastName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Link to={`/users/${row.original.id}`} className="hover:underline">
            {row.original.firstName} {row.original.lastName}
          </Link>
        </div>
      )
    },
    { accessorKey: 'email', header: 'Email', cell: ({ row }: { row: Row<UserListItem> }) => <span>{row.original.email}</span> },
    { accessorKey: 'role', header: 'Roles', cell: ({ row }: { row: Row<UserListItem> }) => <span className="capitalize">{row.original.role}</span> },
    { accessorKey: 'lastLogin', header: 'Last Login', cell: ({ row }: { row: Row<UserListItem> }) => <UserLastLogin lastLogin={row.original.lastLoggedinAt} /> },
    {
      accessorKey: 'status', header: 'Status', cell: ({ row }: { row: Row<UserListItem> }) => (
        <Button size="sm" variant="ghost" className="hover:bg-transparent" onClick={() => handleUpdateStatus(row.original.id, row.original.status)}>
          <UserStatus status={row.original.status} />
        </Button>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<UserListItem> }) => (
        <div className="flex items-center">
          <Link to={`/admin/users/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/admin/users/${row.original.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Users</h1>
          <SearchInput placeholder="Search users..." onChange={handleSearch} />
        </div>
        <UserListToolbar filter={filter} onFilterChange={handleFilterChange} />
      </div>
      {isLoading ? <div>Loading...</div> :
        <Card>
          <CardContent className="p-0 pb-4">
            <DataTable data={data?.data || []} columns={columns} pagination={pagination} onPaginationChange={handlePaginationChange} />
          </CardContent>
        </Card>}
    </div>
  );
}