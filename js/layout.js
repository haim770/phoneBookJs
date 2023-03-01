//presented by haim monhait and lior shushan
"use strict";
//#region global vars
let contactToEdit = ""; //from type contact to save the contact we will edit to
//#endregion global vars
function clearAllContactsFromScreen() {
  //we clear the phone book so the elemelts will be like the array and updated
  const ul = document.querySelector("ul");
  let contacts_on_screen = ul.children; //all the contacts displays
  while (ul.firstChild) {
    //while the first child is something the loop will erase it
    ul.lastChild.remove();
  }
}
function displayOneContact(i) {
  //set the listeners and properties of element to add to page
  //i is the contact from the array
  const contactToAdd = document.createElement("li"); //element to set to flow in the ul
  contactToAdd.classList.add("contacts");
  contactToAdd.addEventListener("mouseover", mouseIn);
  contactToAdd.addEventListener("mouseleave", mouseOut);
  contactToAdd.addEventListener("click", showDetails);
  let name = document.createElement("p");
  name.setAttribute("class", "name");
  let phone = document.createElement("p");
  phone.setAttribute("class", "phone");
  let deleteOne = document.createElement("button");
  deleteOne.type = "button";
  deleteOne.setAttribute("class", "btn deleteOne");
  let edit = document.createElement("button");
  edit.type = "button";
  edit.setAttribute("class", "btn edit");
  deleteOne.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteOne.addEventListener("click", deleteSelected);
  edit.innerHTML = '<i class="fas fa-edit"></i>';
  edit.addEventListener("click", editSelected);
  contactToAdd.appendChild(name);
  contactToAdd.appendChild(phone);
  contactToAdd.appendChild(deleteOne);
  contactToAdd.appendChild(edit);
  contactToAdd.setAttribute("class", "contacts");
  setElementsValues(contactToAdd, i);
  return contactToAdd;
}
function createMsgEmpty() {
  //massage about empty phone book
  const msg = document.createElement("h2");
  msg.textContent = "empty phonebook";
  return msg;
}
function setElementsValues(el, cont) {
  //el is for the html element and the function will place the contact information inside
  el.querySelector(".name").textContent = cont.name;
  el.querySelector(".phone").textContent = cont.phone;
}
function displayContactsInLayout() {
  //display the contacts on the screen
  clearAllContactsFromScreen();
  if (Contact.checkIfNotEmptyPhonebook()) {
    Contact.sortArrayOfContacts();
    const ul = document.querySelector("ul");
    let contactToAdd = "";
    //add the array to the screen
    for (let i of Contact.arrOfContacts) {
      contactToAdd = displayOneContact(i);
      ul.append(contactToAdd);
    }
  } else {
    const ul = document.querySelector("ul");
    ul.appendChild(createMsgEmpty());
  }
}
function clearForm() {
  //clear the form data
  document.querySelector("#form_name").value = "";
  document.querySelector("#form_mail").value = "";
  document.querySelector("#form_tel").value = "";
  document.querySelector("#form_text").value = "";
  document.querySelector("#form_address").value = "";
}
function changeElementVisibilityIfEmpty(el) {
  //display only elements with value in them
  if (el.value.trim() === "") {
    if (el === document.querySelector("#form_text")) {
      el.style.display = "none";
    } else {
      //because the field with the value is inside a parent with lable and we will vannish both of them
      el.parentElement.style.display = "none";
    }
  }
}
function changeElementToVisible(el) {
  //make all elements visible base on the hirarchy(if there is a parent involved?)
  if (el === document.querySelector("#form_text")) {
    el.style.display = "block";
  } else {
    el.parentElement.style.display = "block";
  }
}
//#region listeners functions
function showDetails(e) {
  //show details of contact at the form of all also remove submit from seen
  if (e.target === this) {
    //only when clicking the parent the click and the form change will happen
    const contactToShow = Contact.getContactFromArray(
      e.target.querySelector(".name").textContent
    );

    document.querySelector("#form_name").value = contactToShow.name;
    document.querySelector("#form_tel").value = contactToShow.phone;
    document.querySelector("#form_mail").value = contactToShow.email;
    document.querySelector("#form_text").value = contactToShow.freeText;
    document.querySelector("#form_address").value = contactToShow.address;
    changeElementVisibilityIfEmpty(document.querySelector("#form_address"));
    changeElementVisibilityIfEmpty(document.querySelector("#form_text"));
    changeElementVisibilityIfEmpty(document.querySelector("#form_mail"));
    changeElementVisibilityIfEmpty(document.querySelector("#form_tel"));
    changeElementVisibilityIfEmpty(document.querySelector("#form_name"));
    document.querySelector("#form_name").disabled = true;
    document.querySelector("#form_tel").disabled = true;
    document.querySelector("#form_mail").disabled = true;
    document.querySelector("#form_text").disabled = true;
    document.querySelector("#form_address").disabled = true;
    document.querySelector("#form_submit").style.visibility = "hidden";
    show_form();
    document.querySelector("form").querySelector("h2").textContent =
      "contact to show";
    //make the submit visible when we go out of form
    document
      .querySelector("#form_out")
      .addEventListener("click", function showC() {
        goToPhoneBook();
        document.querySelector("#form_submit").style.visibility = "visible";
        document.querySelector("#form_name").disabled = false;
        document.querySelector("#form_tel").disabled = false;
        document.querySelector("#form_mail").disabled = false;
        document.querySelector("#form_text").disabled = false;
        document.querySelector("#form_address").disabled = false;
        document.querySelector("#form_out").removeEventListener("click", showC);
        document
          .querySelector("#form_out")
          .addEventListener("click", goToPhoneBook);
      });
  }
}
function addNewContact(e) {
  //add contact if name is not at the array
  e.preventDefault();
  //b stands for weather the name is in the array
  let b = true;
  if (document.querySelector("#form_name").value.trim() === "") {
    //check that name is not empty spaces
    alert("empty name");
    goToPhoneBook();
    return;
  }
  if (
    document.querySelector("#form_tel").value.trim() === "" ||
    !Contact.checkPhoneValidity(document.querySelector("#form_tel").value)
  ) {
    alert("empty phone or not legal");

    goToPhoneBook();
    return;
  }
  for (let i of Contact.arrOfContacts) {
    if (document.querySelector("#form_name").value === i.name) {
      b = false;
      alert("same name");
      break;
    }
  }
  if (b) {
    Contact.addNewContact(
      e.target.parentElement.parentElement.querySelector("#form_name").value,
      e.target.parentElement.parentElement.querySelector("#form_tel").value,
      e.target.parentElement.parentElement.querySelector("#form_mail").value,
      e.target.parentElement.parentElement.querySelector("#form_address").value,
      e.target.parentElement.parentElement.querySelector("#form_text").value
    );
    displayContactsInLayout();
  }
  goToPhoneBook();
}
function deleteSelected(e) {
  //delete selected item from the array and layout
  const index = Contact.getIndexByName(
    e.target.parentElement.querySelector(".name").textContent
  );
  if (index != -1) {
    Contact.arrOfContacts.splice(index, 1);
  }
  displayContactsInLayout();
}
function editSelected(e) {
  //func upload the form with the delails of selected contact
  //get the contact from the array by the name of the one we selected
  contactToEdit = Contact.getContactFromArray(
    e.target.parentElement.querySelector(".name").textContent
  );
  show_form();
  document.querySelector("h2").textContent = "edit contact";
  document.querySelector("#form_name").value = contactToEdit.name;
  document.querySelector("#form_tel").value = contactToEdit.phone;
  document.querySelector("#form_mail").value = contactToEdit.email;
  document.querySelector("#form_text").value = contactToEdit.freeText;
  document.querySelector("#form_address").value = contactToEdit.address;
  document
    .querySelector("#form_submit")
    .removeEventListener("click", addNewContact);
  document.querySelector("#form_submit").addEventListener("click", editContact);
}
function editContact(e) {
  //edit the contact at the array if the new name is not at current array
  e.preventDefault();
  //get the contact to edit index at the array
  let index = Contact.getIndexByName(contactToEdit.name);
  //check if the name is not registered yet
  console.log();
  if (
    (Contact.getIndexByName(document.querySelector("#form_name").value) ===
      -1 ||
      document.querySelector("#form_name").value === contactToEdit.name) &&
    document.querySelector("#form_name").value.trim() != "" &&
    document.querySelector("#form_tel").value.trim() != "" &&
    Contact.checkPhoneValidity(document.querySelector("#form_tel").value)
  ) {
    Contact.arrOfContacts[index].name =
      document.querySelector("#form_name").value;
    Contact.arrOfContacts[index].phone =
      document.querySelector("#form_tel").value;
    Contact.arrOfContacts[index].email =
      document.querySelector("#form_mail").value;
    Contact.arrOfContacts[index].freeText =
      document.querySelector("#form_text").value;
    Contact.arrOfContacts[index].address =
      document.querySelector("#form_address").value;
    displayContactsInLayout();
  } else {
    //check and not display the alert if the name has not changed
    alert("name already exist or empty name or phone empty or not leagl");
  }
  //returns the submit to be listening to the adding
  document
    .querySelector("#form_submit")
    .addEventListener("click", addNewContact);
  document
    .querySelector("#form_submit")
    .removeEventListener("click", editContact);
  goToPhoneBook();
  contactToEdit = "";
}
function show_form(e) {
  //show the form and make the search box display nothing also make the h2 of the form say add contact
  document.querySelector("div").setAttribute("class", "form_seen");
  document.querySelector("form").querySelector("h2").textContent =
    "add contact";
  document.querySelector("#search_name").value = "";
}
function clearMainForm() {
  document.querySelector("#form_name").value = "";
  document.querySelector("#form_mail").value = "";
  document.querySelector("#form_address").value = "";
  document.querySelector("#form_tel").value = "";
  document.querySelector("#form_text").value = "";
}
function goToPhoneBook() {
  //go back to main page and clears the form
  clearMainForm();
  document.querySelector("div").classList.remove("form_seen");
  changeElementToVisible(document.querySelector("#form_mail"));
  changeElementToVisible(document.querySelector("#form_name"));
  changeElementToVisible(document.querySelector("#form_address"));
  changeElementToVisible(document.querySelector("#form_tel"));
  changeElementToVisible(document.querySelector("#form_text"));
}
function DisplayOnlyStartsWith(e) {
  //display on screen only the contacts that starts with the input
  let AllContactsOnScreen = GetAllContacts();
  //the contacts at the screen(not the arry)
  for (let i of AllContactsOnScreen) {
    if (i.querySelector(".name").innerHTML.startsWith(e.target.value)) {
      i.style.display = "flex";
    } else {
      i.style.display = "none";
    }
  }
}
function mouseIn(e) {
  //append hover effect
  if (this === e.target) {
    //check if the event that got the click is the event that called it. means if the parent
    e.target.classList.add("contacts_hover");
  }
}
function mouseOut(e) {
  //remove the hover effect
  e.target.classList.remove("contacts_hover");
}
function deleteAll() {
  Contact.deleteAllContactsFromArray();
  displayContactsInLayout();
}
function set_listeners() {
  //listener to a contact
  // const contact_flow=document.querySelector('.contact');
  // contact_flow.addEventListener("mouseover", mouse_in);
  //listener to search
  const search = document.querySelector("#search_name");
  search.addEventListener("input", DisplayOnlyStartsWith);
  //listener to add
  const add = document.querySelector(".add_contact");
  add.addEventListener("click", show_form);
  //listener to delete all
  const delete_everything = document.querySelector(".delete_all");
  delete_everything.addEventListener("click", deleteAll);
  //for delete selected
  //const delete_one = document.querySelector(".delete_one");
  //delete_one.addEventListener("click", delete_selected);
  //for edit
  //const edit=document.querySelector('.edit');
  //edit.addEventListener("click", edit_selected);
  //for exit form
  const exit_form = document.querySelector("#form_out");
  exit_form.addEventListener("click", goToPhoneBook);
  //for adding new contact
  const submit = document.querySelector("#form_submit");
  const form = document.querySelector("form");
  submit.addEventListener("click", addNewContact);
  // //set listener for clicking a contact
  // const contactDetailsShow=document.querySelector('.contacts');
  // contactDetailsShow.addEventListener('click',()=>console.log("hae"));
  document.querySelector("#night").addEventListener("click", changeBackground);
}
//#endregion end listeners functions
function changeBackground(e) {
  if (changeBackground.counter == 0) {
    e.target.parentElement.parentElement.style.backgroundColor = "black";
    e.target.parentElement.parentElement.style.color = "white";
    e.target.innerHTML = "day";
    changeBackground.counter++;
  } else {
    e.target.parentElement.parentElement.style.backgroundColor = "white";
    e.target.parentElement.parentElement.style.color = "black";
    e.target.innerHTML = "night";
    changeBackground.counter--;
  }
}
changeBackground.counter = 0;
function GetAllContacts() {
  //returns all contacts that display on screen
  return document.querySelectorAll(".contacts");
}
set_listeners();
displayContactsInLayout();
