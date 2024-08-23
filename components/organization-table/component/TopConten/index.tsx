import type { Dispatch, SetStateAction } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  type Selection,
} from "@nextui-org/react";
import { capitalize } from "radash";
import { Icon } from "@iconify/react";

import { columns, statusOptions } from "../../constants";

type Props = {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  statusFilter: Selection;
  setStatusFilter: Dispatch<SetStateAction<Selection>>;
  visibleColumns: Selection;
  setVisibleColumns: Dispatch<SetStateAction<Selection>>;
  onOpen: () => void;
  count: number;
};

export function TableTopContent({
  filterValue,
  onClear,
  onSearchChange,
  setStatusFilter,
  statusFilter,
  visibleColumns,
  setVisibleColumns,
  count,
  onOpen,
}: Props) {
  return (
    <div className="flex flex-col gap-4 ignore-mark">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          classNames={{
            inputWrapper: "dark:bg-transparent",
          }}
          placeholder="Search by name..."
          startContent={<Icon icon="carbon:search" width={24} />}
          value={filterValue}
          variant="faded"
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown
            classNames={{
              content: "dark:bg-background",
            }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                className="ignore-mark"
                endContent={
                  <Icon className="text-small" icon="ion:chevron-down" />
                }
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            classNames={{
              content: "dark:bg-background",
            }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                className="ignore-mark"
                endContent={
                  <Icon className="text-small" icon="ion:chevron-down" />
                }
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              className="ignore-mark"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem
                  key={column.uid}
                  className="capitalize ignore-mark"
                >
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            className="ignore-mark"
            color="primary"
            endContent={<Icon icon="tabler:plus" width={24} />}
            onClick={onOpen}
          >
            Create new Organization
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small ignore-mark">
          Total {count} organizations
        </span>
      </div>
    </div>
  );
}
