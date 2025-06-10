import { useState } from 'react';
import { Calculator, Plus, Trash2, IndianRupee, Zap, Tv, Moon, Sun } from 'lucide-react';

const SubscriptionCalculator = () => {
    const [subscriptions, setSubscriptions] = useState<Array<{
        id: number;
        name: string;
        monthlyPrice: number | null;
        yearlyPrice: number | null;
        billingType: 'monthly' | 'yearly';
        isCustom: boolean;
    }>>([]);
    const [customName, setCustomName] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<string>('');
    const [customBilling, setCustomBilling] = useState<'monthly' | 'yearly'>('monthly');
    const [darkMode, setDarkMode] = useState<boolean>(false);

    // Popular subscriptions in India with current pricing
    // Popular subscriptions in India with current pricing
    const popularSubscriptions = {


        ai: [
            {
                "name": "ChatGPT Plus",
                "monthly": 1650,
                "yearly": 19800
            },
            {
                "name": "Claude Pro",
                "monthly": 1999,
                "yearly": 23988
            },
            {
                "name": "Google AI Pro",
                "monthly": 1650,
                "yearly": 19800
            },
            {
                "name": "GitHub Copilot",
                "monthly": 830,
                "yearly": 8300
            },
            {
                "name": "Midjourney Basic",
                "monthly": 830,
                "yearly": 7968
            },
            {
                "name": "Notion AI",
                "monthly": 830,
                "yearly": 7968
            },
            {
                "name": "Grammarly Premium",
                "monthly": 1000,
                "yearly": 8400
            },
            {
                "name": "Canva Pro",
                "monthly": 499,
                "yearly": 3999
            },
            {
                "name": "Runway ML",
                "monthly": 996,
                "yearly": 11952
            }
        ],

        entertainment: [
            {
                "name": "Netflix Premium",
                "monthly": 649,
                "yearly": 7788
            },
            {
                "name": "Amazon Prime",
                "monthly": 299,
                "yearly": 1499
            },
            {
                "name": "Disney+ Hotstar Super",
                "monthly": 299,
                "yearly": 899
            },
            {
                "name": "Sony Liv Premium",
                "monthly": 299,
                "yearly": 999
            },
            {
                "name": "Zee5 Premium",
                "monthly": 320,
                "yearly": 1949
            },
            {
                "name": "Voot Select",
                "monthly": 99,
                "yearly": 499
            },
            {
                "name": "YouTube Premium",
                "monthly": 149,
                "yearly": 1490
            },
            {
                "name": "Spotify Premium",
                "monthly": 119,
                "yearly": 1189
            },
            {
                "name": "Apple Music",
                "monthly": 119,
                "yearly": 999
            },
            {
                "name": "JioCinema Premium",
                "monthly": 29,
                "yearly": null
            },
            {
                "name": "MX Player Pro",
                "monthly": null,
                "yearly": 499
            },
            {
                "name": "Aha Premium",
                "monthly": 67,
                "yearly": 699
            }
        ],

    };

    const addSubscription = (
        sub: { name: string; monthly: number | null; yearly: number | null },
        billingType: 'monthly' | 'yearly' = 'monthly'
    ) => {
        const newSub = {
            id: Date.now(),
            name: sub.name,
            monthlyPrice: sub.monthly,
            yearlyPrice: sub.yearly,
            billingType: billingType,
            isCustom: false
        };
        setSubscriptions([...subscriptions, newSub]);
    };

    const addCustomSubscription = () => {
        if (!customName || !customPrice) return;

        const price = parseFloat(customPrice);
        if (isNaN(price)) return;

        const newSub = {
            id: Date.now(),
            name: customName,
            monthlyPrice: customBilling === 'monthly' ? price : price / 12,
            yearlyPrice: customBilling === 'yearly' ? price : price * 12,
            billingType: customBilling,
            isCustom: true
        };

        setSubscriptions([...subscriptions, newSub]);
        setCustomName('');
        setCustomPrice('');
    };

    const removeSubscription = (id: number) => {
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    };

    const toggleBilling = (id: number) => {
        setSubscriptions(subscriptions.map(sub =>
            sub.id === id
                ? { ...sub, billingType: sub.billingType === 'monthly' ? 'yearly' : 'monthly' }
                : sub
        ));
    };

    const totalMonthly = subscriptions.reduce((sum, sub) =>
        sum + (sub.billingType === 'monthly' ? (sub.monthlyPrice ?? 0) : ((sub.yearlyPrice ?? 0) / 12)), 0
    );

    const totalYearly = subscriptions.reduce((sum, sub) =>
        sum + (sub.billingType === 'yearly' ? (sub.yearlyPrice ?? 0) : ((sub.monthlyPrice ?? 0) * 12)), 0
    );

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const formatCurrency = (amount: number | null) => {
        if (amount == null) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 p-4 ${darkMode
                ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                : 'bg-gradient-to-br from-purple-50 to-blue-50'
            }`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4 relative">
                        <Calculator className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Online Subscriptions Calculator
                        </h1>
                        <button
                            onClick={toggleDarkMode}
                            className={`absolute right-0 p-2 rounded-lg transition-colors ${darkMode
                                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                } shadow-lg`}
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Track your AI and Entertainment subscription costs
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* AI Subscriptions */}
                    <div className={`rounded-xl shadow-lg p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                AI Services
                            </h2>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {popularSubscriptions.ai.map((sub, index) => (
                                <div key={index} className={`flex items-center justify-between p-3 rounded-lg hover:opacity-80 transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}>
                                    <div>
                                        <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {sub.name}
                                        </div>
                                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {formatCurrency(sub.monthly)}/mo • {formatCurrency(sub.yearly)}/yr
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => addSubscription(sub, 'monthly')}
                                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            title="Add Monthly"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => addSubscription(sub, 'yearly')}
                                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                            title="Add Yearly"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Entertainment Subscriptions */}
                    <div className={`rounded-xl shadow-lg p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Tv className="w-5 h-5 text-red-500" />
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Entertainment
                            </h2>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {popularSubscriptions.entertainment.map((sub, index) => (
                                <div key={index} className={`flex items-center justify-between p-3 rounded-lg hover:opacity-80 transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}>
                                    <div>
                                        <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {sub.name}
                                        </div>
                                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {formatCurrency(sub.monthly)}/mo • {formatCurrency(sub.yearly)}/yr
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => addSubscription(sub, 'monthly')}
                                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            title="Add Monthly"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => addSubscription(sub, 'yearly')}
                                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                            title="Add Yearly"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Custom Subscription */}
                        <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Add Custom Subscription
                            </h3>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Service name"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    className={`w-full p-2 border rounded-lg text-sm transition-colors ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={customPrice}
                                        onChange={(e) => setCustomPrice(e.target.value)}
                                        className={`flex-1 p-2 border rounded-lg text-sm transition-colors ${darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                    />
                                    <select
                                        value={customBilling}
                                        onChange={(e) => setCustomBilling(e.target.value as 'monthly' | 'yearly')}
                                        className={`p-2 border rounded-lg text-sm transition-colors ${darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </div>
                                <button
                                    onClick={addCustomSubscription}
                                    className="w-full p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                                >
                                    Add Custom
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Your Subscriptions & Total */}
                    <div className={`rounded-xl shadow-lg p-6 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Your Subscriptions
                        </h2>

                        {subscriptions.length === 0 ? (
                            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <Calculator className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>No subscriptions added yet</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                    {subscriptions.map((sub) => (
                                        <div key={sub.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <div className="flex-1">
                                                <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {sub.name}
                                                </div>
                                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {formatCurrency(sub.billingType === 'monthly' ? sub.monthlyPrice : sub.yearlyPrice)}
                                                    /{sub.billingType === 'monthly' ? 'mo' : 'yr'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleBilling(sub.id)}
                                                    className={`text-xs px-2 py-1 rounded hover:opacity-80 transition-colors ${darkMode
                                                            ? 'bg-blue-900 text-blue-200 hover:bg-blue-800'
                                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        }`}
                                                >
                                                    {sub.billingType === 'monthly' ? 'Switch to Yearly' : 'Switch to Monthly'}
                                                </button>
                                                <button
                                                    onClick={() => removeSubscription(sub.id)}
                                                    className={`p-1 rounded transition-colors ${darkMode
                                                            ? 'text-red-400 hover:bg-red-900/20'
                                                            : 'text-red-500 hover:bg-red-100'
                                                        }`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t pt-4">
                                    <div className={`text-white rounded-lg p-4 ${darkMode
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-r from-purple-500 to-blue-500'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-sm opacity-90 mb-1">Total Monthly Cost</div>
                                            <div className="text-2xl font-bold flex items-center justify-center gap-1">
                                                <IndianRupee className="w-5 h-5" />
                                                {totalMonthly.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                        <div className="text-center mt-3 pt-3 border-t border-white/20">
                                            <div className="text-sm opacity-90">Total Yearly Cost</div>
                                            <div className="text-lg font-semibold flex items-center justify-center gap-1">
                                                <IndianRupee className="w-4 h-4" />
                                                {totalYearly.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </div>

                                    {subscriptions.length > 0 && (
                                        <div className={`mt-4 p-3 border rounded-lg ${darkMode
                                                ? 'bg-yellow-900/20 border-yellow-700'
                                                : 'bg-yellow-50 border-yellow-200'
                                            }`}>
                                            <div className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-800'
                                                }`}>
                                                <strong>Annual Savings Tip:</strong> You could save {formatCurrency(totalMonthly * 12 - totalYearly)} by switching all subscriptions to yearly billing!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className={`mt-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>Prices are approximate and may vary. Check official websites for current pricing.</p>
                    <p className="mt-1">All prices shown in Indian Rupees (₹)</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCalculator;