import { Component } from 'react';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

/**
 * Captura errores en la UI para que una página rota no tumbe toda la app
 */
export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo salió mal en esta sección</h2>
          <p>Puedes volver al inicio o intentar otra sección.</p>
          <Link to="/" className="btn btn--primary">Ir al inicio</Link>
        </div>
      );
    }
    return this.props.children;
  }
}
