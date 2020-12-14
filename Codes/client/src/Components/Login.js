import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../actions/authActions';

class Login extends Component {

    state={
        email: '',
        password: '',
        valid: null
    }

    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}

    onSubmit=(e)=>{
        e.preventDefault();
        this.setState({valid: null});

        if(this.state.email.length> 0 && this.state.password.length>0){
            this.props.login(this.state).then(()=>{
                if(this.props.isAuthenticated && this.props.isAdmin){
                    this.props.history.push('/dashboard/orders');
                }else if(this.props.isAuthenticated){
                    window.location.reload();
                }else{
                    this.setState({valid: 'User does not exists !'})
                }
            });
        }else{
            this.setState({valid: 'Invalid Credentials !'})
        }

    }

    toggle=()=>{
        this.setState({valid:null});
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} style={{marginTop: '100px'}} >
                <ModalBody className="login" style={{borderTop: '4px solid #298dff',}} >
                    <h5 className="title" style={{fontWeight: 'bold'}} >Login</h5>
                    <hr/>

                    <Form onSubmit={this.onSubmit}  >
                        <FormGroup>
                            <Label>Email Address</Label>
                            <Input type='email' name='email' onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Password</Label>
                            <Input type='password' name='password' onChange={this.onChange} />
                        </FormGroup>

                        <Button style={{background: '#007bff', marginTop: '30px'}} size="lg" block onClick={this.onSubmit}  >Login</Button>

                    </Form>

                    {this.state.valid !== null?
                        <Alert color='danger' style={{marginTop: '20px'}} >{this.state.valid}</Alert>
                    :null}
                    
                    
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
  });
  

export default withRouter(connect(mapStateToProps, {login})(Login));