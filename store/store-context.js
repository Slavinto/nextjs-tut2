import { createContext, useReducer } from "react";

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
export const StoreProvider = ({ children }) => {
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

// import { createContext, useReducer } from "react";

// export const StoreContext = createContext();

// export const ACTION_TYPES = {
//   SET_LAT_LONG: "SET_LAT_LONG",
//   SET_COFFEE_STORES: "SET_COFFEE_STORES",
// };

// const storeReducer = (state, action) => {
//   switch (action.type) {
//     case ACTION_TYPES.SET_LAT_LONG: {
//       return { ...state, latLong: action.payload.latLong };
//     }
//     case ACTION_TYPES.SET_COFFEE_STORES: {
//       return { ...state, coffeeStores: action.payload.coffeeStores };
//     }
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// };

// const StoreProvider = ({ children }) => {
//   const initialState = {
//     latLong: "",
//     coffeeStores: [],
//   };

//   const [state, dispatch] = useReducer(storeReducer, initialState);
//   return (
//     <StoreContext.Provider value={{ state, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreProvider;
