'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { BlogPost } from '@/lib/types';
import { DataTableColumnHeader } from '@/components/admin/data-table-column-header';
import { DataTableRowActions } from '@/components/admin/data-table-row-actions';

export const columns: ColumnDef<BlogPost>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'publicationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publication Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('publicationDate');
      if (date instanceof Date) {
        return <div>{date.toLocaleDateString()}</div>;
      }
       // Handle Firestore Timestamp
      if (date && typeof date === 'object' && 'toDate' in date) {
        return <div>{(date as any).toDate().toLocaleDateString()}</div>;
      }
      return <div>Invalid Date</div>;
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
        const tags: string[] = row.getValue('tags') || [];
        return <div className="flex flex-wrap gap-1">{tags.map(tag => <span key={tag} className="text-xs bg-secondary text-secondary-foreground p-1 rounded-md">{tag}</span>)}</div>
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
