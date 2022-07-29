import { Badge } from '@chakra-ui/react'

import ContactForm from "../../modules/ContactForm";
import AddressNav from "../../modules/AddressNav";
import { createContact } from "../../data/contact";

export default function Address() {
  const onCreateContact = async (values, actions) => {

    const result = await createContact(values);
    if (result) {
      console.log(actions)
      //actions.resetForm();
      alert(`Created Contact ${JSON.stringify(values)}`);
    }
  };

  return (
    <div>
      <AddressNav />
      <Badge>Create New Contact</Badge>
      <ContactForm onSubmit={onCreateContact} />
    </div>
  );
}
