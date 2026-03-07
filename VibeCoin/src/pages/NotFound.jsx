import { Link } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>No encontramos esta página.</p>
      <Link to="/" className="btn btn--primary">Volver al inicio</Link>
    </div>
  );
}
