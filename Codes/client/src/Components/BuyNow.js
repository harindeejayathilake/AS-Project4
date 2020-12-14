import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { buyNow } from '../actions/userActions';
import { Alert, Button, Modal, ModalBody } from 'reactstrap';

class BuyNow extends Component {

    state={
        account_no: '',
        exp_m: '',
        exp_d:'',
        account_name:'',
        cvc:'',
        valid:null
    }

    onChange=(e)=>{this.setState({[e.target.name]: e.target.value})};

    payCart=()=>{
        this.setState({valid: null});
        if(this.state.account_no.length>0 && this.state.exp_m.length>0 && this.state.exp_d.length>0 && this.state.account_name.length>0 && this.state.cvc.length>0){
            this.props.buyNow(this.props.payment).then(res=>{
                window.location.reload();
            })
        }else{
            this.setState({valid: 'Invalid Credrentials !'})
        }
       
    }

    onSubmit=(e)=>{
        e.preventDefault();
    }

    render() {
        return (
            <Modal className="checkout-payment" isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalBody className="checkout" style={{borderTop: '4px solid #298dff'}} >
                    <h5 className="title" style={{fontWeight: 'bold'}} >Checkout</h5>
                    <hr/>

                    <div className="item" style={{marginBottom: '16px'}}>
                        <p className="item-name" style={{fontWeight: 'bold', marginBottom: '0'}} >Billing Name</p>
                        <p className="item-description" style={{fontSize: '14px', color: 'grey', marginBottom: '0'}} >{this.props.name}</p>
                    </div>

                    <div className="item" style={{marginBottom: '16px'}}>
                        <p className="item-name" style={{fontWeight: 'bold', marginBottom: '0'}} >Billing Address</p>
                        <p className="item-description" style={{fontSize: '14px', color: 'grey', marginBottom: '0'}} >{this.props.address}</p>
                    </div>

                    <hr/>

                    <div className="item">
                        <p className="item-name" style={{fontWeight: 'bold', marginBottom: '0'}} >{`Total  ${this.props.total}`}</p>
                    </div>

                </ModalBody>

                <ModalBody className="payment" >
                    <h5 className="title" style={{fontWeight: 'bold'}} >Credit Card Details</h5>
                    <hr/>
                    <form className="form-row" onSubmit={this.onSubmit} >
                        <div className="col-sm-7">
                            <div className="form-group"><label htmlFor="card-holder">Card Holder</label><input required className="form-control" type="text" placeholder={this.props.name} name="account_name" onChange={this.onChange} /></div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group"><label>Expiration date</label>
                                <div className="input-group expiration-date"><input required className="form-control" type="text" placeholder="MM" name="exp_m" onChange={this.onChange} /><input required className="form-control" type="text" placeholder="YY" name="exp_d" onChange={this.onChange} /></div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group"><label htmlFor="card-number">Card Number</label><input className="form-control" type="text" id="card-number" placeholder="Card Number" name="account_no" onChange={this.onChange} required /></div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group"><label htmlFor="cvc">CVC</label><input required className="form-control" type="text" id="cvc" placeholder="CVC" name="cvc" onChange={this.onChange} /></div>
                        </div>
                        
                        <Button type="submit" onClick={this.payCart} style={{background: '#007bff', marginTop: '20px'}} size="lg" block   >Proceed</Button>
                    
                        {this.state.valid !== null?  <Alert style={{marginTop: '10px', width: '100%'}} color='danger' >{this.state.valid}</Alert> :null}
                    </form>
                </ModalBody>
            </Modal>
        )
    }
}



export default withRouter(connect(null, {buyNow})(BuyNow));
