import * as yup from 'yup';

export const bmiCalculationSchema = yup.object({
  height: yup
    .number()
    .required('Height is required')
    .positive('Height must be positive')
    .min(0.1, 'Height is too small')
    .max(300, 'Height is too large'),
  weight: yup
    .number()
    .required('Weight is required')
    .positive('Weight must be positive')
    .min(1, 'Weight is too small')
    .max(1000, 'Weight is too large'),
  unit: yup
    .string()
    .required('Unit is required')
    .oneOf(['metric', 'imperial'], 'Unit must be metric or imperial')
});