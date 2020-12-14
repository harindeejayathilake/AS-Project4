import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, Alert } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register } from '../actions/authActions';

class Register extends Component {

    state={
        name: '',
        email: '',
        password: '',
        re_password: '',
        address:'',
        valid: null
    }

    onChange=(e)=>{ this.setState({[e.target.name]:e.target.value})};

    onSubmit=(e)=>{
        e.preventDefault();
        this.setState({valid: null});
        if(this.state.password === this.state.re_password){
            this.props.register(this.state).then(res=>{
                if(this.props.isAuthenticated){
                    window.location.reload();
                }else{
                    this.setState({valid: 'User does not exists !'})
                }
            })

        }else{
            this.setState({valid: 'Password does not match !'})
        }
    }


    toggle=()=>{
        this.setState({valid:null});
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} >
                <ModalBody className="login" style={{borderTop: '4px solid #298dff',}} >
                    <h5 class="title" style={{fontWeight: 'bold'}} >Register New User</h5>
                    <hr/>

                    <Form onSubmit={this.onSubmit} >
                        <FormGroup>
                            <Label>User Name</Label>
                            <Input type='text' name="name" required onChange={this.onChange} />
                        </FormGroup>


                        <FormGroup>
                            <Label>Email</Label>
                            <Input type='email' name="email" required  onChange={this.onChange} />
                        </FormGroup>

                        
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type='textarea' name="address" required onChange={this.onChange} />
                        </FormGroup>


                        <FormGroup>
                            <Label>Password</Label>
                            <Input type='password' name="password" required onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <Input type='password' name="re_password"  onChange={this.onChange} />
                        </FormGroup>


                        <Button style={{background: '#007bff', marginTop: '30px'}} size="lg" block onClick={this.onSubmit} >Register</Button>

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
  

export default withRouter(connect(mapStateToProps, {register})(Register));