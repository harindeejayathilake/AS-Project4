import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addSeller } from '../actions/authActions'


class AddSeller extends Component {
    state={
        name: '' ,
        tp: '' ,
        address: '' ,
        account_no: '',
        account_details: '' ,
        loading: false
    }


    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}

    onSubmit=()=>{
        this.setState({loading: true});
        this.props.addSeller({seller: this.state}).then(res=>{
            this.setState({loading: false});
            window.location.reload();
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Add Seller</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type='text' name='name' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tp</Label>
                            <Input type='text' name='tp'  onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Address </Label>
                            <Input type='textarea' style={{height: '100px'}} name='address' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account no</Label>
                            <Input type='text' name='account_no' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account details  </Label>
                            <Input type='textarea' style={{height: '100px'}} name='account_details' onChange={this.onChange} required />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color='success' onClick={this.onSubmit} >{this.state.loading? <Spinner size='sm' />:'Add Seller'}</Button>
                    <Button color='danger' onClick={this.props.toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(connect(null, {addSeller})(AddSeller));
