import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import { FiPlus } from 'react-icons/fi';
import { GoPencil, GoTrashcan } from 'react-icons/go';

import history from '~/services/history';
import api from '~/services/api';

import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Table from '~/components/Table';
import MoreOptions from '~/components/MoreOptions';
import PaginationButtons from '~/components/PaginationButtons';

export default function Recipients() {
  const [search, setSearch] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [totalRecipients, setTotalRecipients] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/recipients?search=${search}`);

      setTotalRecipients(response.data.total);
      setRecipients(response.data.payload);
    })();
  }, [search]);

  function handleCreateNewRecipient() {
    history.push('/recipients/new');
  }

  function handleClickEdit(recipientId) {
    history.push(`/recipients/edit/${recipientId}`);
  }

  async function handleClickDelete(recipientId) {
    const confirmation = window.confirm(
      `Deletar destinatário #${recipientId}?`,
    );

    if (confirmation) {
      try {
        await api.delete(`/recipients/${recipientId}`);

        setRecipients(recipients.filter(d => d.id !== recipientId));

        toast.success('Destinatário deletada com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Erro ao deletar destinatário.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  const cantGoToNextPage = useMemo(() => page * 10 >= totalRecipients, [
    page,
    totalRecipients,
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
          <ActionButtons.Title>Gerenciando destinatários</ActionButtons.Title>

          <ActionButtons.FlexContainer>
            <ActionButtons.SearchInput
              placeholder="Buscar por destinatários"
              useDebounce
              onDebounce={e => setSearch(e.value)}
            />
            <div>
              <ActionButtons.ConfirmButton onClick={handleCreateNewRecipient}>
                <FiPlus color="#fff" size={22} /> Cadastrar
              </ActionButtons.ConfirmButton>
            </div>
          </ActionButtons.FlexContainer>
        </ActionButtons.Container>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th style={{ textAlign: 'end' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <React.Fragment key={recipient.id}>
                <tr>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.street}, {recipient.house_number},{' '}
                    {recipient.city} - {recipient.state}
                  </td>
                  <td style={{ textAlign: 'end' }}>
                    <MoreOptions.Container align="end">
                      <MoreOptions.Button
                        onClick={() => handleClickEdit(recipient.id)}
                      >
                        <GoPencil color="#4D85EE" size={18} /> Editar
                      </MoreOptions.Button>
                      <MoreOptions.Button
                        onClick={() => handleClickDelete(recipient.id)}
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
