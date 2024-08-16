import type { User } from '../services/types/user';
import DataTable from './DataTable';
import { FaUserEdit } from 'react-icons/fa';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const config = [
    {
      label: 'Name',
      render: (user: User) => user.name,
    },
    {
      label: 'Surname',
      render: (user: User) => user?.surname,
    },
    {
      label: 'Email',
      render: (user: User) => user?.email,
    },
    {
      label: 'Role',
      render: (user: User) => user?.role?.toString(),
    },
    {
      label: 'Age',
      render: (user: User) => user?.age,
    },
    {
      label: 'Operations',
      render: (user: User) => (
        <FaUserEdit
          className='hover:text-orange-500 text-orange-700 text-2xl cursor-pointer'
          onClick={() => handleEditClick(user)}
        />
      ),
    },
  ];
  const keyFn = (user: User) => {
    return user.id;
  };

  function handleEditClick(user: User) {
    console.log('edit click worked with user:', user.name);
  }

  return <DataTable<User> config={config} data={users} keyFn={keyFn} />;
}
