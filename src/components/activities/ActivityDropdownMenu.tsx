import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

export function ActivityDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="bg-white !p-0 w-8 h-8 hover:bg-white border rounded-full">
          <MoreHorizontal className="w-6 h-6 text-slate-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>More Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-500 flex gap-2 hover:bg-red-500 hover:text-white duration-200">
            <DialogTrigger className="flex items-center gap-2">
              Delete Activity <Trash2 className="w-4 h-4" />
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
