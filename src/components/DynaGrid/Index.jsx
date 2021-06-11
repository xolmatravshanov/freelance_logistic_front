import React from 'react'

import { connect } from 'react-redux'

import {
    changeCreateModalTitle,
    changeModalTitle,
    setCreateModalContent,
    setModalContent,
    setSelectedRowKeys,
    showCreateModal,
    showModal,
    setData,
    setPagination,
    setLoading,
} from '../../store/dyna/actions'

import Dynagrid from './Layout'

const putState = state => ({

    data: state.dyna.data,
    pagination: state.dyna.pagination,
    loading: state.dyna.loading,
    selectedRowKeys: state.dyna.selectedRowKeys,

    modalTitle: state.dyna.modalTitle,
    createModalTitle: state.dyna.createModalTitle,

    visibleModal: state.dyna.visibleModal,
    visibleCreateModal: state.dyna.visibleCreateModal,

    modalContent: state.dyna.modalContent,
    createModalContent: state.dyna.createModalContent,

})

const putAction = {

    setLoading,
    setData,
    setPagination,
    setSelectedRowKeys,

    changeModalTitle,
    changeCreateModalTitle,

    showModal,
    showCreateModal,

    setModalContent,
    setCreateModalContent,

}

export default connect(putState, putAction)(props => <Dynagrid { ...props } />)
