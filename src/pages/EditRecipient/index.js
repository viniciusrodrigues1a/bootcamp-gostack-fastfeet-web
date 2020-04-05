import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Form from '~/components/Form';

export default function EditRecipient(props) {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  const { id } = props.match.params;

  useEffect(() => {
    async function loadRecipientData() {
      const { data } = await api.get(`/recipients/${id}`);
      // eslint-disable-next-line no-shadow
      const { name, street, house_number, complement, city, state, cep } = data;

      setName(name);
      setStreet(street);
      setHouseNumber(house_number);
      setComplement(complement);
      setCity(city);
      setState(state);
      setCep(cep);
    }

    loadRecipientData();
  }, [id]);

  async function handleCreateNewDelivery() {
    const confirmation = window.confirm('Editar destinatário?');

    if (confirmation) {
      try {
        await api.put(`/recipients/${id}`, {
          name,
          street,
          house_number: houseNumber,
          complement,
          state,
          city,
          cep_code: cep,
        });

        toast.success('Destinatário criado com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Falha ao criar destinatário.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  return (
    <Container>
      <ActionButtons.Container>
        <ActionButtons.FlexContainer>
          <ActionButtons.Title>Edição de destinatário</ActionButtons.Title>

          <div>
            <ActionButtons.GoBackLink to="/recipients">
              <FiChevronLeft color="#fff" size={22} /> Voltar
            </ActionButtons.GoBackLink>
            <ActionButtons.ConfirmButton onClick={handleCreateNewDelivery}>
              <FiCheck color="#fff" size={22} /> Salvar
            </ActionButtons.ConfirmButton>
          </div>
        </ActionButtons.FlexContainer>
      </ActionButtons.Container>

      <Form.Wrapper>
        <Form.Label htmlFor="name">Nome</Form.Label>
        <Form.Input
          id="name"
          placeholder="Ludwig van Beethoven"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Form.Row>
          <div style={{ width: '70%' }}>
            <Form.Label htmlFor="street">Rua</Form.Label>
            <Form.Input
              id="street"
              placeholder="Rua Beethoven"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>

          <div style={{ width: '10%' }}>
            <Form.Label htmlFor="house_number">Número</Form.Label>
            <Form.Input
              id="house_number"
              placeholder="1729"
              value={houseNumber}
              onChange={e => setHouseNumber(e.target.value)}
            />
          </div>

          <div style={{ width: '16%' }}>
            <Form.Label htmlFor="complement">Complemento</Form.Label>
            <Form.Input
              id="complement"
              value={complement}
              onChange={e => setComplement(e.target.value)}
            />
          </div>
        </Form.Row>

        <Form.Row>
          <div style={{ width: '32%' }}>
            <Form.Label htmlFor="city">Cidade</Form.Label>
            <Form.Input
              id="city"
              placeholder="Diadema"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>

          <div style={{ width: '32%' }}>
            <Form.Label htmlFor="state">Estado</Form.Label>
            <Form.Input
              id="state"
              placeholder="São Paulo"
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>

          <div style={{ width: '32%' }}>
            <Form.Label htmlFor="cep">CEP</Form.Label>
            <Form.Input
              id="cep"
              placeholder="09960-580"
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </div>
        </Form.Row>
      </Form.Wrapper>
    </Container>
  );
}

EditRecipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
