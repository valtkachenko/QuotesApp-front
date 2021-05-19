import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import QuoteForm from '../../components/QuoteForm/QuoteForm';
import {Quote} from '../../types';
import Loader from '../../components/Loader/Loader';
import QuoteService from '../../services/QuoteService';

type Params = {
  _id: string;
}

const UpdateQuote: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [quote, setQuote] = useState<Quote>();

  const {_id} = useParams<Params>();

  useEffect(() => {
    if (_id) {
      QuoteService.getOne(_id)
        .then(res => res.json())
        .then(data => setQuote(data))
        .catch(() => alert('Error'));
    }
    setLoading(false)
  }, []);

  if (loading || !quote) {
    return <Loader/>;
  }

  return (
    <QuoteForm isEdit={true} data={quote}/>
  );
};

export default UpdateQuote;
