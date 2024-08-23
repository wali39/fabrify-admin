"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  sizes: string[];
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4 ">
        {row.original.color}
        <div
          className="w-6 h-6 rounded-full border ml-2"
          style={{ backgroundColor: row.original.color }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
