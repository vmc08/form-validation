import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Heading, Button,
  VStack, Card, Flex, Container,
  CardBody, CardHeader,
} from '@chakra-ui/react'
import {
  Select,
} from "chakra-react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, SchemaType } from './validation';

const SINGLE_SELECT_OPTIONS = [
  { label: 'Blue', value: 'BLUE' },
  { label: 'Green', value: 'GREEN' },
  { label: 'Red', value: 'RED' },
  { label: 'Black', value: 'BLACK' },
  { label: 'Brown', value: 'BROWN' },
]

const MULTI_SELECT_OPTIONS = [
  { label: 'Bear', value: 'BEAR' },
  { label: 'Tiger', value: 'TIGER' },
  { label: 'Snake', value: 'SNAKE' },
  { label: 'Donkey', value: 'DONKEY' },
]

const Home = () => {
  /**
   * Form state validation initialization
   */
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
  })

  /**
   * Submit handler based on the form state validation
   * @param values 
   */
  const onSubmitHandler = async (values: SchemaType) => {
    console.log(values)
  }

  const hasTiger = (getValues('animals') || []).includes('TIGER')

  return (
    <Flex minH="100vh" justifyContent="center" alignItems="center" bg="gray.200">
      <Container maxW="sm">
        <Card bg="white">
          <CardHeader>
            <Heading size='md'>Form Validation</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmitCapture={handleSubmit(onSubmitHandler)}>
              <VStack gap={3}  w="full">
                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' {...register('email')} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel>Password</FormLabel>
                  <Input type='password' {...register('password')} />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.color)}>
                  <FormLabel>Choose a Color</FormLabel>
                  <Select
                    id="color"
                    options={SINGLE_SELECT_OPTIONS}
                    onChange={v => {
                      const value = v?.value
                      if (value) {
                        setValue('color', value, { shouldValidate: true })
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.color?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.animals)}>
                  <FormLabel>Select Animals</FormLabel>
                  <Select
                    id="animals"
                    isMulti
                    options={MULTI_SELECT_OPTIONS}
                    onChange={v => {
                      const values = v.map(v => v.value)
                      setValue('animals', values, { shouldValidate: true })
                    }}
                  />
                  <FormErrorMessage>{errors.animals?.message}</FormErrorMessage>
                </FormControl>
                {hasTiger && (
                  <FormControl isInvalid={Boolean(errors.tigerType)}>
                    <FormLabel>Type of Tiger</FormLabel>
                    <Input type='text' {...register('tigerType')} />
                    <FormErrorMessage>{errors.tigerType?.message}</FormErrorMessage>
                  </FormControl>
                )}
                <Button w="full" colorScheme="blue" type="submit">Submit</Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Flex>
  )
}

export default Home
