"use client";
import * as React from "react";
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
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
} from "@/firebase";
import { BlogPost } from "@/lib/types";
import { columns } from "./blog-columns";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { BlogFormDialog } from "./blog-form-dialog";
import { useUser } from "@/firebase";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";

export function BlogDataTable() {
  const firestore = useFirestore();
  const { user } = useUser();
  const blogPostsCollection = useMemoFirebase(
    () => collection(firestore, "blogPosts"),
    [firestore]
  );
  const { data: blogPosts, isLoading: isLoadingCollection } =
    useCollection<BlogPost>(blogPostsCollection);
  const { translate } = useLanguage();
  const { toast } = useToast();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | undefined>(
    undefined
  );
  const [isMutating, setIsMutating] = React.useState(false);

  const handleDeletePost = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsMutating(true);
      const docRef = doc(firestore, "blogPosts", postId);
      deleteDoc(docRef)
        .then(() => {
          toast({
            className: "bg-green-500 text-white",
            title: "Post Eliminado",
            description: "La entrada del blog ha sido eliminada.",
          });
        })
        .catch((error) => {
          errorEmitter.emit(
            "permission-error",
            new FirestorePermissionError({
              path: docRef.path,
              operation: "delete",
            })
          );
        })
        .finally(() => {
          setIsMutating(false);
        });
    }
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

  const deleteSelectedRows = async () => {
    const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRowCount} posts?`
      )
    ) {
      setIsMutating(true);
      const batch = writeBatch(firestore);
      table.getFilteredSelectedRowModel().rows.forEach((row) => {
        batch.delete(doc(firestore, "blogPosts", row.original.id));
      });
      batch
        .commit()
        .then(() => {
          toast({
            className: "bg-green-500 text-white",
            title: "Posts Eliminados",
            description: `${selectedRowCount} entradas del blog han sido eliminadas.`,
          });
          table.resetRowSelection();
        })
        .catch((error) => {
          errorEmitter.emit(
            "permission-error",
            new FirestorePermissionError({
              path: "blogPosts",
              operation: "delete",
            })
          );
        })
        .finally(() => {
          setIsMutating(false);
        });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPost(undefined);
  };

  const isLoading = isLoadingCollection || isMutating;

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={translate("admin.table.filterPlaceholder")}
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
              {translate("admin.table.deleteButton")} (
              {table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
          <Button onClick={() => setIsFormOpen(true)} disabled={isLoading}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {translate("admin.table.newPostButton")}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                disabled={isLoading}
              >
                {translate("admin.table.columnsButton")}
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
                  {translate("admin.table.loading")}
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
                  {translate("admin.table.noResults")}
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
          {translate("admin.table.previousButton")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
        >
          {translate("admin.table.nextButton")}
        </Button>
      </div>
      <BlogFormDialog
        isOpen={isFormOpen}
        onClose={handleFormClose}
        post={selectedPost}
        userId={user?.uid}
        onMutation={setIsMutating}
      />
    </div>
  );
}
