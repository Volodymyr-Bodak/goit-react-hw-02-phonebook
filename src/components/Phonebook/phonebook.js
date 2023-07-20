import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./contactform";
import ContactList from "./contactlist";
import Filter from "./filter";

export default class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleChangeNumber = (event) => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, number, contacts } = this.state;

    if (name.length === 0 || number.length === 0) {
      console.error('Fields cant be empty');
      return;
    }


    const contactExists = contacts.find(
      (contact) => contact.name === name || contact.number === number
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState({
      contacts: [...contacts, { name, number, id: nanoid() }],
      name: "",
      number: "",
    });
  };

  handleDelete = (id) => {
  
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id)
    });
  };

  render() {
    const { contacts, filter } = this.state;

 
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleChangeNumber={this.handleChangeNumber}
        />

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          handleChangeFilter={this.handleChangeFilter}
        />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
