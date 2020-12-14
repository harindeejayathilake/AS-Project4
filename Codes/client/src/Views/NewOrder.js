import React, { Component } from 'react';
import Navbar from '../Components/HomeNavbar'
import { Container, Button, Row, Col, Label, Form, FormGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, Spinner, Card, CardBody, CardSubtitle } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newOrder, getItems } from '../actions/authActions'


class NewOrder extends Component {
    _isMounted= false;

   state={
        all_items: [],
        search: [],
        loading: false,
        loading_order: false,

        name: '',
        address: '',
        tp: '',
        items: [],
        total: 0,

        search_item: '',
        addedItem: null,
        delivery:'',
   }


    componentDidMount=()=>{
        this._isMounted = true;
        this.setState({loading: true});
        this.props.getItems().then(res=>{
            if(this._isMounted){
                this.setState({all_items: res.items, loading: false})
            }
        })
    }
    componentWillUnmount=()=>{
        this._isMounted = false;
    }

   onChange=(e)=>{this.setState({[e.target.name]: e.target.value})}
   onSearching=(e)=>{
        let results = [];
        if(e.target.value.length>0){
            results = this.state.all_items.filter((item)=> item.code.indexOf(e.target.value) === 0)
        }
        this.setState({search: results})
   }

   addItem=(item)=>{this.setState({addedItem:item})}
   addToCart=()=>{
       let item = {
        code: this.state.addedItem.code,
        price: this.state.addedItem.price,
        delivery: this.state.delivery }

       let array = this.state.items;
       array.push(item);
        let total = 0;
        for(let i=0; i<array.length; i++){
            total +=  parseInt(array[i].price) + parseInt(array[i].delivery);
        }

       this.setState({items: array, delivery: '', addedItem: null, total})
   }

   placeOrder=()=>{
       if(this.state.name !== '' && this.state.items.length>0 && this.state.tp!==''){
           this.setState({loading_order: true});

            let order = {
                name: this.state.name,
                items: this.state.items,
                address: this.state.address,
                tp: this.state.tp,
                total: this.state.total
            }

            this.props.newOrder(order).then(res=> {this.setState({loading_order: false}); window.location.reload()})

       }
       
   }

    render() {
        return (
            <div>
                <Navbar/>
                <Container style={{marginTop: '50px', marginBottom: '100px'}} >
                    <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <h2 style={{marginBottom: '50px'}}>New Order</h2>
                    </div>

                    <Row>
                        <Col sm="3" ></Col>
                        {this.state.loading? <div style={{left: '50%', position: 'absolute'}} ><Spinner/></div>:
                        <Col style={{maxWidth: '500px'}} >
                            <Form>
                                <Label><strong>Customer Details</strong></Label><hr style={{marginTop: '0'}}/>
                                <FormGroup>
                                    <Input type='text' name='name' placeholder='Customer Name' onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='textarea' style={{height: '100px'}} name='address' placeholder='Address to Deliver' onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='text' name='tp' placeholder='Customer Phone' onChange={this.onChange} />
                                </FormGroup>
                                <br/>

                                <Label><strong>Shopping Cart</strong></Label><hr style={{marginTop: '0'}}/>
                                <Input type='text' name='search_item' placeholder='Search by item code' onChange={this.onSearching} />

                                {this.state.addedItem === null?
                                    <ListGroup style={{marginTop: '20px'}} >
                                    {this.state.search.length>0?
                                        this.state.search.map((item, index)=>(
                                            <ListGroupItem key={index} >
                                                <ListGroupItemHeading>{item.code}</ListGroupItemHeading>
                                                <div className="clearfix"  >
                                                    <p className="float-left" style={{marginBottom: '0'}}>{item.name}</p>
                                                    <p className="float-right" style={{marginBottom: '5'}}>RS: {item.price} </p>
                                                </div>
                                                <Button color='primary' size='sm' onClick={()=>this.addItem(item)} >Add Item</Button>
                                            </ListGroupItem>
                                        ))

                                    :null}

                                    </ListGroup>
                                :
                                    <Card style={{marginTop: '20px'}} >
                                        <CardBody>
                                            <div className="clearfix"  >
                                                <p className="float-left" style={{marginBottom: '0'}}>{this.state.addedItem.code}</p>
                                                <p className="float-right" style={{marginBottom: '0'}}>RS: {this.state.addedItem.price}</p>
                                            </div>
                                            <FormGroup row >
                                                <Label sm={6} bssize="sm">Delivery cost</Label>
                                                <Col sm={6}><Input type="text" name="delivery" placeholder="Rs: " bsSize='sm' onChange={this.onChange} /></Col>
                                            </FormGroup>

                                            <Button block color='success' onClick={this.addToCart} >Add to Cart</Button>
                                        </CardBody>
                                    </Card>}

                            </Form>

                            <Card style={{marginTop: '20px'}}>
                                <CardBody>
                                    <CardSubtitle>Bill</CardSubtitle><hr/>
                                    

                                    {this.state.items.length>0? 
                                        this.state.items.map((item, index)=>(
                                            <div style={{marginBottom: '5px'}} key={index} >
                                                <div className="clearfix"  >
                                                    <p className="float-left" style={{marginBottom: '0'}}>{item.code}</p>
                                                    <p className="float-right" style={{marginBottom: '0'}}>RS: {item.price}</p>
                                                </div>
                                                <div className="clearfix"  >
                                                    <p className="float-left" style={{marginBottom: '0', fontSize: '12px'}}>Delivery cost</p>
                                                    <p className="float-right" style={{marginBottom: '0', fontSize: '12px'}}>RS: {item.delivery}</p>
                                                </div>
                                                <hr/>
                                            </div>
                                        ))
                                    :null}


                                    <div className="clearfix"  >
                                        <p className="float-left" style={{marginBottom: '0'}}><strong>Total</strong></p>
                                        <p className="float-right" style={{marginBottom: '0'}}><strong>RS: {this.state.total}</strong></p>
                                    </div>
                                
                                    
                                </CardBody>
                            </Card>

                                        <Button color='success' block style={{marginTop: '20px'}} onClick={this.placeOrder} >{this.state.loading_order?'wait...': 'Place Order'}</Button>

                        </Col>}
                        
                        <Col sm="3"></Col>
                    </Row>

                </Container>
                
            </div>
        )
    }
}

export default withRouter(connect(null, {getItems, newOrder})(NewOrder));
