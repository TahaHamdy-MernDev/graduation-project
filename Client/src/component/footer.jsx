import  React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import  Logo19 from '../images/b3.jpg';
import { FaRegCopyright } from "react-icons/fa6";

function Footer(){
 return (
<Container>
<Row className="justify-content-center">
     <Col lg={12} md={12} sm={12}>
    
           <hr></hr>
        <div className="footer">
            <img src={Logo19}   alt="logo-footer"/>
            <span><FaRegCopyright /> Devloper.com 2023-All Rights Reserved </span>
        </div>

     </Col>
 </Row>
</Container>
    
 )
}

export default Footer;