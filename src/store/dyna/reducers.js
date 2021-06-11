import {
    CHANGE_SELECTED_ROWS,
    CHANGE_MODAL_TITLE,
    SET_MODAL_CONTENT,
    SHOW_CREATE_MODAL,
    CHANGE_CREATE_MODAL_TITLE,
    SHOW_MODAL,
    SET_CREATE_MODAL_CONTENT,
    SHOW_SIDE_MENU, SET_DATA, SET_PAGINATION, SET_LOADING,
} from './actions'

const initialState = {

    visibleModal: false,
    modalTitle: 'Modal Title',
    modalContent: 'Modal Content',

    visibleCreateModal: false,
    createModalTitle: 'Create Modal Title',
    createModalContent: 'Create Modal Content',

    selectedRowKeys: [],
    data: [],
    loading: false,
    pagination: {
        current: 1,
        pageSize: 50,
    }

}

export default (state = initialState, action) => {

    switch (action.type) {

        /**** MAIN DATA ****/
        case CHANGE_SELECTED_ROWS:
            return {...state, selectedRowKeys: action.payload}

        case SET_LOADING:
            return {...state, loading: action.payload}

        case SET_DATA:
            return {...state, data: action.payload}

        case SET_PAGINATION:
            return {...state, pagination: action.payload}



        /****** MODAL  ********/
        case SHOW_MODAL:
            return {...state, visibleModal: action.payload}

        case SET_MODAL_CONTENT:
            return {...state, modalContent: action.payload}

        case CHANGE_MODAL_TITLE:
            return {...state, modalTitle: action.payload}


        /****** CREATE MODAL * ******/
        case CHANGE_CREATE_MODAL_TITLE:
            return {...state, createModalTitle: action.payload}

        case SHOW_CREATE_MODAL:
            return {...state, visibleCreateModal: action.payload}

        case SET_CREATE_MODAL_CONTENT:
            return {...state, createModalContent: action.payload}



        default:
            return state

    }

}