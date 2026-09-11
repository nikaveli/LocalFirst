import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode;
}

export default function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-hairline bg-canvas p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-surface-strong text-primary">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5" })}
      </div>
      <h3 className="font-display text-lg text-ink font-semibold leading-snug">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-body font-light">{text}</div>
    </div>
  );
}
