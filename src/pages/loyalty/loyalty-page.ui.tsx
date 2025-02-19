import { Title } from '~shared/ui/title';
import { Card, CardContent, Typography } from '@mui/material';
import {  Cake, Redeem } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export function LoyaltyPage() {
  const loyaltyPrograms = [
    {
      id: 1,
      title: 'Накопление бонусных баллов',
      description:
        'Копите бонусные баллы с каждой покупки! Если сумма чека превышает 800 с, за каждые 100 с вы получаете 1 балл. Например, при покупке на 800 с — 8 баллов. Используйте накопленные баллы для оплаты будущих заказов',
      icon: <AttachMoneyIcon fontSize="large" className="text-blue-600" />,
    },
    {
      id: 2,
      title: 'Скидка 15% на день рождения',
      description:
        'Мы поздравляем вас с вашим днём рождения и дарим 15% скидку на любую покупку в течение недели.',
      icon: <Cake fontSize="large" className="text-pink-600" />,
    },
    {
      id: 3,
      title: 'Седьмой чехол в подарок',
      description:
        'При покупке шести чехлов получите седьмой абсолютно бесплатно. Персонализированные предложения для наших клиентов.',
      icon: <Redeem fontSize="large" className="text-yellow-600" />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Title className='text-center'>Программы лояльности</Title>
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg">
            Наши программы лояльности созданы, чтобы сделать ваш шопинг ещё
            выгоднее и приятнее. Пользуйтесь преимуществами и получайте
            эксклюзивные подарки и скидки.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loyaltyPrograms.map((program) => (
            <Card
              key={program.id}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4">{program.icon}</div>
                <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                  {program.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {program.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
