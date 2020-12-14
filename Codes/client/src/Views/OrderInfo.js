import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOrderInfo, updateOrder, updateOrderByItem } from '../actions/authActions';

import Navbar from '../Components/HomeNavbar';
import Footer from '../Components/Footer';

import { Button, CardBody, Progress, Spinner, Card, CardText } from 'reactstrap';

const qs = require('query-string');

class OrderInfo extends Component {

    _isMounted = false;
    state={
        max: 0,
        value: 0,
        status: '',
        order: null,
        ready_items: [],
        loading: true
    }

    componentDidMount=()=>{
        this._isMounted = true;
        const parsed = qs.parse(window.location.search);
        this.props.getOrderInfo(parsed.id).then(res=>{
            let max = res.items.length + 2;
            let value = 0;
            let ready_items = [];
            let status = '';
            let items = res.items;

            
            if(res.accepted=== true && res.delivered === true){
                status = 'Order has been sent!'
                value = max;
                
            }else if(res.accepted=== true && res.delivered === false){
                
                value =1;
                
                for(let i =0 ; i<items.length; i++){
                    if(items[i].ready){
                        ready_items.push(1);
                        value += 1;
                    }else{
                        ready_items.push(0);
                    }
                }

                if(value === max-1){
                    status = 'Order is ready to move..'
                }else{
                    status = 'Order is processing..'
                }

            }else{
                status = 'Pending..'
                value = 0;
            }

            if(this._isMounted){
                this.setState({order: res, max, value, status, ready_items, loading: false})
            }

        })
    }
    componentWillUnmount() {this._isMounted = false}

    updateOrder=(update)=>{
        this.props.updateOrder( this.state.order._id, update).then(res=>{
            this.setState({value: (this.state.value+1)})
        });
    }

    acceptOrder=()=>{
        this.updateOrder({update:{accepted: true}});
    }

    sendOrder=()=>{
        this.updateOrder({update:{delivered: true}});
    }

    updateOrderByItem = (id)=>{
        this.props.updateOrderByItem({order_id: this.state.order._id, item_id:id}).then(res=>{
            window.location.reload();
        })
    }



    render() {
        const {order} = this.state;

        return (
            
            <main className="page shopping-cart-page">
                <Navbar/>
                <div className="container"  style={{background: 'white', boxShadow: '0 0 15px rgba(0,0,0,.1)', marginTop: '80px', padding:'0px'}}>
                    <div className="row no-gutters">
                        <div className="col-md-12 col-lg-8" style={{padding:'36px'}} >
                            {this.state.loading?
                                <section style={{display: 'flex', justifyContent: 'center'}} ><Spinner/></section>
                            :
                                <section>
                                    <div>
                                        <h5>Order Id: {order._id}</h5>
                                        <h6>Date: {order.date}</h6>
                                        <h6>Total Amount: Rs. {order.total}</h6>
                                        <h6>Status: {this.state.status} </h6>
                                        <Progress animated min={0} max={this.state.max} value={this.state.value} color='success' />
                                    </div>
                                    <hr/>
                                    
                                    <div className="items">
                                        <h6>Items: </h6>
                                        
                                        {order.items.length>0?
                                            order.items.map((item, index)=>(

                                                <div className="product" key={index} style={{paddingBottom: '25px'}} >
                                                    <div className="row justify-content-center align-items-center">

                                                        <div className="col-md-3" >
                                                            <div className="product-image" style={{padding: '15px', border: '1px  #f0f0f0 solid'}} ><img className="img-fluid d-block mx-auto image" src={item.item.picture} alt={item.item.name} /></div>
                                                        </div>

                                                        <div className="col-md-5 product-info">
                                                            <a className="product-name" href={`/item-info?id=${item.item._id}`} style={{fontSize: '18px', color: '#007bff', fontWeight: 'bold'}} >{item.item.name}</a>
                                                            <div className="product-specs">
                                                                <p style={{fontSize: '14px', color: 'grey'}}> {item.item.short_desc} </p>
                                                                <h6>{`Rs: ${item.item.price}`}</h6>
                                                                {this.state.value===0?
                                                                   null
                                                                :(this.state.ready_items[index] === 1) || (this.state.max === this.state.value) ?
                                                                    <Button disabled size='sm' color='warning' style={{width: '100px'}} onClick={()=>this.deleteItem('product.item._id')} >Completed</Button>
                                                                :
                                                                    <Button size='sm' color='success' style={{width: '100px'}} onClick={()=>this.updateOrderByItem(item._id)} >Ready</Button>
                                                                }

                                                            </div>
                                                        </div>

                                                        <div className="col-6 col-md-2 quantity"><label className="d-none d-md-block" htmlFor="quantity">Quantity</label> {item.quantity} </div>
                                                        <div className="col-6 col-md-2 price"><h4>{item.item.price * item.quantity } </h4></div>
                                                    </div>
                                                </div>

                                            ))
                                    
                                        :null}

                                    </div>

                                </section>
                            
                            }
                            
                        </div>
                        
                        <div className="col-md-12 col-lg-4" style={{padding:'30px', background:'#dceaf8'}} >
                            {this.state.loading?
                                <section style={{display: 'flex', justifyContent: 'center'}} ><Spinner/></section>
                            :
                                <section>
                                    <h3 style={{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', padding: '16px 0 28px 0', color: '#1d4f88' }} >User Information</h3>

                                    <Card>
                                        <CardBody style={{borderTop: '2px solid #298dff'}} >
                                            <CardText><strong>Name:</strong> {order.user.name} </CardText>
                                            <CardText><strong>Address:</strong> {order.user.address} </CardText>
                                            <CardText><strong>Tp:</strong> {order.user.tp} </CardText>
                                            <CardText><strong>Email:</strong> {order.user.email} </CardText>
                                        </CardBody>
                                    </Card>

                                    <hr/>

                                    {this.state.value===0?
                                        <Button style={{background: '#007bff'}} size="lg" block onClick={this.acceptOrder} >Accept</Button>
                                    :this.state.value===this.state.max-1?
                                        <Button color='warning' size="lg" block onClick={this.sendOrder} >Send Order</Button>
                                    :(this.state.max - this.state.value - 1) === 1?
                                        <h5>Only 1 item is waiting</h5> 
                                    :this.state.max - this.state.value === 0?
                                        <h5>Order has sent!</h5>
                                    :
                                        <h5> {`${this.state.max - this.state.value - 1} items are waiting`} </h5>
                                    }
                                    
                                </section>
                            
                            }

                           
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


export default withRouter(connect(mapStateToProps, {getOrderInfo, updateOrder, updateOrderByItem})(OrderInfo));
