/**
 * Definición de insignias / logros
 */

export const BADGE_IDS = {
  BASICS: 'basics',
  BUYER: 'buyer',
  WALLET: 'wallet',
  SHIELD: 'shield',
  SENDER: 'sender',
  QUIZ: 'quiz',
  EXPLORER: 'explorer',
  MASTER: 'master',
};

export const badgesList = [
  { id: BADGE_IDS.BASICS, progressKey: 'learnedBasics', path: '/learn', label: 'Primera lección', icon: '📚', desc: 'Completaste lo básico' },
  { id: BADGE_IDS.BUYER, progressKey: 'completedBuySim', path: '/comprar', label: 'Comprador', icon: '🛒', desc: 'Simulador de compra' },
  { id: BADGE_IDS.WALLET, progressKey: 'completedSeedGame', path: '/wallet-game', label: 'Guardian de palabras', icon: '👛', desc: 'Ordenaste la frase semilla' },
  { id: BADGE_IDS.SHIELD, progressKey: 'completedScamGame', path: '/scam', label: 'Anti-estafas', icon: '🛡️', desc: 'Juego de estafas completado' },
  { id: BADGE_IDS.SENDER, progressKey: 'completedSendSim', path: '/enviar', label: 'Enviador', icon: '📤', desc: 'Simulador de envío' },
  { id: BADGE_IDS.QUIZ, progressKey: 'quizCompleted', path: '/quiz', label: 'Quiz master', icon: '🎮', desc: 'Completaste el quiz' },
  { id: BADGE_IDS.EXPLORER, progressKey: 'visitedMap', path: '/mapa', label: 'Explorador', icon: '🗺️', desc: 'Visitaste el mapa' },
  { id: BADGE_IDS.MASTER, progressKey: null, path: '/felicitaciones', label: 'VibeCoin Master', icon: '₿', desc: 'Completa los 7 pasos y haz clic aquí para ver tu celebración' },
];
