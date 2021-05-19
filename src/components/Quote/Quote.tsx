import React, {FC} from 'react';
import {Quote as QuoteType} from '../../types';
import './styles.css';

interface QuoteProps {
  data: QuoteType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Quote: FC<QuoteProps> = ({data, onDelete, onEdit}) => {
  return (
    <li>
      <div className="quote-container">
        <i>"{data.text}" &ndash; <b>{data.author}</b></i>
        <button style={{marginTop: '15px'}} onClick={() => onEdit(data._id)}>Edit</button>
        <button style={{marginTop: '10px'}} onClick={() => onDelete(data._id)}>Delete</button>
      </div>
    </li>
  );
};

export default Quote;
