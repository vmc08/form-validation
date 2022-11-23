import { InferType, object, string, array } from "yup";

/**
 * Form validation logic to make sure
 * correct value types are supplied
 */
export const schema = object({
  email: string().email('Invalid email.').required('Email is required.'),
  password: string().min(6, 'Must at least 6 characters').required('Password is required'),
  color: string().required('Color is required.'),
  animals: array()
    .of(
        string().required()
    )
    .min(1, 'Select an animal.')
    .required('Select an animal.'),
  tigerType: string().when("animals", {
    is: (animals: unknown) => Array.isArray(animals) && animals.includes("TIGER"),
    then: string().required("Type of tiger is required."),
  })
})

/**
 * Infer correct type definition from schema
 * to be consumed in the form to make sure
 * correct value types are supplied
 */
export type SchemaType = InferType<typeof schema>
