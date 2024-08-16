import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const [term, setTerm] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
