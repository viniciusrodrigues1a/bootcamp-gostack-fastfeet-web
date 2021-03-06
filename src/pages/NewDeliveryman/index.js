import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Form from '~/components/Form';
import AvatarInput from '~/components/AvatarInput';

export default function NewDeliveryman() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fileId, setFileId] = useState(null);

  async function handleCreateNewDelivery() {
    const confirmation = window.confirm('Criar novo entregador?');

    if (confirmation) {
      try {
        await api.post('/deliverymen', {
          name,
          email,
          avatar_id: fileId,
        });

        toast.success('Entregador criado com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Falha ao criar entregador.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  const inputRef = useRef();

  function handleAvatarInputChange() {
    setFileId(inputRef.current.dataset.file);
  }

  return (
    <Container>
      <ActionButtons.Container>
        <ActionButtons.FlexContainer>
          <ActionButtons.Title>Cadastro de entregador</ActionButtons.Title>

          <div>
            <ActionButtons.GoBackLink to="/deliverymen">
              <FiChevronLeft color="#fff" size={22} /> Voltar
            </ActionButtons.GoBackLink>
            <ActionButtons.ConfirmButton onClick={handleCreateNewDelivery}>
              <FiCheck color="#fff" size={22} /> Salvar
            </ActionButtons.ConfirmButton>
          </div>
        </ActionButtons.FlexContainer>
      </ActionButtons.Container>

      <Form.Wrapper>
        <AvatarInput
          inputRef={inputRef}
          onInputChange={handleAvatarInputChange}
        />

        <Form.Label htmlFor="name">Nome</Form.Label>
        <Form.Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Input
          type="email"
          id="email"
          placeholder="john@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Wrapper>
    </Container>
  );
}
