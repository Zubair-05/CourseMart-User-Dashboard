import {atom, selector} from 'recoil';

export const courseState = atom({
    key: 'courseState',
    default: []
});

export const cartState = atom({
    key: 'cartState',
    default: []
});

export const purchasedCourseState = atom({
    key: 'purchasedCourseState',
    default: []
});

export const courseDetails = atom({
    key: 'courseDetails',
    default: {
        courseId: 0,
        title: '',
        description: '',
        price: 0,
        image: '',
        // instructor: '',
        // category: '',
        // rating: 0,
        // numReviews: 0,
        // isFeatured: false,
        // dateCreated: '',
        // lastUpdated: ''
    }
});


export const cartTotal = selector({
    key: 'cartTotal',
    get: ({get}) => {
        const cart = get(cartState);
        return cart.reduce((acc, curr) => acc + curr.price, 0);
    }
});

export const cartCount = selector({
    key: 'cartCount',
    get: ({get}) => {
        const cart = get(cartState);
        return cart.length;
    }
});

export const purchasedloadingState = atom({
    key: 'loadingState',
    default: false
});

export const courseLoaingState = atom({
    key: 'courseLoaingState',
    default: false
});

export const cartLoadingState = atom({
    key: 'cartLoadingState',
    default: false
});