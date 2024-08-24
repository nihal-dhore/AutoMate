"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { LogOutIcon } from "lucide-react";

export default function Avatar() {
  const session = useSession();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-6 h-6 p-2 bg-gray-700 rounded-full flex"
          >
            <span className="p-0 text-white font-semibold">
              {session.data?.user.name?.charAt(0) || "U"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-foreground w-72 px-3 py-2 mr-5 rounded-md flex flex-col gap-2 shadow-lg">
          <DropdownMenuLabel className="text-gray-700 font-light text-sm text-center">
            {session.data?.user.email}
          </DropdownMenuLabel>
          <hr className="mx-2" />
          <DropdownMenuItem className="w-full pl-2 hover:bg-background rounded-md">
            <LogOutIcon size={16} />
            <Button onClick={() => signOut()} variant={"ghost"} className="">
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
