import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/use-api';
import { DataTable } from '@/components/custom/data-table';
import { PaginationState, Row, Updater } from '@tanstack/react-table';
import { Button, buttonVariants } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserStatus } from '@/components/custom/user/UserStatus';
import { UserLastLogin } from '@/components/custom/user/UserLastLogin';
import { getQueryString, staticFileUrl } from '@/lib/utils';
import { useConfirmDialog } from '@/hooks/use-dialog';
import { toast } from 'sonner';
import { UserListFilter, UserListFilterItem } from './UserListFilter';
import axios from '@/lib/axios';
import { UpdateUserDialog } from './UpdateUserDialog';
import { PageContainer, PageContent, PageHeader, PageTitle } from '@/components/custom/common/PageContainer';
import { SearchInput } from '@/components/custom/form/SearchInput';
import { AddUserDialog } from './AddUserDialog';

interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  lastLoggedinAt: string;
};

const getUsersData = async ({ queryKey }: { queryKey: any }) => {
  const [_key, queryParams] = queryKey;
  const response = await axios.get(`/users?${getQueryString(queryParams)}`)
  return response.data
}

export const UserListPage = () => {
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10, });
  const [filter, setFilter] = useState({ status: 'active', role: '' });

  const queryClient = useQueryClient();
  const { useApiMutation } = useApi();
  const { confirmDialog } = useConfirmDialog();
  const [updateId, setUpdateId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', {
      search,
      status: filter.status,
      role: filter.role,
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    }],
    queryFn: getUsersData
  })

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

  const handleSearch = (_search: string) => {
    setSearch(_search);
    setPagination((previousPagination) => ({ ...previousPagination, pageIndex: 0 }));
    //queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handleFilterChange = (_filterItem: Updater<UserListFilterItem>) => {
    setFilter(_filterItem);
    setPagination((previousPagination) => ({ ...previousPagination, pageIndex: 0 }));
    //queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handlePaginationChange = (_pagination: Updater<PaginationState>) => {
    setPagination(_pagination);
    //queryClient.invalidateQueries({ queryKey: ['users'] });
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
      updateUserStatus({ id, isActive: status !== 'active' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  }

  const columns = [
    {
      accessorKey: 'fullName', header: () => <span className="ps-3">Name</span>, cell: ({ row }: { row: Row<UserListItem> }) => (
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
          <Link to={`/users/${row.original.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <Eye className="h-4 w-4" />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setUpdateId(row.original.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <PageContainer>
      <PageHeader>
        <div className="flex items-center gap-2">
          <PageTitle>Users</PageTitle>
          <SearchInput placeholder="Search users..." onChange={handleSearch} />
          <UserListFilter filter={filter} onFilterChange={handleFilterChange} />
        </div>
        <AddUserDialog />
      </PageHeader>
      <PageContent variant="card">
        {isLoading ? <div>Loading...</div> :
          <DataTable data={data?.data || []} columns={columns} pagination={pagination} onPaginationChange={handlePaginationChange} pageCount={data?.totalPages} />
        }
      </PageContent>
      <UpdateUserDialog userId={updateId} onClose={() => setUpdateId(null)} />
    </PageContainer>
  );
}