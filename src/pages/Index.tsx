import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState(1000);
  const [level, setLevel] = useState(1);
  const [totalGames, setTotalGames] = useState(2);
  const [winRate, setWinRate] = useState(0);
  const [activeTab, setActiveTab] = useState('games');
  const [onlineUsers, setOnlineUsers] = useState(0);

  const topPlayers = [
    { id: 1, name: 'Xyе', level: 1, balance: 1000, wins: 0, avatar: 'X' },
    { id: 2, name: 'MALIKOVVV', level: 1, balance: 0, wins: 0, avatar: 'M' }
  ];

  useEffect(() => {
    const updateOnlineUsers = () => {
      setOnlineUsers(Math.floor(Math.random() * 50) + 10);
    };
    updateOnlineUsers();
    const interval = setInterval(updateOnlineUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const games = [
    { 
      id: 'slots', 
      name: 'Слоты', 
      description: 'Крути барабаны и выигрывай!',
      online: onlineUsers,
      status: 'online',
      icon: '🎰',
      bg: 'from-red-900/40 to-red-800/40'
    },
    { 
      id: 'poker', 
      name: 'Покер', 
      description: 'Скоро!',
      online: 0,
      status: 'dev',
      icon: '🃏',
      bg: 'from-blue-900/40 to-blue-800/40'
    },
    { 
      id: 'roulette', 
      name: 'Рулетка', 
      description: 'Скоро!',
      online: 0,
      status: 'dev',
      icon: '🎡',
      bg: 'from-purple-900/40 to-purple-800/40'
    }
  ];

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-black border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img 
              src="https://cdn.poehali.dev/files/ced35bc8-a3ab-4ddd-914e-7bb8e252b7d9.png" 
              alt="SlotsFight" 
              className="h-10 w-auto"
            />
            <nav className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                className={`text-base font-medium hover:text-foreground ${activeTab === 'games' ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('games')}
              >
                Игры
              </Button>
              <Button 
                variant="ghost" 
                className={`text-base font-medium hover:text-foreground ${activeTab === 'rating' ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('rating')}
              >
                Рейтинг
              </Button>
              <Button 
                variant="ghost" 
                className={`text-base font-medium hover:text-foreground ${activeTab === 'bonuses' ? 'text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('bonuses')}
              >
                Преимущества
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-lg">
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-white text-sm font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">{userName}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-bold">
                      <Icon name="Coins" size={12} />
                      {balance.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-white text-black hover:bg-white/90 font-medium"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserName('');
                    toast.success('Вы вышли из аккаунта');
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button 
                className="bg-primary hover:bg-primary/90 font-medium"
                onClick={() => {
                  const name = prompt('Введите ваше имя:');
                  if (name && name.trim()) {
                    setUserName(name.trim());
                    setIsLoggedIn(true);
                    toast.success(`Добро пожаловать, ${name}!`);
                  }
                }}
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      {activeTab === 'games' && (
        <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
          <Card className="bg-gradient-to-r from-primary to-orange-600 border-0 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-2">
                {isLoggedIn ? `Привет, ${userName}! 👋` : 'Привет! 👋'}
              </h2>
              <p className="text-white/90 text-lg">Готов к новым победам?</p>
            </div>
            <Button className="absolute right-8 top-1/2 -translate-y-1/2 bg-white text-primary hover:bg-white/90 font-bold">
              <Icon name="Gift" size={16} className="mr-2" />
              Забрать бонус
            </Button>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Icon name="Trophy" size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Достижения</p>
                  <p className="text-xl font-bold">Разблокируй награды</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Icon name="Target" size={28} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Турниры</p>
                  <p className="text-xl font-bold">Соревнуйся с другими</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Icon name="ShoppingBag" size={28} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Магазин</p>
                  <p className="text-xl font-bold">Купи уникальные аватары</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border p-4">
              <p className="text-sm text-muted-foreground mb-1">Баланс</p>
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={24} className="text-primary" />
                <span className="text-2xl font-bold text-primary">{balance}</span>
              </div>
            </Card>

            <Card className="bg-card border-border p-4">
              <p className="text-sm text-muted-foreground mb-1">Уровень</p>
              <span className="text-2xl font-bold text-primary">{level}</span>
            </Card>

            <Card className="bg-card border-border p-4">
              <p className="text-sm text-muted-foreground mb-1">Всего игр</p>
              <span className="text-2xl font-bold text-primary">{totalGames}</span>
            </Card>

            <Card className="bg-card border-border p-4">
              <p className="text-sm text-muted-foreground mb-1">Винрейт</p>
              <span className="text-2xl font-bold text-green-500">{winRate}%</span>
            </Card>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Gamepad2" size={24} className="text-primary" />
              <h3 className="text-2xl font-bold">Выбери игру</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <Card 
                  key={game.id}
                  className={`bg-gradient-to-br ${game.bg} border-border hover:scale-105 transition-all cursor-pointer overflow-hidden relative`}
                >
                  <div className="p-6">
                    <div className="text-6xl mb-4">{game.icon}</div>
                    <h4 className="text-2xl font-bold mb-2">{game.name}</h4>
                    <p className="text-muted-foreground mb-4">{game.description}</p>
                    {game.status === 'online' && (
                      <div className="flex items-center gap-2 text-green-500 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>{game.online > 0 ? `${game.online} онлайн` : '0 онлайн'}</span>
                      </div>
                    )}
                    {game.status === 'dev' && (
                      <Badge variant="secondary" className="bg-muted">
                        В разработке
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Medal" size={24} className="text-primary" />
              <h3 className="text-2xl font-bold">Топ игроков</h3>
            </div>
            <div className="space-y-3">
              {topPlayers.map((player, index) => (
                <Card key={player.id} className="bg-card border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                        #{index + 1}
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-white">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">Уровень {player.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-bold">
                        {player.balance} <Icon name="Coins" size={16} />
                      </div>
                      <p className="text-xs text-muted-foreground">{player.wins} побед</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rating' && (
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Рейтинг игроков</h2>
          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <Card key={player.id} className="bg-card border-border p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500 text-black' : 
                      index === 1 ? 'bg-gray-400 text-black' : 
                      'bg-orange-600 text-white'
                    }`}>
                      #{index + 1}
                    </div>
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-white text-lg">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-lg">{player.name}</p>
                      <p className="text-sm text-muted-foreground">Уровень {player.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-primary font-bold text-xl">
                      {player.balance} <Icon name="Coins" size={20} />
                    </div>
                    <p className="text-sm text-muted-foreground">{player.wins} побед</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bonuses' && (
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Премущества</h2>
          <div className="grid gap-4">
            <Card className="bg-gradient-to-r from-primary to-orange-600 border-0 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Icon name="Gift" size={48} />
                <div>
                  <h3 className="text-2xl font-bold">Приветственный бонус</h3>
                  <p className="text-white/90">Получи 5000 монет при первом входе!</p>
                </div>
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 font-bold">
                Забрать бонус
              </Button>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-4">
                <Icon name="CalendarCheck" size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-bold">Ежедневный вход</h4>
                  <p className="text-muted-foreground">Заходи каждый день и получай награды</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-4">
                <Icon name="Users" size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-bold">Пригласи друзей</h4>
                  <p className="text-muted-foreground">Получай 1000 монет за каждого друга</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      <footer className="bg-black/95 border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/ced35bc8-a3ab-4ddd-914e-7bb8e252b7d9.png" 
                alt="SlotsFight" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Социальное казино для развлечения. Играй на виртуальные монеты без риска!
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Игры</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Слоты</p>
                <p>Покер</p>
                <p>Рулетка</p>
                <p>Блэкджек</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Компания</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>О нас</p>
                <p>Контакты</p>
                <p>Карьера</p>
                <p>Блог</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Поддержка</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>FAQ</p>
                <p>Правила</p>
                <p>Конфиденциальность</p>
                <p className="text-primary">Ответственная игра</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 SlotsFight. Все права защищены. Только для развлечения. Разрешена игра с 18+ лет.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;