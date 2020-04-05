import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import { FiPlus } from 'react-icons/fi';
import { GoPencil, GoTrashcan } from 'react-icons/go';

import history from '~/services/history';
import api from '~/services/api';

import { DeliverymanPhoto } from './styles';
import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Table from '~/components/Table';
import MoreOptions from '~/components/MoreOptions';
import PaginationButtons from '~/components/PaginationButtons';

export default function Deliverymen() {
  const [search, setSearch] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);
  const [totalDeliverymen, setTotalDeliverymen] = useState(0);
  const [page, setPage] = useState(1);

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/deliverymen?search=${search}`);

      setTotalDeliverymen(response.data.total);

      const data = response.data.payload.map(deliveryman => {
        const [firstName, secondName] = deliveryman.name.split(' ');
        const firstLetter = firstName ? firstName[0] : '';
        const secondLetter = secondName ? secondName[0] : '';

        return {
          ...deliveryman,
          twoFirstLetters: firstLetter + secondLetter,
          twoFirstLettersColor: getRandomColor(),
        };
      });

      setDeliverymen(data);
    })();
  }, [search, getRandomColor]);

  function handleCreateNewDeliveryman() {
    history.push('/deliverymen/new');
  }

  function handleClickEdit(deliverymanId) {
    history.push(`/deliverymen/edit/${deliverymanId}`);
  }

  async function handleClickDelete(deliverymanId) {
    const confirmation = window.confirm(
      `Deletar entregador #${deliverymanId}?`,
    );

    if (confirmation) {
      try {
        await api.delete(`/deliverymen/${deliverymanId}`);

        setDeliverymen(deliverymen.filter(d => d.id !== deliverymanId));

        toast.success('Entregador deletada com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Erro ao deletar entregador.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  const cantGoToNextPage = useMemo(() => page * 10 >= totalDeliverymen, [
    page,
    totalDeliverymen,
  ]);

  const cantGoToPrevPage = useMemo(() => page === 1, [page]);

  function nextPage() {
    if (cantGoToNextPage) return;

    setPage(page + 1);
  }

  function prevPage() {
    if (cantGoToPrevPage) return;

    setPage(page - 1);
  }

  return (
    <>
      <Container>
        <ActionButtons.Container>
          <ActionButtons.Title>Gerenciando entregadores</ActionButtons.Title>

          <ActionButtons.FlexContainer>
            <ActionButtons.SearchInput
              placeholder="Buscar por entregadores"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div>
              <ActionButtons.ConfirmButton onClick={handleCreateNewDeliveryman}>
                <FiPlus color="#fff" size={22} /> Cadastrar
              </ActionButtons.ConfirmButton>
            </div>
          </ActionButtons.FlexContainer>
        </ActionButtons.Container>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th style={{ textAlign: 'end' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen.map(deliveryman => (
              <React.Fragment key={deliveryman.id}>
                <tr>
                  <td>#{deliveryman.id}</td>
                  <DeliverymanPhoto color={deliveryman.twoFirstLettersColor}>
                    {deliveryman.avatar && (
                      <img
                        src={deliveryman.avatar.url_path}
                        alt={deliveryman.name}
                      />
                    )}

                    {!deliveryman.avatar && (
                      <span>{deliveryman.twoFirstLetters}</span>
                    )}
                  </DeliverymanPhoto>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td style={{ textAlign: 'end' }}>
                    <MoreOptions.Container align="end">
                      <MoreOptions.Button
                        onClick={() => handleClickEdit(deliveryman.id)}
                      >
                        <GoPencil color="#4D85EE" size={18} /> Editar
                      </MoreOptions.Button>
                      <MoreOptions.Button
                        onClick={() => handleClickDelete(deliveryman.id)}
                      >
                        <GoTrashcan color="#DE3B3B" size={18} /> Deletar
                      </MoreOptions.Button>
                    </MoreOptions.Container>
                  </td>
                </tr>
                <br />
              </React.Fragment>
            ))}
          </tbody>
        </Table>

        {!search && (
          <PaginationButtons
            nextFunc={nextPage}
            prevFunc={prevPage}
            cantGoBack={cantGoToPrevPage}
            cantGoForward={cantGoToNextPage}
          />
        )}
      </Container>
    </>
  );
}
