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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createToolAvailability } from 'apiSdk/tool-availabilities';
import { Error } from 'components/error';
import { toolAvailabilityValidationSchema } from 'validationSchema/tool-availabilities';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ToolInterface } from 'interfaces/tool';
import { OutletInterface } from 'interfaces/outlet';
import { getTools } from 'apiSdk/tools';
import { getOutlets } from 'apiSdk/outlets';
import { ToolAvailabilityInterface } from 'interfaces/tool-availability';

function ToolAvailabilityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ToolAvailabilityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createToolAvailability(values);
      resetForm();
      router.push('/tool-availabilities');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ToolAvailabilityInterface>({
    initialValues: {
      quantity: 0,
      tool_id: (router.query.tool_id as string) ?? null,
      outlet_id: (router.query.outlet_id as string) ?? null,
    },
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
            Create Tool Availability
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'tool_availability',
  operation: AccessOperationEnum.CREATE,
})(ToolAvailabilityCreatePage);
