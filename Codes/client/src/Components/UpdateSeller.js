import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateSeller } from '../actions/authActions'


class UpdateSeller extends Component {
    state={
        name: this.props.seller.name ,
        tp: this.props.seller.tp ,
        address: this.props.seller.address ,
        account_no: this.props.seller.account_no ,
        account_details: this.props.seller.account_details ,
        loading: false
    }


    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}

    onSubmit=()=>{
        this.setState({loading: true});
        this.props.updateSeller({update: this.state, seller_id: this.props.seller._id}).then(res=>{
            this.setState({loading: false});
            window.location.reload();
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Update Seller</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type='text' name='name' placeholder={this.state.name} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tp</Label>
                            <Input type='text' name='tp' placeholder={this.state.tp}  onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Address </Label>
                            <Input type='textarea' style={{height: '100px'}} name='address' placeholder={this.state.address} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account no</Label>
                            <Input type='text' name='account_no' placeholder={this.state.category} onChange={this.account_no} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Account details  </Label>
                            <Input type='textarea' style={{height: '100px'}} name='account_details' placeholder={this.state.account_details} onChange={this.onChange} required />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color='success' onClick={this.onSubmit} >{this.state.loading? <Spinner size='sm' />:'Update Seller'}</Button>
                    <Button color='danger' onClick={this.props.toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(connect(null, {updateSeller})(UpdateSeller));
