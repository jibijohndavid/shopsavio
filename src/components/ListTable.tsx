import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from "react-table";
import { useWindowSize } from "@/hooks/useWindowSize";

type ListTablePropType = {
  tdata: any;
  tcolumns: any;
};

function PageButton({ children, className, ...rest }: any) {
  return (
    <button
      type="button"
      className={
        `w-full rounded-lg px-4 py-2 cursor-pointer text-[#14b8a6] hover:bg-[#232529] ` +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default function ListTable({ tdata, tcolumns }: ListTablePropType) {
  const { width } = useWindowSize();
  const data = React.useMemo(() => tdata, [tdata]);
  const columns = React.useMemo(() => tcolumns, [tcolumns]);

  const {
    getTableProps,
    getTableBodyProps,
    state,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  ) as any;

  const { pageIndex, pageSize } = state as any;

  if (width > 640) {
    // Tailwinds SM Breakpoint
    return (
      <div className="bg-[#1f2a37] mb-4 rounded-lg">
        <div className="-mx-0.5">
          <div className="px-0.5">
            {/* {headerGroups.map((headerGroup: any, idx: any) => (
            <div key={idx}>
              {headerGroup.headers.map((column: any, idx: any) => (
                <p key={idx}>{column.Header}</p>
              ))}
            </div>
          ))} */}

            <table
              {...getTableProps()}
              className="w-full border-separate border-0"
            >
              <thead className="text-sm ">
                {headerGroups.map((headerGroup: any, idx: any) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column: any, idx: any) => {
                      return (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={idx}
                          className="group px-2 py-4 font-normal md:px-4 bg-[#17191c] first:rounded-bl-lg first:rounded-tl-lg last:rounded-br-lg last:rounded-tr-lg"
                        >
                          <div className="flex items-center">
                            <>
                              {column.Header}
                              {column.canResize && (
                                <div
                                  {...column.getResizerProps()}
                                  className={`resizer ${
                                    column.isResizing ? "isResizing" : ""
                                  }`}
                                />
                              )}
                            </>
                            {/* <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span> */}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium 3xl:text-sm"
              >
                {page.map((row: any, idx: any) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="min-h-[54px] mb-1 py-1 items-center shadow-card last:mb-0 border-b-2 last:border-b-0 border-[#232529] text-[#a7abb4]"
                    >
                      {row.cells.map((cell: any, idx: any) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-1 tracking-[1px] md:px-4 md:py-1 3xl:py-1"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between py-3 px-4 bg-[#191b1f] rounded-br-lg rounded-bl-lg">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="flex gap-x-6">
                  <span className="text-sm text-gray-500">
                    Total Items:{" "}
                    <span className="font-medium text-[#15b8a6]">
                      {data.length}
                    </span>
                  </span>

                  {/* <select
                  className="bg-[#2b2d32] text-xs py-1 px-2 rounded outline-none"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select> */}
                </div>
                <div className="flex justify-center items-center gap-x-10">
                  <span className="text-sm text-gray-500">
                    Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                    <span className="font-medium">{pageOptions.length}</span>
                  </span>
                  <nav
                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">First</span>
                      <ChevronDoubleLeftIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Last</span>
                      <ChevronDoubleRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {page.map((row: any, idx: any) => {
          prepareRow(row);
          return (
            <div key={idx} className="mb-3 bg-[#1f2a37] p-3 rounded-md">
              {row.cells.map((cell: any, idx: any) => {
                if (cell.column.Header === "") {
                  return null;
                } else {
                  return (
                    <div key={idx} className="flex text-sm">
                      <p className="text-gray-400">{cell.column.Header}</p>:
                      <p className="ml-2">{cell.render("Cell")}</p>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
        <div className="flex items-center justify-between py-3 px-2  rounded-br-lg rounded-bl-lg">
          <div className="flex gap-4 flex-1 justify-between items-center sm:hidden">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex gap-x-6">
              <span className="text-sm text-gray-500">
                Total Items:{" "}
                <span className="font-medium text-[#15b8a6]">
                  {data.length}
                </span>
              </span>

              {/* <select
                    className="bg-[#2b2d32] text-xs py-1 px-2 rounded outline-none"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select> */}
            </div>
            <div className="flex justify-center items-center gap-x-10">
              <span className="text-sm text-gray-500">
                Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                <span className="font-medium">{pageOptions.length}</span>
              </span>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <PageButton
                  className="rounded-l-md"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </PageButton>
                <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </PageButton>
                <PageButton
                  className="rounded-r-md"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <ChevronDoubleRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </PageButton>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
