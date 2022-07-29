import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Badge } from '@chakra-ui/react'

import ContactForm from "../../modules/ContactForm";
import AddressNav from "../../modules/AddressNav";
import { getContacts, editContact } from "../../data/contact";

export default function Address() {
  const router = useRouter();
  const id = router.query?.id;

  const { data, isLoading, error } = useQuery(
    ["getContacts"],
    () => getContacts(id),
    {
      placeholderData: [],
      enabled: router.isReady,
    }
  );

  if (error) {
    console.log("error", error);
    return "Something bad happened";
  }

  if (isLoading) {
    return "loading";
  }

  if (data.length != 1) {
    return `Something went wrong, ${data.length} addresses returned`;
  }

  const onEditContact = async (values, actions) => {
    const result = await editContact(values);
    if (result) {
      alert(`Edit Contact ${JSON.stringify(values)}`);
    }
  };

  return (
    <div>
      <AddressNav />
      <Badge>Edit Contact: #{id}</Badge>
      <ContactForm contact={data[0]} onSubmit={onEditContact}/>
    </div>
  );
}
