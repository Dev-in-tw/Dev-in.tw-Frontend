"use client";

// component
import Status from "@/components/Domain/Status";
import Delete from "@/components/Icons/Delete";
import Edit from "@/components/Icons/Edit";
import Eye from "@/components/Icons/Eye";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

// data
import { fake_domain_data } from "@/data/fakeOwnDomains";

export default function Domain() {
  return (
    <Table className="max-h-[45.5rem] overflow-y-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[1.1rem] w-4/12">子網域</TableHead>
          <TableHead className="text-[1.1rem] text-center w-4/12">
            狀態
          </TableHead>
          <TableHead className="text-[1.1rem] text-center w-4/12">
            動作
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fake_domain_data.map((item, index) => (
          <TableRow key={item.name + index}>
            <TableCell className="font-bold text-lg text-[#a1a1a1]">
              {item.name}
            </TableCell>
            <TableCell className="font-bold text-lg text-center">
              <Status status={item.status} />
            </TableCell>
            <TableCell>
              <div className="relative flex items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xl text-neutral-400 cursor-pointer active:opacity-50">
                      <Eye />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>訪問子網域</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xl text-neutral-400 cursor-pointer active:opacity-50">
                      <Edit />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>編輯子網域</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xl text-destructive cursor-pointer active:opacity-50">
                      <Delete />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-destructive text-white">
                    刪除子網域
                  </TooltipContent>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
