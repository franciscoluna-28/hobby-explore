import { Tables } from "@/lib/database";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  tip: Tables<"tips">;
};

export function TipCarouselCard({ tip }: Props) {
  return (

      <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] shadow-sm h-[320px] z-0 bg-mainGreen border-none ">
        <div className="relative overflow-hidden">
          <img
            className="object-cover !rounded-t-xl w-full max-h-[200px] overflow-hidden z-50"
            src={tip.display_image_url ? tip.display_image_url! : ""}
          />
        </div>
        <CardHeader>
        <CardDescription className="text-white">
        Be careful with the summer heat, puppies don’t wear shoes, and they may not be aware of heat.
        </CardDescription>
        </CardHeader>
      </Card>

  );
}
