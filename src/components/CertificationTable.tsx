import { useEffect, useMemo } from 'react';
import { useCertData } from '../hooks/useCertData';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { combineNames } from '../utils/formatting';
import { IoEye } from 'react-icons/io5';
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

// Assuming useCertData returns data in the expected format
export interface DataItem {
    id: number;
    reg_no: string;
    first_name: string;
    father_name: string;
    occ_name: string;
    assessed: string;
    sub_city: string;
    city: string;
}

const CertificationTable = () => {
    const { data, isLoading, isError, error } = useCertData({ page: 1, limit: 10 });


    const preparedData = useMemo(() => data || [], [data]);


    const columnHelper = createColumnHelper<DataItem>();

    useEffect(() => {
        if (!data) return;

        console.log(data);
    }, [data]);



    // Define columns
    const columns = [
        columnHelper.accessor('id', { id: 'no', header: 'No' }),
        columnHelper.accessor('first_name', {
            id: 'name',
            header: 'Name',
            cell: (cell) => {
                const combinedName = combineNames(cell.row.original);
                return <div className='flex items-center gap-x-2'><img src='src/assets/profilepic.jpeg' width={40} className="rounded-full" />{combinedName}</div>;
            },
        }),
        columnHelper.accessor('assessed', {
            id: 'assessed',
            header: 'Assessed',
            cell: (cell) => {
                const isAssessed = cell.row.original.assessed === "Yes";
                const result = isAssessed ? "Assessed" : "Not Assessed";
                const textColor = isAssessed ? "text-green-500 bg-green-200" : "text-red-500 bg-red-200";
                const classfinal = textColor + " text-center p-1 rounded-md"

                return <p className={classfinal}>{result}</p>;
            },
        }),
        columnHelper.accessor('reg_no', { id: 'registrationNo', header: 'Registration No' }),
        columnHelper.accessor('sub_city', {
            id: 'location',
            header: 'Location',
            cell: (cell) => {
                const combinedLocation = cell.row.original.sub_city + ", " + cell.row.original.city;
                return <p className='uppercase'>{combinedLocation}</p>;
            },
        }),
        columnHelper.accessor((row: DataItem) => row.id, {
            id: "action",
            header: "Action",
            cell: () => {
                return (
                    <button className='flex items-center gap-x-2 rounded-md bg-[#F0F7F7] text-sm p-2 p-3`'> <IoEye />View</button>
                );
            },
        }),
    ];



    // Create table instance
    const table = useReactTable({
        data: preparedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel()
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (table)
        return (
            <div className='bg-white shadow-md rounded-lg flex flex-col'>

                <div>
                    <table className="divide-y divide-gray-200 w-full">
                        <thead className="bg-[#F0F7F7]">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-2 md:px-6 py-3 text-right font-medium  tracking-wider"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-2 md:px-6 md:py-2  text-right text-xs md:text-sm"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination and other controls here */}
                </div>

                {/*  pagination controls */}
                <div className="flex justify-around p-4 text-sm mt-5">
                    {/* Jump to controls */}
                    <div className="flex items-center gap-x-4">
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </strong>
                        </span>
                        <span className="flex items-center gap-1">
                            Go to page:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* button controls */}
                    <div className="space-x-2">
                        <button
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="  font-bold py-2 px-3 rounded-md"
                        >
                            <FaAnglesLeft />
                        </button>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className=" font-bold py-2 px-3 rounded-md"
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className=" font-bold py-2 px-3 rounded-md"
                        >
                            <FaAngleRight />
                        </button>
                        <button
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                            className=" font-bold py-2 px-3 rounded-md"
                        >
                            <FaAnglesRight />
                        </button>
                    </div>
                </div>

            </div>
        );

};

export default CertificationTable;
