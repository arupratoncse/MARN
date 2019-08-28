import * as Types from '../actions/types'

import axios from 'axios'

export const loadTransactions = () => dispatch => {
    axios.get('/api/transaction/')
        .then(response => {
            dispatch({
                type: Types.LOAD_TRANSACTION,
                payload: {
                    transactions: response.data
                }
            })
        })
        .catch(error => console.log(error))
}

export const addNewTransaction = transaction => dispatch => {
    axios.post('/api/transaction/', transaction)
        .then(response => {
            dispatch({type: Types.CREATE_TRANSACTION, payload: {transaction: response.data}})
        })
        .catch(error => console.log(error))
}

export const removeTransaction = id => dispatch => {
    axios.delete(`/api/transaction/${id}`)
        .then(response => {
            dispatch({type: Types.REMOVE_TRANSACTION, payload: {id: response.data._id}})
        })
        .catch(error => console.log(error))
}

export const updateTransaction = (id, transaction) => dispatch => {
    axios.put(`/api/transaction/${id}`, transaction)
        .then(response => {
            dispatch({type: Types.UPDATE_TRANSACTION, payload: {transaction: response.data.transaction}})
        })
        .catch(error => console.log(error))
}
