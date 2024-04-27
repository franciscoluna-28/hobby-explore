import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import Decoration from "../../../public/line-3.svg";

type FaqElement = {
  title: string;
  description: string;
};

const FAQ: FaqElement[] = [
  {
    title: "What is Hobby Explore?",
    description: `Hobby Explore is a unique application designed to help you discover
    exciting hobbies and activities. Whether you're seeking new
    adventures to embark on or looking to explore your interests
    further, Hobby Explore is your go-to platform.`,
  },
  {
    title: "How can Hobby Explore benefit me?",
    description: `Hobby Explore offers a treasure trove of hobby ideas and activities
    suited to your interests. By using our app, you can uncover new
    passions, connect with like-minded individuals, and enrich your life
    with fulfilling experiences.`,
  },
  {
    title: "How does Hobby Explore work?",
    description: `Hobby Explore simplifies your search for new hobbies. Browse our
    curated collection, select your interests, and get personalized
    recommendations. You can even create your own hobbies for a truly
    unique experience.`,
  },
  {
    title: "How can I get started with Hobby Explore?",
    description: `Visit our website, create an account, and start exploring. Whether
    you're a seasoned hobbyist or a newcomer, Hobby Explore
    welcomes you with open arms. Sign up effortlessly using your Google
    account with OAuth, or by registering with your email and password.`,
  },
  {
    title: "Is Hobby Explore suitable for all ages?",
    description: `Absolutely! Hobby Explore is designed to cater to individuals of all
    ages and interests. Whether you're a teenager eager to discover
    new hobbies or a retiree seeking fulfilling pastimes, our platform
    offers something for everyone. Our recommended age for users is 16
    and above, ensuring a safe and enriching experience for all.`,
  },
  {
    title: "Why I built Hobby Explore?",
    description: `Hobby Explore is my dream realized - a place where we can freely
    share our creative passions and grow together as a community. Join
    me in building a space where every hobbyist's voice is
    celebrated.`,
  },
];

export function FaqSection() {
  return (
    <section className=" max-w-[1100px] px-8 m-auto mt-16 lg:mt-32 w-full relative" id="faq">
      <Image
        className="absolute invisible lg:visible lg:translate-x-[400px] mt-12 -rotate-12"
        alt="Decoration"
        src={Decoration}
        width={200}
        height={200}
      ></Image>
      <h2 className="font-semibold text-5xl text-left my-16 max-w-[500px] leading-normal">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ.map((element, index) => {
          return (
            <AccordionItem
              key={`item-${index + 1}`}
              value={`item-${index + 1}`}
            >
              <AccordionTrigger className="text-[18px] text-left">
                <div className="flex gap-2 items-center">
                  <HelpCircle className="w-4 h-4 text-mainBlack dark:text-white duration-200 transition-all" />{" "}
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {element.title}
                </div>
              </AccordionTrigger>
              <AccordionContent >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {element.description}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
