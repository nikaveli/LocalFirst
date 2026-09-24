"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Scrollcraft owns document-level listeners and has no destroy API. Cross its
// boundary with a document navigation so an old timeline cannot survive a route.
export default function SiteLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      prefetch={false}
      onNavigate={(event) => {
        props.onNavigate?.(event);
        if (typeof props.href === "string" && (pathname === "/" || props.href === "/")) {
          event.preventDefault();
          window.location.assign(props.href);
        }
      }}
    />
  );
}
