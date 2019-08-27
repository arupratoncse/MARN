import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {login} from '../store/actions/authAction'
import {connect} from 'react-redux'

class Login extends Component{
    state = {
        email: '',
        password: '',
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
        e.preventDefault()
        this.props.login({
            email: this.state.email,
            password: this.state.password
        }, this.props.history)
    }

    render(){
        let {email, password, error} = this.state
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">Login Hare</h1>
                    <form onSubmit={this.submitHandler}>
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
                        <Link to='/register'>Don't Have Account ? Register Here</Link>
                        <button className='btn btn-primary my-3 d-block' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login)
