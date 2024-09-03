import React from 'react';
import '../styles/dash-board.css';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import downArrow from '../asset/image/down-arrow.svg'; // Import your SVG image

const AdminDashboard = () => {
    const dailySalesData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        datasets: [{
            label: '일별 매출',
            data: [5, 7, 10, 6, 4, 3, 8, 12, 9, 13, 14, 19, 10, 12, 13, 22, 24, 25, 17, 19, 21, 23, 25, 22, 21, 27, 29, 31, 30, 33],
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: '#28a745',
            borderWidth: 2,
            fill: true,
        }],
    };

    const ageSalesData = {
        labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        datasets: [{
            data: [22, 20, 13, 13, 20, 12],
            backgroundColor: [
                '#F294A5',
                '#024873',
                '#D9D1C7',
                '#262626',
                '#F2B705',
                '#3E8D60'
            ]
        }],
    };

    const genderSalesData = {
        labels: ['남성', '여성'],
        datasets: [{
            data: [55, 45],
            backgroundColor: [
                '#024873',
                '#F2B705'
            ]
        }],
    };

    return (
        <div className="container-fluid admin-dashboard">
            <div className="row">
                <div className="dash-board-header">
                    <div className="dashboard-header d-flex justify-content-between align-items-center">
                        <div className="dash-board-date-picker">
                            <div className="select-wrapper">
                                <select className="dash-board-select-year">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                                <img src={downArrow} alt="Arrow Icon" className="custom-arrow" />
                            </div>
                            <div className="select-wrapper">
                                <select className="dash-board-select-month">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <img src={downArrow} alt="Arrow Icon" className="custom-arrow" />
                            </div>
                        </div>
                    </div>

                    <div className="dash-board-chart">
                        <div className="total-sales-chart">
                            <h3>일별 매출</h3>
                            <div className="total-sales-chart-container">
                                <Line data={dailySalesData} />
                            </div>
                        </div>

                        <div className="chart-row">
                            <div className="generation-sale-chart">
                                <h3>연령별 매출 비율</h3>
                                <div className="chart-container">
                                    <Pie data={ageSalesData} />
                                </div>
                            </div>
                            <div className="gender-sale-chart">
                                <h3>성별 매출 비율</h3>
                                <div className="chart-container">
                                    <Doughnut data={genderSalesData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
