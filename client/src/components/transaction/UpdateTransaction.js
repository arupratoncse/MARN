import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import {updateTransaction} from "../../store/actions/transactionAction";

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


class UpdateTransaction extends  React.Component{

    state = {
        amount: 0,
        note: ''
    }
    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note
        })
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
        this.props.updateTransaction(this.props.transaction._id, this.state)
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
                <h2>Update Transaction</h2>
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
                    <button className='btn btn-primary my-3 d-block' type='submit'>Update</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, {updateTransaction})(UpdateTransaction)
