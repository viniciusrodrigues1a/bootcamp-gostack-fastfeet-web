import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Form } from './styles';
import Select from './Select';

export default function NewDelivery() {
  const [deliverymanId, setDeliverymanId] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [productName, setProductName] = useState('');

  async function handleCreateDelivery() {
    try {
      await api.post('/deliveries', {
        recipient_id: recipientId,
        deliveryman_id: deliverymanId,
        product: productName,
      });

      toast.success('Delivery criado com sucesso!', {
        autoClose: 2000,
        className: 'toast-custom-background',
      });
    } catch (err) {
      toast.error('Falha ao criar delivery!', {
        className: 'toast-custom-background',
      });
    }
  }

  return (
    <Container>
      <main>
        <div>
          <h1>Cadastro de encomendas</h1>

          <div>
            <Link type="button" to="/deliveries">
              <button type="button">
                <span>
                  <FiChevronLeft size={26} color="#fff" /> Voltar
                </span>
              </button>
            </Link>
            <button type="button" onClick={handleCreateDelivery}>
              <span>
                <FiCheck size={26} color="#fff" /> Salvar
              </span>
            </button>
          </div>
        </div>

        <Form>
          <div>
            <div>
              <span>Destinatário</span>
              <Select
                urlToFetch="/recipients"
                placeholder="Selecionar..."
                onChange={e => setRecipientId(e.value)}
              />
            </div>
            <div>
              <span>Entregador</span>
              <Select
                urlToFetch="/deliverymen"
                placeholder="Selecionar..."
                onChange={e => setDeliverymanId(e.value)}
              />
            </div>
          </div>

          <label htmlFor="product-name">Nome do produto</label>
          <input
            id="product-name"
            type="text"
            placeholder="Yamaha SX7"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </Form>
      </main>
    </Container>
  );
}
