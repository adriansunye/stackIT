import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput, 
  MDBBtn
} from 'mdb-react-ui-kit';
import './footer.css'

function Footer() {
  return (
    <MDBFooter className='text-center text-white text-lg-left fixed-bottom footer-style'>
      <MDBContainer className='p-7 pb-0'>
        <form action=''>
          <MDBRow className='d-flex justify-content-center row-style'>
            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <p className='pt-2'>
                <strong> Inscríbete a nuestra newsletter </strong>
              </p>
            </MDBCol>

            <MDBCol md='5' size='12' className='mb-4 mb-md-0'>
              <MDBInput type='text' id='form5Example2' label='Tu dirección de Email' contrast />
            </MDBCol>

            <MDBCol size='auto' className='mb-4 mb-md-0'>
              <MDBBtn outline color='light'>
                Enviar
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      <div className='text-center p-3 lastRow' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright: Stack-IT {' '}
        <p className='text-white p-2'> 
          Contacto | Términos  | Privacidad 
        </p> 
      </div>
    </MDBFooter>
  );
}

export default Footer; 