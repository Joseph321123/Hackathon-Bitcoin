/**
 * Casos para el juego "¿Es estafa o es seguro?"
 * isScam: true = estafa, false = seguro
 */

export const scamCards = [
  {
    id: '1',
    title: 'Duplicamos tu Bitcoin en 24 horas',
    description: 'Un usuario en redes te escribe: "Envía 0.01 BTC a esta dirección y te devolvemos 0.02 BTC en 24 horas".',
    isScam: true,
    explanation: 'Nadie puede "duplicar" Bitcoin. Es una estafa clásica: te piden que envíes y no devuelven nada.',
  },
  {
    id: '2',
    title: 'Soporte oficial de un exchange',
    description: 'Te llega un mensaje: "Somos soporte de [Exchange]. Tu cuenta está en riesgo. Entra a este enlace y verifica tu frase de recuperación para proteger tus fondos".',
    isScam: true,
    explanation: 'El soporte legítimo NUNCA pide tu frase semilla ni tus 12/24 palabras. Cualquier mensaje que lo pida es estafa.',
  },
  {
    id: '3',
    title: 'Comprar Bitcoin en una app verificada',
    description: 'Descargas una app de un exchange conocido (Bitso, Coinbase, etc.) desde la tienda oficial (App Store / Play Store) y compras ahí con tu tarjeta o SPEI.',
    isScam: false,
    explanation: 'Comprar en apps oficiales de exchanges regulados y desde las tiendas oficiales es el camino seguro para empezar.',
  },
  {
    id: '4',
    title: 'Inversión garantizada 50% mensual',
    description: 'Una página ofrece "Inversión en Bitcoin con 50% de rendimiento mensual garantizado". Solo envías tu BTC a su dirección.',
    isScam: true,
    explanation: 'Ninguna inversión legítima garantiza rendimientos tan altos y constantes. Es esquema Ponzi o robo directo.',
  },
  {
    id: '5',
    title: 'Pago con Bitcoin en un negocio físico',
    description: 'Un café muestra un letrero "Aceptamos Bitcoin" y al pagar escaneas un QR que muestra una dirección Bitcoin y el monto en satoshis.',
    isScam: false,
    explanation: 'Pagar con Bitcoin en un comercio que muestra dirección y monto claramente es un uso legítimo. Verifica que el monto sea correcto antes de enviar.',
  },
  {
    id: '6',
    title: 'Recuperar cuenta con tu frase semilla',
    description: 'Un "técnico" por Telegram te dice que para recuperar el acceso a tu wallet debes enviarle tu frase de 12 palabras para que la "revisen".',
    isScam: true,
    explanation: 'Quien tenga tu frase semilla tiene control total del wallet. Nadie legítimo la pedirá jamás por mensaje o llamada.',
  },
  {
    id: '7',
    title: 'Comprar en Bitso con SPEI',
    description: 'Entras a bitso.com, vinculas tu cuenta bancaria y haces una transferencia SPEI a la cuenta que te indica la plataforma para acreditar pesos y comprar BTC.',
    isScam: false,
    explanation: 'Bitso es un exchange regulado en México. Usar SPEI en su sitio oficial es un método seguro y común para comprar Bitcoin.',
  },
  {
    id: '8',
    title: 'Oferta exclusiva: Bitcoin gratis',
    description: 'Un anuncio dice "Regalamos 0.1 BTC. Solo envía 0.01 BTC a esta dirección para activar tu billetera y recibir el regalo".',
    isScam: true,
    explanation: 'Nadie regala Bitcoin a cambio de que envíes primero. Es un gancho para quedarse con lo que envías.',
  },
];
