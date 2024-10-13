import { User, UserFormData } from '@/types/user';

export async function fetchUsers({ search, page, pageSize, sortBy, sortOrder }: {
  search: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}) {
  // Implement the API call with sorting parameters
  // Example:
  const response = await fetch(`/api/users?search=${search}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  return response.json();
}

export async function updateUser({ id, ...data }: UserFormData & { id: string }): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}
