import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-muted to-background flex items-center justify-center z-50">
      <div className="text-center px-8">
        <img 
          src="https://cdn.poehali.dev/files/ced35bc8-a3ab-4ddd-914e-7bb8e252b7d9.png" 
          alt="SlotsFight" 
          className="w-64 mx-auto mb-8 animate-fade-in"
        />
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted-foreground mt-4 text-sm">Загрузка... {progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
