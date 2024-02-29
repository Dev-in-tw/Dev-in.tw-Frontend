"use client";

// module
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";

// component
import Eye from "@/components/Icons/Eye";
import Edit from "@/components/Icons/Edit";
import Delete from "@/components/Icons/Delete";

import Status from "@/components/Domain/Status";

// data
import { fake_domain_data } from "@/data/fakeOwnDomains";

export default function Domain() {
  return (
    <>
      <Table
        removeWrapper
        isHeaderSticky
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        className="max-h-[45.5rem] overflow-y-auto"
      >
        <TableHeader>
          <TableColumn className="text-[1.1rem] w-4/12">子網域</TableColumn>
          <TableColumn className="text-[1.1rem] text-center w-4/12">
            狀態
          </TableColumn>
          <TableColumn className="text-[1.1rem] text-center w-4/12">
            動作
          </TableColumn>
        </TableHeader>
        <TableBody style={{ overflowY: "scroll" }}>
          {fake_domain_data.map((item, index) => {
            return (
              <TableRow key={item.name + index}>
                <TableCell className="font-bold text-lg text-[#a1a1a1]">
                  {item.name}
                </TableCell>
                <TableCell className="font-bold text-lg text-center">
                  <Status status={item.status} />
                </TableCell>
                <TableCell className="flex">
                  <div className="relative flex items-center gap-2 mx-auto">
                    <Tooltip content="訪問子網域">
                      <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                        <Eye />
                      </span>
                    </Tooltip>
                    <Tooltip content="編輯子網域">
                      <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                        <Edit />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="刪除子網域">
                      <span className="text-xl text-danger cursor-pointer active:opacity-50">
                        <Delete />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div> */}
    </>
  );
}
