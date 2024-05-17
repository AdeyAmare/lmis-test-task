import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatShortMonth } from '../utils/formatting';
import { useEffect, useRef, useState } from 'react';
import { useCocData } from '../hooks/useCocData';

interface MonthData {
    month: string;
    value: number | null;
}

const CoCByMonthChart = () => {




    const [monthdata, setMonthData] = useState<MonthData[]>([]);
    const [changeSinceLastMonth, setChangeSinceLastMonth] = useState<string>()

    const { data, isLoading, isError, error } = useCocData();

    //transformation for the chart
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];



    useEffect(() => {
        if (!data) return;

        const totalCocByMonth = data.totalCocByMonth;



        const completeData: MonthData[] = allMonths.reduce<MonthData[]>((acc, month) => {
            const found = totalCocByMonth.find(item => item.month === month);
            acc.push({
                month,
                value: found ? found._count.month : null
            });
            return acc;
        }, []);

        setMonthData(completeData);


    }, [data])


    const getCurrentMonthIndex = (): number => {
        const currentDate = new Date();
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        return allMonths.findIndex(month => month.toLowerCase() === currentMonthName.toLowerCase());
    };

    useEffect(() => {
        if (monthdata.length > 1) {
            const currentIndex = getCurrentMonthIndex();
            const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : monthdata.length - 1; // Wrap around to the last month if necessary
            const currentValue = monthdata[currentIndex].value || 0;
            const previousValue = monthdata[previousIndex].value || 0;

            const change = ((currentValue - previousValue) / previousValue) * 100 || 0;
            setChangeSinceLastMonth(change.toFixed(1)); // Format to 2 decimal places
        }
    }, [monthdata]);

    // Define the gradient within the SVG definitions
    const gradientRef = useRef(null);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="flex bg-white shadow-md rounded-lg pt-3  justify-around divide-x-2 gap-x-6 py-4">
            <div className='flex flex-col gap-y-4   '>
                <h3 className='font-semibold ml-10 '>COC Graph</h3>
                <hr className='w-[90%]'></hr>
                <LineChart ref={gradientRef} width={600} height={150} data={monthdata}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#32A583" />
                            <stop offset="100%" stopColor="white" />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tickFormatter={formatShortMonth} label={{ fontSize: 4 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="url(#colorUv)" strokeWidth={4} activeDot={{ r: 0 }} />
                </LineChart>
            </div>

            <div className='flex flex-col justify-between py-5 px-4  '>
                <h2 className='font-bold'>Total COC Created this Month</h2>
                <div>
                    <p className='text-[4rem] font-extrabold leading-none'>{data?.totalCocThisMonth}</p>
                    <p>{changeSinceLastMonth}% since last Month</p>
                </div>
            </div>

        </div>
    );
};

export default CoCByMonthChart;

