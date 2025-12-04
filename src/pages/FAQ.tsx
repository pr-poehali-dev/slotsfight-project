import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'Что такое SlotsFight?',
      answer: 'SlotsFight - это социальное онлайн-казино, где вы можете играть в слоты, покер, рулетку и другие игры на виртуальные монеты без риска потери реальных денег.'
    },
    {
      question: 'Как получить монеты?',
      answer: 'Монеты можно получить несколькими способами: ежедневный бонус при входе, выполнение заданий, приглашение друзей и участие в турнирах.'
    },
    {
      question: 'Можно ли выиграть реальные деньги?',
      answer: 'Нет, SlotsFight - это социальное казино исключительно для развлечения. Все выигрыши и ставки делаются виртуальными монетами.'
    },
    {
      question: 'Как работают слоты?',
      answer: 'В слотах нужно крутить барабаны и собирать одинаковые символы. Три одинаковых символа дают джекпот с множителем x10, два символа - выигрыш x2.'
    },
    {
      question: 'Как играть в покер?',
      answer: 'В покере вы играете против дилера. Каждому раздается по 2 карты. Побеждает тот, у кого сумма карт больше. Можно сбросить карты или сделать колл.'
    },
    {
      question: 'Как работает рулетка?',
      answer: 'В рулетке нужно выбрать ставку: красное/чёрное или чётное/нечётное. После этого крутится колесо. Если угадали - выигрыш x2.'
    },
    {
      question: 'Что такое достижения?',
      answer: 'Достижения - это награды за выполнение различных задач в игре. За каждое достижение вы получаете бонусные монеты.'
    },
    {
      question: 'Можно ли играть на мобильном?',
      answer: 'Да! SlotsFight полностью адаптирован для мобильных устройств. Играйте где угодно и когда угодно.'
    },
    {
      question: 'Как пригласить друзей?',
      answer: 'Перейдите в раздел "Профиль", там найдёте свой реферальный код. Отправьте его друзьям, и за каждого приглашённого получите 1000 монет!'
    },
    {
      question: 'Сколько лет нужно для игры?',
      answer: 'Хотя SlotsFight не использует реальные деньги, мы рекомендуем игру для пользователей старше 18 лет.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">❓ Часто задаваемые вопросы</h1>
          <p className="text-muted-foreground text-lg">
            Найдите ответы на популярные вопросы
          </p>
        </div>

        <Card className="p-6 bg-card border-border">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-orange-600/10 border-primary/50">
          <h3 className="font-bold text-lg mb-2">Не нашли ответ?</h3>
          <p className="text-muted-foreground mb-4">
            Свяжитесь с нашей службой поддержки через email: support@slotsfight.com
          </p>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
