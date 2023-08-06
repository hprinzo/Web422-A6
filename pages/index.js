/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Prince Abiy |  Student ID: 133242018 |  Date: 08/06/2023
*  Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 

import { Image, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt= "Museum Art Photo" fluid rounded />
      
      <Row>
        <Col md={6}>
          <p>
          <br></br>
            The Metropolitan Museum of Art, colloquially known as the Met, is located in New York City and is the largest art museum in the United States. 
            It was founded in 1870 and is located in the Central Park area of Manhattan. The museum&apos;s permanent collection includes more than two million works of art, 
            spanning 5,000 years of history, from ancient Egypt to the present. It is also home to the Costume Institute, which houses a vast collection of costumes 
            from various periods.
          </p>
        </Col>
        <Col md={6}>
          <p>
          <br></br>
            The Met&apos;s mission is to collect, preserve, study, exhibit, and stimulate appreciation for and advance knowledge of works of art that collectively represent 
            the broadest spectrum of human achievement at the highest level of quality, all in the service of the public and in accordance with the highest professional 
            standards. The museum offers a diverse range of exhibitions, educational programs, and special events throughout the year.
          </p>
        </Col>
      </Row>
      <p>
        For more information, visit the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
      </p>
    </>
  );
};

export default Home;
