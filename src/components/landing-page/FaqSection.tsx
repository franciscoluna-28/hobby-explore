import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section className="max-w-[1100px] px-8 m-auto mt-16 w-full">
      <h2 className="font-semibold text-5xl text-left my-16 max-w-[500px] leading-normal">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-[18px] text-left">
            <div className="flex gap-2 items-center">
              <HelpCircle className="w-4 h-4 text-mainBlack" /> What is Hobby
              Explore?{" "}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Hobby Explore is a unique application designed to help you discover
            exciting hobbies and activities. Whether you&apos;re seeking new
            adventures to embark on or looking to explore your interests
            further, Hobby Explore is your go-to platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-[18px] text-left">
            How can Hobby Explore benefit me?{" "}
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Hobby Explore offers a treasure trove of hobby ideas and activities
            suited to your interests. By using our app, you can uncover new
            passions, connect with like-minded individuals, and enrich your life
            with fulfilling experiences.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className=" text-[18px] text-left">
            How does Hobby Explore work?
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Hobby Explore simplifies your search for new hobbies. Browse our
            curated collection, select your interests, and get personalized
            recommendations. You can even create your own hobbies for a truly
            unique experience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left text-[18px]">
            How can I get started with Hobby Explore?
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Visit our website, create an account, and start exploring. Whether
            you&apos;re a seasoned hobbyist or a newcomer, Hobby Explore
            welcomes you with open arms. Sign up effortlessly using your Google
            account with OAuth, or by registering with your email and password.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className=" text-[18px] text-left">
            Is Hobby Explore suitable for all ages?
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Absolutely! Hobby Explore is designed to cater to individuals of all
            ages and interests. Whether you&apos;re a teenager eager to discover
            new hobbies or a retiree seeking fulfilling pastimes, our platform
            offers something for everyone. Our recommended age for users is 16
            and above, ensuring a safe and enriching experience for all.{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className=" text-[18px] text-left">
            Why I built Hobby Explore?
          </AccordionTrigger>
          <AccordionContent className="text-darkGray">
            Hobby Explore is my dream realized - a place where we can freely
            share our creative passions and grow together as a community. Join
            me in building a space where every hobbyist&apos;s voice is
            celebrated.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
