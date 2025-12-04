import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface PokerGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

interface CardType {
  suit: string;
  value: string;
}

const PokerGame = ({ balance, onBalanceChange, onClose }: PokerGameProps) => {
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [dealerCards, setDealerCards] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'result'>('betting');
  const [betAmount, setBetAmount] = useState(100);
  const [pot, setPot] = useState(0);

  const generateCard = (): CardType => ({
    suit: SUITS[Math.floor(Math.random() * SUITS.length)],
    value: VALUES[Math.floor(Math.random() * VALUES.length)]
  });

  const startGame = () => {
    if (balance < betAmount) {
      toast.error('Недостаточно монет!');
      return;
    }

    onBalanceChange(balance - betAmount);
    setPot(betAmount * 2);

    const newPlayerCards = [generateCard(), generateCard()];
    const newDealerCards = [generateCard(), generateCard()];
    
    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setGameState('playing');
  };

  const fold = () => {
    toast.error('Вы сбросили карты. Дилер выиграл.');
    setGameState('betting');
    setPlayerCards([]);
    setDealerCards([]);
    setPot(0);
  };

  const call = () => {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    if (playerScore > dealerScore) {
      onBalanceChange(balance + pot);
      toast.success(`Вы выиграли ${pot} монет! 🎉`);
    } else if (playerScore < dealerScore) {
      toast.error('Дилер выиграл!');
    } else {
      onBalanceChange(balance + betAmount);
      toast.info('Ничья! Ставка возвращена.');
    }

    setGameState('result');
    setTimeout(() => {
      setGameState('betting');
      setPlayerCards([]);
      setDealerCards([]);
      setPot(0);
    }, 3000);
  };

  const calculateScore = (cards: CardType[]): number => {
    return cards.reduce((sum, card) => {
      const valueIndex = VALUES.indexOf(card.value);
      return sum + (valueIndex + 1);
    }, 0);
  };

  const getCardColor = (suit: string) => {
    return suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-foreground';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-border max-w-3xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">🃏 Покер</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-blue-600/20 rounded-xl p-8 mb-6">
          {gameState !== 'betting' && (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 text-muted-foreground">Дилер</h3>
                <div className="flex gap-3 justify-center">
                  {dealerCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 w-24 h-32 flex flex-col items-center justify-center shadow-lg"
                    >
                      <span className={`text-4xl font-bold ${getCardColor(card.suit)}`}>
                        {card.suit}
                      </span>
                      <span className={`text-2xl font-bold ${getCardColor(card.suit)}`}>
                        {card.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-lg">
                  <Icon name="Coins" size={24} className="text-primary" />
                  <span className="text-2xl font-bold">Банк: {pot}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Ваши карты</h3>
                <div className="flex gap-3 justify-center">
                  {playerCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 w-24 h-32 flex flex-col items-center justify-center shadow-lg"
                    >
                      <span className={`text-4xl font-bold ${getCardColor(card.suit)}`}>
                        {card.suit}
                      </span>
                      <span className={`text-2xl font-bold ${getCardColor(card.suit)}`}>
                        {card.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {gameState === 'betting' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Выберите ставку и начните игру</p>
              <div className="flex justify-center gap-3 mb-6">
                {[50, 100, 200, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant={betAmount === amount ? 'default' : 'outline'}
                    onClick={() => setBetAmount(amount)}
                    className={betAmount === amount ? 'bg-primary' : ''}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              <Button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-xl py-6"
              >
                Начать игру ({betAmount} монет)
              </Button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="flex gap-3">
              <Button
                onClick={fold}
                variant="outline"
                className="flex-1 py-6 text-lg"
              >
                Сброс
              </Button>
              <Button
                onClick={call}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg py-6"
              >
                Колл
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Coins" size={20} className="text-primary" />
            <span className="font-bold text-primary text-lg">{balance}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PokerGame;
