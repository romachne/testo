import React, {useState, useEffect} from 'react';

const Form = (props) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const [formValid, setFormValid] = useState(false);


  const validateForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'id':
        setId(value)
        if (parseInt(value, 10).toString() === value) {
          setIdValid(true)
        } else {
          setIdValid(false)
        }
        break;
      case 'firstName':
        setFirstName(value)
        if (/^[a-z]+$/i.test(value)) {
          setFirstNameValid(true)
        } else {
          setFirstNameValid(false)
        }
        break;
      case 'lastName':
        setLastName(value)
        if (/^[a-z]+$/i.test(value)) {
          setLastNameValid(true)
        } else {
          setLastNameValid(false)
        }
        break;
      case 'email':
        setEmail(value)
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (emailRegex.test(value)) {
          setEmailValid(true)
        } else {
          setEmailValid(false)
        }
        break;
      case 'phone':
        setPhone(value)
        const phoneRegex = /^[(][0-9]{3}[)][0-9]{3}[-][0-9]{4}$/;
        if (phoneRegex.test(value)) {
          setPhoneValid(true)
        } else {
          setPhoneValid(false)
        }
        break;
      default:
        break;
    }


  }

  useEffect(() => {
    if (idValid && firstNameValid && lastNameValid && emailValid && phoneValid) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [idValid, firstNameValid, lastNameValid, emailValid, phoneValid])

  return (
    <div>
      <label htmlFor='id'>id</label>
      <input
        name='id'
        type='number'
        value={id}
        onChange={validateForm}
      /><br />
      <label htmlFor='firstName'>firstName</label>
      <input
        name='firstName'
        type='text'
        value={firstName}
        onChange={validateForm}
      /><br />
      <label htmlFor='lastName'>lastName</label>
      <input
        name='lastName'
        type='text'
        value={lastName}
        onChange={validateForm}
      /><br />
      <label htmlFor='email'>email</label>
      <input
        name='email'
        type='email'
        value={email}
        onChange={validateForm}
      /><br />
      <label htmlFor='phone'>phone</label>
      <input
        name='phone'
        type='tel'
        value={phone}
        onChange={validateForm}
      /><br />
      <button
        type='submit'
        disabled={!formValid}
        onClick={() => props.onSubmit(id, firstName, lastName, email, phone)}
      >
        Submit
      </button>
    </div>
  )
}

export default Form;