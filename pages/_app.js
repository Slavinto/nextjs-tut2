// import StoreProvider from "../store/store-context";
import Footer from "../components/Footer.component";
import Navigation from "../components/Navigation.component";
import Layout from "../components/Layout.component";
import { createContext, useReducer } from "react";

import "../styles/style.scss";

export const StoreContext = createContext();

export const ACTION_TYPES = {
    CHANGED_LOCATION: "CHANGED_LOCATION",
    SET_COFFE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (storesState, action) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGED_LOCATION: {
            return {
                ...storesState,
                location: action.payload.location,
            };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return {
                ...storesState,
                coffeeStores: action.payload.coffeeStores,
            };
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
};
const StoreProvider = ({ children }) => {
    const initialState = {
        location: "",
        coffeeStores: [],
    };
    const [storesState, dispatch] = useReducer(storeReducer, initialState);
    return (
        <StoreContext.Provider
            value={{
                storesState,
                dispatch,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

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
