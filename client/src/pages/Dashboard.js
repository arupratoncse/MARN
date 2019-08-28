import React from 'react'
import { connect } from 'react-redux'
import {loadTransactions, removeTransaction} from "../store/actions/transactionAction";
import CreateTransaction from "../components/transaction/CreateTransaction"
import UpdateTransaction from "../components/transaction/UpdateTransaction"


class Dashboard extends  React.Component{
    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }
    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }
    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }
    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }
    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }
    componentDidMount() {
        this.props.loadTransactions()
    }

    render(){
        let {auth, transactions} = this.props
        return(
             <div className="row">
                 <div className="col-md-8 offset-md-2">
                     <h1>Welcome {auth.user.name}</h1>
                     <span>Your Email is {auth.user.email}</span>
                     <span> Remain Balance: <strong>{auth.user.balance} </strong></span>
                     <span> Total Income: <strong>{auth.user.income}</strong> </span>
                     <span> Total Expanse: <strong>{auth.user.expense}</strong> </span>
                     <br/>
                     <button
                         className='btn btn-primary'
                         onClick={this.openCreateModal}
                     >
                         Create New Transaction
                     </button>
                     <CreateTransaction
                         isOpen={this.state.createModalOpen}
                         close={this.closeCreateModal}
                     />
                     <hr/>
                     <h1>Transactions: </h1>
                     <ul className="list-group">
                         {
                             transactions.map(transaction => (
                                 <li key={transaction._id}
                                     className="list-group-item">
                                     <p>Type: <strong>{transaction.type} </strong></p>
                                     <p>Note: <strong>{transaction.note}</strong></p>
                                     <p>Amount: <strong>{transaction.amount}</strong></p>
                                     {
                                         this.state.id === transaction._id ?
                                             <UpdateTransaction
                                                 isOpen={this.state.updateModalOpen}
                                                 close={this.closeUpdateModal}
                                                 transaction={transaction}
                                             />: null
                                     }
                                     <button
                                         onClick={() => this.props.removeTransaction(transaction._id)}
                                         className='btn btn-danger mx-3'
                                     >
                                         Remove
                                     </button>
                                     <button
                                         onClick={() => this.openUpdateModal(transaction._id)}
                                         className='btn btn-primary'
                                     >
                                         Update
                                     </button>
                                 </li>
                             ))
                         }
                     </ul>
                 </div>
             </div>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth,
    transactions: state.transactions
})
export default connect(mapStateToProps, {loadTransactions, removeTransaction})(Dashboard)
