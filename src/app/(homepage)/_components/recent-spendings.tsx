"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spending } from "@/types/spending";

export const RecentSpendings = ({
  recentSpendings,
}: {
  recentSpendings: Spending[];
}) => {
  return recentSpendings.length === 0 ? (
    <div className="w-100 flex w-full flex-col gap-1">
      <h2 className="text-3xl">Recent spendings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="h-14 text-center text-xl">
              {"You haven't spent anything in the last 7 days"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="w-100 flex w-full flex-col gap-1">
      <h2 className="text-3xl">Recent spendings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentSpendings.map((spending) => (
            <TableRow key={spending.id} className="border-0">
              <TableCell>{spending.description}</TableCell>
              <TableCell>
                {spending.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">{spending.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
