/**
 * learnCards.js — Contenido de la lección "Aprende lo básico" (página Learn).
 *
 * Cada tarjeta tiene id, title, icon y content. Se renderiza en Learn.jsx con BitcoinCard.
 * Temas: qué es Bitcoin, por qué existe, blockchain, billeteras, seguridad.
 */

export const learnCards = [
  {
    id: 'what-is',
    title: '¿Qué es Bitcoin?',
    icon: '₿',
    content: 'Bitcoin es una moneda digital descentralizada. No pertenece a ningún gobierno ni banco. Cualquier persona con internet puede enviarla, recibirla y guardarla en una billetera (wallet) sin pedir permiso a nadie.',
  },
  {
    id: 'why-exists',
    title: '¿Por qué existe Bitcoin?',
    icon: '💡',
    content: 'Nace como respuesta a la crisis financiera de 2008. Su creador (o grupo), bajo el seudónimo Satoshi Nakamoto, quería un dinero que no dependiera de bancos ni Estados: escaso, predecible y que cualquiera pudiera verificar. El protocolo limita el total a 21 millones de BTC y reduce la emisión a la mitad aproximadamente cada 4 años (halving), lo que hace el suministro predecible y escaso.',
  },
  {
    id: 'blockchain',
    title: '¿Cómo funciona la blockchain?',
    icon: '⛓️',
    content: 'Las transacciones se agrupan en "bloques" y se encadenan uno tras otro. Miles de nodos en el mundo guardan una copia. Para modificar el pasado, habría que cambiar esa cadena en la mayoría de los nodos, lo que en la práctica la hace inmutable y transparente.',
  },
  {
    id: 'no-banks',
    title: '¿Por qué no necesitas un banco?',
    icon: '🏦',
    content: 'En Bitcoin tú eres tu propio banco. La red valida las transacciones entre pares (P2P). No hay un intermediario que congele tu cuenta o imponga comisiones arbitrarias. Solo necesitas tu wallet y la red.',
  },
  {
    id: 'wallets',
    title: 'Billeteras y frases semilla',
    icon: '👛',
    content: 'Una billetera guarda las claves que te permiten gastar tus bitcoins. La "frase semilla" (12 o 24 palabras) es el respaldo maestro: quien la tiene, tiene el control. Escríbela en papel y guárdala en un lugar seguro. Nunca la compartas ni la subas a internet.',
  },
  {
    id: 'security',
    title: 'Seguridad y estafas',
    icon: '🛡️',
    content: 'Desconfía de quien prometa duplicar tu Bitcoin, de "soporte" que te pida la frase semilla o de enlaces que imiten exchanges. Los sitios legítimos nunca piden tus 12 o 24 palabras. Verifica siempre las URLs y usa autenticación en dos pasos.',
  },
  {
    id: 'mexico',
    title: 'Bitcoin en México',
    icon: '🇲🇽',
    content: 'En México puedes comprar Bitcoin en exchanges regulados como Bitso usando SPEI o tarjeta. Cada vez más negocios aceptan Bitcoin. Es legal tenerlo y usarlo; solo asegúrate de usar plataformas verificadas y nunca compartir tu frase semilla.',
  },
];
