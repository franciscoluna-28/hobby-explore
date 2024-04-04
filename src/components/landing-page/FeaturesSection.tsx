"use client";

export function FeaturesSection() {
  return (
    // TODO: CREATE REUSABLE COMPONENTS ONCE THE MOCKUP IS DONE
    <section className="w-full relative">
      <div className="max-w-[1100px] px-8 m-auto">
        <article className="flex gap-4 overflow-hidden mt-32 flex-col md:flex-row">
          <div className="max-w-[500px] flex-col flex justify-center">
            <h3 className="text-5xl leading-normal">
              Share Who You Are With The World
            </h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
              Discover exciting pastimes, connect with fellow enthusiasts, and
              grow personally. Welcome to Hobby Explore, your gateway to a
              vibrant world of hobbies and innovation.
            </p>
          </div>
          <img
            className="h-72 object-cover w-full"
            alt="test"
            src={"/profile.png"}
          />
        </article>
      </div>

      <div className="bg-slate-50 px-8">
        <article className="flex gap-4 overflow-hidden mt-32 max-w-[1100px] m-auto py-16 md:flex-row-reverse flex-col">
          <div className="max-w-[500px] flex justify-center flex-col">
            <h3 className="text-5xl leading-normal">Discover New Passions</h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
              Dive into a world of limitless discovery. At Hobby Explore, we
              invite you to explore the unexplored, to find new passions that
              ignite your soul and lead you to exciting adventures. Let
              curiosity be your guide and uncover what truly excites you!
            </p>
          </div>
          <img
            className="h-72 object-cover w-full"
            alt="test"
            src={"/feed.png"}
          />
        </article>
      </div>
      <div className="max-w-[1100px] px-8 m-auto">
        <article className="flex gap-4 overflow-hidden mt-32 flex-col md:flex-row">
          <div className="max-w-[500px] flex-col flex justify-center">
            <h3 className="text-5xl leading-normal">
              Let the World Find Your Hobbies
            </h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
              Share your interests with the world and let your hobbies shine. At
              Hobby Explore, your community awaits to celebrate your passions
              and connect with fellow enthusiasts. Whether it&apos;s a lifelong
              pursuit or a newfound interest, showcase what makes you uniquely
              you!
            </p>
          </div>
          <img
            className="h-72 object-cover w-full"
            alt="test"
            src={"/create.png"}
          />
        </article>
      </div>
    </section>
  );
}
