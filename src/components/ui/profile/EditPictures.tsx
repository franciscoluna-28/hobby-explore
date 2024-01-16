import { MdOutlineCameraAlt } from "react-icons/md";
import { CgScreen } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";

export function EditPictures() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon">
          <MdOutlineCameraAlt /> Change Pictures
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Pictures</DialogTitle>
          <DialogDescription>
            Change your banner or profile picture here.
          </DialogDescription>
        </DialogHeader>
       <div className="flex flex-col w-full gap-4">
        <Button className="!p-8 !m-0"> <CgScreen className="bg-mainGreen rounded-full text-4xl p-1 text-white"/> For profile picture</Button>
        <Button variant="outline">For cover picture</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
