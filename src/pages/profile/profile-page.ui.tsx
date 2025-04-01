import {
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { removeCookie } from 'typescript-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { ModalPopup } from '~widgets/modal-popup';
import EditIcon from '@mui/icons-material/Edit';
import OrderHistory from './OrderHistory';
import FreeCases from './FreeCases';
import $api from '../../shared/api/index';

import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const API = 'https://milcase.makalabox.com/api';

export async function editUserProfile(params) {
  return $api.patch('users/me/', params);
}
export function ProfilePage() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [phoneModels, setPhoneModels] = useState<number[]>([]);
  const [models, setModels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await $api.get('users/me');
        const modelsResponse = await axios.get(`${API}/phone-models/`);
        setModels(modelsResponse.data);
        setUserData(response.data);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refreshMilcase');
    navigate(`${pathKeys.home()}`);
  };

  const birthdate = userData.birthdate;

  const {
    email,
    firstName,
    lastName,
    points,
    quantityOfCases,
    freeCases,
    phoneModel,
  } = userData;

  const initialUser = {
    email: email,
    firstName: firstName,
    lastName: lastName,
  };

  const handleEditProfile = async (values) => {
    setIsPending(true);
    setIsSuccess(false);
    try {
      await editUserProfile(values);
      const response = await $api.get('users/me'); // Обновляем данные после редактирования
      setUserData(response.data);
      setActive(false);
      setIsSuccess(true);

      toast.success('Профиль успешно обновлён!', {
        position: 'top-right',
        autoClose: 3000, // Закрывается через 3 секунды
      });

      setTimeout(() => {
        setIsSuccess(false); // Сброс флага через время
      }, 3000);
    } catch (err) {
      toast.error('Ошибка при обновлении профиля!', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Ошибка обновления профиля', err);
    } finally {
      setIsPending(false);
    }
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
              {userData.firstName} {userData.lastName}
            </Typography>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4">
              <div className="flex gap-[10px]">
                <Paper
                  className="w-full min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{ padding: 1, backgroundColor: '#f1f8e9', flex: 1 }}
                >
                  <Chip
                    label={userData.quantityOfCases}
                    color="primary"
                    className="text-white font-bold"
                    icon={<LoyaltyIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Куплено чехлов
                  </p>
                  <LinearProgressWithLabel
                    value={Math.floor((userData.quantityOfCases / 7) * 100)}
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
                  {userData.phoneModel?.brand}
                  {userData.phoneModel?.modelName}
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
      <FreeCases count={userData.freeCases} />
      <OrderHistory />
      <ModalPopup active={active} setActive={setActive}>
        <Formik
          initialValues={initialUser}
          validate={validateForm}
          onSubmit={(values) => {
            handleEditProfile({
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneModel:
                phoneModels.length > 0
                  ? Number(phoneModels[0])
                  : userData.phoneModel?.id,
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <fieldset>
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
                  }
                  variant="outlined"
                  value={phoneModels[0] || ''}
                >
                  <MenuItem value="" disabled>
                    Выберите модели телефонов
                  </MenuItem>
                  {models?.map((model) => (
                    <MenuItem key={model.id} value={Number(model.id)}>
                      {model?.brand} {model?.modelName}
                    </MenuItem>
                  ))}
                </TextField>
              </fieldset>
              <SubmitButton isPending={isPending} />
            </Form>
          )}
        </Formik>
      </ModalPopup>
    </div>
  );
}

function SubmitButton({ isPending }) {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating || isPending}
    >
      {isPending ? <CircularProgress size={20} /> : 'Редактировать'}
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
