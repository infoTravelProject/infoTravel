import Layout from '@/components/Layout';
import '@/styles/globals.css';
import {GlobalProvider} from "@/components/context/GlobalContext";

export default function App({ Component, pageProps }) {

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return getLayout(
        <GlobalProvider>
            <Component {...pageProps} />
        </GlobalProvider>
    );
}