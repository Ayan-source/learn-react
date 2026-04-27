import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Home,
  LogOut,
  Menu,
  PieChart,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserCircle2,
  Wallet,
  X,
  XCircle,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'income', label: 'Income', icon: TrendingUp },
  { id: 'expense', label: 'Expense', icon: TrendingDown },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Profile & Settings', icon: Settings },
  { id: 'empty', label: 'Empty State', icon: PieChart },
]

const transactionsSeed = [
  { id: 1, type: 'income', title: 'Salary', category: 'Job', amount: 4200, date: '2026-04-01', recurring: true, notes: 'Monthly salary' },
  { id: 2, type: 'expense', title: 'Rent', category: 'Rent', amount: 1200, date: '2026-04-02', recurring: true, notes: 'Apartment rent' },
  { id: 3, type: 'expense', title: 'Groceries', category: 'Food', amount: 210, date: '2026-04-08', recurring: false, notes: 'Weekly shopping' },
  { id: 4, type: 'income', title: 'Freelance', category: 'Consulting', amount: 780, date: '2026-04-14', recurring: false, notes: 'Client payout' },
  { id: 5, type: 'expense', title: 'Internet', category: 'Bills', amount: 65, date: '2026-04-17', recurring: true, notes: 'Fiber bill' },
  { id: 6, type: 'expense', title: 'Transport', category: 'Transport', amount: 92, date: '2026-04-20', recurring: false, notes: 'Fuel and commute' },
]

const insightCards = [
  { title: 'Finance Health Score', value: '82/100', hint: '+4 from last month', tone: 'text-emerald-300' },
  { title: 'Savings Goal Progress', value: '68%', hint: '$3,400 / $5,000', tone: 'text-cyan-300' },
  { title: 'Budget Alert', value: 'Shopping +12%', hint: 'Near monthly threshold', tone: 'text-amber-300' },
]

const filters = ['This week', 'This month', 'Last 3 months', 'Custom']
const categories = ['Food', 'Transport', 'Bills', 'Education', 'Entertainment', 'Shopping', 'Health', 'Rent', 'Others', 'Job', 'Consulting']

function classNames(...items) {
  return items.filter(Boolean).join(' ')
}

const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false }) => (
  <label className="space-y-1 text-sm text-slate-200">
    <span>{label}</span>
    <input
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20"
    />
  </label>
)

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [wireframeMode, setWireframeMode] = useState(false)
  const [transactions, setTransactions] = useState(transactionsSeed)
  const [selectedFilter, setSelectedFilter] = useState(filters[1])
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState('income')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState(null)
  const [authError, setAuthError] = useState('')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false, remember: true })
  const [transactionForm, setTransactionForm] = useState({ amount: '', category: 'Food', title: '', date: '2026-04-27', notes: '', recurring: false })

  const financials = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const balance = income - expense
    return { income, expense, balance, savings: Math.max(balance * 0.35, 0) }
  }, [transactions])

  const showToast = (payload) => {
    setToast(payload)
    window.setTimeout(() => setToast(null), 2500)
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    setAuthError('')
    if (!authForm.email || !authForm.password) {
      setAuthError('Please fill in email and password.')
      return
    }
    if (authMode === 'signup' && authForm.password !== authForm.confirm) {
      setAuthError('Passwords do not match.')
      return
    }
    if (authMode === 'signup' && !authForm.terms) {
      setAuthError('Please accept terms and conditions.')
      return
    }
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setIsAuthenticated(true)
      setActiveScreen('dashboard')
      showToast({ icon: CheckCircle2, text: authMode === 'signup' ? 'Account created successfully' : 'Login successful', color: 'text-emerald-300' })
    }, 850)
  }

  const openAddModal = (type) => {
    setModalType(type)
    setTransactionForm({ amount: '', category: type === 'income' ? 'Job' : 'Food', title: '', date: '2026-04-27', notes: '', recurring: false })
    setShowAddModal(true)
  }

  const handleAddTransaction = (event) => {
    event.preventDefault()
    if (!transactionForm.amount || !transactionForm.title) {
      showToast({ icon: XCircle, text: 'Please complete required fields', color: 'text-rose-300' })
      return
    }
    const record = {
      id: Date.now(),
      type: modalType,
      title: transactionForm.title,
      category: transactionForm.category,
      amount: Number(transactionForm.amount),
      date: transactionForm.date,
      recurring: transactionForm.recurring,
      notes: transactionForm.notes,
    }
    setTransactions((current) => [record, ...current])
    setShowAddModal(false)
    showToast({ icon: CheckCircle2, text: `${modalType === 'income' ? 'Income' : 'Expense'} added successfully`, color: 'text-emerald-300' })
  }

  const deleteTransaction = () => {
    setTransactions((current) => current.filter((item) => item.id !== deleteTarget))
    setDeleteTarget(null)
    showToast({ icon: CheckCircle2, text: 'Transaction deleted', color: 'text-amber-300' })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
        <div className="mx-auto grid min-h-[92vh] max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl lg:grid-cols-[1.1fr,1fr]">
          <section className="hidden border-r border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_45%),radial-gradient(circle_at_20%_80%,_rgba(147,51,234,0.2),_transparent_40%)] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                <Wallet size={14} />
                Smart Expense Tracker
              </p>
              <h1 className="mt-6 text-4xl font-semibold">Manage money with a premium finance dashboard.</h1>
              <p className="mt-4 max-w-md text-slate-300">Track income, monitor spending trends, and export smart reports in a clean experience built for desktop, tablet, and mobile.</p>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>✓ Real-time balance overview</p>
              <p>✓ Smart alerts for overspending</p>
              <p>✓ Category-driven analytics</p>
            </div>
          </section>
          <section className="flex items-center justify-center p-6 sm:p-10">
            <form onSubmit={handleAuthSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{authMode === 'login' ? 'Welcome back' : 'Create account'}</h2>
                <button type="button" onClick={() => setWireframeMode((current) => !current)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-slate-300">
                  {wireframeMode ? 'Hi-Fi' : 'Wireframe'}
                </button>
              </div>
              {authMode === 'signup' && (
                <InputField
                  label="Full Name"
                  value={authForm.name}
                  onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Ayan Ahmed"
                />
              )}
              <InputField
                label="Email"
                type="email"
                required
                value={authForm.email}
                onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="you@example.com"
              />
              <label className="space-y-1 text-sm text-slate-200">
                <span>Password</span>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={authForm.password}
                    onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 pr-11 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-2.5 text-slate-300">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              {authMode === 'signup' && (
                <InputField
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={authForm.confirm}
                  onChange={(event) => setAuthForm((current) => ({ ...current, confirm: event.target.value }))}
                  placeholder="••••••••"
                />
              )}
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={authMode === 'signup' ? authForm.terms : authForm.remember}
                  onChange={(event) => setAuthForm((current) => ({ ...current, [authMode === 'signup' ? 'terms' : 'remember']: event.target.checked }))}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900"
                />
                {authMode === 'signup' ? 'I accept terms and conditions' : 'Remember me'}
              </label>
              {authError && <p className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{authError}</p>}
              <button disabled={isLoading} className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
                {isLoading ? 'Processing...' : authMode === 'signup' ? 'Create Account' : 'Login'}
              </button>
              <p className="text-sm text-slate-300">
                {authMode === 'signup' ? 'Already have an account? ' : 'Need an account? '}
                <button type="button" onClick={() => setAuthMode((current) => (current === 'login' ? 'signup' : 'login'))} className="font-medium text-cyan-300 underline">
                  {authMode === 'signup' ? 'Login' : 'Sign up'}
                </button>
              </p>
            </form>
          </section>
        </div>
      </div>
    )
  }

  const scopedTransactions = activeScreen === 'income'
    ? transactions.filter((item) => item.type === 'income')
    : activeScreen === 'expense'
      ? transactions.filter((item) => item.type === 'expense')
      : transactions

  const TableRows = scopedTransactions.slice(0, 7).map((item) => (
    <tr key={item.id} className="border-t border-white/8 text-sm text-slate-200">
      <td className="px-3 py-2">{item.title}</td>
      <td className="px-3 py-2">{item.category}</td>
      <td className={classNames('px-3 py-2 font-semibold', item.type === 'income' ? 'text-emerald-300' : 'text-rose-300')}>
        {item.type === 'income' ? '+' : '-'}${item.amount}
      </td>
      <td className="px-3 py-2">{item.date}</td>
      <td className="px-3 py-2">{item.recurring ? 'Recurring' : 'One-time'}</td>
      <td className="px-3 py-2">
        <button onClick={() => setDeleteTarget(item.id)} className="rounded-lg border border-rose-400/30 p-1 text-rose-300 hover:bg-rose-400/10" aria-label="Delete transaction">
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  ))

  return (
    <div className={classNames('min-h-screen px-3 py-4 text-white sm:px-5', wireframeMode ? 'bg-slate-900' : 'bg-slate-950 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(147,51,234,0.15),_transparent_40%)]')}>
      <div className="mx-auto flex max-w-[1400px] gap-4">
        <aside className="hidden w-72 flex-col rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur lg:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/15 p-2 text-cyan-300"><Wallet size={20} /></div>
            <div>
              <p className="text-sm font-semibold">Smart Expense Tracker</p>
              <p className="text-xs text-slate-400">Premium Finance UI</p>
            </div>
          </div>
          <nav className="space-y-1">
                {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveScreen(id)}
                className={classNames('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition', activeScreen === id ? 'bg-cyan-300/12 text-cyan-200' : 'text-slate-300 hover:bg-white/5')}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-2">
            <button onClick={() => setWireframeMode((current) => !current)} className="w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5">
              {wireframeMode ? 'Switch to Hi-Fi mode' : 'Switch to Wireframe mode'}
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 space-y-4">
          <header className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-3 backdrop-blur">
            <button onClick={() => setShowMenu((current) => !current)} className="rounded-lg border border-white/10 p-2 lg:hidden"><Menu size={17} /></button>
            <div className="relative min-w-[200px] flex-1">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input placeholder="Search transactions, categories..." className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-9 py-2 text-sm outline-none focus:border-cyan-300" />
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-white/10 p-2 text-slate-300"><Bell size={16} /></button>
              <button onClick={() => openAddModal('income')} className="inline-flex items-center gap-1 rounded-xl bg-emerald-400/15 px-3 py-2 text-sm text-emerald-200"><Plus size={14} />Add Income</button>
              <button onClick={() => openAddModal('expense')} className="inline-flex items-center gap-1 rounded-xl bg-rose-400/15 px-3 py-2 text-sm text-rose-200"><Plus size={14} />Add Expense</button>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 px-2 py-1.5">
                <UserCircle2 size={20} className="text-cyan-300" />
                <span className="hidden text-xs text-slate-300 sm:inline">Ayan</span>
              </div>
            </div>
          </header>

          {showMenu && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/95 p-3 lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map(({ id, label }) => (
                  <button key={id} onClick={() => { setActiveScreen(id); setShowMenu(false) }} className={classNames('rounded-lg border px-3 py-2 text-sm', activeScreen === id ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-slate-300')}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400">Total Balance</p>
              <p className="mt-2 text-2xl font-semibold">${financials.balance.toLocaleString()}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-cyan-300"><Sparkles size={13} /> Real-time sync</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400">Total Income</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">${financials.income.toLocaleString()}</p>
              <p className="mt-1 text-xs text-slate-300">Monthly trend +9.2%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400">Total Expenses</p>
              <p className="mt-2 text-2xl font-semibold text-rose-300">${financials.expense.toLocaleString()}</p>
              <p className="mt-1 text-xs text-slate-300">Watch transport and shopping</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs text-slate-400">Savings Summary</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-300">${Math.round(financials.savings).toLocaleString()}</p>
              <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" /></div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr,1fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">{activeScreen === 'dashboard' ? 'Monthly Overview' : `${activeScreen[0].toUpperCase()}${activeScreen.slice(1)} Overview`}</h3>
                <div className="flex flex-wrap gap-1">
                  {filters.map((item) => (
                    <button key={item} onClick={() => setSelectedFilter(item)} className={classNames('rounded-lg border px-2.5 py-1 text-xs', selectedFilter === item ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-slate-300')}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="mb-3 flex items-center gap-1 text-xs text-slate-300"><BarChart3 size={14} /> Income vs Expense</p>
                  <div className="flex h-40 items-end gap-2">
                    {[40, 65, 48, 75, 62, 80].map((height, index) => (
                      <div key={height + index} className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500/40 to-cyan-300/80" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="mb-3 flex items-center gap-1 text-xs text-slate-300"><PieChart size={14} /> Spending by Category</p>
                  <div className="mx-auto h-40 w-40 rounded-full border-[14px] border-cyan-300/30 border-r-emerald-300/70 border-b-rose-300/60 border-l-indigo-300/50" />
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <p>Food 28%</p><p>Rent 35%</p><p>Bills 18%</p><p>Other 19%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {insightCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
                  <p className="text-xs text-slate-400">{card.title}</p>
                  <p className={classNames('mt-2 text-xl font-semibold', card.tone)}>{card.value}</p>
                  <p className="mt-1 text-xs text-slate-300">{card.hint}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
                <p className="flex items-center gap-2 text-sm text-amber-200"><AlertTriangle size={16} /> Budget warning</p>
                <p className="mt-2 text-xs text-amber-100">Shopping has exceeded your target budget by $48 this month.</p>
              </div>
            </div>
          </section>

          {(activeScreen === 'dashboard' || activeScreen === 'income' || activeScreen === 'expense' || activeScreen === 'reports') && (
            <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Transactions</h3>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300"><Filter size={12} />Filter</button>
                  <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300"><CalendarDays size={12} />Date range</button>
                  <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300"><Download size={12} />Export CSV/PDF</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full">
                  <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-3 py-2">Title</th>
                      <th className="px-3 py-2">Category</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>{TableRows}</tbody>
                </table>
              </div>
            </section>
          )}

          {activeScreen === 'settings' && (
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
                <h3 className="font-semibold">Profile & Security</h3>
                <div className="mt-3 space-y-3">
                  <InputField label="Full Name" value="Ayan Ahmed" onChange={() => {}} />
                  <InputField label="Email" value="ayan@example.com" onChange={() => {}} />
                  <InputField label="Change Password" value="" onChange={() => {}} placeholder="••••••••" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
                <h3 className="font-semibold">Preferences</h3>
                <div className="mt-3 space-y-3 text-sm">
                  <p className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">Dark mode <span className="text-cyan-300">Enabled</span></p>
                  <p className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">Currency <span className="text-cyan-300">USD</span></p>
                  <p className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">Language <span className="text-cyan-300">English</span></p>
                  <p className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">Budget reminders <span className="text-cyan-300">On</span></p>
                </div>
                <button onClick={() => setIsAuthenticated(false)} className="mt-4 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </section>
          )}

          {activeScreen === 'empty' && (
            <section className="rounded-2xl border border-dashed border-white/20 bg-slate-900/55 p-8 text-center">
              <div className="mx-auto w-fit rounded-full bg-cyan-400/10 p-4 text-cyan-300"><Target size={24} /></div>
              <h3 className="mt-4 text-xl font-semibold">No transactions yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">Start building your financial history by adding your first income or expense entry.</p>
              <button onClick={() => openAddModal('expense')} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
                <Plus size={14} />
                Add your first transaction
              </button>
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-4">
            <h3 className="font-semibold">Usability Evaluation Plan</h3>
            <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-300 md:grid-cols-2">
              <p>• Task: Add income and measure completion time.</p>
              <p>• Task: Add expense and count invalid submissions.</p>
              <p>• Task: Reach reports and count navigation clicks.</p>
              <p>• Task: Export report and track success rate.</p>
              <p>• Task: Update settings and track learnability.</p>
              <p>• Post-test satisfaction target: ≥ 4.5/5.</p>
            </div>
          </section>
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <form onSubmit={handleAddTransaction} className="w-full max-w-md space-y-3 rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{modalType === 'income' ? 'Add Income' : 'Add Expense'}</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="rounded-lg border border-white/10 p-1 text-slate-300"><X size={14} /></button>
            </div>
            <InputField label="Title" required value={transactionForm.title} onChange={(event) => setTransactionForm((current) => ({ ...current, title: event.target.value }))} placeholder={modalType === 'income' ? 'Salary' : 'Groceries'} />
            <InputField label="Amount" required type="number" value={transactionForm.amount} onChange={(event) => setTransactionForm((current) => ({ ...current, amount: event.target.value }))} placeholder="120" />
            <label className="space-y-1 text-sm text-slate-200">
              <span>Category</span>
              <select value={transactionForm.category} onChange={(event) => setTransactionForm((current) => ({ ...current, category: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <InputField label="Date" type="date" value={transactionForm.date} onChange={(event) => setTransactionForm((current) => ({ ...current, date: event.target.value }))} />
            <label className="space-y-1 text-sm text-slate-200">
              <span>Notes</span>
              <textarea value={transactionForm.notes} onChange={(event) => setTransactionForm((current) => ({ ...current, notes: event.target.value }))} rows={3} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5" />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={transactionForm.recurring} onChange={(event) => setTransactionForm((current) => ({ ...current, recurring: event.target.checked }))} />
              Recurring transaction
            </label>
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={() => setShowAddModal(false)} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300">Cancel</button>
              <button className="rounded-xl bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950">Save</button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-rose-300/25 bg-slate-900 p-5">
            <p className="flex items-center gap-2 text-rose-200"><AlertTriangle size={18} /> Are you sure you want to delete this transaction?</p>
            <p className="mt-2 text-sm text-slate-300">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300">Cancel</button>
              <button onClick={deleteTransaction} className="rounded-xl bg-rose-400 px-3 py-2 text-sm font-semibold text-slate-950">Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur">
          <p className={classNames('flex items-center gap-2 text-sm', toast.color)}>
            <toast.icon size={16} />
            {toast.text}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
