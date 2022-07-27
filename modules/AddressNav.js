import Link from "next/link";

function AddressNav() {
  return (
    <>
      <Link href="/address">
        <h1>Contact Table</h1>
      </Link>
      <Link href="/address/create" className="h1">
        <h1>Create New Contact</h1>
      </Link>
      <hr />
    </>
  );
}

export default AddressNav;
