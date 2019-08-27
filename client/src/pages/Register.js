import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../store/actions/authAction'

class Register extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
            return{
                error: nextProps.auth.error
            }
        }
        return null
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        let {name, email, password, confirmPassword} = this.state
        e.preventDefault()
        this.props.register({name, email, password, confirmPassword}, this.props.history)
    }

    render(){
        let {name, email, password, confirmPassword, error} = this.state
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">Register Hare</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                className={error.name ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Your Name"
                                name='name'
                                id='name'
                                value={name}
                                onChange={e => this.changeHandler(e)}
                            />
                            {error.name && <div className="invalid-feedback">
                                {error.name}
                            </div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                className={error.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Your Email"
                                name='email'
                                id='email'
                                value={email}
                                onChange={e => this.changeHandler(e)}
                            />
                            {error.email && <div className="invalid-feedback">
                                {error.email}
                            </div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Password: </label>
                            <input
                                type="password"
                                className={error.password ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Your Password"
                                name='password'
                                id='password'
                                value={password}
                                onChange={e => this.changeHandler(e)}
                            />
                            {error.password && <div className="invalid-feedback">
                                {error.password}
                            </div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Confirm Password: </label>
                            <input
                                type="password"
                                className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={e => this.changeHandler(e)}
                            />
                            {error.confirmPassword && <div className="invalid-feedback">
                                {error.confirmPassword}
                            </div>}
                        </div>
                        <Link to='/login'>Already Have Account ? Login Here</Link>
                        <button className='btn btn-primary my-3 d-block' type='submit'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {register})(Register)
