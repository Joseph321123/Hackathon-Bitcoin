/**
 * Preguntas tipo Kahoot para el quiz de Bitcoin
 * Una sola respuesta correcta por pregunta (index)
 */

export const quizQuestions = [
  {
    id: 'q1',
    question: '¿Qué es Bitcoin?',
    options: [
      'Una moneda digital descentralizada',
      'Una red social',
      'Un banco en línea',
      'Una app de mensajes',
    ],
    correctIndex: 0,
  },
  {
    id: 'q2',
    question: '¿Quién controla la red de Bitcoin?',
    options: [
      'El gobierno de Estados Unidos',
      'Nadie: es descentralizada',
      'Un solo banco',
      'Las redes sociales',
    ],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: '¿Qué es la frase semilla (seed phrase)?',
    options: [
      'Una contraseña de una red WiFi',
      'Las 12 o 24 palabras que permiten recuperar tu billetera',
      'El nombre de tu cuenta en un exchange',
      'Un código de promoción',
    ],
    correctIndex: 1,
  },
  {
    id: 'q4',
    question: '¿Es seguro compartir tu frase semilla con "soporte técnico"?',
    options: [
      'Sí, si te lo piden por email',
      'No, nadie legítimo la pide nunca',
      'Solo si es por teléfono',
      'Sí, si prometen duplicar tu Bitcoin',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    question: '¿Qué es la blockchain?',
    options: [
      'Una red de tiendas',
      'Un registro público de bloques de transacciones encadenados',
      'Una app de mensajes',
      'Un tipo de tarjeta de crédito',
    ],
    correctIndex: 1,
  },
  {
    id: 'q6',
    question: 'Para comprar Bitcoin en México de forma segura, ¿qué es recomendable?',
    options: [
      'Enviar BTC a un desconocido que promete duplicarlo',
      'Usar un exchange regulado como Bitso y SPEI',
      'Dar tu frase semilla a un "asesor"',
      'Comprar en cualquier link que te envíen por WhatsApp',
    ],
    correctIndex: 1,
  },
  {
    id: 'q7',
    question: '¿Qué significa que Bitcoin sea "descentralizado"?',
    options: [
      'Que lo controla una empresa',
      'Que no hay un solo punto de control; la red la mantienen muchos nodos',
      'Que solo existe en un país',
      'Que es anónimo y no se puede rastrear',
    ],
    correctIndex: 1,
  },
  {
    id: 'q8',
    question: '¿Qué es una wallet (billetera)?',
    options: [
      'Una tarjeta de débito',
      'Un lugar donde guardas tus claves y con el que envías/recibes Bitcoin',
      'Una cuenta de correo',
      'Una red social',
    ],
    correctIndex: 1,
  },
  {
    id: 'q9',
    question: 'Si alguien te ofrece "duplicar tu Bitcoin", ¿qué deberías hacer?',
    options: [
      'Enviarle tu Bitcoin',
      'Desconfiar: es una estafa típica',
      'Darle tu frase semilla',
      'Enviarle también tu contraseña del banco',
    ],
    correctIndex: 1,
  },
  {
    id: 'q10',
    question: '¿Dónde es más seguro guardar tu frase semilla?',
    options: [
      'En un mensaje de WhatsApp',
      'En un email o en la nube',
      'Escrita en papel en un lugar seguro, sin subirla a internet',
      'En una historia de Instagram',
    ],
    correctIndex: 2,
  },
  {
    id: 'q11',
    question: 'En México, ¿qué exchange permite comprar Bitcoin con SPEI?',
    options: [
      'Solo bancos tradicionales',
      'Bitso, entre otros regulados',
      'Solo en efectivo en la calle',
      'No se puede en México',
    ],
    correctIndex: 1,
  },
  {
    id: 'q12',
    question: '¿Qué es una comisión de red (network fee) en Bitcoin?',
    options: [
      'Un impuesto del gobierno',
      'Un pago a los mineros que validan la transacción',
      'La cuota del exchange',
      'El costo de la billetera',
    ],
    correctIndex: 1,
  },
  {
    id: 'q13',
    question: '¿Qué significa "no tus llaves, no tus monedas"?',
    options: [
      'Que debes tener llaves físicas',
      'Que si no controlas tus claves privadas, no controlas realmente el Bitcoin',
      'Que hay que cerrar la billetera con llave',
      'Que los exchanges no tienen custodia',
    ],
    correctIndex: 1,
  },
  {
    id: 'q14',
    question: '¿Qué es un satoshi (sat)?',
    options: [
      'Un tipo de wallet',
      'La unidad más pequeña de Bitcoin (0.00000001 BTC)',
      'Un minero',
      'Una transacción',
    ],
    correctIndex: 1,
  },
  {
    id: 'q15',
    question: 'Para recibir Bitcoin, ¿qué necesitas?',
    options: [
      'Solo un correo electrónico',
      'Una dirección Bitcoin (de tu wallet) o un QR',
      'Una cuenta de banco',
      'Un número de teléfono',
    ],
    correctIndex: 1,
  },
];
