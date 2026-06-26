import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="container-x pt-16 md:pt-24 pb-12">
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h1 className="mt-3 font-display text-4xl md:text-6xl leading-[1.05] max-w-4xl">{title}</h1>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
