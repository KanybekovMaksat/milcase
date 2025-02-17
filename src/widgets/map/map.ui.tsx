import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Title } from '~shared/ui/title';


export const Map = () => {
  return (
    <section className="flex flex-col md:flex-row p-6 md:p-0 items-center gap-8">
      <div>
        <Title>Карта филиалов</Title>
        <img src="/mockup.png" alt="Карта филиалов" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">Адрес</h3>
          <Button onClick={() => window.location.href='tel:+996555123456'}>Позвонить</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Телефон</h3>
          <p>+996 555 123 456</p>
          <Button onClick={() => window.location.href='tel:+996555123456'}>Позвонить</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">О нас</h3>
          <p>Мы предоставляем лучшие услуги в городе.</p>
          <Link to={"/about"}>Узнать о нас больше</Link>
        </div>
      </div>
    </section>
  );
};
