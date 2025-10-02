'use client';

import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pen, Trash } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
    const { translate } = useLanguage();
  const post = row.original as BlogPost;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{translate('admin.rowActions.openMenu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => (row.table.options.meta as any)?.editPost(post)}
        >
          <Pen className="mr-2 h-4 w-4" />
          {translate('admin.rowActions.edit')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => (row.table.options.meta as any)?.deletePost(post.id)}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash className="mr-2 h-4 w-4" />
          {translate('admin.rowActions.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
