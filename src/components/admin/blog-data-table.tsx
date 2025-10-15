"use client";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlogPost } from "@/lib/types";
import { columns } from "./blog-columns";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { BlogFormDialog } from "./blog-form-dialog";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import {
  deletePost,
  deleteSelectedPosts,
  getBlogs,
} from "@/services/blog_service";

export function BlogDataTable() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingCollection, setIsLoadingCollection] = useState(false);
  const { translate } = useLanguage();
  const { toast } = useToast();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(
    undefined
  );
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    const getBlogsData = async () => {
      setIsLoadingCollection(true);
      try {
        const blogs = await getBlogs();
        setBlogPosts(blogs);
      } catch (error) {
        toast({
          variant: "destructive",
          title: translate(
            "admin.toast.unexpectedErrorFetchingPosts.title"
          ) as string,
          description: translate(
            "admin.toast.unexpectedErrorFetchingPosts.description"
          ) as string,
        });
      } finally {
        setIsLoadingCollection(false);
      }
    };
    getBlogsData();
  }, [isMutating]);

  const handleDeletePost = async (postId: string) => {
    try {
      if (!window.confirm(translate("admin.confirm.deleteSingle") as string)) {
        return;
      }

      setIsMutating(true);
      setIsLoadingCollection(true);
      await deletePost(postId);
      toast({
        className: "bg-green-500 text-white",
        title: translate("admin.toast.deleteSuccess.title") as string,
        description: translate(
          "admin.toast.deleteSuccess.description"
        ) as string,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: translate(
          "admin.toast.unexpectedErrorDeletingPost.title"
        ) as string,
        description: translate(
          "admin.toast.unexpectedErrorDeletingPost.description"
        ) as string,
      });
    } finally {
      setIsMutating(false);
      setIsLoadingCollection(false);
    }
  };

  const deleteSelectedRows = async () => {
    if (!window.confirm(translate("admin.confirm.deleteMultiple") as string)) {
      return;
    }
    setIsMutating(true);
    try {
      await deleteSelectedPosts(table.getFilteredSelectedRowModel().rows);
      toast({
        className: "bg-green-500 text-white",
        title: translate("admin.toast.deleteMultipleSuccess.title") as string,
        description: translate(
          "admin.toast.deleteMultipleSuccess.description"
        ) as string,
      });
      table.resetRowSelection();
    } catch (error) {
      toast({
        variant: "destructive",
        title: translate(
          "admin.toast.unexpectedErrorDeletingBatchPost.title"
        ) as string,
        description: translate(
          "admin.toast.unexpectedErrorDeletingBatchPost.description"
        ) as string,
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPost(undefined);
  };

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
      deletePost: handleDeletePost,
    },
  });

  const isLoading = isLoadingCollection || isMutating;

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={translate("admin.table.filterPlaceholder") as string}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          disabled={isLoading}
        />
        <div className="flex items-center gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              onClick={deleteSelectedRows}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {translate("admin.table.deleteButton") as string} (
              {table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
          <Button onClick={() => setIsFormOpen(true)} disabled={isLoading}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {translate("admin.table.newPostButton") as string}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                disabled={isLoading}
              >
                {translate("admin.table.columnsButton") as string}
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
                      {column.id === "publicationDate"
                        ? (translate(
                            "admin.table.columns.publicationDate"
                          ) as string)
                        : column.id === "title"
                        ? (translate("admin.table.columns.title") as string)
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
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
            {isLoadingCollection ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {translate("admin.table.loading") as string}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  {translate("admin.table.noResults") as string}
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
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          {translate("admin.table.previousButton") as string}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
        >
          {translate("admin.table.nextButton") as string}
        </Button>
      </div>
      <BlogFormDialog
        isOpen={isFormOpen}
        onClose={handleFormClose}
        post={selectedPost}
        userId={"user?.uid"}
        onMutation={setIsMutating}
      />
    </div>
  );
}
