import React, { useState } from 'react';
import Bottom from '../components/shared/Bottom';
import { BiDownload } from 'react-icons/bi';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { metricsData, orders } from '../constants';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Set Chart.js defaults
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.plugins.tooltip.enabled = true;

// Sample data for demonstration
const salesData = {
    daily: [
        { date: '2024-03-20', revenue: 5840, orders: 45 },
        { date: '2024-03-21', revenue: 6240, orders: 52 },
        { date: '2024-03-22', revenue: 5120, orders: 38 },
        { date: '2024-03-23', revenue: 7450, orders: 63 },
    ],
    popular: [
        { name: 'Chicken Biryani', orders: 145, revenue: 21750 },
        { name: 'Butter Chicken', orders: 120, revenue: 18000 },
        { name: 'Paneer Tikka', orders: 98, revenue: 12740 },
        { name: 'Veg Thali', orders: 85, revenue: 10625 },
    ],
    inventory: [
        { name: 'Rice', status: 'Good', stock: 85 },
        { name: 'Chicken', status: 'Low', stock: 15 },
        { name: 'Vegetables', status: 'Good', stock: 75 },
        { name: 'Spices', status: 'Critical', stock: 5 },
    ]
};

const Report = () => {
    const [timeRange, setTimeRange] = useState('today');
    const [isLoading, setIsLoading] = useState(false);

    // Chart data configuration
    const chartData = {
        labels: salesData.daily.map(day => new Date(day.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Revenue',
                data: salesData.daily.map(day => day.revenue),
                borderColor: '#f6B100',
                backgroundColor: 'rgba(246, 177, 0, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Orders',
                data: salesData.daily.map(day => day.orders * 100), // Scaling for visibility
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#f5f5f5'
                }
            }
        },
        scales: {
            y: {
                ticks: { color: '#f5f5f5' },
                grid: { color: '#333' }
            },
            x: {
                ticks: { color: '#f5f5f5' },
                grid: { color: '#333' }
            }
        }
    };

    const downloadReport = async () => {
        try {
            setIsLoading(true);
            
            // Create report data
            const reportData = {
                timeRange,
                metrics: metricsData,
                sales: salesData,
                orders: orders.slice(0, 10) // Last 10 orders
            };

            // Create Blob and download
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading report:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='bg-[#1f1f1f] min-h-screen pb-20'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className='text-[#f5f5f5] text-2xl font-bold'>Reports & Analytics</h1>
                        <p className='text-[#ababab] mt-1'>View detailed insights about your business</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className='bg-[#262626] text-[#f5f5f5] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f6B100]'
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                        <button
                            onClick={downloadReport}
                            disabled={isLoading}
                            className='flex items-center gap-2 bg-[#f6B100] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#e5a400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            <BiDownload size={20} />
                            {isLoading ? 'Downloading...' : 'Download Report'}
                        </button>
                    </div>
                </div>

                {/* Metrics Overview */}
                <div className='grid grid-cols-4 gap-4 mb-8'>
                    {metricsData.map((metric, index) => (
                        <div key={index} className='bg-[#262626] p-4 rounded-lg'>
                            <h3 className='text-[#ababab] text-sm'>{metric.title}</h3>
                            <div className='flex items-end justify-between mt-2'>
                                <p className='text-[#f5f5f5] text-2xl font-bold'>{metric.value}</p>
                                <span className={`text-sm ${metric.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.isIncrease ? '↑' : '↓'} {metric.percentage}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div className='bg-[#262626] p-6 rounded-lg mb-8'>
                    <h2 className='text-[#f5f5f5] text-xl font-bold mb-4'>Revenue & Orders Trend</h2>
                    <div className='h-[300px]'>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Sales Report */}
                <div className='grid grid-cols-2 gap-6 mb-8'>
                    <div className='bg-[#262626] p-6 rounded-lg'>
                        <h2 className='text-[#f5f5f5] text-xl font-bold mb-4'>Daily Sales</h2>
                        <div className='space-y-4'>
                            {salesData.daily.map((day, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-[#f5f5f5]'>{new Date(day.date).toLocaleDateString()}</p>
                                        <p className='text-[#ababab] text-sm'>{day.orders} orders</p>
                                    </div>
                                    <p className='text-[#f5f5f5] font-bold'>₹{day.revenue.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='bg-[#262626] p-6 rounded-lg'>
                        <h2 className='text-[#f5f5f5] text-xl font-bold mb-4'>Popular Items</h2>
                        <div className='space-y-4'>
                            {salesData.popular.map((item, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-[#f5f5f5]'>{item.name}</p>
                                        <p className='text-[#ababab] text-sm'>{item.orders} orders</p>
                                    </div>
                                    <p className='text-[#f5f5f5] font-bold'>₹{item.revenue.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inventory Status */}
                <div className='bg-[#262626] p-6 rounded-lg mb-8'>
                    <h2 className='text-[#f5f5f5] text-xl font-bold mb-4'>Inventory Status</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        {salesData.inventory.map((item, index) => (
                            <div key={index} className='bg-[#1a1a1a] p-4 rounded-lg'>
                                <h3 className='text-[#f5f5f5] font-medium'>{item.name}</h3>
                                <div className='flex items-center justify-between mt-2'>
                                    <p className='text-[#ababab]'>{item.stock}% remaining</p>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        item.status === 'Good' ? 'bg-green-500/20 text-green-500' :
                                        item.status === 'Low' ? 'bg-yellow-500/20 text-yellow-500' :
                                        'bg-red-500/20 text-red-500'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className='w-full h-2 bg-[#333] rounded-full mt-2'>
                                    <div
                                        className={`h-full rounded-full ${
                                            item.status === 'Good' ? 'bg-green-500' :
                                            item.status === 'Low' ? 'bg-yellow-500' :
                                            'bg-red-500'
                                        }`}
                                        style={{ width: `${item.stock}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className='bg-[#262626] rounded-lg overflow-hidden'>
                    <div className='p-6 border-b border-[#333]'>
                        <h2 className='text-[#f5f5f5] text-xl font-bold'>Recent Orders</h2>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-[#1a1a1a]'>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Order ID</th>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Customer</th>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Date & Time</th>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Items</th>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Status</th>
                                    <th className='text-[#f5f5f5] px-6 py-3 text-left'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className='border-t border-[#333] hover:bg-[#1a1a1a] transition-colors'>
                                        <td className='text-[#f5f5f5] px-6 py-4'>#{order.id}</td>
                                        <td className='text-[#f5f5f5] px-6 py-4'>{order.customer}</td>
                                        <td className='text-[#f5f5f5] px-6 py-4'>{order.dateTime}</td>
                                        <td className='text-[#f5f5f5] px-6 py-4'>{order.items} items</td>
                                        <td className='px-6 py-4'>
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                order.status === 'Ready' ? 'bg-green-500/20 text-green-500' :
                                                'bg-yellow-500/20 text-yellow-500'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className='text-[#f5f5f5] px-6 py-4'>₹{order.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <Bottom />
    </section>
    );
};

export default Report;