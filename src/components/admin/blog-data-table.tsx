'use client';
import * a React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  collection,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { BlogPost } from '@/lib/types';
import { columns } from './blog-columns';
import { PlusCircle, Trash2 } from 'lucide-react';
import { BlogFormDialog } from './blog-form-dialog';
import { useUser } from '@/firebase';
import { useLanguage } from '@/context/language-context';

export function BlogDataTable() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { data: blogPosts, isLoading } = useCollection<BlogPost>(
    collection(firestore, 'blogPosts')
  );
  const { translate } = useLanguage();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | undefined>(undefined);

  const table = useReactTable({
    data: blogPosts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      editPost: (post: BlogPost) => {
        setSelectedPost(post);
        setIsFormOpen(true);
      },
      deletePost: async (postId: string) => {
        if(window.confirm('Are you sure you want to delete this post?')){
            await deleteDoc(doc(firestore, 'blogPosts', postId));
        }
      },
    },
  });

  const deleteSelectedRows = async () => {
    if (window.confirm(`Are you sure you want to delete ${table.getFilteredSelectedRowModel().rows.length} posts?`)) {
      const batch = writeBatch(firestore);
      table.getFilteredSelectedRowModel().rows.forEach(row => {
        batch.delete(doc(firestore, 'blogPosts', row.original.id));
      });
      await batch.commit();
      table.resetRowSelection();
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPost(undefined);
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={translate('admin.table.filterPlaceholder')}
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button variant="destructive" onClick={deleteSelectedRows}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    {translate('admin.table.deleteButton')} ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
            )}
            <Button onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {translate('admin.table.newPostButton')}
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    {translate('admin.table.columnsButton')}
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                    return (
                        <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                        }
                        >
                        {column.id}
                        </DropdownMenuCheckboxItem>
                    );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                    Loading...
                    </TableCell>
                </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {translate('admin.table.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {translate('admin.table.previousButton')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {translate('admin.table.nextButton')}
        </Button>
      </div>
      <BlogFormDialog 
        isOpen={isFormOpen} 
        onClose={handleFormClose} 
        post={selectedPost}
        userId={user?.uid}
      />
    </div>
  );
}
