import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/user-service';
import UserList from '../components/UserList';
import Search from '../components/Search';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';
import CustomModal from '../components/Modal';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import UserForm from '../components/UserForm';
import { useLocation } from 'react-router-dom';

const PAGE_SIZE = 10;

export default function UsersPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term');

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [term]);

  const { data: fetchResponse, isLoading } = useQuery({
    queryFn: async () => await fetchUsers({ page: page, pageSize: PAGE_SIZE, search: term || '' }),
    queryKey: ['users', { term, page }],
    staleTime: Infinity,
  });

  function render() {
    if (isLoading) {
      return <Skeleton times={PAGE_SIZE} className='h-4 w-full' />;
    }

    if (fetchResponse) {
      const { data, info } = fetchResponse;
      return (
        <div>
          <UserList users={data} />
          <Pagination
            pageCount={Math.ceil(info.total / PAGE_SIZE)}
            currentPage={page}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      );
    }
  }

  return (
    <Fragment>
      <div className='m-4'>
        <div className='m-2 flex justify-start items-center'>
          <button className='bg-green-600 text-white p-2 rounded-md mr-4' onClick={() => setIsOpen(true)}>
            Add User
          </button>
          <Search />
        </div>
        <div>{render()}</div>
      </div>
      {isOpen && (
        <CustomModal header='Add User' isOpen={isOpen} handleCancelClick={() => setIsOpen(false)}>
          <UserForm onSuccessSubmit={() => setIsOpen(false)} />
        </CustomModal>
      )}
    </Fragment>
  );
}
