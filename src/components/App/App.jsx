import { Component } from 'react';
import { nanoid } from 'nanoid';
import { InputForm } from 'components/InputForm';
import { Filter } from 'components/Filter/';
import { ContactList } from 'components/ContactList';
import { PhonebookBox } from 'components/Phonebook/Phonebook.styled';
import { InputFormBox } from 'components/InputForm/InputForm.styled';
import { ContactListBox } from 'components/ContactList/ContactList.styled';

const LS_KEY = 'contacts_object';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const prevData = localStorage.getItem(LS_KEY);
    if (prevData !== null) {
      this.setState({ contacts: JSON.parse(prevData) });
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state)
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }
  submitHandle = data => {
    const equalName = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (equalName)
      return alert(
        `${equalName.name} already been added to the contact list ;o(`
      );

    data.id = nanoid();
    this.setState(prev => ({ contacts: [data, ...prev.contacts] }));
  };
  filterChange = evt => {
    evt.preventDefault();
    this.setState({ filter: evt.currentTarget.value });
  };
  onDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <PhonebookBox>
        <InputFormBox>
          <h1>Phonebook</h1>
          <InputForm submitHandle={this.submitHandle} />
        </InputFormBox>
        <ContactListBox>
          <h2>Contact List</h2>
          <Filter filter={filter} filterChange={this.filterChange} />
          {contacts.length ? (
            <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
          ) : (
            <p>No any contacts</p>
          )}
        </ContactListBox>
      </PhonebookBox>
    );
  }
}
