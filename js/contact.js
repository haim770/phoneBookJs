//presented by haim monhait and lior shushan
"use strict";
class Contact {
  //class of Contact to represent every Contact
  constructor(name, phone, email, address, freeText) {
    this.name = name;
    this.email = email;
    this.freeText = freeText;
    this.address = address;
    this.phone = phone;
  }
  checkIfNameExist() {
    //check if name exist at Contacts array if so returns the place at array elsewhere return -1
    for (let i = 0; i < Contact.arrOfContacts.length; i++) {
      if (this.name === Contact.arrOfContacts[i].name) {
        return i;
      }
    }
    return -1;
  }
  editContactAtArray() {
    //func get an array and another Contact type var and change this Contact at the array to the other one
    if (this.check_if_name_exist(Contact.arrOfContacts) != -1) {
      Contact.arrOfContacts[
        this.check_if_name_exist(Contact.arrOfContacts)
      ].name = this.name;
      Contact.arrOfContacts[
        this.check_if_name_exist(Contact.arrOfContacts)
      ].phone = this.phone;
      Contact.arrOfContacts[
        this.check_if_name_exist(Contact.arrOfContacts)
      ].freeText = this.freeText;
      Contact.arrOfContacts[
        this.check_if_name_exist(Contact.arrOfContacts)
      ].email = this.email;
      Contact.arrOfContacts[
        this.check_if_name_exist(Contact.arrOfContacts)
      ].email = this.address;
    }
  }
}
Contact.getIndexByName = function (name) {
  //func return index if the name in array and -1 otherwise
  for (let index = 0; index < Contact.arrOfContacts.length; index++) {
    if (Contact.arrOfContacts[index].name === name) {
      return index;
    }
  }
  return -1;
};

//check phone validity
Contact.checkPhoneValidity = (phone) =>
  !(phone.length != 10) && checkIfNumberOrLine(phone);
//#region belong to the whole class
function checkIfNumberOrLine(phone) {
  //check only numbers or  one -
  let b = 0; //counter of '-'
  for (const i of phone) {
    if ((i < "0" || i > "9") && i != "-") {
      return false;
    } else {
      if (i === "-") {
        b++;
      }
    }
    if (b > 1) {
      return false;
    }
  }
  return true;
}

//array of Contacts belong to class
Contact.arrOfContacts = [];
Contact.getContactFromArray = function (name) {
  //return the Contact that its name is name return -1 if name doesnt exist
  for (let i of Contact.arrOfContacts) {
    if (i.name === name) {
      return new Contact(i.name, i.phone, i.email, i.address, i.freeText);
    }
  }
  return -1;
};
Contact.deleteAllContactsFromArray = function () {
  //delete all Contacts
  while (Contact.arrOfContacts.length >= 1) {
    Contact.arrOfContacts.pop();
  }
};
Contact.sortArrayOfContacts = function () {
  //sort the array by alphbethical order

  let tmp = ""; //the temp var to make the switch between parts of array
  for (let i = 0; i < Contact.arrOfContacts.length - 1; i++) {
    for (let j = i + 1; j < Contact.arrOfContacts.length; j++) {
      if (
        Contact.arrOfContacts[i].name.localeCompare(
          Contact.arrOfContacts[j].name
        ) > 0
      ) {
        tmp = Contact.arrOfContacts[i];
        Contact.arrOfContacts[i] = Contact.arrOfContacts[j];
        Contact.arrOfContacts[j] = tmp;
      }
    }
  }
};
Contact.addNewContact = function (name, phone, mail, address, freeText) {
  //ContactToAdd-type Contact
  //the function adds the Contact to the array
  Contact.arrOfContacts.push(new Contact(name, phone, mail, address, freeText));
};
Contact.editContact = function (name, phone, mail, address, freeText, index) {
  //edit the Contact at the specified index
  Contact.arrOfContacts[index].name = name;
  Contact.arrOfContacts[index].phone = phone;
  Contact.arrOfContacts[index].email = email;
  Contact.arrOfContacts[index].freeText = freeText;
  Contact.arrOfContacts[index].address = address;
};
Contact.deleteOneContact = function (index) {
  //delete one element from array at the selected index
  Contact.arrOfContacts.splice(index, 1);
};
Contact.checkIfNotEmptyPhonebook = function () {
  //check if array is not empty
  if (Contact.arrOfContacts.length === 0) return false;
  return true;
};

//#endregion belong to the whole class
///////////////////////////////////////////////////////////////
//contacts to start with

Contact.arrOfContacts.push(
  new Contact("haim", "04-8234567", "ha@g,a.com", "haifa", "")
);
Contact.arrOfContacts.push(
  new Contact("a", "04-8234567", "ha@g,a.com", "kd", "")
);
Contact.addNewContact("lior", "03-8989898", "", "lior's home", "kdckdcmd");
