import React, { Component } from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Spinner } from 'reactstrap';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showRoom, addToCart } from '../actions/userActions';

import BuyNow from '../Components/BuyNow';
import HomeNavBar from '../Components/HomeNavbar';
import Footer from '../Components/Footer';

const qs = require('query-string');



class Showroom extends Component {

    _isMounted = false;

    state = {
        item: null,
        qty: 1,
        valid:null,
        isAdded:false,
        isOpen:false,
        payment: null,
        total: 0,
        related: [1,2,3]
    }

    componentDidMount=()=>{
        this._isMounted = true;
        const parsed = qs.parse(window.location.search);
        if(parsed.item){
            this.props.showRoom(parsed.item).then(res=>{
                if(this._isMounted){
                    this.setState({item: res})
                }
            })
        }
        
    }

    componentWillUnmount() {this._isMounted = false}

    onChangeQty=(e)=>{
        if(parseInt(e.target.value)>0){
            this.setState({qty: parseInt(e.target.value)})
        }else{
            this.setState({qty: 1})
        }
    }

    addToCart=()=>{
        this.setState({valid:null});
        if(this.state.item.qty >= this.state.qty){
            if(this.props.isAuthenticated){
                const parsed = qs.parse(window.location.search);
                this.props.addToCart({item: {item: parsed.item, quantity: this.state.qty}}).then(res=>{
                    if(res.success){
                        this.setState({isAdded: true})
                    }
                })
            }else{
                this.setState({valid: 'Login to your user account first!'})
            }
        }else{
            this.setState({valid: `Only ${this.state.item.qty} items are available!` })
        }
    }

    buyNow=()=>{
        this.setState({valid:null});
        if(this.state.item.qty >= this.state.qty){
            if(this.props.isAuthenticated){
                this.setState({total: (this.state.item.price*this.state.qty) , payment : {item_id: this.state.item._id, quantity: this.state.qty} });
                this.toggle();
            }else{
                this.setState({valid: 'Login to your user account first!'})
            }
        }else{
            this.setState({valid: `Only ${this.state.item.qty} items are available!` })
        }
        
    }

    goToCart=()=>{
        this.props.history.push('/cart');
        window.location.reload();
    }

    toggle=()=>{this.setState({isOpen: !this.state.isOpen})}
   

    render() {
        return (
            <div>
                <HomeNavBar/>

                <main className="page product-page">
                    <div className="container" style={{background: 'white',  padding: '40px', boxShadow: '0 0 15px rgba(0,0,0,.1)', marginTop: '80px'}} >
                        
                        <div className="block-content">

                            <div className="product-info" style={{marginBottom: '40px'}} >

                                <div className="row">

                                    <div className="col-md-6" >
                                        <div className="gallery" style={{background: '#f6f6f6', padding: '20px'}}>
                                            <div className="sp-wrap">
                                                {this.state.item!==null?
                                                    <img className="img-fluid d-block mx-auto" src={this.state.item.picture} alt={this.state.item.picture}  />
                                                :<Spinner size='lg' />}
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        {this.state.item !== null?
                                            <div className="info">
                                                <h3>{this.state.item.name}</h3>
                                                <p style={{color: 'grey'}} >{this.state.item.short_desc}</p>
                                                <hr/>
                                                <div className="price">
                                                    <h3>{`Rs: ${this.state.item.price}`}</h3>
                                                </div>

                                                <FormGroup row>
                                                    <Label sm={2}>Quantity: </Label>
                                                    <Col sm={3} >
                                                        <Input type="text" name='qty' placeholder='1' onChange={this.onChangeQty} />
                                                    </Col>
                                                    <Col sm={5} >
                                                        {this.state.item.qty>1?
                                                            <p style={{color: 'red'}} >{`Only ${this.state.item.qty} items are available`}</p>
                                                        :this.state.item.qty===1?
                                                            <p style={{color: 'red'}} >Only 1 item is available</p>
                                                        :<p style={{color: 'red'}} >Out of stock !</p>}
                                                        
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label sm={2}>Total</Label>
                                                    <Col sm={3} >
                                                        <h4 style={{marginBottom:'0', padding: '7px 0'}} >{`Rs: ${this.state.item.price * this.state.qty}`}</h4>
                                                    </Col>
                                                </FormGroup>

                                                {this.state.item.qty >0 ?
                                                    <div style={{display: 'flex', margin: '30px 0 10px 0', justifyContent: 'space-between'}}>
                                                        {this.state.isAdded?
                                                        <Button color="success" style={{width: '50%', marginRight: '10px', height: '50px'}} onClick={this.goToCart} >Item is added! Go to Cart</Button>
                                                        :<Button color="info" style={{width: '50%', marginRight: '10px', height: '50px'}} onClick={this.addToCart} >Add to Cart</Button>}
                                                        
                                                        <Button color="warning" style={{width: '50%', height: '50px'}} onClick={this.buyNow} >Buy Now</Button>
                                                    </div>
                                                :
                                                    <div style={{display: 'flex', margin: '30px 0 10px 0', justifyContent: 'space-between'}}>
                                                        {this.state.isAdded?
                                                        <Button disabled color="success" style={{width: '50%', marginRight: '10px', height: '50px'}} onClick={this.goToCart} >Item is added! Go to Cart</Button>
                                                        :<Button disabled color="info" style={{width: '50%', marginRight: '10px', height: '50px'}} onClick={this.addToCart} >Add to Cart</Button>}
                                                        
                                                        <Button disabled color="warning" style={{width: '50%', height: '50px'}} onClick={this.buyNow} >Buy Now</Button>
                                                    </div>
                                                }

                                                    {this.state.valid !== null? <Alert color='danger' >{this.state.valid}</Alert> : null}
                                                
                                                <hr/>
                                                    
                                                <div className="summary">
                                                    <p>{this.state.item.desc}</p>
                                                </div>

                                            </div>
                                            :
                                            <div className="info">
                                                <h3>Loading...</h3>
                                                <p>Loading...</p>
                                                <hr/>
                                                <div className="price">
                                                    <h3>Loading...</h3>
                                                </div>

                                                <div style={{display: 'flex', margin: '30px 0', justifyContent: 'space-between'}}>
                                                    <Button color="info" style={{width: '50%', marginRight: '10px', height: '50px'}} ><Spinner size='sm' /></Button>
                                                    <Button color="warning" style={{width: '50%', height: '50px'}} ><Spinner size='sm' /></Button>
                                                </div>
                                                
                                                <hr/>
                                                    
                                                <div className="summary">
                                                    <p>Loading...</p>
                                                </div>
                                            </div>
                                        }                                        
                                    </div>

                                </div>

                            </div>

                            <div className="product-info" style={{maxWidth:'600px', margin:'auto'}} >
                                <h5>Reviews</h5>

                                {this.state.item !== null?
                                    <section>
                                        {this.state.item.comments.length>0?
                                            this.state.item.comments.map((comment, index)=>(
                                                <section key={index} style={{marginTop: '10px', background: '#dceaf8', padding: '20px', borderRadius: '1.2em'}} >
                                                    <p style={{marginBottom: '0'}}><strong>{comment.user_name}</strong></p>
                                                    <p style={{textAlign: 'center'}} >{comment.comment}</p>
                                                </section>
        
                                            ))
                                        :
                                            <section style={{marginTop: '10px', background: '#dceaf8', padding: '20px', borderRadius: '1.2em'}} >
                                                <p style={{textAlign: 'center'}} >No reviews found!</p>
                                            </section>
                                        }
                                    </section>
                                :
                                    <section style={{marginTop: '10px', background: '#dceaf8', padding: '20px', borderRadius: '1.2em'}} >
                                        <p style={{marginBottom: '0'}}><strong>Loading...</strong></p>
                                        <div style={{textAlign: 'center'}} ><Spinner/></div>
                                    </section>}
                            </div>

                            {/* <div className="clean-related-items" style={{marginTop: '80px'}}>
                                <h4>Related Products</h4>

                                <div className="items" style={{marginTop: '50px'}} >

                                    <div className="row justify-content-center">

                                        {this.state.related.map((index)=>(
                                            <div className="col-sm-6 col-lg-4" key={index} >
                                                <div className="clean-related-item" style={{border: '1px #eaeaea solid', padding: '20px'}} >
                                                    <div className="image"><a href="/"><img className="img-fluid d-block mx-auto" src={img2} alt={index} /></a></div>
                                                    <div className="related-name" style={{marginTop: '20px', textAlign: 'center'}} ><a href="/">Lorem Ipsum dolor</a><br/>
                                                        ratings
                                                        <h4>$300</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </div> */}

                        </div>

                    </div>
                </main>
                
                {this.props.user!== null?
                    <BuyNow name={this.props.user.name} address={this.props.user.address} isOpen={this.state.isOpen} toggle={this.toggle} total={this.state.total} payment={this.state.payment} />
                :null}

                
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });


export default withRouter(connect(mapStateToProps, {showRoom, addToCart })(Showroom));
