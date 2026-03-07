import './BitcoinCard.css';

/**
 * Tarjeta reutilizable para contenido educativo (icono, título, texto)
 */
export function BitcoinCard({ icon, title, children, className = '', onClick }) {
  return (
    <article
      className={`bitcoin-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {icon && <span className="bitcoin-card__icon" aria-hidden>{icon}</span>}
      {title && <h3 className="bitcoin-card__title">{title}</h3>}
      <div className="bitcoin-card__content">{children}</div>
    </article>
  );
}
