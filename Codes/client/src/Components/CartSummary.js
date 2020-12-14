import React, {useState} from 'react';
import {Button} from 'reactstrap';
import Payment from '../Components/Payment';

export default function CartSummary({cart, clearCart}) {
    const [isOpen, toggle] = useState(false);
    const setIsOpen =()=>{toggle(!isOpen)}

    let total = 0;
    if(cart.length>0){
        for(let i=0; i<cart.length; i++){
            total += (cart[i].quantity*cart[i].item.price);
        }
    }
    

    return (
        <div className="summary">
            {cart.length>0?
            <section>
                <h3 style={{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', padding: '16px 0 28px 0', letterSpacing: '2px', color: '#1d4f88' }} >SUMMARY</h3>
                <div style={{background: 'white', padding: '18px 20px', marginBottom: '20px', borderTop: '2px solid #298dff', borderBottom: '1px solid #e6edf5'}} >
                    <div className="clearfix" >
                        <h4 className="float-left" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>Subtotal</h4>
                        <h4 className="float-right" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>{`Rs: ${total}`}</h4>
                    </div>
                    <div className="clearfix" >
                        <h4 className="float-left" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>Discount</h4>
                        <h4 className="float-right" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>{`Rs: ${0}`}</h4>
                    </div>
                    <div className="clearfix" >
                        <h4 className="float-left" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>Delivery Charges</h4>
                        <h4 className="float-right" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>{`Rs: ${0}`}</h4>
                    </div>
                    <hr style={{marginTop: '0'}} />
                    <div className="clearfix" >
                        <h4 className="float-left" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>Total</h4>
                        <h4 className="float-right" style={{margin: '0', paddingBottom: '18px', fontSize: '15.6px'}}>{`Rs: ${total}`}</h4>
                    </div>
                </div>
                <Button style={{background: '#007bff'}} size="lg" block onClick={toggle} >Checkout</Button>
                <Button color="danger" block onClick={clearCart} >Clear Cart</Button>
            </section>
            :
            <section>
                <h3 style={{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', padding: '16px 0 28px 0', letterSpacing: '2px', color: '#1d4f88' }} >HURRY!!<br/>Let's Go Shopping!</h3>
            </section>}
            

            <Payment isOpen={isOpen} toggle={setIsOpen} total={total}/>
        </div>
    )
}
