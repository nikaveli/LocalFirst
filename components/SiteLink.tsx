"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Cross the homepage boundary with a document navigation, including anchored URLs.
export default function SiteLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      prefetch={false}
      onNavigate={(event) => {
        props.onNavigate?.(event);
        const targetPath = typeof props.href === "string" ? props.href.split("#")[0] : undefined;
        if (typeof props.href === "string" && (pathname === "/" || targetPath === "/")) {
          event.preventDefault();
          window.location.assign(props.href);
        }
      }}
    />
  );
}
