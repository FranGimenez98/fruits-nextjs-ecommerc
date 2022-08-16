import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import React, {useState} from 'react'

export default function Paginate({paginate, productsPerPage, currentPage, setCurrentPage, products}) {
  
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(products / productsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const renderPageNumber = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} className="list-none">
          <button
            className="bg-[#fafafa] w-[1.5rem] h-[1.5rem] text-[#6bbd99] rounded-md"
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className="m-auto flex items-center justify-center gap-2 my-8">
      <li className="list-none">
        <button
          onClick={(e) => handlePrev(e)}
          disabled={currentPage === pageNumbers[0] ? true : false}
          className="bg-[#fafafa] w-[1.5rem] h-[1.5rem] text-[#6bbd99] flex justify-center items-center rounded-md"
        >
          <ArrowLeftIcon />
        </button>
      </li>
      {renderPageNumber}
      <button
        onClick={(e) => handleNext(e)}
        disabled={
          currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
        }
        className="bg-[#fafafa] w-[1.5rem] h-[1.5rem] text-[#6bbd99] flex justify-center items-center rounded-md"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}