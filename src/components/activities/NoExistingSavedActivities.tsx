import { ActivityMotion } from "../motion/ActivityMotion";
import Image from "next/image";
import NotFound from "../../../public/not-found.webp";
import Link from "next/link";
import { Button } from "../ui/button";

type NoExistingSavedActivitiesProps = {
  shouldBeYourOwnActivities?: boolean;
  isNotAuthenticatedUser?: boolean;
};

export function NoExistingSavedActivities({
  shouldBeYourOwnActivities = false,
  isNotAuthenticatedUser = false,
}: NoExistingSavedActivitiesProps) {
  if (isNotAuthenticatedUser) {
    return (
      <ActivityMotion>
        <div className="m-auto flex justify-center flex-col items-center my-16 gap-3 max-w-[1000px]">
          <Image
            src={NotFound}
            width={0}
            height={0}
            sizes="100vw"
            className="min-h-[150px] max-h-[200px]"
            style={{ width: "auto" }}
            alt="Not found"
          />
          <h4 className="font-bold text-mainBlack my-3 text-4xl dark:text-white">Oops...</h4>
          <div className="flex flex-col">
            <span className="text-slate-500 block text-center">
              You need to create an account before creating or saving
              activities!
            </span>
            <Button variant="ghost" className="my-2" asChild>
              <Link className="dark:text-white text-mainGreen font-medium" href={"/auth/register"}>
                Create a new account
              </Link>
            </Button>
          </div>
        </div>
      </ActivityMotion>
    );
  }

  return (
    <ActivityMotion>
      <div className="m-auto flex justify-center flex-col items-center my-16 gap-3 max-w-[1000px]">
        <Image
          src={NotFound}
          width={0}
          height={0}
          sizes="100vw"
          className="min-h-[150px] max-h-[200px]"
          style={{ width: "auto" }}
          alt="Not found"
        />
        <h4 className="font-bold text-mainBlack my-3 text-4xl">Oops...</h4>
        <div className="flex flex-col">
          <span className="text-slate-500 block text-center">
            {shouldBeYourOwnActivities
              ? "It seems you haven't created your first activity yet. Get started by creating a new one."
              : "It seems you don't have saved activities yet..."}
          </span>
          <Button variant="ghost" className="my-2" asChild>
            <Link
              className="text-mainGreen font-medium"
              href={!shouldBeYourOwnActivities ? "/app/explore" : "/app/create"}
            >
              {!shouldBeYourOwnActivities
                ? "Find some here"
                : "Start by creating a new activity"}
            </Link>
          </Button>
        </div>
      </div>
    </ActivityMotion>
  );
}
