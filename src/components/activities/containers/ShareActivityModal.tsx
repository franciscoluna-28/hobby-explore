"use client";

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
import { Tables } from "@/lib/database";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { LinkedinIcon, WhatsappIcon, XIcon } from "react-share";

type Props = {
  activityId: Tables<"activities">["activity_id"];
};

export function ShareActivityModal({ activityId }: Props) {
  const DYNAMIC_URL = `https://hobby-explore.vercel.app/app/activities/${activityId}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-6 w-fit">
          Share Hobby
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Activity</DialogTitle>
          <DialogDescription>
            Share your hobby or activity in different social media platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-8">
          <TwitterShareButton url={DYNAMIC_URL}>
            <XIcon round size={40} />
          </TwitterShareButton>

          <WhatsappShareButton url={DYNAMIC_URL}>
            <WhatsappIcon round size={40} />
          </WhatsappShareButton>

          <LinkedinShareButton url={DYNAMIC_URL}>
            <LinkedinIcon round size={40} />
          </LinkedinShareButton>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
