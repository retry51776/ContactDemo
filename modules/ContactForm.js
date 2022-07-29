import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from "@chakra-ui/react"
import { css } from '@emotion/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema } from "../models/contact";

const ButtonCss = css`
  padding: 32px;
  background-color: blue;
  font-size: 24px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  &:hover {
    color: red;
  }
`

const InputCss = css`
  padding: 10px;
  font-size: 24px;
  border-radius: 4px;
  font-weight: bold;
`

function ContactForm({ contact, onSubmit }) {

  const defaultContact = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
  };

  // very cool, RFH have watch hook to get sub state from RFH
  // const f = watch("firstname")
  const {
    register,
    control,
    handleSubmit,
    formState: {
      isDirty,
      isValid,
      errors
    }
  } = useForm({
    defaultValues: contact || defaultContact,
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
  })

  console.log('errors', errors, 'isDirty', isDirty, 'isValid', isValid)

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {Object.keys(defaultContact).map(name => (
        <FormControl isInvalid={errors?.[name]} key={name}>
          <FormLabel htmlFor={name}>{name}</FormLabel>
          <Input
            id={name}
            placeholder={name}
            {...register(name)}
          />
          <FormErrorMessage>
            {errors?.[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      ))}
      <Button
        label="Submit"
        primary="blue"
        type="submit"
        disabled={!isDirty || !isValid || Object.keys(errors) > 0}
        css={ButtonCss}
      >
        Submit
      </Button>
    </form>
  );
}
/**
 * 
          <Input type='text' {...register(name)} />

      https://react-hook-form.com/api/usecontroller/controller/
      <Controller
        control={control}
        name="email"
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        control={control}
        name="address"
        render={({ field }) => <Input {...field} />}
      />
        register={register}
      


 */
//disabled={!formik.isValid || !formik.dirty}

export default ContactForm;
