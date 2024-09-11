import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CookiesProvider} from 'react-cookie';

/**
 * 인덱스
 * @author 구지웅
 * @since 2024.09.04
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.04  구지웅        최초 생성
 * 2024.09.10  정은지        CookiesProvider 설ㅓ
 * </pre>
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);