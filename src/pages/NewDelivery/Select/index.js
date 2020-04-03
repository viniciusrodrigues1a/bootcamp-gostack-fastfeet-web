import React, { useState, useEffect, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import api from '~/services/api';

export default function Select(props) {
  const { urlToFetch } = props;

  const [optionsSelect, setOptionsSelect] = useState([]);

  const callAPI = useCallback(
    async searchQuery => {
      const response = await api.get(`${urlToFetch}?search=${searchQuery}`);

      const data = response.data.map(d => ({
        value: d.id,
        label: d.name,
      }));

      setOptionsSelect(data);
    },
    [urlToFetch],
  );

  useEffect(() => {
    callAPI('');
  }, [callAPI]);

  function loadOptions(inputValue, callback) {
    setTimeout(() => {
      callback(optionsSelect);
    }, 1000);
  }

  function handleInputChange(newValue) {
    callAPI(newValue);
  }

  const loadingMessage = useCallback(() => 'Carregando...', []);

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={optionsSelect}
      onInputChange={handleInputChange}
      cacheOptions
      loadingMessage={loadingMessage}
      {...props}
    />
  );
}

Select.propTypes = {
  urlToFetch: PropTypes.string.isRequired,
};
