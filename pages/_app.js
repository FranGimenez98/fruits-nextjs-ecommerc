import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { usePageLoading } from "../hooks/usePageLoading";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { isPageLoading } = usePageLoading();

  return (
    <StoreProvider>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            {isPageLoading ? <h1>Loading...</h1> : <Component {...pageProps} />}
          </Auth>
        ) : (
          <>
            {isPageLoading ? <h1>Loading...</h1> : <Component {...pageProps} />}
          </>
        )}
      </SessionProvider>
    </StoreProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }
  return children;
}

export default MyApp;
