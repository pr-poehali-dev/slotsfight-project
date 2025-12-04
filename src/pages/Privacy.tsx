import { Card } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🔒 Конфиденциальность</h1>
          <p className="text-muted-foreground text-lg">
            Политика конфиденциальности SlotsFight
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">1. Сбор данных</h2>
            <p className="text-muted-foreground mb-3">
              Мы собираем следующую информацию:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Имя и email при регистрации</li>
              <li>• IP-адрес для безопасности</li>
              <li>• История игр и статистика</li>
              <li>• Cookies для улучшения сервиса</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">2. Использование данных</h2>
            <p className="text-muted-foreground mb-3">
              Ваши данные используются для:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Предоставления доступа к играм</li>
              <li>• Отправки уведомлений о бонусах</li>
              <li>• Улучшения качества сервиса</li>
              <li>• Предотвращения мошенничества</li>
              <li>• Аналитики и статистики</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">3. Защита данных</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Все данные передаются по защищённому соединению HTTPS</li>
              <li>• Пароли хранятся в зашифрованном виде</li>
              <li>• Доступ к данным имеют только авторизованные сотрудники</li>
              <li>• Регулярные проверки безопасности</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">4. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground mb-3">
              Мы не продаём и не передаём ваши данные третьим лицам, за исключением:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Требований законодательства</li>
              <li>• Сервисов аналитики (Google Analytics)</li>
              <li>• Платёжных систем (в будущем)</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">5. Ваши права</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Право на доступ к своим данным</li>
              <li>• Право на исправление данных</li>
              <li>• Право на удаление аккаунта</li>
              <li>• Право отказаться от рассылки</li>
              <li>• Право на экспорт данных</li>
            </ul>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              Мы используем cookies для улучшения работы сайта, запоминания ваших настроек 
              и анализа трафика. Вы можете отключить cookies в настройках браузера, 
              но это может ограничить функциональность сайта.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">7. Изменения в политике</h2>
            <p className="text-muted-foreground">
              Мы можем обновлять политику конфиденциальности. О значительных изменениях 
              мы уведомим вас по email. Дата последнего обновления: Декабрь 2024.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-primary/10 to-orange-600/10 border-primary/50">
            <h3 className="font-bold text-lg mb-2">Свяжитесь с нами</h3>
            <p className="text-muted-foreground">
              Если у вас есть вопросы о конфиденциальности, напишите нам: 
              <br />
              <a href="mailto:privacy@slotsfight.com" className="text-primary hover:underline">
                privacy@slotsfight.com
              </a>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
