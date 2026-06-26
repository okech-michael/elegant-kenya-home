import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { CartProvider } from "@/context/CartContext";

function NotFoundComponent() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        The piece you're looking for has been moved or is no longer available.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm text-bone hover:bg-charcoal/90 transition-colors"
      >
        Return home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">This page didn't load</h1>
      <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-bone hover:bg-charcoal/90"
        >
          Try again
        </button>
        <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-accent">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nyumba — Premium Furniture, Crafted in Nairobi" },
      {
        name: "description",
        content:
          "Premium handcrafted furniture from Nairobi. Office, living, dining and bedroom collections delivered anywhere in Kenya.",
      },
      { name: "author", content: "Nyumba Furniture" },
      { property: "og:title", content: "Nyumba — Premium Furniture, Crafted in Nairobi" },
      { property: "og:description", content: "Premium handcrafted furniture delivered anywhere in Kenya." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nyumba" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#221f1c" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppFab />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
