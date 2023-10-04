const initialState = {
    vendorList: [],
    totalpage: null,
    isloading: false,
    isError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ARRAY_LIST":
            return { ...state, vendorList: action.payload }
        case "TOTALPAGE":
            return { ...state, totalpage: action.payload }
        case "DATALOADING":
            return { ...state, isloading: true }
        case "DATALOADED":
            return { ...state, isloading: false }
        case "FETCHERROR":
            return { ...state, isError: true }
        case "NOERROR":
            return { ...state, isError: false }
        default:
            return state
    }
}

export { reducer };