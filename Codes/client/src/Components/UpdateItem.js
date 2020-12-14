import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateItem } from '../actions/authActions'


class UpdateItem extends Component {
    state={
        name: this.props.item !== null? this.props.item.name : '',
        price: this.props.item !== null? this.props.item.price : '',
        short_desc: this.props.item !== null? this.props.item.short_desc : '',
        desc: this.props.item !== null? this.props.item.desc : '',
        category: this.props.item !== null? this.props.item.category : '',
        qty: this.props.item !== null? this.props.item.qty : '',
        loading: false
    }


    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}

    onSubmit=()=>{
        this.setState({loading: true, price: parseInt(this.state.price), qty: parseInt(this.state.qty) });
        this.props.updateItem({update: this.state, item_id: this.props.item._id}).then(res=>{
            this.setState({loading: false});
            window.location.reload();
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Update Item</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type='text' name='name' placeholder={this.state.name} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input type='text' name='price' placeholder={`RS: ${this.state.price}`}  onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type='textarea' style={{height: '100px'}} name='desc' placeholder={this.state.desc} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Short Description</Label>
                            <Input type='textarea' style={{height: '50px'}} name='short_desc' placeholder={this.state.short_desc} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Category</Label>
                            <Input type='text' name='category' placeholder={this.state.category} onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Initial Quantity</Label>
                            <Input type='text' name='qty' placeholder={this.state.qty} onChange={this.onChange} required/>
                        </FormGroup>

                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color='success' onClick={this.onSubmit} >{this.state.loading? <Spinner size='sm' />:'Update Item'}</Button>
                    <Button color='danger' onClick={this.props.toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(connect(null, {updateItem})(UpdateItem));
