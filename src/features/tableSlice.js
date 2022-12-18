

import {
    SEARCH,
    CHECK_PRODUCT,
    CHECK_ALL_PRODUCTS,
    SET_PRODUCT
} from "../redux/types";

const localStoredState = JSON.parse(localStorage.getItem('state'));
const initialLocalState = {
    products: [],
    selected: [],
    searched: []
}

const initialState = localStoredState ? { ...localStoredState } : { ...initialLocalState };
// const initialState = initialLocalState;

export const tableReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRODUCT:
            const { id, status, sum, qty, volume, name, delivery_date, currency, checked } = action;
            console.log(action)
            let newState;

            newState = {
                ...state,

                products: [
                    ...state.products,
                    {
                        id: id,
                        status: status,
                        sum: sum,
                        qty: qty,
                        volume: volume,
                        name: name,
                        delivery_date: delivery_date,
                        currency: currency,
                        checked: checked
                    }
                ]
            }

            // localStorage.setItem('state', JSON.stringify(newState))
            return {
                ...newState
            }

        case SEARCH:
            return (() => {
                const { string, queryType } = action;
                const lowerCaseString = string.toLowerCase();
                const products = state.products;
                let searchedProducts;

                searchedProducts = [...products.filter(item => {
                    const lowerCaseItem = item[queryType].toLowerCase();
                    if (lowerCaseItem.includes(lowerCaseString)) {
                        return item;
                    }
                })]
                return {
                    ...state,
                    searched: searchedProducts
                }
            })();

        case CHECK_PRODUCT:
            return (() => {
                const { id, checked } = action;

                let newState;

                const productIndex = state.products.findIndex(item => item.id === id);
                const selectedIndex = state.selected.findIndex(item => item.id === id);
                console.log([...state.products], productIndex)
                const newProduct = [...state.products][productIndex];
                newProduct.checked = checked;

                const nextProducts = [
                    ...state.products.slice(0, productIndex),
                    newProduct,
                    ...state.products.slice(productIndex + 1)

                    // удаляется старый продукт
                ];

                let nextSelected;
                if (checked) {
                    nextSelected = [...state.selected, newProduct]
                } else {
                    nextSelected = [
                        ...state.selected.slice(0, selectedIndex),
                        ...state.selected.slice(selectedIndex + 1)
                    ];
                }

                newState = {
                    ...state,

                    products: nextProducts,
                    selected: nextSelected
                }

                // localStorage.setItem('state', JSON.stringify(newState))
                return {
                    ...newState
                }
            })()
        case CHECK_ALL_PRODUCTS:
            return (() => {
                const { checked } = action;
                console.log(checked)

                let newState;

                const nextProducts = state.products.map(item => {
                    item.checked = checked;
                    return item;
                })

                let nextSelected;
                if (checked) {
                    nextSelected = nextProducts;
                } else {
                    nextSelected = [];
                }

                newState = {
                    ...state,

                    products: nextProducts,
                    selected: nextSelected
                }

                // localStorage.setItem('state', JSON.stringify(newState))
                return {
                    ...newState
                }
            })()
        default:
            return state;
    }

}