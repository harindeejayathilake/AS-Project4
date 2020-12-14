import React, { Component } from 'react';
import Navbar from '../Components/HomeNavbar'
import { Container, Col, Row, Spinner, Button } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getItemInfo, deleteItem } from '../actions/authActions';
import UpdateItem from '../Components/UpdateItem';
import Footer from '../Components/Footer';

const qs = require('query-string');



class ItemInfo extends Component {
    _isMounted = false;
    state ={
        item: null,
        deleting: false,
        show: false,
        loading: true
    }

    componentDidMount=()=>{
        this._isMounted = true;
        const parsed = qs.parse(window.location.search);
        if(parsed.id){
            this.props.getItemInfo(parsed.id).then(res=>{
                if(this._isMounted){
                    this.setState({item: res, loading: false})
                }
            })
        }
    }
    componentWillUnmount() {this._isMounted = false}


    AddItem=(item)=>{
        let items = this.state.items;
        items.push(item);
        this.setState({items})
    }

    deleteItem =()=>{
        this.setState({deleting: true})
        const parsed = qs.parse(window.location.search);
        this.props.deleteItem(parsed.id).then(res=>{
            if(res.success){
                this.setState({deleting: false});
                this.props.history.push('/dashboard/items');
                window.location.reload();
            }
        })
    }

    toggle=()=>{
        this.setState({show: !this.state.show});
    }


    render() {
        return (
            <div>
                <Navbar/>
                <Container style={{marginTop: '50px', marginBottom: '100px'}} >

                    {this.state.loading? <div style={{left: '50%', position: 'absolute'}} ><Spinner size="lg" /></div> : 

                        <Row style={{boxShadow: '0 0 15px rgba(0,0,0,.1)'}}>
                            <Col lg={8} style={{padding: '30px', background: 'white'}}>
                                <Row>
                                    <Col sm={6} style={{display:'flex', justifyContent: 'center'}} ><img src={this.state.item.picture} style={{width: '80%', marginBottom: '30px'}} alt={this.state.item.name} /></Col>
                                    <Col sm={6} >
                                        <h3>{this.state.item.name}</h3>
                                            <h4>{`Rs: ${this.state.item.price}`}</h4>
                                            <h5>{this.state.item.category}</h5>
                                            <h5>{this.state.item.qty}</h5>
                                            <hr/>
                                        <p >{this.state.item.short_desc}</p>
                                    </Col>
                                </Row>


                                <p style={{marginBottom: '30px'}} >{this.state.item.desc}</p>

                                {this.state.item.comments.map((comment)=>(
                                    <section style={{marginTop: '10px', background: '#dceaf8', padding: '20px', borderRadius: '1.2em'}} >
                                        <p style={{marginBottom: '0'}}><strong>{comment.user_name}</strong></p>
                                        <p>{comment.comment}</p>
                                    </section>
                                ))}

                                
                                
                            </Col>
                            <Col lg={4} style={{padding: '30px', background: '#dceaf8'}} >

                                <h4>Seller</h4>

                                <p style={{marginBottom: '0'}}><strong>Name : </strong> {this.state.item.seller.name}</p>
                                <p style={{marginBottom: '0'}}><strong>Tp : </strong> {this.state.item.seller.tp}</p>
                                <p style={{marginBottom: '0'}}><strong>Address : </strong> {this.state.item.seller.address}</p>
                                <p style={{marginBottom: '0'}}><strong>Account no : </strong> {this.state.item.seller.account_no}</p>
                                <p style={{marginBottom: '0'}}><strong>Account details : </strong> {this.state.item.seller.account_details}</p>

                                <hr/>
                                <h4>Auhtorized person</h4>

                                <p style={{marginBottom: '0'}}><strong>Name : </strong> {this.state.item.user.name}</p>
                                <p style={{marginBottom: '0'}}><strong>Tp : </strong> {this.state.item.user.tp}</p>
                                <p style={{marginBottom: '0'}}><strong>Email : </strong> {this.state.item.user.email}</p>
                                <p style={{marginBottom: '0'}}><strong>Address : </strong> {this.state.item.user.address}</p>

                                <Button color="danger" block style={{marginTop: '30px'}} onClick={this.deleteItem} > {this.state.deleting? <Spinner size='sm' /> : 'Delete Item' }</Button>
                                <Button color="warning" block onClick={this.toggle} > Update Item</Button>

                            </Col>
                            <UpdateItem show={this.state.show} toggle={this.toggle} item={this.state.item } />
                        </Row>
                        
                    }
                    
                    

                </Container>

               
                
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect(null, {getItemInfo, deleteItem})(ItemInfo));