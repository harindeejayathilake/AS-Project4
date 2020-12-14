import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearCart, deleteItemCart } from '../actions/userActions';

import Navbar from '../Components/HomeNavbar';
import Footer from '../Components/Footer';

import CartSummary from '../Components/CartSummary';
import { Button } from 'reactstrap';

class Cart extends Component {

    state={
        products: [1,2,3],
        isOpen: false
    }

    toggle=()=>{ console.log('here'); this.setState({isOpen: !this.state.isOpen})}

    clearCart=()=>{
        this.props.clearCart().then(res=>{
            window.location.reload();
        })
    }

    deleteItem=(id)=>{
        this.props.deleteItemCart(id).then(res=>{
            window.location.reload();
        })
    }


    render() {
        return (
            
            <main className="page shopping-cart-page">
                <Navbar/>
                <div className="container"  style={{background: 'white', boxShadow: '0 0 15px rgba(0,0,0,.1)', marginTop: '80px', padding:'0px'}}>
                    <div className="row no-gutters">
                        <div className="col-md-12 col-lg-8" style={{padding:'36px'}} >
                            
                            <div className="items">
                                {this.props.user.cart.length>0?
                                    this.props.user.cart.map((product, index)=>(

                                        <div className="product" key={index} style={{paddingBottom: '25px'}} >
                                            <div className="row justify-content-center align-items-center">

                                                <div className="col-md-3" >
                                                    <div className="product-image" style={{padding: '15px', border: '1px  #f0f0f0 solid'}} ><img className="img-fluid d-block mx-auto image" src={product.item.picture} alt={product.item.name} /></div>
                                                </div>

                                                <div className="col-md-5 product-info">
                                                    <a className="product-name" href={`showroom?item=${product.item._id}`} style={{fontSize: '18px', color: '#007bff', fontWeight: 'bold'}} >{product.item.name}</a>
                                                    <div className="product-specs">
                                                        <p style={{fontSize: '14px', color: 'grey'}}>{product.item.short_desc}</p>
                                                        <h6>{`Rs: ${product.item.price}`}</h6>
                                                        <Button size='sm' color='danger' style={{width: '100px'}} onClick={()=>this.deleteItem(product.item._id)} >Delete</Button>
                                                    </div>
                                                </div>

                                                <div className="col-6 col-md-2 quantity"><label className="d-none d-md-block" htmlFor="quantity">Quantity</label>{product.quantity}</div>
                                                <div className="col-6 col-md-2 price"><h4>{`Rs: ${product.quantity * product.item.price}`}</h4></div>
                                            </div>
                                        </div>

                                    ))
                            
                                :
                                <div style={{marginTop: '20px', textAlign: 'center'}} >
                                    <h4>Your cart is empty!</h4>
                                </div>}

                            </div>

                        </div>
                        
                        <div className="col-md-12 col-lg-4" style={{padding:'30px', background:'#dceaf8'}} >
                            <CartSummary cart={this.props.user.cart} toggle={this.toggle} clearCart={this.clearCart} />
                        </div>

                    </div>
                </div>

                
                <Footer/>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
  });


export default withRouter(connect(mapStateToProps, {clearCart, deleteItemCart})(Cart));
