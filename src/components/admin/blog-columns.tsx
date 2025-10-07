"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogPost } from "@/lib/types";
import { DataTableColumnHeader } from "@/components/admin/data-table-column-header";
import { DataTableRowActions } from "@/components/admin/data-table-row-actions";
import { useLanguage } from "@/context/language-context";

export const columns: ColumnDef<BlogPost>[] = [
  {
    id: "select",
    header: ({ table }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { translate } = useLanguage();
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={translate("admin.table.selectAllAria") as string}
        />
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { translate } = useLanguage();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={translate("admin.table.selectRowAria") as string}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    accessorFn: (row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { language } = useLanguage();
      const title =
        row.title[language] || row.title[row.defaultLanguage];
      return title;
    },
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { translate } = useLanguage();
      return (
        <DataTableColumnHeader
          column={column}
          title={translate("admin.table.columns.title") as string}
        />
      );
    },
    cell: ({ row }) => {
      const { language } = useLanguage();
      const post = row.original;
      const title = post.title[language] || post.title[post.defaultLanguage];
      return <div>{title}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "publicationDate",
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { translate } = useLanguage();
      return (
        <DataTableColumnHeader
          column={column}
          title={translate("admin.table.columns.publicationDate") as string}
        />
      );
    },
    cell: ({ row }) => {
      const dateIso = row.getValue("publicationDate");
      const date = dateIso ? new Date(dateIso as string) : null;

      if (date instanceof Date) {
        return <div>{date.toLocaleDateString()}</div>;
      }
      if (date && typeof date === "object" && "toDate" in date) {
        return <div>{(date as any).toDate().toLocaleDateString()}</div>;
      }
      return <div>Invalid Date</div>;
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { translate } = useLanguage();
      return (
        <DataTableColumnHeader
          column={column}
          title={translate("admin.table.columns.tags") as string}
        />
      );
    },
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags") || [];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-secondary-foreground p-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
