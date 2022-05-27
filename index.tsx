import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './pages';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <StrictMode>
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading... </div>}>
          <App />
        </React.Suspense>
      </RecoilRoot>
    </StrictMode>,
    document.getElementById('root'),
  );