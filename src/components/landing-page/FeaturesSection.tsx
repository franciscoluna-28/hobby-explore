"use client";

export function FeaturesSection() {
  return (
    <section className="w-full relative">
      <div className="max-w-[1100px] px-8 m-auto">
      <article className="flex overflow-hidden lg:mt-32 max-w-[1100px] m-auto py-16 lg:flex-row-reverse flex-col gap-8">
          <div className="w-full lg:max-w-[400px] flex justify-center flex-col">
            <h3 className="text-5xl leading-normal">Share Who you are with the World</h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
            Discover exciting pastimes, connect with fellow enthusiasts, and
              grow personally. Welcome to Hobby Explore, your gateway to a
              vibrant world of hobbies and innovation.
            </p>
          </div>
          <img
            className="h-48 md:h-64 md:min-w-[300px] lg:h-72 overflow-hidden mt-4 object-cover mr-auto"
            alt="test"
            src={"/feed.png"}
          />
        </article>


       
      </div>

      <div className="bg-slate-50 px-8">
        <article className="flex overflow-hidden mt-16 lg:mt-32 max-w-[1100px] m-auto py-16 lg:flex-row flex-col lg:px-8 gap-8 w-full">
          <div className="w-full lg:max-w-[400px] flex justify-center flex-col">
            <h3 className="text-5xl leading-normal">Discover New Passions</h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
              Dive into a world of limitless discovery. At Hobby Explore, we
              invite you to explore the unexplored, to find new passions that
              ignite your soul and lead you to exciting adventures. Let
              curiosity be your guide and uncover what truly excites you!
            </p>
          </div>
          <img
            className="h-48 md:h-64 md:min-w-[300px] lg:h-72 overflow-hidden mt-4 object-cover mr-auto lg:ml-auto"
            alt="test"
            src={"/feed.png"}
          />
        </article>
      </div>
      <div className="max-w-[1100px] px-8 m-auto">
      <article className="flex overflow-hidden lg:mt-32 max-w-[1100px] m-auto py-16 lg:flex-row-reverse flex-col gap-8 w-full">
          <div className="w-full lg:max-w-[400px] flex justify-center flex-col">
            <h3 className="text-5xl leading-normal">   Let the World Find Your Hobbies</h3>
            <p className="text-[#1E1E1E]/80 mt-4 text-[18px]">
            Share your interests with the world and let your hobbies shine. At
              Hobby Explore, your community awaits to celebrate your passions
              and connect with fellow enthusiasts. Whether it&apos;s a lifelong
              pursuit or a newfound interest, showcase what makes you uniquely
              you!
            </p>
          </div>
          <img
            className="h-48 md:h-64 md:min-w-[300px] lg:h-72 overflow-hidden mt-4 object-cover mr-auto"
            alt="test"
            src={"/feed.png"}
          />
        </article>
      </div>
    </section>
  );
}
