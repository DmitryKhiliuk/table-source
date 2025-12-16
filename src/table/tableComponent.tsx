import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useCreateColumns} from "./columns/useCreateColumns.tsx";

type TableComponentPropsType = {
    data: any
    dataColumns: any
}

export const TableComponent = ({data, dataColumns}: TableComponentPropsType) => {

    const columns = useCreateColumns(dataColumns)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full overflow-x-auto p-2 box-border">
            <table className="w-full border-collapse font-sans text-sm bg-white text-slate-900">
                <thead className="bg-slate-100">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="text-left font-semibold px-3 py-2 md:px-4 md:py-3 border border-slate-200 whitespace-nowrap">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="even:bg-slate-50 hover:bg-slate-100">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-3 py-2 md:px-4 md:py-3 border border-slate-200 align-middle whitespace-nowrap">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};
