import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { Fancybox } from '~shared/ui/fancybox';

export function Rules() {
  const rules = [
    'Правило 1: Соблюдайте сроки выполнения задач.',
    'Правило 2: Уважайте коллег и их мнение.',
    'Правило 3: Всегда проверяйте свою работу перед отправкой.',
    'Правило 4: Следите за качеством кода и документации.',
    'Правило 5: Регулярно обновляйте свой статус в проекте.',
    'Правило 6: Следите за соблюдением общих стандартов безопасности.',
  ];

  return (
    <div className="container mx-auto ">
      <Typography
        variant="h4"
        component="h1"
        className="text-center mb-6 text-blue-600 font-semibold"
      >
        Правила работы
      </Typography>

      <div className="bg-white  rounded-lg">
        <List>
          {rules.map((rule, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={rule}
                  className="text-lg text-gray-800"
                />
              </ListItem>
              {index < rules.length - 1 && <Divider />}
            </div>
          ))}
        </List>
        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}
        >
          <a
          className='underline text-blue text-right flex justify-end'
            data-fancybox="gallery"
            href="https://muit.makalabox.com/documents/%D0%91%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%20%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC.pdf"
          >
            Просмотреть договор
          </a>
        </Fancybox>
      </div>
    </div>
  );
}
