
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useCocData } from '../hooks/useCocData';
import { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

interface CompetencyData {
    name: string;
    value: number;
}

// Colors for the segments
const colors = ['#FF5733', '#4CAF50'];

const CustomPieChart = () => {

    const [competencyData, setCompetencyData] = useState<CompetencyData[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const { data, isLoading, isError, error } = useCocData();

    useEffect(() => {
        if (!data) return;

        const transformedDt = data.totalPracticalPassedAndFailed.map(item => ({
            name: item.practical_result,
            value: item._count.practical_result
        }));

        setCompetencyData(transformedDt);

        setTotalCount(transformedDt[0].value + transformedDt[1].value);

        console.log(transformedDt);

    }, [data])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }



    if (competencyData)
        return (
            <div className='bg-white shadow-md rounded-lg flex flex-col items-center'>
                <div className='flex flex-row justify-between p-4 w-full'>
                    <h3 className='font-bold text-xl'>Competency</h3>

                    <p className='flex items-center gap-x-2 text-sm font-semibold text-[#A3AED0]'>Monthly <FaCaretDown /></p>
                </div>
                <ResponsiveContainer width="100%" height={180} >
                    <PieChart>
                        <Pie
                            data={competencyData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}

                        >
                            {competencyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>

                    </PieChart>

                </ResponsiveContainer>

                <div className="relative -bottom-5 bg-[#F0FEFF] p-2 rounded-lg shadow-md w-[90%] flex flex-row justify-between px-5">
                    <div>
                        <p className="text-gray-400 text-sm flex gap-x-1 items-center"> <div className='rounded-full bg-red-500 h-2 w-2'></div> Total Failed</p>
                        <p className='ml-4 font-bold '>{`${((competencyData[0]?.value / totalCount) * 100).toFixed(0)}%`}</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm flex gap-x-1 items-center"> <div className='rounded-full bg-green-500 h-2 w-2'> </div>Total Passed</p>
                        <p className='ml-4 font-bold '>{`${((competencyData[1]?.value / totalCount) * 100).toFixed(0)}%`}</p>
                    </div>
                </div>
            </div>

        );
};

export default CustomPieChart;
