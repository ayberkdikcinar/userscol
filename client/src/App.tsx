import { useEffect, useState } from 'react';
import { fetchUsers } from './services/user-service';
import UserList from './components/UserList';
import { FetchUsersResponse } from './services/user-service';
import Search from './components/Search';
function App() {
  const [data, setData] = useState<FetchUsersResponse | null>(null);
  useEffect(() => {
    async function initialFetch() {
      const response = await fetchUsers({});
      console.log('response.data:', response.data);
      setData(response);
    }
    initialFetch();
  }, []);

  const handleAddUserClick = () => {
    console.log('add User clicked!');
  };

  return (
    <div className='m-4'>
      <div className='m-2 flex justify-start items-center'>
        <button className='bg-green-600 text-white p-2 rounded-md mr-4' onClick={handleAddUserClick}>
          Add User
        </button>
        <Search />
      </div>
      <div>
        <UserList users={data ? data.data : []} />
      </div>
    </div>
  );
}

export default App;
