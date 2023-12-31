import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Logo1 from "../images/android.png";
import Logo2 from "../images/dart.jpg.png";
import Logo3 from "../images/typescript.png";
import Logo4 from "../images/swift.png";
import Logo5 from "../images/css-3.png";
import Logo6 from "../images/html.png";
import Logo7 from "../images/php.png";
import Logo8 from "../images/js.png";
import Logo9 from "../images/img5.jpg";
import Logo10 from "../images/img4.jpg";
import { Container, Row, Col } from "react-bootstrap";
function Codelang() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section id="lang-sec">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} md={6} sm={12}>
            <Carousel id="slide1" activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <div className="side-img">
                  <img src={Logo1} alt="logo-lang" />
                  <img src={Logo2} alt="logo-lang" />
                  <img src={Logo3} alt="logo-lang" />
                  <img src={Logo4} alt="logo-lang" />
                  <img src={Logo9} alt="logo-lang" />
                </div>
                <div className="link-slide">
                  <div className="content-slide" id="div4">
                    <h3>Resource</h3>
                    <hr />
                    <h5>Online</h5>
                    <a href="#">offical website</a>
                    <h5>Download</h5>
                    <a href="#">java poraramming , java language pdf file </a>
                    <h5>Related</h5>
                    <a href="#">EJB</a>

                    <a href="#">GWT</a>

                    <a href="#">JavaEE</a>

                    <a href="#">intelIDEA</a>

                    <a href="#">JavaFx</a>

                    <a href="#">JSP</a>

                    <a href="#">JBoss</a>

                    <a href="#">Junit</a>

                    <a href="#">javascript class</a>

                    <a href="#">Jquery</a>

                    <a href="#">OOP</a>
                  </div>

                  <div className="content-slide" id="div3">
                    <h3>Number</h3>
                    <hr />
                    <h5>Number class</h5>
                    <a href="#">Number clasees</a>

                    <a href="#">XXXvalue</a>

                    <a href="#">min()</a>

                    <a href="#">mix()</a>

                    <a href="#">const()</a>

                    <a href="#">sum</a>

                    <a href="#">tostring()</a>

                    <a href="#">to parse()</a>

                    <a href="#">JBoss</a>

                    <a href="#">Junit</a>
                  </div>
                  <div className="content-slide" id="div2">
                    <h3>Basic classes</h3>
                    <hr />
                    <h5>Basic Classes</h5>
                    <a href="#">Array</a>

                    <a href="#">Data & Time</a>

                    <a href="#">File and I/O</a>

                    <a href="#">Data Expression</a>
                  </div>

                  <div className="content-slide" id="div1">
                    <h3>Basic </h3>
                    <hr />
                    <h5>Setup</h5>
                    <a href="#">Enviroument setup</a>
                    <h5>Syntax</h5>
                    <a href="#">basic syntix</a>

                    <a href="#">object & classes</a>

                    <a href="#">basic datalays</a>

                    <a href="#">loop control</a>

                    <a href="#">method</a>
                  </div>

                  <div className="content-slide" id="div5">
                    <h3>Advance</h3>
                    <hr />

                    <a href="#"> Networking</a>

                    <a href="#">Sending email</a>

                    <a href="#">Geneoriuc</a>

                    <a href="#">Documnaction</a>
                  </div>

                  <div className="content-slide" id="div6">
                    <h3>Data structure</h3>
                    <hr />
                    <h5>Data structure</h5>
                    <a href="#"> propertios</a>

                    <a href="#">vector</a>

                    <a href="#">direcyory</a>

                    <a href="#">set</a>

                    <a href="#">stack</a>

                    <a href="#">map</a>

                    <a href="#">map function</a>

                    <a href="#">collection install</a>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className="side-img">
                  <img src={Logo5} alt="logo-lang" />
                  <img src={Logo6} alt="logo-lang" />
                  <img src={Logo7} alt="logo-lang" />
                  <img src={Logo8} alt="logo-lang" />
                  <img src={Logo10} alt="logo-lang" />
                </div>
                <div className="link-slide">
                  <div className="content-slide" id="div4">
                    <h5>Formating</h5>
                    <hr />

                    <a href="#">abbr</a>

                    <a href="#">code</a>

                    <a href="#">font</a>

                    <a href="#">intelIDEA</a>

                    <a href="#">JavaFx</a>

                    <a href="#">sbam</a>

                    <a href="#">small</a>

                    <a href="#">strong</a>

                    <a href="#">strick</a>
                  </div>

                  <div className="content-slide" id="div3">
                    <h3>Form/Tabel</h3>
                    <hr />

                    <a href="#">Form</a>

                    <a href="#">Textarea</a>

                    <a href="#">select</a>

                    <a href="#">option</a>

                    <a href="#">button</a>

                    <h5>Tabel</h5>

                    <a href="#">Tabel</a>

                    <a href="#">td</a>

                    <a href="#">th</a>

                    <a href="#">tr</a>
                  </div>
                  <div className="content-slide" id="div2">
                    <h3>Basic Tages</h3>
                    <hr />

                    <a href="#">Html</a>

                    <a href="#">Body</a>

                    <a href="#">Image</a>

                    <a href="#">Header</a>
                  </div>
                  <div className="content-slide" id="div1">
                    <h3>Basic </h3>
                    <hr />
                    <h5>Setup</h5>
                    <a href="#">Enviroument setup</a>
                    <h5>Syntax</h5>
                    <a href="#">basic syntix</a>

                    <a href="#">object & classes</a>

                    <a href="#">basic datalays</a>

                    <a href="#">loop control</a>

                    <a href="#">method</a>
                  </div>
                  <div className="content-slide" id="div5">
                    <h3>Advance</h3>
                    <hr />

                    <a href="#"> Networking</a>

                    <a href="#">Sending email</a>

                    <a href="#">Geneoriuc</a>

                    <a href="#">Documnaction</a>
                  </div>

                  <div className="content-slide" id="div6">
                    <h3>Data structure</h3>
                    <hr />
                    <h5>Data structure</h5>
                    <a href="#"> propertios</a>

                    <a href="#">vector</a>

                    <a href="#">direcyory</a>

                    <a href="#">set</a>

                    <a href="#">stack</a>

                    <a href="#">map</a>

                    <a href="#">map function</a>

                    <a href="#">collection install</a>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Codelang;
