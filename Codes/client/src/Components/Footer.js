import React from 'react'

export default function Footer() {
    return (
        <footer className="page-footer dark" style={{marginTop: '100px', paddingTop: '30px', background: '#2b2f31'}} >
            <div className="container" style={{}} >
                <div className="row">
                    <div className="col-sm-3">
                        <h5 style={{color: 'white', margin: '30px 0 8px 0'}}>Get started</h5>
                        <ul style={{padding: '15px'}}>
                            <li><a href="/" style={{color: 'white'}}>Home</a></li>
                            <li><a href="/" style={{color: 'white'}}>Sign up</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5 style={{color: 'white', margin: '30px 0 8px 0'}}>About us</h5>
                        <ul style={{padding: '15px'}}>
                            <li><a href="/" style={{color: 'white'}}>Company Information</a></li>
                            <li><a href="/" style={{color: 'white'}}>Contact us</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5 style={{color: 'white', margin: '30px 0 8px 0'}}>Support</h5>
                        <ul style={{padding: '15px'}}>
                            <li><a href="/" style={{color: 'white'}}>FAQ</a></li>
                            <li><a href="/" style={{color: 'white'}}>Help desk</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-3">
                        <h5 style={{color: 'white', margin: '30px 0 8px 0'}}>Legal</h5>
                        <ul style={{padding: '15px'}}>
                            <li><a href="/" style={{color: 'white'}}>Terms of Service</a></li>
                            <li><a href="/" style={{color: 'white'}}>Terms of Use</a></li>
                            <li><a href="/" style={{color: 'white'}}>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        <div className="footer-copyright" style={{marginTop: '50px', padding: '10px', color: 'white', background: '#222425', textAlign: 'center'}}>
            <p style={{margin: '0'}} >© 2020 Copyright Text</p>
        </div>
    </footer>
    )
}
