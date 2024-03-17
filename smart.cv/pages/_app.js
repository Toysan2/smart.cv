import { SpeedInsights } from "@vercel/speed-insights/next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { useStore } from "@/store/store";
import Navbar from "@/app/components/navbar";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <SpeedInsights />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
