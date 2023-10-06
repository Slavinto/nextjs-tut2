import Footer from "../components/Footer.component";
import Navigation from "../components/Navigation.component";
import Layout from "../components/Layout.component";

import "../styles/globals.css";
import "../styles/footer.scss";
import "../styles/style.scss";
import StoreProvider from "../store/store-context";

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Layout>
                <Navigation />
                <main className='content _container'>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </Layout>
        </StoreProvider>
    );
}

export default MyApp;
