import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/side-bar';

/**
 * 메인 레이아웃
 * @author 정은지
 * @since 2024.09.11
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.11  정은지        최초 생성
 * </pre>
 */
const MainLayout = ({ children })  => {
    return (
        <div className="app">
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content-container">
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;