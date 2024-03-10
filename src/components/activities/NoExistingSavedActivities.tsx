import { ActivityMotion } from "../motion/ActivityMotion";
import Image from "next/image";
import NotFound from "../../../public/not-found.webp";
import Link from "next/link";
import { Button } from "../ui/button";

type NoExistingSavedActivitiesProps = {
  shouldBeYourOwnActivities?: boolean;
};

export function NoExistingSavedActivities({
  shouldBeYourOwnActivities = false,
}: NoExistingSavedActivitiesProps) {
  return (
    <ActivityMotion>
      <div className="m-auto flex justify-center flex-col items-center my-12 gap-3">
        <Image
          src={NotFound}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "20%", height: "auto" }}
          alt="Not found"
        />
        <h4 className="font-bold text-mainBlack my-3 text-4xl">Oops...</h4>
        <div className="flex flex-col">
          <span className="text-slate-500 block">
            {shouldBeYourOwnActivities
              ? "It seems you haven't created an activity yet. Get started by creating a new one."
              : "It seems you don't have saved activities yet..."}
          </span>
          <Button variant="ghost" className="my-2" asChild>
            <Link
              className="text-mainGreen font-medium"
              href={!shouldBeYourOwnActivities ? "/app/explore" : "/app/create"}
            >
              {!shouldBeYourOwnActivities ? "Find some here" : "Start by creating a new activity"}
            </Link>
          </Button>
        </div>
      </div>
    </ActivityMotion>
  );
}
