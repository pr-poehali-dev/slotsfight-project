import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Сыграй свою первую игру',
      icon: 'Footprints',
      progress: 100,
      unlocked: true,
      reward: 100
    },
    {
      id: 2,
      title: 'Везунчик',
      description: 'Выиграй 10 раз подряд',
      icon: 'Clover',
      progress: 30,
      unlocked: false,
      reward: 500
    },
    {
      id: 3,
      title: 'Миллионер',
      description: 'Накопи 1,000,000 монет',
      icon: 'Gem',
      progress: 0,
      unlocked: false,
      reward: 5000
    },
    {
      id: 4,
      title: 'Покорил слоты',
      description: 'Сыграй 100 игр в слоты',
      icon: 'Cherry',
      progress: 5,
      unlocked: false,
      reward: 1000
    },
    {
      id: 5,
      title: 'Мастер рулетки',
      description: 'Выиграй 50 раз в рулетку',
      icon: 'Disc',
      progress: 0,
      unlocked: false,
      reward: 2000
    },
    {
      id: 6,
      title: 'Покерфейс',
      description: 'Победи дилера 30 раз',
      icon: 'Club',
      progress: 0,
      unlocked: false,
      reward: 1500
    },
    {
      id: 7,
      title: 'Социальный игрок',
      description: 'Пригласи 5 друзей',
      icon: 'Users',
      progress: 0,
      unlocked: false,
      reward: 3000
    },
    {
      id: 8,
      title: 'Неделя побед',
      description: 'Играй 7 дней подряд',
      icon: 'Calendar',
      progress: 14,
      unlocked: false,
      reward: 700
    },
    {
      id: 9,
      title: 'Джекпот!',
      description: 'Сорви джекпот в слотах',
      icon: 'Sparkles',
      progress: 0,
      unlocked: false,
      reward: 10000
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🏆 Достижения</h1>
          <p className="text-muted-foreground text-lg">
            Разблокируй награды и получай бонусы!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-6 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-primary/20 to-orange-600/20 border-primary'
                  : 'bg-card border-border opacity-70'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={achievement.icon as any} size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    {achievement.unlocked && (
                      <Badge className="bg-green-500 text-white">
                        <Icon name="Check" size={14} className="mr-1" />
                        Открыто
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-bold">{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Награда:</span>
                <div className="flex items-center gap-1 text-primary font-bold">
                  <Icon name="Coins" size={16} />
                  {achievement.reward}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-orange-600/10 border-primary/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Открыто достижений: 1 из {achievements.length}</h3>
              <p className="text-muted-foreground">Продолжай играть и собирай награды!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {Math.round((1 / achievements.length) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">завершено</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
