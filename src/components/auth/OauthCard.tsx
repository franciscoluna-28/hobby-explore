import React from "react";

type Props = {
  children: React.ReactNode;
};

// Generic Oauth card template that accepts a children template
export function OauthCard({ children }: Props) {
  return (
    <div className="bg-white hover:shadow-md duration-200 h-12 w-24 flex justify-center rounded-2xl border">
      {children}
    </div>
  );
}
