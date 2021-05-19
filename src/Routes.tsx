import React, {FC, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Components
import Loader from './components/Loader/Loader';

// Pages
const QuoteList = React.lazy(() => import('./pages/QuoteList/QuoteList'));
const CreateQuote = React.lazy(() => import('./pages/CreateQuote/CreateQuote'));
const UpdateQuote = React.lazy(() => import('./pages/UpdateQuote/UpdateQuote'));

const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<Loader/>}>
            <QuoteList/>
          </Suspense>
        </Route>
        <Route path="/quote/new">
          <Suspense fallback={<Loader/>}>
            <CreateQuote/>
          </Suspense>
        </Route>
        <Route path="/quote/edit/:_id">
          <Suspense fallback={<Loader/>}>
            <UpdateQuote/>
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
