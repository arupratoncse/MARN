import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import {addNewTransaction} from "../../store/actions/transactionAction";

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
}


class CreateTransaction extends  React.Component{

    state = {
        amount: 0,
        type: '',
        note: ''
    }
    changeHandler(e){
        if(e.target.name === 'amount'){
            this.setState({
            [e.target.name]: parseInt(e.target.value, 10)
        })
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    submitHandler = event => {
        event.preventDefault()
        this.props.addNewTransaction(this.state)
        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
        this.props.close()

    }
    render(){
        let {amount, note} = this.state
        return(
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h2>Create A New Transaction</h2>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount: </label>
                        <input
                            type="number"
                            min="0"
                            className='form-control'
                            placeholder="Enter Amount"
                            name='amount'
                            id='amount'
                            value={amount}
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type: </label>
                        <select
                            name="type"
                            id="type"
                            className='form-control'
                            onChange={e => this.changeHandler(e)}
                        >
                            <option >Select A Type</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note: </label>
                        <textarea
                            className='form-control'
                            placeholder="Enter a Note"
                            name='note'
                            id='note'
                            value={note}
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>
                    <button className='btn btn-primary my-3 d-block' type='submit'>Create</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, {addNewTransaction})(CreateTransaction)
