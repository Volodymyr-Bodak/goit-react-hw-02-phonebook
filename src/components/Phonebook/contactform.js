import React, { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import styles from 'components/Phonebook/ContactForm.module.css'

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
     contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    handleSubmit: PropTypes.func.isRequired,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const {  handleSubmit } = this.props; 
    if (name.trim() === "" || number.trim() === "") {
      console.error("Fields can't be empty");
      return;
    }

    const contactExists = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    handleSubmit(newContact);
    this.setState({ name: "", number: "" });
  };


  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.formContainer} onSubmit={this.handleSubmit}>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          placeholder="Name"
        />
        <input
          className={styles.formInput}
          type="text"
          name="number"
          value={number}
          onChange={this.handleChange}
          placeholder="Phone Number"
        />
        <button className={styles.formButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}