import type { User } from '../services/types/user';
import DataTable from './DataTable';
import { FaUserEdit } from 'react-icons/fa';
import CustomModal from './Modal';
import UserForm from './UserForm';
import { useState } from 'react';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);

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
      label: 'Phone',
      render: (user: User) => user?.phone,
    },
    {
      label: 'Role',
      render: (user: User) => user?.role,
    },
    {
      label: 'Age',
      render: (user: User) => user?.age,
    },
    {
      label: 'Country',
      render: (user: User) => user?.country,
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
    setSelectedUser(user);
    setIsOpen(true);
  }

  return (
    <div>
      <DataTable<User> config={config} data={users} keyFn={keyFn} />
      <CustomModal header='Edit User' isOpen={isOpen} handleCancelClick={() => setIsOpen(false)}>
        <UserForm user={selectedUser} />
      </CustomModal>
    </div>
  );
}
