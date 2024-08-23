"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";

export default function FeatureFlagsTable() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal },
      );
      const json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with infinite pagination"
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="primary" />
          </div>
        ) : null
      }
      classNames={{
        base: "min-h-[520px] overflow-scroll max-h-[calc(100vh_-_66px_-_3rem)]",
        table: "min-h-[400px]",
        wrapper: "w-full",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner color="primary" />}
      >
        {(item) => (
          //@ts-ignore
          <TableRow key={item?.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
