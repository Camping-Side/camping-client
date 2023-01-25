import React from "react";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";

type Href = {
  pathname: string;
  query: string | ParsedUrlQueryInput | null | undefined;
};

type Props = {
  href: Href | string;
  children: React.ReactNode;
};

export default function CustomLink(props: Props) {
  return (
    <Link
      href={{
        pathname:
          typeof props.href === "string" ? props.href : props.href.pathname,
        query: typeof props.href !== "string" ? props.href.query : "",
      }}
      passHref
    >
      <a>{props.children}</a>
    </Link>
  );
}
