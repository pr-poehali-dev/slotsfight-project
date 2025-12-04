import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [balance, setBalance] = useState(10000);
  const [level, setLevel] = useState(5);
  const [experience, setExperience] = useState(65);
  const [activeTab, setActiveTab] = useState('home');
  const [isSpinning, setIsSpinning] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState<boolean[]>([false, false, false]);

  const handleSlotSpin = () => {
    if (balance < 100) {
      toast.error('Недостаточно монет!');
      return;
    }
    setIsSpinning(true);
    setBalance(prev => prev - 100);
    
    setTimeout(() => {
      const win = Math.random() > 0.5;
      if (win) {
        const winAmount = Math.floor(Math.random() * 500) + 200;
        setBalance(prev => prev + winAmount);
        toast.success(`Выигрыш ${winAmount} монет! 🎉`);
      } else {
        toast.error('Повезёт в следующий раз!');
      }
      setIsSpinning(false);
    }, 2000);
  };

  const handleWheelSpin = () => {
    if (balance < 200) {
      toast.error('Недостаточно монет!');
      return;
    }
    setBalance(prev => prev - 200);
    
    setTimeout(() => {
      const prizes = [500, 1000, 100, 5000, 200, 300, 2000, 400];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setBalance(prev => prev + prize);
      toast.success(`Вы выиграли ${prize} монет! 🎰`);
    }, 3000);
  };

  const handleScratch = (index: number) => {
    if (scratchRevealed[index]) return;
    
    const newRevealed = [...scratchRevealed];
    newRevealed[index] = true;
    setScratchRevealed(newRevealed);
    
    const prizes = [100, 500, 1000, 50, 200];
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setBalance(prev => prev + prize);
    toast.success(`Открыто! +${prize} монет!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background pb-20">
      {activeTab === 'home' && (
        <div className="animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border-2 border-white">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SF</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-lg">Игрок #12345</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Уровень {level}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white">
                <Icon name="Bell" size={24} />
              </Button>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Опыт до уровня {level + 1}</span>
                <span className="text-sm font-bold">{experience}%</span>
              </div>
              <Progress value={experience} className="h-2 bg-white/30" />
            </div>
          </div>

          <div className="px-4 -mt-6">
            <Card className="p-6 shadow-xl border-2 animate-pulse-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                    <Icon name="Coins" size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ваш баланс</p>
                    <p className="text-3xl font-bold text-primary">{balance.toLocaleString()}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Plus" size={16} className="mr-1" />
                  Купить
                </Button>
              </div>
            </Card>
          </div>

          <div className="px-4 mt-6">
            <h3 className="text-xl font-bold mb-4">🎰 Игры</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-xl mb-3 inline-block">
                    <Icon name="Cherry" size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-1">Слоты</h4>
                  <p className="text-xs text-muted-foreground mb-3">Ставка: 100</p>
                  <Button 
                    onClick={handleSlotSpin} 
                    disabled={isSpinning}
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                  >
                    {isSpinning ? 'Крутим...' : 'Крутить'}
                  </Button>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-xl mb-3 inline-block">
                    <Icon name="Disc" size={32} className="text-white animate-spin-slow" />
                  </div>
                  <h4 className="font-bold mb-1">Колесо</h4>
                  <p className="text-xs text-muted-foreground mb-3">Ставка: 200</p>
                  <Button 
                    onClick={handleWheelSpin}
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                  >
                    Крутить
                  </Button>
                </div>
              </Card>
            </div>

            <h4 className="font-bold mb-3">🎫 Скретч-карты</h4>
            <div className="grid grid-cols-3 gap-3">
              {scratchRevealed.map((revealed, index) => (
                <Card 
                  key={index}
                  onClick={() => !revealed && handleScratch(index)}
                  className={`p-6 text-center cursor-pointer transition-all ${
                    revealed ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'hover:scale-105'
                  }`}
                >
                  {revealed ? (
                    <Icon name="Gift" size={32} className="mx-auto" />
                  ) : (
                    <Icon name="HelpCircle" size={32} className="mx-auto text-muted-foreground" />
                  )}
                  <p className="text-xs mt-2">{revealed ? 'Выигрыш!' : 'Стереть'}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="px-4 pt-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Задания</h2>
          <div className="space-y-3">
            {[
              { title: 'Ежедневный вход', reward: 100, progress: 1, total: 1, icon: 'CalendarCheck' },
              { title: 'Сыграть 5 игр', reward: 500, progress: 3, total: 5, icon: 'Gamepad2' },
              { title: 'Пригласить друга', reward: 1000, progress: 0, total: 1, icon: 'Users' }
            ].map((task, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                    <Icon name={task.icon as any} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={(task.progress / task.total) * 100} className="h-2" />
                      <span className="text-xs text-muted-foreground">{task.progress}/{task.total}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                      +{task.reward}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'vip' && (
        <div className="px-4 pt-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">VIP Club</h2>
          <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white mb-4">
            <div className="text-center">
              <Icon name="Crown" size={48} className="mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">Стань VIP!</h3>
              <p className="text-white/80 mb-4">Получай эксклюзивные бонусы и привилегии</p>
              <Button className="bg-white text-primary hover:bg-white/90">
                Узнать больше
              </Button>
            </div>
          </Card>
          <div className="space-y-3">
            {['Ежедневный бонус x2', 'Доступ к VIP слотам', 'Приоритетная поддержка'].map((benefit, i) => (
              <Card key={i} className="p-4 flex items-center gap-3">
                <Icon name="Check" size={20} className="text-primary" />
                <span className="font-medium">{benefit}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="px-4 pt-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Профиль</h2>
          <Card className="p-6 mb-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SF</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">Игрок #12345</h3>
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white mb-4">
                Уровень {level}
              </Badge>
              <div className="grid grid-cols-3 gap-4 w-full mt-4">
                <div>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">Игр</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">45K</p>
                  <p className="text-xs text-muted-foreground">Выигрыш</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground">Друзей</p>
                </div>
              </div>
            </div>
          </Card>
          
          <h3 className="font-bold mb-3">Реферальная программа</h3>
          <Card className="p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Ваш код:</span>
              <Badge variant="outline" className="font-mono">SF12345</Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary">
              <Icon name="Share2" size={16} className="mr-2" />
              Пригласить друзей
            </Button>
          </Card>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg animate-slide-up">
        <div className="flex justify-around items-center p-2">
          {[
            { id: 'home', icon: 'Home', label: 'Главная' },
            { id: 'tasks', icon: 'ListTodo', label: 'Задания' },
            { id: 'vip', icon: 'Crown', label: 'VIP' },
            { id: 'profile', icon: 'User', label: 'Профиль' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 flex-col h-auto py-2 ${
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon as any} size={24} />
              <span className="text-xs mt-1">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
