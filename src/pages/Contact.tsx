import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

// Contact component
const Contact = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null)
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Popup message after form is submitted
    setPopupMessage("Thanks for contacting us! We'll get back to you as soon as possible.");
    setTimeout(() => setPopupMessage(null), 3000);

    emailjs.sendForm('service_jje8cbk', 'template_gx7alzz', e.currentTarget, 'mqWocK4H_zu22W0af')
      .then((result) => {
        console.log('Email successfully sent!', result.text);
      }, (error) => {
        console.log('Failed to send the email.', error.text);
      });
      
    e.currentTarget.reset();
  };

  // Contact form

  return (
    <Container>
      {popupMessage && <Popup>{popupMessage}</Popup>}
      <Form onSubmit={sendEmail}>
        <Heading3>GET IN TOUCH</Heading3>
        <Heading4>We would love to hear from you!</Heading4>
        <Input type = "text" name = "from_name" placeholder = "Your Name" required/>
        <Input type = "email" name = "email" placeholder = "Email" required/>
        <Input type = "phone number" name = "phone" placeholder = "Phone Number" required/>
        <Textarea name = "message" rows = {4} placeholder = "Message" required></Textarea>
        <Button type = "submit">Submit</Button>
      </Form>
    </Container>
  )
}


export default Contact;

// Styled components

const Container = styled.div `
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form `
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 2vw 4vw;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 5vw 10vw;
  }

  @media (max-width: 480px) {
    padding: 5vw 2vw;
  }
`;

const Heading3 = styled.h3 `
  color: #cf529f;
  font-weight 800;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Heading4 = styled.h4 `
  font-style: italic;
  color: #666;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Input = styled.input `
  border: 0;
  margin: 10px 0;
  padding: 20px;
  outline: none;
  background: #f5f5f5;
  font-size: 16px;

  @media (max-width: 480px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const Textarea = styled.textarea `
  border: 0;
  margin: 10px 0;
  padding: 20px;
  outline: none;
  background: #f5f5f5;
  font-size: 16px;

  @media (max-width: 480px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const Button = styled.button `  
  border: 0;
  padding: 15px;
  background: #cf529f;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  width: 150px;
  margin: 20px auto 0;
  border-radius: 30px;

  &:hover {
    background: #b8488e;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #cf529f;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  z-index: 1000;

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    padding: 10px 15px;
    font-size: 14px;
  }
`;