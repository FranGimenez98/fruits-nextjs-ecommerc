import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import Router from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <StoreProvider>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>
          </Auth>
        ) : (
          <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>
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
