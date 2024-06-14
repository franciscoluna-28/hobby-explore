import { ActivityMotion } from "../motion/ActivityMotion";
import Image from "next/image";
import NotFound from "../../../public/not-found.webp";

export function NotFoundActivities() {
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
      <h4 className="font-bold text-mainBlack my-3 text-4xl">We&apos;re sorry...</h4>
      <span className="text-slate-500">
        We don&apos;t have activities within this category yet...
      </span>
    </div>
    </ActivityMotion>
  );
}
