import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface RouletteGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const NUMBERS = Array.from({ length: 37 }, (_, i) => i);
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const RouletteGame = ({ balance, onBalanceChange, onClose }: RouletteGameProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState<'red' | 'black' | 'even' | 'odd' | null>(null);

  const spin = () => {
    if (!betType) {
      toast.error('Выберите тип ставки!');
      return;
    }

    if (balance < betAmount) {
      toast.error('Недостаточно монет!');
      return;
    }

    setIsSpinning(true);
    onBalanceChange(balance - betAmount);
    setResult(null);

    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      setResult(winningNumber);
      setIsSpinning(false);
      checkWin(winningNumber);
    }, 3000);
  };

  const checkWin = (number: number) => {
    let won = false;

    if (betType === 'red' && RED_NUMBERS.includes(number)) {
      won = true;
    } else if (betType === 'black' && !RED_NUMBERS.includes(number) && number !== 0) {
      won = true;
    } else if (betType === 'even' && number % 2 === 0 && number !== 0) {
      won = true;
    } else if (betType === 'odd' && number % 2 !== 0) {
      won = true;
    }

    if (won) {
      const winAmount = betAmount * 2;
      onBalanceChange(balance + winAmount);
      toast.success(`🎉 Вы выиграли ${winAmount} монет!`);
    } else {
      toast.error('Не повезло! Попробуйте ещё раз.');
    }
  };

  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-600';
    return RED_NUMBERS.includes(num) ? 'bg-red-600' : 'bg-black';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-border max-w-3xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">🎡 Рулетка</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-purple-600/20 rounded-xl p-8 mb-6">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full h-48 flex items-center justify-center relative overflow-hidden">
              {isSpinning ? (
                <div className="animate-spin-slow text-6xl">🎡</div>
              ) : result !== null ? (
                <div className="text-center">
                  <div className={`w-24 h-24 rounded-full ${getNumberColor(result)} flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white text-4xl font-bold">{result}</span>
                  </div>
                  <p className="text-lg font-bold">
                    {result === 0 ? 'Зеро' : RED_NUMBERS.includes(result) ? 'Красное' : 'Чёрное'}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-muted-foreground">Сделайте ставку</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Выберите ставку:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={betType === 'red' ? 'default' : 'outline'}
                onClick={() => setBetType('red')}
                disabled={isSpinning}
                className={`py-6 ${betType === 'red' ? 'bg-red-600 hover:bg-red-700' : 'border-red-600 text-red-600'}`}
              >
                Красное (x2)
              </Button>
              <Button
                variant={betType === 'black' ? 'default' : 'outline'}
                onClick={() => setBetType('black')}
                disabled={isSpinning}
                className={`py-6 ${betType === 'black' ? 'bg-black hover:bg-black/80' : 'border-foreground'}`}
              >
                Чёрное (x2)
              </Button>
              <Button
                variant={betType === 'even' ? 'default' : 'outline'}
                onClick={() => setBetType('even')}
                disabled={isSpinning}
                className={`py-6 ${betType === 'even' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600'}`}
              >
                Чётное (x2)
              </Button>
              <Button
                variant={betType === 'odd' ? 'default' : 'outline'}
                onClick={() => setBetType('odd')}
                disabled={isSpinning}
                className={`py-6 ${betType === 'odd' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-600 text-purple-600'}`}
              >
                Нечётное (x2)
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-4">
            {[50, 100, 200, 500].map((amount) => (
              <Button
                key={amount}
                variant={betAmount === amount ? 'default' : 'outline'}
                onClick={() => setBetAmount(amount)}
                disabled={isSpinning}
                className={betAmount === amount ? 'bg-primary' : ''}
              >
                {amount}
              </Button>
            ))}
          </div>

          <Button
            onClick={spin}
            disabled={isSpinning || !betType || balance < betAmount}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-xl py-6"
          >
            {isSpinning ? 'Крутим...' : `Крутить (${betAmount} монет)`}
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Coins" size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">{balance}</span>
          </div>
          <p className="text-sm text-muted-foreground">Все ставки x2</p>
        </div>
      </Card>
    </div>
  );
};

export default RouletteGame;
