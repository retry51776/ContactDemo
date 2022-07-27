import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ContactTable from "../../modules/ContactTable";
import AddressNav from "../../modules/AddressNav";
import { getContacts } from "../../data/contact";
export default function AddressList() {
  /* SIMPLE WAY
	const [contacts, setContacts] = useState([]);

	const getContacts = async () => {
		const response = await fetch('http://localhost:9000/api/v1/address');
		const data = await response.json();
		return setContacts(data)
	}

	useEffect(() => {
		getContacts();
	}, [])
	*/

  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    ["getContacts"],
    () => getContacts(null),
    {
      placeholderData: [],
    }
  );

  if (error) {
    return "Something bad happened!";
  }

  if (isLoading) {
    return "Loading";
  }
  return (
    <>
      <AddressNav />
      <h3>Contact Table</h3>
      <ContactTable data={data} />
    </>
  );
}
