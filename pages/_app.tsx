import ProtectedRoute from "components/ProtectedRoute";
import { AuthContextProvider } from "context/AuthContext";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

const noAuthPages = ["/"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Layout>
        {noAuthPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
