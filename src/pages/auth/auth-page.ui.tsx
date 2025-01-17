import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { userContracts, userQueries, userTypes } from '~entities/user';
import { Button, IconButton, TextField } from '@mui/material';
import { formikContract } from '~shared/lib/zod';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Page() {
  const [visibility, setVisibility] = useState(false);
  const [active, setActive] = useState(false);

  const handleClickShowPassword = () =>
    setVisibility((visibility) => !visibility);

  const {
    mutate: loginToken,
    isPending,
    isError,
  } = userQueries.useGetTokenMutation();

  return (
    <div className="w-[380px]  mx-auto rounded-md px-5 py-7 ">
      <h1 className="font-bold  text-2xl text-pc-500">
        Вход в Bilim<span className="text-blue">Track</span>{' '}
      </h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => loginToken({ user })}
      >
        <Form>
          <fieldset disabled={isPending} className="text-xs text-[red]">
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="username"
                name="username"
                label="Username"
                size="small"
                className="rounded-lg"
              />
              <ErrorMessage name="email" />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label="Пароль"
                type={visibility ? 'text' : 'password'}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="password-visibility"
                      size="small"
                      color="info"
                      onClick={handleClickShowPassword}
                    >
                      {visibility ? (
                        <Visibility className="text-blue" />
                      ) : (
                        <VisibilityOff className="text-blue" />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <ErrorMessage name="password" />
            </fieldset>
          </fieldset>
          {isPending ? (
            <Button
              variant="contained"
              disabled
              className=" text-center  w-full"
            >
              Выполняется вход...
            </Button>
          ) : (
            <SubmitButton />
          )}
        </Form>
      </Formik>

      {isError && (
        <p className="text-center text-xs text-red">
          Ошибка при выполнении запроса
        </p>
      )}
    </div>
  );
}

const initialUser: userTypes.LoginUserDto = {
  username: '',
  password: '',
};

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-blue shadow-none"
      disabled={!isValid || isValidating}
    >
      Войти
    </Button>
  );
}

const validateForm = formikContract(userContracts.LoginUserDtoSchema);

export const AuthPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
