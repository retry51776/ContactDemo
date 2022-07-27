const contactUrl = "http://localhost:9000/api/v1/address/",
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
const getContacts = async (id) =>
  fetch(`${contactUrl}${id ? `?id=${id}` : ""}`).then((res) => res.json());
const deleteContact = async (id) => {
  if (!id) {
    alert("Can't delte contact without a valid id");
  }
  fetch(`${contactUrl}${id}`, {
    method: "DELETE",
    headers,
  }).then((res) => res.json());
};

const createContact = async (contact) =>
  fetch(contactUrl, {
    method: "POST",
    body: JSON.stringify(contact),
    headers,
  }).then((res) => res.json());

const editContact = async (contact) =>
  fetch(`${contactUrl}?id=${contact.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(contact),
  }).then((res) => res.json());

const hasDuplicate = async (id, fieldName, fieldValue) =>
  fetch(`${contactUrl}?${fieldName}=${fieldValue}&id_ne=${id}`).then(
    async (res) => {
      const body = await res.json();
      return body.length > 0;
    }
  );
/*
 * Patch method, too lazy to do it
 */
export { getContacts, deleteContact, createContact, editContact, hasDuplicate };
