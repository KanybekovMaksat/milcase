import { z } from 'zod';


export const LoginUserDtoSchema = z.object({
  username: z.string(),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
});
