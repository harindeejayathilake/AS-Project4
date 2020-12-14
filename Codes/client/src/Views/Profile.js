import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateProfile, deleteProfile } from '../actions/userActions';
import { logout } from '../actions/authActions';

import Navbar from '../Components/HomeNavbar';
import Footer from '../Components/Footer';
import { Card, CardBody, Form, Container, Button, CardText, FormGroup, Label, Input, Alert } from 'reactstrap';



class Profile extends Component {

    state={
        name: this.props.user !== null? this.props.user.name :'',
        email: this.props.user !== null? this.props.user.email :'',
        tp: this.props.user !== null? this.props.user.tp :'',
        address: this.props.user !== null? this.props.user.address :'',
        update_active:false,
        valid: null
    }

    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}
    toggleUpdate=()=>{this.setState({update_active: !this.state.update_active})}
    updateProfile=()=>{
        this.props.updateProfile({update: this.state}).then(res=>{
            window.location.reload();
        })
    }

    deleteProfile=()=>{
        this.setState({valid: null});
        if(this.props.user !== null){
            if(this.props.user.cart.length === 0){
                this.props.deleteProfile().then(res=>{
                    this.props.logout();
                })

            }else{
                this.setState({valid: 'Your cart is not empty! Try again after clear it out.'})
            }
        }
    }

    render() {
        return (
            <div>
                <Navbar/>

                <Container style={{ marginTop: '80px'}} >

                    <h4 style={{textAlign: 'center', marginBottom: '30px'}} >Profile</h4>

                    {this.props.user!==null?

                        !this.state.update_active? 
                            <section style={{maxWidth:'500px', margin:'auto'}} >
                                <Card style={{marginBottom: '20px'}} >
                                    <CardBody>
                                        <CardText style={{marginBottom: '2px'}}><strong>Name: </strong>{this.props.user.name} </CardText>
                                        <CardText style={{marginBottom: '2px'}}><strong>Address: </strong>{this.props.user.address} </CardText>
                                        <CardText style={{marginBottom: '2px'}}><strong>Tp: </strong>{this.props.user.tp} </CardText>
                                        <CardText style={{marginBottom: '20px'}}><strong>Email: </strong>{this.props.user.email} </CardText>
                                        <div className="clearfix" >
                                            <Button className="float-left" style={{marginLeft: '5px'}} color='warning' onClick={this.toggleUpdate} >Update Profile</Button>
                                            <Button className="float-right" style={{marginLeft: '5px'}} color='danger' onClick={this.deleteProfile} >Delete Profile</Button>
                                        </div>
                                        
                                    </CardBody>
                                </Card>

                                {this.state.valid!==null? <Alert color='danger' >{this.state.valid}</Alert>  :null}
                            </section>
                        :
                            <section style={{maxWidth:'500px', margin:'auto'}} >
                                <Form style={{marginBottom: '20px'}} >
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input name='name' type='text' placeholder={this.props.user.name} onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Address</Label>
                                        <Input name='address' type='text' placeholder={this.props.user.address} onChange={this.onChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tp</Label>
                                        <Input name='tp' type='text' placeholder={this.props.user.tp} onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input name='email' type='email' placeholder={this.props.user.email} onChange={this.onChange} />
                                    </FormGroup>
                                    <div className="clearfix" >
                                        <Button className="float-left" style={{marginLeft: '5px'}} color='warning' onClick={this.updateProfile} >Save Changes</Button>
                                        <Button className="float-right" style={{marginLeft: '5px'}} color='danger' onClick={this.toggleUpdate} >Cancel</Button>
                                    </div>
                                </Form>
                            </section>

                    :null}

                </Container>
                
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
  });

export default withRouter(connect(mapStateToProps, {updateProfile, deleteProfile, logout})(Profile));
