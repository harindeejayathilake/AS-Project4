import React from 'react';

import HomeNavBar from '../Components/HomeNavbar';
import Search from '../Components/Search';
import Cataloge from '../Components/Cataloge';
import Footer from '../Components/Footer';
import Cover from '../assests/cover.jpg';

export default function Home() {
    return (
        <div>
            <HomeNavBar/>
            <div>
                <img src={Cover} style={{width: '100%', }} alt="cover" />
            </div>
            <Search/>
            
            <Cataloge/>
            <Footer/>
            
        </div>
    )
}
