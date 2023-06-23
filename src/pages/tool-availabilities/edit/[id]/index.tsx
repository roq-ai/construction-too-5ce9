import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getToolAvailabilityById, updateToolAvailabilityById } from 'apiSdk/tool-availabilities';
import { Error } from 'components/error';
import { toolAvailabilityValidationSchema } from 'validationSchema/tool-availabilities';
import { ToolAvailabilityInterface } from 'interfaces/tool-availability';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ToolInterface } from 'interfaces/tool';
import { OutletInterface } from 'interfaces/outlet';
import { getTools } from 'apiSdk/tools';
import { getOutlets } from 'apiSdk/outlets';

function ToolAvailabilityEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ToolAvailabilityInterface>(
    () => (id ? `/tool-availabilities/${id}` : null),
    () => getToolAvailabilityById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ToolAvailabilityInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateToolAvailabilityById(id, values);
      mutate(updated);
      resetForm();
      router.push('/tool-availabilities');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ToolAvailabilityInterface>({
    initialValues: data,
    validationSchema: toolAvailabilityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Tool Availability
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="quantity" mb="4" isInvalid={!!formik.errors?.quantity}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                name="quantity"
                value={formik.values?.quantity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.quantity && <FormErrorMessage>{formik.errors?.quantity}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ToolInterface>
              formik={formik}
              name={'tool_id'}
              label={'Select Tool'}
              placeholder={'Select Tool'}
              fetcher={getTools}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<OutletInterface>
              formik={formik}
              name={'outlet_id'}
              label={'Select Outlet'}
              placeholder={'Select Outlet'}
              fetcher={getOutlets}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'tool_availability',
  operation: AccessOperationEnum.UPDATE,
})(ToolAvailabilityEditPage);
