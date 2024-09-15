"use client";
import ListEmail from "@/components/List/ListEmail";
import SearchBar from "@/components/List/SearchBar";
import { useList } from "@/hook/useList";
import React, { type FC, Suspense } from "react";

const List: FC<Record<string, never>> = () => {
  const { listName } = useList();

  return (
    <div className="bg-[#f0ebec] dark:bg-[#202020] rounded-l-2xl overflow-hidden shadow-lg h-[80vh] w-[360px] p-5">
      <SearchBar />
      <Suspense fallback={<p>hello</p>}>
        <ListEmail list={listName} />
      </Suspense>
    </div>
  );
};

export default List;
