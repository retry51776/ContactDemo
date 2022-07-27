import * as Yup from "yup";
import "yup-phone";
import { hasDuplicate } from "../data/contact";

const contactSchema = Yup.object({
  first_name: Yup.string().nullable(true),
  last_name: Yup.string().nullable(true),
  phone: Yup.string().test("test-phone", "Invalid format", (value) => {
    if (value) return Yup.string().phone().isValidSync(value);
    return true;
  }),
  email: Yup.string().email().nullable(true),
  address: Yup.string().nullable(true),
}).test(
  "require_contact",
  "At least one of three attributes (phone number, email, address) should be required",
  /* This is biggest roadblock, a bug in formik!
		https://stackoverflow.com/questions/57863852/yup-validation-on-multiple-values
		*/
  async function (contact) {
    if (!(contact.phone || contact.email || contact.address)) {
      return this.createError({
        path: "phone | email | address",
        message: "One field must be set",
      });
    }
    for (const field of ["phone", "email"]) {
      if (contact[field]) {
        const isDup = await hasDuplicate(contact.id, field, contact[field]);
        console.log("isDup", isDup, contact[field]);
        if (isDup) {
          return this.createError({
            path: field,
            message: `${field} already existed`,
          });
        }
      }
    }
    return true;
  }
);

/**
 * Usually have many schema in here
 **/

export { contactSchema };
