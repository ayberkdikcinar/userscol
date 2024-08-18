import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      navigate(`?term=${term}`);
    }, 500);

    return () => clearTimeout(debounce);
  }, [term, navigate]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='flex items-center bg-white px-2 py-1'>
        <FaSearch className='text-m mr-2' />
        <input
          type='text'
          className='border-2 focus:outline-none'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </form>
  );
}
