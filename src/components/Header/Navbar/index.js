import React from 'react';
import Link from '../Link';

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/deliveries">Encomendas</Link>
        <Link to="/deliverymen">Entregadores</Link>
        <Link to="/recipients">Destinatários</Link>
        <Link to="/problems">Problemas</Link>
      </nav>
    </>
  );
}
