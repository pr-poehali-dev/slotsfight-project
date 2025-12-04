import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface SlotsGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];

const SlotsGame = ({ balance, onBalanceChange, onClose }: SlotsGameProps) => {
  const [reels, setReels] = useState([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(100);

  const spin = () => {
    if (balance < betAmount) {
      toast.error('Недостаточно монет!');
      return;
    }

    setIsSpinning(true);
    onBalanceChange(balance - betAmount);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ]);
      spinCount++;

      if (spinCount >= 20) {
        clearInterval(spinInterval);
        const finalReels = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ];
        setReels(finalReels);
        setIsSpinning(false);
        checkWin(finalReels);
      }
    }, 100);
  };

  const checkWin = (finalReels: string[]) => {
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const winAmount = betAmount * 10;
      onBalanceChange(balance + winAmount);
      toast.success(`🎉 Джекпот! Вы выиграли ${winAmount} монет!`);
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
      const winAmount = betAmount * 2;
      onBalanceChange(balance + winAmount);
      toast.success(`Выигрыш ${winAmount} монет!`);
    } else {
      toast.error('Повезёт в следующий раз!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-border max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">🎰 Слоты</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-orange-600/20 rounded-xl p-8 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`bg-white text-8xl flex items-center justify-center rounded-lg h-32 ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
              >
                {symbol}
              </div>
            ))}
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
            disabled={isSpinning || balance < betAmount}
            className="w-full bg-gradient-to-r from-primary to-orange-600 text-white font-bold text-xl py-6"
          >
            {isSpinning ? 'Крутим...' : `Крутить (${betAmount} монет)`}
          </Button>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Coins" size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">{balance}</span>
          </div>
          <div className="text-right">
            <p>🎰🎰🎰 = x10</p>
            <p>🎰🎰 = x2</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SlotsGame;
