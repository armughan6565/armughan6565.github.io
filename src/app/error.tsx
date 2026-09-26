"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-[var(--header-h)]">
      <div className="container-x flex min-h-[60vh] flex-col justify-center py-20">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-6 max-w-2xl text-h1">We couldn&rsquo;t load this page.</h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          This is on our side. Please try again — if the problem continues, return to the home page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary" arrow={false}>
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
