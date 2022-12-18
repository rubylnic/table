import {
    SEARCH,
    CHECK_PRODUCT,
    CHECK_ALL_PRODUCTS,
    SET_PRODUCT
} from './types';

export function setProduct(arr) {
    const [id, status, sum, qty, volume, name, delivery_date, currency, checked] = arr;
    return {
        type: SET_PRODUCT,
        id, status, sum, qty, volume, name, delivery_date, currency, checked
    }
}

export function search(string, queryType) {
    return {
        type: SEARCH,
        string,
        queryType
    }
}


export function checkProduct(id, checked) {
    return {
        type: CHECK_PRODUCT,
        id,
        checked
    }
}
export function checkAllProducts(checked) {
    return {
        type: CHECK_ALL_PRODUCTS,
        checked
    }
}