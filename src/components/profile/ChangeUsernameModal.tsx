"use client";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateUserUsername } from "@/services/userServices";
import { CaseUpper } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserSchema } from "@/schemas/user/UserSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebounce } from "../../hooks/useDebounce";

type Props = {
  defaultUsername: string;
  userId: string;
};

export function ChangeUserNameModal({ defaultUsername, userId }: Props) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: defaultUsername,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChangingUserName, setIsChangingUserName] = useState<boolean>(false);
  const debouncedUsername = useDebounce(form.getValues().username);

  useEffect(() => {
    const triggerUserNameChange = async () => {
      // Don't trigger validations with the default username
      if (form.getValues().username !== defaultUsername) {
        form.trigger("username");
      }

      // Don't do anything if the username is not valid
      if (form.formState.errors.username || !form.formState.isDirty) {
        return;
      }
    };

    triggerUserNameChange();
  }, [debouncedUsername]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  async function onSubmit(values: z.infer<typeof UserSchema>) {
    setIsChangingUserName(true);
    const result = await updateUserUsername(values.username, userId);

    if (!result.success) {
      toast.error(result.message);
      setIsChangingUserName(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setIsChangingUserName(false);
    handleClose();
  }

  return (
    <Card className=" flex items-center space-x-4 rounded-md border p-4 relative">
      <CaseUpper className="w-6 h-6" />
      {defaultUsername === "" || defaultUsername === undefined ? (
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      ) : null}

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {defaultUsername === "" || defaultUsername === null
            ? "Create username"
            : "Change username"}
        </p>
        <p className="text-sm text-muted-foreground">Change your username.</p>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-[36px]" variant="outline">
            Edit username
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Username</DialogTitle>
            <DialogDescription>
              Your username must have only letters, numbers, a minimum of 8
              characters and a maximum of 20.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className={`col-span-3`}
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div>
                  <ButtonLoading
                    className="mt-8"
                    disabled={!form.formState.isValid}
                    isLoading={isChangingUserName}
                    type="submit"
                  >
                    Save changes
                  </ButtonLoading>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
