"use client";

import type { Selection, SortDescriptor } from "@nextui-org/react";

import { useCallback, useState, useMemo } from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import sortOn from "sort-on";
import { Marker } from "react-mark.js";

import { CreateOrganizationForm } from "../CreateOrganizationForm";

import {
  columns,
  statusOptions,
  type ColumnKey,
  type OrganizationsType,
} from "./constants";
import { TableTopContent } from "./component/TopConten";
import { renderCellOrganizations } from "./renderCell";

const INITIAL_VISIBLE_COLUMNS: NoInfer<ColumnKey>[] = [
  "name",
  "timeZone",
  "isActive",
  "isDemo",
  "nameId",
  "processingRuns",
  "importerRuns",
  "createdAt",
  "updatedAt",
];

export default function Table({
  organizations,
}: {
  organizations: OrganizationsType;
}) {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns.slice(0);

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrganizations = [...organizations];

    if (hasSearchFilter) {
      filteredOrganizations = filteredOrganizations.filter((org) =>
        org.organization?.name
          ?.toLowerCase()
          .includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrganizations = filteredOrganizations.filter((org) =>
        Array.from(statusFilter).includes("active")
          ? org.organization?.isActive
          : !org.organization?.isActive,
      );
    }

    return filteredOrganizations;
  }, [filterValue, statusFilter, hasSearchFilter, organizations]);

  const sortedItems = useMemo(() => {
    return sortOn(
      filteredItems,
      `${sortDescriptor.direction === "ascending" ? "" : "-"}organization.${sortDescriptor.column}`,
    );
  }, [sortDescriptor, filteredItems]);

  const renderCell = useCallback(renderCellOrganizations, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = useMemo(() => {
    return (
      <TableTopContent
        count={organizations.length}
        filterValue={filterValue}
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        onClear={onClear}
        onOpen={onOpen}
        onSearchChange={onSearchChange}
      />
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onClear,
    organizations.length,
    onOpen,
  ]);

  return (
    <>
      <CreateOrganizationForm
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <Marker
        mark={filterValue}
        options={{
          exclude: [".ignore-mark"],
        }}
      >
        <NextUITable
          isHeaderSticky
          aria-label="Organizations"
          className={"overflow-x-auto"}
          classNames={{
            wrapper:
              "max-h-[calc(100vh_-_66px_-_3rem)] min-h-[calc(100vh_-_66px_-_3rem)] justify-start",
            base: "felx-1",
            tr: "hover:bg-primary/10",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="inside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={"start"}
                // align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="ignore-mark"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No organizations found"}
            items={sortedItems}
            loadingContent={<Spinner color="primary" />}
          >
            {(item) => (
              <TableRow key={item.organization.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as ColumnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </NextUITable>
      </Marker>
    </>
  );
}
