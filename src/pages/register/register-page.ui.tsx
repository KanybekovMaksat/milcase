import {
  Formik,
  Form,
  ErrorMessage,
  useFormikContext,
  Field,
} from 'formik';
import {
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { userQueries } from '~entities/user';

const initialUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  rePassword: '',
  birthdate: '',
  phoneModels: [],
};

function RegisterPageComponent() {
  const [visibility, setVisibility] = useState(false);
  const handleClickShowPassword = () => setVisibility((prev) => !prev);

  const { mutate: registerUser, isPending, isSuccess } = userQueries.useRegisterMutation();
  const { data: models, isLoading, isError } = userQueries.useGetPhoneModels();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading phone models...</p>;
  if (isSuccess) return <p>На вашу почту отправлено письмо для подтверждения.</p>;

  return (
    <div className="w-[380px] mx-auto rounded-md px-5 py-7">
      <h1 className="font-bold text-2xl text-pc-500">Регистрация</h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => registerUser({ user })}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-[20px]">
            <CustomField name="email" label="Email" type="email" />
            <CustomField name="firstName" label="Имя" />
            <CustomField name="lastName" label="Фамилия" />
            <CustomField name="birthdate" label="Дата рождения" type="date" />
            <CustomField name="password" label="Введите пароль" type={visibility ? 'text' : 'password'}
              endAdornment={
                <IconButton onClick={handleClickShowPassword}>
                  {visibility ? '🙈' : '👁️'}
                </IconButton>
              }
            />
            <CustomField name="rePassword" label="Подтвердите пароль" type={visibility ? 'text' : 'password'} />

            <TextField
              select
              fullWidth
              label="Выберите модели телефонов"
              value={values.phoneModels || []}
              onChange={(event) => setFieldValue('phoneModels', event.target.value)}
              SelectProps={{ multiple: true }}
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Выберите модели телефонов
              </MenuItem>
              {models?.data?.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.brand} {model.modelName}
                </MenuItem>
              ))}
            </TextField>
            <ErrorMessage name="phoneModels" component="div" className="text-xs text-[red]" />

            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
}

function CustomField({ name, label, type = 'text', endAdornment }) {
  return (
    <>
      <Field
        as={TextField}
        fullWidth
        id={name}
        name={name}
        label={label}
        type={type}
        size="small"
        InputProps={{ endAdornment }}
      />
      <ErrorMessage name={name} component="div" className="text-xs text-[red]" />
    </>
  );
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button variant="contained" type="submit" fullWidth disabled={!isValid || isValidating}>
      Зарегистрироваться
    </Button>
  );
}

const validateForm = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Обязательное поле';
  if (!values.firstName) errors.firstName = 'Обязательное поле';
  if (!values.lastName) errors.lastName = 'Обязательное поле';
  if (!values.password || values.password.length < 6) errors.password = 'Пароль должен содержать минимум 6 символов';
  if (values.password !== values.rePassword) errors.rePassword = 'Пароли не совпадают';
  if (!values.birthdate) errors.birthdate = 'Обязательное поле';
  if (!values.phoneModels.length) errors.phoneModels = 'Выберите хотя бы одну модель';
  return errors;
};

export const RegisterPage = withErrorBoundary(RegisterPageComponent, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
