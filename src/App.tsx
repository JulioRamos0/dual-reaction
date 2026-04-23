/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Trophy } from 'lucide-react';

type Winner = 'A' | 'B' | null;
type GameState = 'waiting' | 'ready' | 'playing' | 'finished';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [winner, setWinner] = useState<Winner>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFoul, setIsFoul] = useState(false);
  const [scores, setScores] = useState({ A: 0, B: 0 });

  const startGame = useCallback(() => {
    setGameState('ready');
    setWinner(null);
    setCountdown(3);
    setIsFoul(false);
  }, []);

  useEffect(() => {
    if (gameState === 'ready' && countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        const delay = Math.random() * 2000 + 500;
        const timer = setTimeout(() => {
          setGameState('playing');
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState, countdown]);

  const handlePress = (side: 'A' | 'B') => {
    if (gameState === 'playing') {
      const actualWinner = side;
      setWinner(actualWinner);
      setGameState('finished');
      setIsFoul(false);
      setScores(prev => ({ ...prev, [actualWinner]: prev[actualWinner] + 1 }));
    } else if (gameState === 'ready') {
      const penaltyWinner = side === 'A' ? 'B' : 'A';
      setWinner(penaltyWinner);
      setGameState('finished');
      setIsFoul(true);
      setScores(prev => ({ ...prev, [penaltyWinner]: prev[penaltyWinner] + 1 }));
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setWinner(null);
    setCountdown(null);
  };

  return (
    <div className="relative h-screen w-screen bg-zinc-950 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Side A */}
      <div 
        id="side-a"
        className={`relative flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 border-b-8 md:border-b-0 md:border-r-8 border-zinc-950
          ${gameState === 'playing' ? 'bg-emerald-500' : 'bg-rose-600'} 
          ${winner === 'B' ? 'opacity-20' : 'opacity-100'}
          ${gameState === 'ready' && countdown === 0 ? 'bg-amber-500' : ''}`}
        onPointerDown={() => handlePress('A')}
      >
        <div className="rotate-180 md:rotate-0 flex flex-col items-center">
          <span className="text-zinc-900/30 text-2xl font-black uppercase tracking-[0.2em] mb-4">Jugador A</span>
          <h2 className="text-8xl font-display font-black text-white tracking-tighter uppercase leading-none">
            {gameState === 'playing' ? '¡YA!' : (gameState === 'ready' && countdown === 0 ? 'PREPARA' : 'LADO A')}
          </h2>
        </div>
      </div>

      {/* Side B */}
      <div 
        id="side-b"
        className={`relative flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200
          ${gameState === 'playing' ? 'bg-emerald-500' : 'bg-blue-600'} 
          ${winner === 'A' ? 'opacity-20' : 'opacity-100'}
          ${gameState === 'ready' && countdown === 0 ? 'bg-amber-500' : ''}`}
        onPointerDown={() => handlePress('B')}
      >
        <div className="flex flex-col items-center md:rotate-0">
          <span className="text-zinc-900/30 text-2xl font-black uppercase tracking-[0.2em] mb-4">Jugador B</span>
          <h2 className="text-8xl font-display font-black text-white tracking-tighter uppercase leading-none">
            {gameState === 'playing' ? '¡YA!' : (gameState === 'ready' && countdown === 0 ? 'PREPARA' : 'LADO B')}
          </h2>
        </div>
      </div>

      {/* Score HUDs */}
      <div className="absolute top-8 left-8 bg-zinc-950/40 backdrop-blur-md px-6 py-3 border-2 border-white/10 rounded-xl z-20">
        <span className="text-white font-mono text-2xl font-bold uppercase tracking-tight">A: {scores.A.toString().padStart(2, '0')}</span>
      </div>
      
      <div className="absolute top-8 right-8 bg-zinc-950/40 backdrop-blur-md px-6 py-3 border-2 border-white/10 rounded-xl z-20">
        <span className="text-white font-mono text-2xl font-bold uppercase tracking-tight">B: {scores.B.toString().padStart(2, '0')}</span>
      </div>

      {/* Center Overlay */}
      <AnimatePresence mode="wait">
        {(gameState === 'waiting' || gameState === 'finished' || (gameState === 'ready' && countdown !== null && countdown > 0)) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-6 z-50 pointer-events-none"
          >
            {/* Backdrop Glow */}
            <div className="absolute inset-0 bg-white blur-3xl opacity-5 scale-150"></div>

            <div className="relative pointer-events-auto">
              <motion.div 
                initial={{ scale: 0.9, rotate: 0 }}
                animate={{ scale: 1, rotate: gameState === 'finished' ? -2 : 0 }}
                className="bg-white border-[12px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] px-12 py-10 flex flex-col items-center text-center max-w-lg"
              >
                {gameState === 'waiting' && (
                  <>
                    <span className="text-black text-xl font-bold uppercase tracking-[0.3em] mb-4">Arena de Reacción</span>
                    <h1 className="text-black text-7xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-8">
                      DUELO DE<br/>REACCIÓN
                    </h1>
                    <button
                      id="start-button"
                      onClick={startGame}
                      className="group relative px-10 py-5 bg-black text-white font-black text-2xl uppercase tracking-tighter hover:bg-zinc-800 transition-colors"
                    >
                      COMENZAR
                      <div className="absolute inset-0 border-2 border-white/20 translate-x-2 translate-y-2 -z-10 bg-zinc-400 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                    </button>
                  </>
                )}

                {gameState === 'ready' && countdown !== null && countdown > 0 && (
                  <div className="text-9xl font-display font-black text-black tabular-nums leading-none">
                    {countdown}
                  </div>
                )}

                {gameState === 'finished' && (
                  <>
                    <span className="text-black text-xl font-bold uppercase tracking-[0.3em] mb-2">
                      {isFoul ? '¡DEMASIADO RÁPIDO!' : '¡REACCIÓN INCREÍBLE!'}
                    </span>
                    <h2 className="text-black text-7xl font-display font-black uppercase leading-none tracking-tighter mb-8">
                      LADO {winner}<br/>GANÓ
                    </h2>
                    <button
                      id="reset-button"
                      onClick={resetGame}
                      className="bg-black text-white px-10 py-5 flex items-center gap-4 hover:bg-zinc-800 transition-all group"
                    >
                      <RotateCcw className="w-6 h-6 group-hover:rotate-[-90deg] transition-transform" />
                      <span className="text-2xl font-black uppercase tracking-tighter">REINICIAR</span>
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orientation cue labels */}
      <div className="absolute bottom-4 left-4 z-40">
        <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] md:[writing-mode:sideways-lr]">Versión 2.0 // Modo Duelo</span>
      </div>
    </div>
  );
}


