import {
  Avatar,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { userQueries, userTypes } from '~entities/user';
import TollIcon from '@mui/icons-material/Toll';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { removeCookie } from 'typescript-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import CakeIcon from '@mui/icons-material/Cake';
import { parse, differenceInDays, format } from 'date-fns'; // Импортируем функции из date-fns
import { ru } from 'date-fns/locale';
import { ModalPopup } from '~widgets/modal-popup';
import EditIcon from '@mui/icons-material/Edit';
import OrderHistory from './OrderHistory';
import FreeCases from './FreeCases';

import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
}

const getNextBirthday = (birthdate) => {
  const currentYear = new Date().getFullYear();
  const parsedBirthday = parse(birthdate, 'yyyy-MM-dd', new Date());
  const nextBirthday = new Date(parsedBirthday.setFullYear(currentYear));

  if (nextBirthday < new Date()) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  return nextBirthday;
};

const formattedBirthday = format(new Date('2025-02-06'), 'd MMMM yyyy', {
  locale: ru,
});

export function ProfilePage() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const {
    data: models,
    isLoading: modelsLoading,
    isError: modelsError,
  } = userQueries.useGetPhoneModels();
  const {
    mutate: editUser,
    isPending,
    isError: isEditError,
    isSuccess: isEditSucces,
  } = userQueries.useEditUserProfile();

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refreshMilcase');
    navigate(`${pathKeys.home()}`);
    userQueries.userService.removeCache();
  };

  if (isLoading || !userData?.data || modelsLoading)
    return <div>Loading...</div>;

  if (isError || modelsError) return <div>Error fetching user data.</div>;

  const birthdate = userData?.data?.birthdate;

  const {
    email,
    firstName,
    lastName,
    points,
    quantityOfCases,
    freeCases,
    phoneModel,
  } = userData?.data;

  const [phoneModels, setPhoneModels] = useState<number[]>([]);

  useEffect(() => {
    if (userData?.data?.phoneModel?.id) {
      setPhoneModels([userData.data.phoneModel.id]);
    }
  }, [userData]);

  const initialUser: userTypes.EditUserProfile = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  return (
    <div className="my-10 max-w-[400px] mx-auto">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border border-alto mx-auto"
      >
        <div>
          <div className="flex flex-col items-center">
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4">
              <div className="flex gap-[10px]">
                {/* <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{ padding: 1, backgroundColor: '#e3f2fd' }}
                >
                  <Chip
                    label={points}
                    color="primary"
                    className="text-white font-bold"
                    icon={<TollIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Накопленные баллы
                  </p>
                </Paper> */}
                <Paper
                  className="w-full min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{ padding: 1, backgroundColor: '#f1f8e9', flex: 1 }}
                >
                  <Chip
                    label={quantityOfCases}
                    color="primary"
                    className="text-white font-bold"
                    icon={<LoyaltyIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Куплено чехлов
                  </p>
                  <LinearProgressWithLabel
                    value={Math.floor((quantityOfCases / 7) * 100)}
                  />
                </Paper>
              </div>
              <Paper
                className="w-full shadow-none border border-alto bg-milk/40"
                elevation={2}
                sx={{ padding: 1, flex: 1 }}
              >
                <p className="text-[15px] font-bold text-tundora mt-2">
                  Модель телефона
                </p>
                <p className="text-violet font-bold">
                  {phoneModel.brand}
                  {phoneModel.modelName}
                </p>
              </Paper>
              <Link className="text-violet underline" to={pathKeys.loyalty()}>
                Подробнее о наших скидках
              </Link>
              <Button
                variant="contained"
                className="bg-milk shadow-none"
                onClick={handleLogout}
              >
                Выйти
              </Button>
              <Button
                variant="contained"
                className="bg-violet shadow-none"
                startIcon={<EditIcon />}
                onClick={() => setActive(true)}
              >
                Редактировать
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      <FreeCases count={freeCases} />
      <OrderHistory />
      <ModalPopup active={active} setActive={setActive}>
        <Formik
          initialValues={initialUser}
          validate={validateForm}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('phoneModel', Number(phoneModels[0])); // Убедимся, что передаём число
            editUser({ user: formData });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <fieldset disabled={isPending}>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="Имя"
                    size="small"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    size="small"
                    label="Фамилия"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <TextField
                  select
                  fullWidth
                  label="Выберите модель телефона"
                  onChange={(event) =>
                    setPhoneModels([Number(event.target.value)])
                  } // Преобразуем в число
                  variant="outlined"
                  value={phoneModels[0] || ''}
                >
                  <MenuItem value="" disabled>
                    Выберите модели телефонов
                  </MenuItem>
                  {models?.data?.map((model) => (
                    <MenuItem key={model.id} value={Number(model.id)}>
                      {model.brand} {model.modelName}
                    </MenuItem>
                  ))}
                </TextField>
              </fieldset>
              {isPending ? (
                <div className="w-full mb-2 min-h-[40px]">
                  <LinearProgress />
                </div>
              ) : (
                <SubmitButton />
              )}
            </Form>
          )}
        </Formik>
      </ModalPopup>
    </div>
  );
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating}
    >
      Редактировать
    </Button>
  );
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {};
  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email';
  }
  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  }
  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  }

  return errors;
};
