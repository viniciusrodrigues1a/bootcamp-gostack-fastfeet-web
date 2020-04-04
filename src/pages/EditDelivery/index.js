import React, { useState } from 'react';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Form from '~/components/Form';

export default function EditDelivery(props) {
  const { id } = props.match.params;
  const [recipientId, setRecipientId] = useState(null);
  const [deliverymanId, setDeliverymanId] = useState(null);
  const [product, setProduct] = useState('');

  async function handleEditDelivery() {
    const confirmation = window.confirm('Atualizar entrega?');

    if (confirmation) {
      try {
        await api.put(`/deliveries/${id}`, {
          recipient_id: recipientId,
          deliveryman_id: deliverymanId,
          product,
        });

        toast.success('Entrega atualizada com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Falha ao atualizar entrega.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  return (
    <Container>
      <ActionButtons.Container>
        <ActionButtons.FlexContainer>
          <ActionButtons.Title>Edição de encomendas</ActionButtons.Title>

          <div>
            <ActionButtons.GoBackLink to="/deliveries">
              <FiChevronLeft color="#fff" size={22} /> Voltar
            </ActionButtons.GoBackLink>
            <ActionButtons.ConfirmButton onClick={handleEditDelivery}>
              <FiCheck color="#fff" size={22} /> Salvar
            </ActionButtons.ConfirmButton>
          </div>
        </ActionButtons.FlexContainer>
      </ActionButtons.Container>

      <Form.Wrapper>
        <Form.Row>
          <div style={{ width: '48%' }}>
            <Form.Label>Destinatário</Form.Label>
            <Form.Select
              urlToFetch="/recipients"
              onChange={e => setRecipientId(e.value)}
            />
          </div>

          <div style={{ width: '48%' }}>
            <Form.Label>Entregador</Form.Label>
            <Form.Select
              urlToFetch="/deliverymen"
              onChange={e => setDeliverymanId(e.value)}
            />
          </div>
        </Form.Row>

        <Form.Label htmlFor="product">Nome do produto</Form.Label>
        <Form.Input
          id="product"
          placeholder="Yamaha SX7"
          value={product}
          onChange={e => setProduct(e.target.value)}
        />
      </Form.Wrapper>
    </Container>
  );
}
