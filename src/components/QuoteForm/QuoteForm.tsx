import React, {FC, useState} from 'react';
import {Quote} from '../../types';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader/Loader';
import QuoteService from '../../services/QuoteService';

interface QuoteFormProps {
  data?: Quote;
  isEdit?: boolean;
}

const initialQuote: Omit<Quote, '_id'> = {
  author: '',
  text: ''
};

const QuoteForm: FC<QuoteFormProps> = ({data, isEdit = false}) => {
  const [quote, setQuote] = useState<Quote | Omit<Quote, '_id'>>(() => isEdit && data ? data : initialQuote);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name;

    setQuote({...quote, [key]: e.target.value} as Quote | Omit<Quote, '_id'>);
  };

  const handleUpdate = () => {
    setLoading(true);


    const method = isEdit ? QuoteService.update : QuoteService.new;

    method(quote as Quote).then(() => {
      history.push('/');
    }).catch(() => {
      alert('Error');
      setLoading(false);
    });
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '400px'}}>
      <button onClick={() => history.go(-1)} style={{width: 'fit-content', marginBottom: '20px'}}>Back</button>
      <label>Author</label>
      <input style={{marginBottom: '20px'}} placeholder={quote.author} type="text" name="author" onChange={handleChange}/>
      <label>Quote</label>
      <textarea style={{minHeight: '20px', resize: 'vertical'}} placeholder={quote.text} name="text" onChange={handleChange}/>
      <button onClick={handleUpdate} style={{width: 'fit-content', marginTop: '20px'}}>
        {isEdit ? 'Edit' : 'Create'}
      </button>
    </div>
  );
};

export default QuoteForm;
