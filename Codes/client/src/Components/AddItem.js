import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Spinner, Alert } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { storage } from '../assests/firebase';
import { addItem } from '../actions/authActions'


class AddItem extends Component {
    state={
        name:'',
        price: '',
        short_desc: '',
        desc: '',
        category: '',
        picture: '',
        image: null,
        seller: '',
        qty: '',
        loading: false,
        valid: null,
    }

    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}

    onSubmit=()=>{
        this.setState({loading: true, valid: null});
        if(this.state.name.length>0 && this.state.price.length>0 && this.state.desc.length>0 && this.state.category.length>0 && this.state.seller.length >0){
            this.setState({loading: true, price: parseInt(this.state.price), qty: parseInt(this.state.qty) });
            let extention = this.state.image.name.split('.').pop();
            let filename = `${this.state.name}_${Date.now()}.${extention}`;
            const upload = storage.ref(`images/${filename}`).put(this.state.image);
            upload.on('state_changed', 
            ()=>{
    
            }, 
            ()=>{
                this.setState({valid: "Error in picture uploading!"})
            },
            ()=>{
                storage.ref('images').child(filename).getDownloadURL().then(url =>{
                    this.setState({picture: url});
                    this.props.addItem({item: this.state}).then(res=>{
                        this.setState({loading: false});
                        window.location.reload();
                    })
                })
            });

        }else{
            this.setState({valid: "Please enter all fields.!", loading: false})
        }
    }

    onPictureUpload=(e)=>{
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState({image})
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Add Item</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type='text' name='name' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Price</Label>
                            <Input type='text' name='price' placeholder='RS: ' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type='textarea' style={{height: '100px'}} name='desc' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Short Description</Label>
                            <Input type='textarea' style={{height: '50px'}} name='short_desc' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Category</Label>
                            <Input type='text' name='category' onChange={this.onChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Picture</Label>
                            <Input type='file'  name='picture' placeholder='link of the picture' onChange={this.onPictureUpload} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Seller</Label>
                            <Input type='select' name='seller'  onChange={this.onChange} required>
                                <option value=''>select</option>
                                {this.props.sellers.map((seller, index)=>(
                                    <option key={index} value={seller._id} >{seller.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Initial Quantity</Label>
                            <Input type='text' name='qty' onChange={this.onChange} required/>
                        </FormGroup>

                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color='success' onClick={this.onSubmit} >{this.state.loading? <Spinner size='sm' />:'Add Item'}</Button>
                    <Button color='danger' >Cancel</Button>
                    {this.state.valid!==null? <Alert color='danger' >{this.state.valid}</Alert>:null}
                </ModalFooter>
            </Modal>
        )
    }
}

export default withRouter(connect(null, {addItem})(AddItem));
