import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IoMdExit } from "react-icons/io";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { LogOut } from "lucide-react";

export function LogoutModal() {
  return (
    <Card className=" flex items-center space-x-4 rounded-md border p-4">
      <LogOut className="w-6 h-6" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Log out</p>
        <p className="text-sm text-muted-foreground">
          Close the current section.
        </p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger type="button" asChild>
          <Button
            type="button"
            variant="destructive"
            className="rounded-[36px] flex gap-2"
          >
            <IoMdExit />
            Log Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              If you log out, you will need to re-enter your credentials the
              next time you want to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action="/auth/sign-out" method="post">
              <Button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-600 duration-200"
              >
                Log Out
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
