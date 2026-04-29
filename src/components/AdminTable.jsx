import { useState, useRef, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableHeader = ({ header, isFirst }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: header.column.id });
    return (
        <th ref={setNodeRef} {...attributes} {...listeners} className="bg-light-sm">
            <div onClick={header.column.getToggleSortingHandler()} className="d-flex justify-content-between align-items-center">
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>{{ asc: '  ^', desc: ' V' }[header.column.getIsSorted()] ?? null}</span>
            </div>
        </th>
    );
};

const AdminTable = ({ data, columns }) => {
    const [sorting, setSorting] = useState([]);
    const [columnOrder, setColumnOrder] = useState(() => columns.map(c => c.id || c.accessorKey));

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnOrder },
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder(order => {
                const oldIndex = order.indexOf(active.id);
                const newIndex = order.indexOf(over.id);
                return arrayMove(order, oldIndex, newIndex);
            });
        }
    };

    const tableContainerRef = useRef(null);
    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => 50,
        overscan: 5,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();
    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end : 0;

    return (
        <div ref={tableContainerRef} className="table-responsive rounded border" style={{ maxHeight: '500px', overflow: 'auto' }}>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <table className="table table-hover mb-0" style={{ minWidth: '800px', tableLayout: 'fixed' }}>
                    <thead className="sticky-top">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                                    {headerGroup.headers.map((header, i) => (
                                        <DraggableHeader key={header.id} header={header} isFirst={i === 0} />
                                    ))}
                                </SortableContext>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {paddingTop > 0 && <tr><td colSpan={columns.length} /></tr>}
                        {virtualItems.map(virtualRow => {
                            const row = rows[virtualRow.index];
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell, i) => (
                                        <td key={cell.id} className="p-2 text-truncate">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        {paddingBottom > 0 && <tr><td colSpan={columns.length} /></tr>}
                    </tbody>
                </table>
            </DndContext>
        </div>
    );
};

export default AdminTable;