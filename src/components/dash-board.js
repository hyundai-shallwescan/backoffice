import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/dash-board.css';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import downArrow from '../asset/image/down-arrow.svg';
import MainLayout from '../layouts/MainLayout';
import { getCookie } from '../common/Cookie';
import { instance } from '../apis';

const AdminDashboard = () => {
    const [dailySalesData, setDailySalesData] = useState({
        labels: [],
        datasets: [{
            label: '일별 매출',
            data: [],
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: '#28a745',
            borderWidth: 2,
            fill: true,
        }],
    });

    const [ageSalesData, setAgeSalesData] = useState({
        labels: ['10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
        datasets: [{
            data: [],
            backgroundColor: [
                '#F294A5',
                '#024873',
                '#D9D1C7',
                '#262626',
                '#F2B705',
                '#3E8D60'
            ]
        }],
    });

    const [genderSalesData, setGenderSalesData] = useState({
        labels: ['남성', '여성'],
        datasets: [{
            data: [],
            backgroundColor: [
                '#024873',
                '#F2B705'
            ]
        }],
    });

    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('8');

    useEffect(() => {
        // Replace API call with dummy data
        const dummyData = generateDummySalesData();
        setDailySalesData(dummyData);

        // You can set the rest of the sales data if needed or keep it as is.
        setAgeSalesData({
            labels: ['10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
            datasets: [{
                data: [10, 20, 30, 25, 15, 5], // Example static data
                backgroundColor: [
                    '#F294A5',
                    '#024873',
                    '#D9D1C7',
                    '#262626',
                    '#F2B705',
                    '#3E8D60'
                ]
            }],
        });

        setGenderSalesData({
            labels: ['남성', '여성'],
            datasets: [{
                data: [60, 40], // Example static data
                backgroundColor: [
                    '#024873',
                    '#F2B705'
                ]
            }],
        });
    }, [selectedYear, selectedMonth]);

    const generateDummySalesData = () => {
        const labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString()); // Days of the month
        const data = [
            550000, 545000, 548000, 530000, 535000,
            550000, 540000, 538000, 536000, 560000,
            550000, 550000, 555000, 570000, 580000,
            570000, 590000, 580000, 575000, 580000,
            595000, 560000, 580000, 595000, 600000,
            565000, 570000, 556000, 565000, 575000,
            590000, 510000
        ];           return {
            labels: labels,
            datasets: [{
                label: '일별 매출',
                data: data,
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: '#28a745',
                borderWidth: 2,
                fill: true,
            }],
        };
    };

    return (
        <MainLayout>
        <div className="container-fluid admin-dashboard">
            <div className="row">
                <div className="dash-board-header">
                    <div className="dashboard-header d-flex justify-content-between align-items-center">
                        <div className="dash-board-date-picker">
                            <div className="select-wrapper">
                                <select
                                    className="dash-board-select-year"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                                <img src={downArrow} alt="Arrow Icon" className="custom-arrow" />
                            </div>
                            <div className="select-wrapper">
                                <select
                                    className="dash-board-select-month"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
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
        </MainLayout>
    );
};

export default AdminDashboard;
