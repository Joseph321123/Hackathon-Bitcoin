/**
 * ErrorBoundary.jsx — Límite de error para la UI (React error boundary).
 *
 * Envuelve el contenido de Layout (main). Si algún componente hijo lanza un error durante
 * el render o en un lifecycle method, getDerivedStateFromError y componentDidCatch lo capturan;
 * se muestra un mensaje y un enlace a Inicio en lugar del árbol hijo, sin tumbar toda la app.
 */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

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
