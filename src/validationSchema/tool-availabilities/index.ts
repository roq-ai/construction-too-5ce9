import * as yup from 'yup';

export const toolAvailabilityValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  tool_id: yup.string().nullable(),
  outlet_id: yup.string().nullable(),
});
