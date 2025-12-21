import React, { useState, useEffect } from 'react';
import {
    AlertTriangle, TrendingUp, DollarSign, Activity, Shield, Users,
    MapPin, Clock, CheckCircle, XCircle, AlertCircle, LayoutDashboard,
    PieChart as PieChartIcon, Bell, Search, Menu, ChevronRight, LogOut
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const FraudDetectionSystem = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [transactions, setTransactions] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [stats, setStats] = useState({
        totalTransactions: 0,
        fraudDetected: 0,
        totalAmount: 0,
        riskScore: 0
    });
    const [trendData, setTrendData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Generate realistic transaction data (Logic preserved)
    const generateTransaction = () => {
        const types = ['Purchase', 'Transfer', 'Withdrawal', 'Deposit'];
        const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'New York', 'London', 'Singapore'];
        const merchants = ['Amazon', 'Flipkart', 'Swiggy', 'Uber', 'Netflix', 'Steam', 'Unknown Vendor', 'Suspicious Site', 'Apple Store', 'Google Play'];

        const amount = Math.random() > 0.9
            ? Math.floor(Math.random() * 50000) + 20000
            : Math.floor(Math.random() * 5000) + 100;

        const location = Math.random() > 0.85 ? locations[Math.floor(Math.random() * 3) + 7] : locations[Math.floor(Math.random() * 7)];
        const merchant = Math.random() > 0.9 ? merchants[merchants.length - 2] : merchants[Math.floor(Math.random() * (merchants.length - 2))];

        let riskScore = 0;
        let flags = [];

        if (amount > 20000) { riskScore += 35; flags.push('High Amount'); }
        if (['New York', 'London', 'Singapore'].includes(location)) { riskScore += 25; flags.push('Foreign Location'); }
        if (merchant.includes('Unknown') || merchant.includes('Suspicious')) { riskScore += 30; flags.push('Suspicious Merchant'); }
        if (new Date().getHours() < 6) { riskScore += 10; flags.push('Unusual Time'); }

        const isFraud = riskScore > 50;

        return {
            id: Date.now() + Math.random(),
            type: types[Math.floor(Math.random() * types.length)],
            amount: amount,
            merchant: merchant,
            location: location,
            time: new Date().toLocaleTimeString(),
            riskScore: Math.min(riskScore, 100),
            isFraud: isFraud,
            flags: flags,
            status: isFraud ? 'blocked' : 'approved',
            userId: 'USR' + Math.floor(1000 + Math.random() * 9000)
        };
    };

    useEffect(() => {
        const initialTransactions = Array.from({ length: 8 }, () => generateTransaction());
        setTransactions(initialTransactions);

        // Generate mock data for charts
        const mockTrend = Array.from({ length: 24 }, (_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            volume: Math.floor(Math.random() * 100000) + 50000,
            fraud: Math.floor(Math.random() * 20000) + 2000
        }));
        setTrendData(mockTrend);

        const updateStats = (txns) => {
            const fraudCount = txns.filter(t => t.isFraud).length;
            const total = txns.reduce((sum, t) => sum + t.amount, 0);
            setStats({
                totalTransactions: txns.length,
                fraudDetected: fraudCount,
                totalAmount: total,
                riskScore: Math.floor((fraudCount / (txns.length || 1)) * 100)
            });
        };

        updateStats(initialTransactions);

        const fraudAlerts = initialTransactions
            .filter(t => t.isFraud)
            .map(t => ({
                id: t.id,
                message: `Suspicious ${t.type} of ₹${t.amount.toLocaleString()} at ${t.merchant}`,
                severity: t.riskScore > 75 ? 'critical' : 'high',
                time: t.time
            }));

        setAlerts(fraudAlerts);
    }, []);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const newTransaction = generateTransaction();

            setTransactions(prev => {
                const updated = [newTransaction, ...prev].slice(0, 50);

                // Update stats based on the new list (simplified for demo)
                const fraudCount = updated.filter(t => t.isFraud).length;
                const total = updated.reduce((sum, t) => sum + t.amount, 0);

                setStats({
                    totalTransactions: updated.length,
                    fraudDetected: fraudCount,
                    totalAmount: total,
                    riskScore: Math.floor((fraudCount / updated.length) * 100)
                });

                return updated;
            });

            if (newTransaction.isFraud) {
                const newAlert = {
                    id: newTransaction.id,
                    message: `Suspicious ${newTransaction.type} of ₹${newTransaction.amount.toLocaleString()} at ${newTransaction.merchant}`,
                    severity: newTransaction.riskScore > 75 ? 'critical' : 'high',
                    time: newTransaction.time
                };
                setAlerts(prev => [newAlert, ...prev].slice(0, 10));
            }
        }, 2500);

        return () => clearInterval(interval);
    }, [isPaused]);

    const filteredTransactions = transactions.filter(t =>
        t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery)
    );

    const getRiskColor = (score) => {
        if (score < 30) return 'text-emerald-400';
        if (score < 60) return 'text-amber-400';
        return 'text-rose-500';
    };

    const getRiskBadge = (score) => {
        if (score < 30) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (score < 60) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    };

    return (
        <div className="flex h-screen bg-slate-950 font-sans text-slate-300 overflow-hidden selection:bg-cyan-500/30">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} relative z-30 flex flex-col border-r border-white/5 bg-slate-900/50 backdrop-blur-2xl transition-all duration-300`}>
                <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
                    <Shield className="h-8 w-8 text-cyan-500" />
                    {isSidebarOpen && (
                        <span className="text-lg font-bold tracking-wide text-slate-100">
                            Secure<span className="text-cyan-500">Bank</span>
                        </span>
                    )}
                </div>

                <div className="flex-1 space-y-1 py-6 px-3">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'monitoring', icon: Activity, label: 'Live Monitor' },
                        { id: 'analytics', icon: PieChartIcon, label: 'Analytics' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all
                                ${activeTab === item.id
                                    ? 'bg-cyan-500/10 text-cyan-400 shdaow-lg shadow-cyan-500/10'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                        >
                            <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            {activeTab === item.id && isSidebarOpen && (
                                <ChevronRight className="ml-auto h-4 w-4 text-cyan-500/50" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="border-t border-white/5 p-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex w-full items-center justify-center rounded-lg bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Global Background Glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950/0 to-slate-950/0" />

                {/* Topbar */}
                <header className="flex h-16 items-center justify-between border-b border-white/5 bg-slate-900/50 px-8 backdrop-blur-md relative z-20">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="hidden md:inline-block">System Status:</span>
                        <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Operational
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Bell className="h-5 w-5" />
                                {alerts.length > 0 && (
                                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
                                )}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl ring-1 ring-white/10">
                                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                        <h3 className="font-semibold text-white">Notifications</h3>
                                        <span className="text-xs text-slate-400">{alerts.length} New</span>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                                        {alerts.length === 0 ? (
                                            <p className="text-sm text-slate-500 text-center py-4">No new alerts</p>
                                        ) : (
                                            alerts.map((alert) => (
                                                <div key={alert.id} className="flex gap-3 rounded-lg bg-white/5 p-3 hover:bg-white/10 transition-colors">
                                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                                                    <div>
                                                        <p className="text-xs font-medium text-rose-200">{alert.message}</p>
                                                        <p className="mt-1 text-[10px] text-slate-500">{alert.time}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 ring-2 ring-white/10" />
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800">
                    {activeTab === 'dashboard' && (
                        <div className="mx-auto max-w-6xl space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                                <p className="text-slate-400">Real-time insight into transaction monitoring and risk analysis.</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard
                                    title="Total Transactions"
                                    value={stats.totalTransactions.toLocaleString()}
                                    icon={Activity}
                                    trend="+12.5%"
                                    color="blue"
                                />
                                <StatCard
                                    title="Fraud Detected"
                                    value={stats.fraudDetected}
                                    icon={AlertTriangle}
                                    trend="+4.2%"
                                    color="rose"
                                    isAlert
                                />
                                <StatCard
                                    title="Total Volume"
                                    value={`₹${(stats.totalAmount / 1000).toFixed(1)}k`}
                                    icon={DollarSign}
                                    trend="+8.1%"
                                    color="emerald"
                                />
                                <StatCard
                                    title="Risk Score"
                                    value={`${stats.riskScore}%`}
                                    icon={Shield}
                                    trend="-2.4%"
                                    color={stats.riskScore > 50 ? 'rose' : 'emerald'}
                                />
                            </div>

                            {/* Transaction Trend Chart */}
                            <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm">
                                <h2 className="font-semibold text-white mb-4">Transaction Trends (24h)</h2>
                                <div className="flex h-64 w-full">
                                    {/* Fixed Y-Axis */}
                                    <div className="w-16 h-full flex-shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                <YAxis
                                                    stroke="#94a3b8"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickFormatter={(value) => `₹${value / 1000}k`}
                                                    width={60}
                                                />
                                                {/* Hidden areas to force Y-axis domain calculation */}
                                                <Area type="monotone" dataKey="volume" stroke="none" fill="none" />
                                                <Area type="monotone" dataKey="fraud" stroke="none" fill="none" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Scrollable Chart Area */}
                                    <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
                                        <div className="h-full min-w-[1500px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                                        itemStyle={{ color: '#cbd5e1' }}
                                                    />
                                                    <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" name="Total Volume" />
                                                    <Area type="monotone" dataKey="fraud" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" name="Fraud Detected" />
                                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Recent Activity - Spans 2 cols */}
                                <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm lg:col-span-2">
                                    <div className="flex items-center justify-between border-b border-white/5 p-6">
                                        <h2 className="font-semibold text-white">Live Transactions</h2>
                                        <button onClick={() => setActiveTab('monitoring')} className="text-xs font-medium text-cyan-400 hover:text-cyan-300">View All</button>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {filteredTransactions.slice(0, 6).map((txn) => (
                                            <div key={txn.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${txn.isFraud ? 'border-rose-500/20 bg-rose-500/10' : 'border-emerald-500/20 bg-emerald-500/10'}`}>
                                                        {txn.isFraud ? <XCircle className="h-5 w-5 text-rose-500" /> : <CheckCircle className="h-5 w-5 text-emerald-500" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-200">{txn.merchant}</p>
                                                        <p className="text-xs text-slate-500">{txn.type} • {txn.location}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-medium text-slate-200">₹{txn.amount.toLocaleString()}</p>
                                                    <p className="text-xs text-slate-500">{txn.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Alerts Panel */}
                                <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
                                    <div className="flex items-center justify-between border-b border-white/5 p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                            <h2 className="font-semibold text-white">Active Alerts</h2>
                                        </div>
                                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">{alerts.length}</span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        {alerts.length === 0 ? (
                                            <div className="py-8 text-center text-slate-500">No active alerts</div>
                                        ) : (
                                            alerts.slice(0, 5).map((alert) => (
                                                <div key={alert.id} className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                                                    <div className="flex gap-3">
                                                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                                                        <div>
                                                            <p className="text-sm font-medium text-rose-200">{alert.message}</p>
                                                            <p className="mt-1 text-xs text-rose-500/60">{alert.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'monitoring' && (
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-white">Live Monitoring</h1>
                                <button
                                    onClick={() => setIsPaused(!isPaused)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${isPaused ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}
                                >
                                    {isPaused ? 'Resume Stream' : 'Pause Stream'}
                                </button>
                            </div>
                            <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/50">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-400">
                                        <thead className="bg-white/5 text-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Transaction ID</th>
                                                <th className="px-6 py-4 font-medium">Merchant</th>
                                                <th className="px-6 py-4 font-medium">Amount</th>
                                                <th className="px-6 py-4 font-medium">Location</th>
                                                <th className="px-6 py-4 font-medium">Risk Score</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredTransactions.map((txn) => (
                                                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-6 py-4 font-mono text-cyan-500/80">#{txn.id.toString().slice(-8)}</td>
                                                    <td className="px-6 py-4 text-slate-300">{txn.merchant}</td>
                                                    <td className="px-6 py-4 text-slate-200">₹{txn.amount.toLocaleString()}</td>
                                                    <td className="px-6 py-4">{txn.location}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-16 rounded-full bg-white/10">
                                                                <div
                                                                    className={`h-full rounded-full ${txn.riskScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                                                    style={{ width: `${txn.riskScore}%` }}
                                                                />
                                                            </div>
                                                            <span className={txn.riskScore > 50 ? 'text-rose-500' : 'text-emerald-500'}>{txn.riskScore}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${txn.status === 'blocked'
                                                            ? 'bg-rose-400/10 text-rose-400 ring-rose-400/20'
                                                            : 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20'
                                                            }`}>
                                                            {txn.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="mx-auto max-w-6xl space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-white">System Analytics</h1>
                                <p className="text-slate-400">Deep dive into fraud patterns and ML model performance.</p>
                            </div>

                            {/* ML Model Info */}
                            <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-indigo-300">ML Model Performance</h3>
                                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">RandomForestClassifier</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Accuracy', value: '96.8%', color: 'text-emerald-400' },
                                        { label: 'Precision', value: '94.2%', color: 'text-cyan-400' },
                                        { label: 'Recall', value: '91.5%', color: 'text-amber-400' },
                                        { label: 'F1 Score', value: '92.8%', color: 'text-indigo-400' }
                                    ].map((stat, i) => (
                                        <div key={i} className="rounded-lg bg-slate-900/50 p-4 border border-white/5">
                                            <p className="text-slate-500 text-xs uppercase tracking-wider">{stat.label}</p>
                                            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Risk Distribution */}
                                <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-6">Risk Distribution</h3>
                                    <div className="h-64 relative flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Low Risk', value: transactions.filter(t => t.riskScore < 30).length },
                                                        { name: 'Medium Risk', value: transactions.filter(t => t.riskScore >= 30 && t.riskScore < 60).length },
                                                        { name: 'High Risk', value: transactions.filter(t => t.riskScore >= 60).length }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    <Cell fill="#10b981" />
                                                    <Cell fill="#f59e0b" />
                                                    <Cell fill="#f43f5e" />
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                                    itemStyle={{ color: '#cbd5e1' }}
                                                />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="text-center mt-[-30px]">
                                                <span className="block text-2xl font-bold text-white">{transactions.length}</span>
                                                <span className="text-xs text-slate-500">Total</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fraud Patterns */}
                                <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-6">Common Fraud Patterns</h3>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                layout="vertical"
                                                data={[
                                                    { pattern: 'High Amount', count: 45 },
                                                    { pattern: 'Foreign Loc', count: 30 },
                                                    { pattern: 'Suspicious', count: 20 },
                                                    { pattern: 'Time Anomaly', count: 5 }
                                                ]}
                                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis dataKey="pattern" type="category" stroke="#94a3b8" fontSize={11} width={100} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: '#ffffff05' }}
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                                />
                                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                                                    {
                                                        [45, 30, 20, 5].map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={['#f43f5e', '#f59e0b', '#8b5cf6', '#3b82f6'][index % 4]} />
                                                        ))
                                                    }
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div >
        </div >
    );
};

const StatCard = ({ title, value, icon: Icon, trend, color, isAlert }) => (
    <div className={`relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg hover:shadow-cyan-900/5 ${isAlert ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/5 bg-slate-900/50'}`}>
        <div className="flex items-center justify-between">
            <div className={`rounded-lg p-2 ${color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                color === 'rose' ? 'bg-rose-500/10 text-rose-400' :
                    color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-slate-500/10 text-slate-400'
                }`}>
                <Icon className="h-6 w-6" />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trend}
                    <TrendingUp className={`ml-1 h-3 w-3 ${trend.startsWith('-') && 'rotate-180'}`} />
                </span>
            )}
        </div>
        <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
            <p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p>
        </div>
    </div>
);

export default FraudDetectionSystem;
