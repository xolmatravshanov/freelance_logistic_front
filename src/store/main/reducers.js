import {SET_USER_DATA, TOGGLE_MENU} from './actions'

const initialState = {
    userData: {},
    visibleMenu: true
}

export default (state = initialState, {type, payload}) => {

    switch (type) {

        /**** SIDEBAR ****/

        case SET_USER_DATA:
            return {...state, userData: payload}


        /**** SIDEBAR ****/

        case TOGGLE_MENU:
            return {...state, visibleMenu: payload}


        default:
            return state

    }

}