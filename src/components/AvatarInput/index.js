import React, { useState } from 'react';
import { MdImage } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ inputRef, onInputChange, filePath }) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url_path } = response.data;

    setFile(id);
    setPreview(url_path);

    onInputChange();
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview || filePath ? (
          <img src={preview || filePath} alt="" />
        ) : (
          <MdImage color="#999" />
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
    </Container>
  );
}
