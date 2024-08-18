import { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  const [pageRangeStart, setPageRangeStart] = useState(1);

  const pageMaxLimit = Math.min(pageCount, 5);
  const pages = Array.from({ length: pageMaxLimit }, (_, i) => pageRangeStart + i);

  useEffect(() => {
    const newPageRangeStart = Math.max(
      Math.min(currentPage - Math.floor(pageMaxLimit / 2), pageCount - pageMaxLimit + 1),
      1
    );
    setPageRangeStart(newPageRangeStart);
  }, [currentPage, pageCount, pageMaxLimit]);

  const handleLeftClick = () => {
    if (pageRangeStart > 1) {
      setPageRangeStart(pageRangeStart - 1);
    }
  };

  const handleRightClick = () => {
    if (pageRangeStart + pageMaxLimit <= pageCount) {
      setPageRangeStart(pageRangeStart + 1);
    }
  };
  return (
    <div className='flex items-center justify-center'>
      <div
        className={`border p-2 flex flex-col text-center justify-center cursor-pointer ${
          pageRangeStart === 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleLeftClick}
      >
        <FaArrowLeft />
      </div>
      {pages.map((page) => (
        <div
          className={`border p-2 text-sm cursor-pointer hover:bg-gray-300 ${
            currentPage === page ? 'bg-gray-500 text-white' : 'bg-gray-100'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={`border p-2 flex flex-col text-center justify-center cursor-pointer ${
          pageRangeStart + pageMaxLimit - 1 >= pageCount ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleRightClick}
      >
        <FaArrowRight />
      </div>
    </div>
  );
}
