import { Check } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="w-full mt-16 lg:mt-32 max-w-[1100px] px-8 m-auto">
      <h2 className="font-semibold text-5xl text-left my-16 max-w-[500px] leading-normal">
        How Hobby Explore Will Help You
      </h2>
      <div className="grid lg:grid-cols-2">
        <article className="flex gap-8 w-full flex-col lg:flex-row">
          <div className="w-full">
            <ul className="flex flex-col gap-8 lg:max-w-[500px]">
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Explore a variety of hobbies and find new interests with ease.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Save favorite hobbies, rate them, and access helpful tips.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Share tips and insights to inspire others, while getting
                  inspired by their experiences.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white w-4 min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Whether it&apos;s art, coding, or anything in between, find
                  your niche on our app with the categories.
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="bg-mainGreen w-8 h-8 rounded-full flex items-center justify-center">
                  <Check className="text-white w-4 min-w-[40px]" />
                </div>
                <p className="text-mainBlack/80">
                  Whether it&apos;s art, coding, or anything in between, find
                  your niche on our app with the categories.
                </p>
              </li>
            </ul>
          </div>
        </article>
        <img
          className="lg:h-72  max-w-[500px]  m-auto object-cover w-full"
          alt="test"
          src={"/saved-activities.png"}
        />
      </div>
    </section>
  );
}
