import React, {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Quote as QuoteType} from '../../types';
import QuoteService from '../../services/QuoteService';
import Loader from '../../components/Loader/Loader';
import Quote from '../../components/Quote/Quote';

const QuoteList: FC = () => {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    QuoteService.getList()
      .then(res => res.json())
      .then(data => {
        setQuotes(data);
        setLoading(false);
      });
    // .catch(() => {
    //   alert('Error');
    // });
  }, []);

  const handleEdit = (id: string) => {
    history.push(`/quote/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    await QuoteService.delete(id);

    const data = await QuoteService.getList()
      .then(res => res.json());

    setQuotes(data);
    setLoading(false);
  };

  if (loading) {
    return <Loader/>;
  }

  if (!quotes.length) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h2>No Quotes</h2>
        <button onClick={() => history.push('quote/new')}>Create one</button>
      </div>
    );
  }

  return (
    <ul>
      {quotes.map(quote => (
        <Quote key={quote._id} data={quote} onEdit={handleEdit} onDelete={handleDelete}/>
      ))}
        <button onClick={() => history.push('quote/new')}>Create one</button>
    </ul>
  );
};

export default QuoteList;
