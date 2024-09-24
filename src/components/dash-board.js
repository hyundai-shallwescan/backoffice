import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/dash-board.css';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import downArrow from '../asset/image/down-arrow.svg';
import MainLayout from '../layouts/MainLayout';
import { getCookie } from '../common/Cookie';
import { instance } from '../apis';

/**
 * Dashboard Component
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.01  구지웅        최초 생성
 * 2024.09.14  구지웅        기본 설정된 Month 수정
 * </pre>
 */

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
        const token = getCookie('accessToken');
        if (token) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        function generateDummyData(length, min, max) {
            return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        }
        const augustData = generateDummyData(31, 4150000, 4152000);
        const septemberData = generateDummyData(25, 4100000, 4200000);
        const labels = Array.from({ length: 31 }, (v, i) => String(i + 1).padStart(2, '0'));
        const secondLabel = Array.from({ length: 25 }, (v, i) => String(i + 1).padStart(2, '0'));

        if (selectedMonth === '8') {
            setDailySalesData({
                labels: labels,
                datasets: [{
                    label: '일별 매출 - 8월',
                    data: [ 3599705, 3589705, 3599705, 3619705, 3589705, 
                        3559705, 3599705, 3539705, 3559705, 3589705, 
                        3599705,3570705 , 3579705, 3619705, 3612705, 
                        3622705, 3591005, 3581005, 3611705, 3601005, 
                        3590005, 3580005, 3560005, 3590005, 3610005, 
                        3580005, 3590005, 3570005, 3610005, 3610005,3620005],
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: '#28a745',
                    borderWidth: 2,
                    fill: true,
                }],
            });
        } else if (selectedMonth === '9') {
            setDailySalesData({
                labels: secondLabel,
                datasets: [{
                    label: '일별 매출 - 9월',
                     data: [ 
                        3599705,3570705 , 3579705, 3619705, 3612705, 
                        3622705, 3591005, 3581005, 3611705, 3601005, 
                        3599705, 3589705, 3599705, 3619705, 3589705, 
                        3559705, 3599705, 3569705, 3579705, 3589705, 
                        3590005, 3580005, 3570005, 3590005, 3610005, 
                         ],
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: '#28a745',
                    borderWidth: 2,
                    fill: true,
                }],
            });
        }

        instance.get(`/admins/sales`, {
            headers: {
                authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
            },
            params: {
                year: selectedYear,
                month: selectedMonth
            }
        })
        .then(response => {
            const data = response.data[0];
    
            setAgeSalesData({
                labels: ['10-19', '20-29', '30-39', '40-49', '50-59', '60+'],
                datasets: [{
                    data: [
                        data.ageRange1Ratio,
                        data.ageRange2Ratio,
                        data.ageRange3Ratio,
                        data.ageRange4Ratio,
                        data.ageRange5Ratio,
                        data.ageRangeSixtyToLastRatio
                    ],
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
                    data: [data.maleRatio, data.femaleRatio],
                    backgroundColor: [
                        '#024873',
                        '#F2B705'
                    ]
                }],
            });
        })
        .catch(error => {
            console.error('Error fetching sales data:', error);
        });
    }, [selectedYear, selectedMonth]);


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