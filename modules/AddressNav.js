import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const paths = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/address',
    label: 'Contact Table'
  },
  {
    path: '/address/create',
    label: 'Create Contact'
  },
];
function AddressNav() {
  const router = useRouter()
  console.log('router', router)
  return (
    <>
      <Breadcrumb spacing='8px'>
        {
          paths.map(p => (
            <BreadcrumbItem
              isCurrentPage={router.route === p.path}
            >
              <BreadcrumbLink href={p.path}>
                {p.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
    </>
  );
}

export default AddressNav;
