import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?term=${term}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='flex items-center bg-white px-2 py-1'>
        <FaSearch className='text-m mr-2' />
        <input
          type='text'
          className=' border-2 focus:outline-none'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </form>
  );
}
