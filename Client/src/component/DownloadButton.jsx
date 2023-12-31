import React from 'react';
import { Button } from 'react-bootstrap';

const DownloadButton = ({ onDownloadClick }) => {
  return (
    <Button variant="primary" onClick={onDownloadClick}>
      تحميل الكتاب
    </Button>
  );
};

export default DownloadButton;