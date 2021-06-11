export const SET_USER_DATA = 'SET_USER_DATA'
export const TOGGLE_MENU = 'TOGGLE_MENU'

export const setUserData = role => ({
    type: SET_USER_DATA,
    payload: role
})

export const toggleMenu = visible => ({
    type: TOGGLE_MENU,
    payload: visible
})
