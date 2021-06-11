export const SHOW_MODAL = 'SHOW_MODAL'
export const CHANGE_MODAL_TITLE = 'CHANGE_MODAL_TITLE'
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT'

export const SHOW_CREATE_MODAL = 'SHOW_CREATE_MODAL'
export const CHANGE_CREATE_MODAL_TITLE = 'CHANGE_CREATE_MODAL_TITLE'
export const SET_CREATE_MODAL_CONTENT = 'SET_CREATE_MODAL_CONTENT'

export const SET_LOADING = 'SET_LOADING'
export const SET_DATA = 'SET_DATA'
export const SET_PAGINATION = 'SET_PAGINATION'

export const CHANGE_SELECTED_ROWS = 'CHANGE_SELECTED_ROWS'
export const SHOW_SIDE_MENU = 'SHOW_SIDE_MENU'


/****** MAIN DATA *****/
export const setPagination = (pagination) => ({
    type: SET_PAGINATION,
    payload: pagination
})

export const setData = (data) => ({
    type: SET_DATA,
    payload: data
})

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const setSelectedRowKeys = (selectedRowKeys) => ({
    type: CHANGE_SELECTED_ROWS,
    payload: selectedRowKeys
})



/****  MODAL  ***/
export const showModal = visible => ({
    type: SHOW_MODAL,
    payload: visible
})

export const changeModalTitle = (modalTitle, id) => ({
    type: CHANGE_MODAL_TITLE,
    payload: modalTitle
})

export const setModalContent = modalContent => ({
    type: SET_MODAL_CONTENT,
    payload: modalContent
})


/****  CREATE MODAL  ***/
export const showCreateModal = visible => ({
    type: SHOW_CREATE_MODAL,
    payload: visible
})


export const changeCreateModalTitle = modalTitle => ({
    type: CHANGE_CREATE_MODAL_TITLE,
    payload: modalTitle
})


export const setCreateModalContent = modalContent => {

    return {
        type: SET_CREATE_MODAL_CONTENT,
        payload: modalContent
    }
    
}
