import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';


import HomeNav from '../Components/HomeNavbar';
import Footer from '../Components/Footer';

export default function ContactUs() {
    return (
        <div>
            <HomeNav/>
               
               <div style={{textAlign: 'center', margin: '50px 0'}} >
                   <h3 >Contact us</h3>
                   <p>Feel free to contact us anytime you wish !</p>
               </div>

                <div style={{ display: 'flex', justifyContent: 'center'}} >
                   <div style={{ background: 'white', padding: '30px', width: '480px', boxShadow: '0 0 15px rgba(0,0,0,.1)', }} >
                        <h5 class="title" style={{fontWeight: 'bold'}} >Contact us</h5>
                        <hr/>

                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type='text' />
                            </FormGroup>

                            <FormGroup>
                                <Label>Subject</Label>
                                <Input type='text' />
                            </FormGroup>

                            <FormGroup>
                                <Label>Email</Label>
                                <Input type='email' />
                            </FormGroup>

                            <FormGroup>
                                <Label>Message</Label>
                                <Input type='textarea' style={{height: '150px'}} />
                            </FormGroup>

                            <Button style={{background: '#007bff', marginTop: '30px'}} size="lg" block  >Send</Button>

                        </Form>
                    </div>
                </div>

            <Footer/>
        </div>
    )
}
