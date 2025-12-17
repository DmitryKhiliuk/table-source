import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useCreateColumns} from "./columns/useCreateColumns.tsx";
import {useResizeColumns} from "./tableFeatures/resizeColumns.tsx";

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

    /*БЛОК ДЛЯ РЕСАЙЗА*/
    const [columnWidths, onMouseDown] = useResizeColumns()

    return (
        <div className="w-full overflow-x-auto p-2 box-border">
            <table className="w-full table-fixed border-collapse font-sans text-sm bg-white text-slate-900">
                <thead className="bg-slate-100">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th key={header.id}
                                    className="text-left font-semibold px-3 py-2 md:px-4 md:py-3 border border-slate-200 whitespace-nowrap"
                                    /*БЛОК ДЛЯ РЕСАЙЗА - применение ширины к шапке*/
                                    style={{
                                        position: 'relative',
                                        width: columnWidths[header.id] ? `${columnWidths[header.id]}px` : undefined,
                                        minWidth: columnWidths[header.id] ? `${columnWidths[header.id]}px` : undefined
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}

                                    {/*БЛОК ДЛЯ РЕСАЙЗА - триггер для перетаскивания*/}
                                    <div
                                        onMouseDown={(e) => onMouseDown(e, header.id)}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            height: '100%',
                                            width: 8,
                                            cursor: 'col-resize',
                                            transform: 'translateX(50%)',
                                            zIndex: 10,
                                        }}
                                        aria-hidden
                                    />
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="even:bg-slate-50 hover:bg-slate-100">
                        {row.getVisibleCells().map((cell) => {
                            return (
                                <td key={cell.id}
                                    className="px-3 py-2 md:px-4 md:py-3 border border-slate-200 align-middle whitespace-nowrap"
                                    /*БЛОК ДЛЯ РЕСАЙЗА - применение ширины к телу таблицы*/
                                    style={{
                                        width: columnWidths[cell.column.id] ? `${columnWidths[cell.column.id]}px` : undefined,
                                        minWidth: columnWidths[cell.column.id] ? `${columnWidths[cell.column.id]}px` : undefined,
                                    }}
                                >
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};
