import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApi } from '@/hooks/use-api';
import { DataTable } from '@/components/ui/data-table';
import { PaginationState, Row, Updater } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserStatus } from '@/components/custom/user/UserStatus';
import { UserLastLogin } from '@/components/custom/user/UserLastLogin';
import { staticFileUrl } from '@/lib/utils';
import { SearchInput } from '@/components/custom/common/SearchInput';
import { UserListToolbar } from './UserListToolbar';
import { Card, CardContent } from '@/components/ui/card';
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

const getUserUrl = (search: string, page: number, pageSize: number, filter: Record<string, string>) => `/users?search=${search}&page=${page + 1}&pageSize=${pageSize}&status=${filter.status}`;

export const UserListPage = () => {
  const { useGetQuery } = useApi();
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10, });
  const [filter, setFilter] = useState({ status: 'active' });

  const { data, isLoading, error } = useGetQuery<UserListResponse>(getUserUrl(search, pagination.pageIndex, pagination.pageSize, filter));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  const handlePaginationChange = (pagination: Updater<PaginationState>) => {
    setPagination(pagination);
  };

  const handleFilterChange = (filter: Updater<Record<string, string>>) => {
    setFilter(filter);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const columns = [
    {
      accessorKey: 'fullName', header: 'Name', cell: ({ row }: { row: Row<UserListItem> }) => (
        <div className="flex items-center gap-2">
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
    { accessorKey: 'status', header: 'Status', cell: ({ row }: { row: Row<UserListItem> }) => <UserStatus status={row.original.status} /> },
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
          <SearchInput placeholder="Search users..." value={search} onChange={handleSearch} />
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

// function UserActions({ user }: { user: User }) {
//   return (
//     <UpdateUserDialog user={user} />
//   );
// }

// function CreateUserDialog() {
//   const queryClient = useQueryClient();
//   const createUserMutation = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//   });

//   const handleSubmit = (data: UserFormData) => {
//     createUserMutation.mutate(data);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Create User</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create New User</DialogTitle>
//         </DialogHeader>
//         <UserForm onSubmit={handleSubmit} />
//       </DialogContent>
//     </Dialog>
//   );
// }

// function UpdateUserDialog({ user }: { user: User }) {
//   const queryClient = useQueryClient();
//   const updateUserMutation = useMutation({
//     mutationFn: updateUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//   });

//   const handleSubmit = (data: UserFormData) => {
//     updateUserMutation.mutate({ id: user.id, ...data });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Update User</DialogTitle>
//         </DialogHeader>
//         <UserForm onSubmit={handleSubmit} initialData={user} />
//       </DialogContent>
//     </Dialog>
//   );
// }
