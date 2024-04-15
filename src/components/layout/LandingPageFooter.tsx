import Link from "next/link";
import { NewsletterForm } from "@/components/landing-page/NewsletterForm";

export default function LandingPageFooter() {
  return (
    <footer className="w-full bg-mainBlack mt-32">
      <div className="flex flex-col min-w-full max-w-[1100px] items-center justify-center m-auto p-8 ">
        <div className="w-full ">
          <h4 className="text-white font-bold text-3xl max-w-[500px] text-center leading-normal m-auto">
            Subscribe To our Newsletter
          </h4>
          <span className="text-[#9d9d9d] text-sm mt-4 text-center m-auto flex justify-center">
            We&apos;re adding new features often!
          </span>
          <NewsletterForm />
          <article className="grid md:grid-cols-2 lg:grid-cols-4 mt-16 gap-16 m-auto justify-center max-w-[1000px] bg-[#252525] p-8 rounded-[16px] shadow-xl">
            <div className="">
              <h5 className="text-white font-semibold">Hobby Explore</h5>
              <span className="!mt-4 block text-footerGray text-sm">
                We help you discover new interests and hobbies.
              </span>
            </div>

            <div className="">
              <h5 className="text-white font-semibold">Links</h5>
              <ul>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="#"
                  >
                    About
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="#"
                  >
                    Guides
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="#"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h5 className="text-white font-semibold">About the Creator</h5>
              <ul>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="https://twitter.com/CodingWithFran"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="https://linkedin.com/in/franciscoluna28"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="https://franciscolunadev.com/"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h5 className="text-white font-semibold">Social Media</h5>
              <ul>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="https://twitter.com/HobbyExplore"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    className="text-footerGray text-sm hover:text-gray duration-100"
                    href="#"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </article>

          <span className="text-center text-footerGray w-full text-sm mt-16 block">
            © 2024 Hobby Explore. Developed by Francisco Luna.
          </span>
        </div>
      </div>
    </footer>
  );
}
