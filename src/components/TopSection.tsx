import React from 'react';
import { useCocData } from '../hooks/useCocData';

import { FiBriefcase } from 'react-icons/fi';

const TopSection: React.FC = () => {
  const { data, isLoading, isError, error } = useCocData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="shadow-md p-4 rounded-md flex flex-col justify-center gap-1">
          <img src='/assets/icons/totalcoc.svg' width={40} className='mb-1 ' />
          <p className='font-extrabold text-gray-600 text-xl'>{data?.totalCoc}</p>

          <h2 className="text-md text-gray-600 mb-2 font-semibold">Total COC</h2>
        </div>
        <div className="shadow-md  p-4 rounded-md flex flex-col justify-center gap-1">
          <img src='/assets/icons/totalcom.svg' width={40} className='mb-1 ' />
          <p className='font-extrabold  text-gray-600 text-xl'>{data?.totalCompleted}</p>
          <h2 className="text-md text-gray-600 font-semibold mb-2">Total Completed</h2>

        </div>
        <div className="shadow-md  p-4 rounded-md flex flex-col justify-center gap-1">
          <FiBriefcase className='text-green-700' size={40} />

          <p className='font-extrabold  text-gray-600 text-xl'>{data?.totalRegular}</p>
          <h2 className="text-md text-gray-600 font-semibold">Total Regular</h2>
        </div>
        <div className="shadow-md  p-4 rounded-md  flex flex-col justify-center gap-1">
          <img src='/assets/icons/totalcoc.svg' width={40} className='mb-1 ' />
          <p className='font-extrabold  text-gray-600 text-xl'>{data?.totalDistance}</p>

          <h2 className="text-md text-gray-600 font-semibold mb-2">Total Distance</h2>
        </div>
        <div className="shadow-md p-4 rounded-md flex flex-col justify-center gap-1">
          <img src='/assets/icons/totalpassed.svg' width={40} className='mb-1 ' />
          <p className='font-extrabold  text-gray-600 text-xl'>{data?.totalPracticalPassed}</p>
          <h2 className="text-md text-gray-600 mb-2  font-semibold">Total Passed</h2>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
