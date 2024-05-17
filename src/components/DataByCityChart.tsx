import { useEffect, useState } from 'react';
import { useCocData } from '../hooks/useCocData';
import { replaceAcronym } from '../utils/formatting';

interface CityData {
  city: string;
  count: number;
}


const DataByCityChart = () => {
  // Calculate the maximum count to determine the fill limit

  const { data, isLoading, isError, error } = useCocData();

  const [transformedData, setTransformedData] = useState<CityData[]>([]);

  useEffect(() => {
    if (!data) return;

    // Assuming cocData is imported correctly
    const transformedDt = data.totalCountByCity.map((item: { city: any; _count: { city: any; }; }) => ({
      city: item.city,
      count: item._count.city,
    }));

    setTransformedData(transformedDt);

  }, [data])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className='bg-white shadow-md rounded-lg h-[50vh] p-5'>

      <h1 className='font-bold text-xl mb-5'>COC by City</h1>

      {/*[{"city":"AA","count":12}]  */}
      {transformedData.map((data, index) => (
        <div key={index} className="flex items-center justify-between py-2 gap-x-4">
          <div className="text-sm font-medium text-gray-900">{replaceAcronym(data.city)}</div>
          <div className="w-3/5 bg-gray-200 rounded-full h-2.5 ">
            <div
              className="bg-[#32A583] h-2.5 rounded-full"
              style={{ width: `${(data.count / 30) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-900">{data.count.toLocaleString()}</span>
        </div>
      ))}


    </div>

  );
};

export default DataByCityChart;