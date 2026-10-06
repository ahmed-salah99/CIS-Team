import { useRef, useState } from 'react';
import logo from './Logo.png';

const VALID_USER = 'Bassam Schools';
const VALID_PASS = 'Bassam@2026';
const TARGET_URL = 'https://sites.google.com/view/cis-team-evaluation-visit-2026?usp=sharing';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {visible ? (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8M6.2 6.2C3.8 7.8 2 12 2 12s3.5 6 10 6a9.7 9.7 0 0 0 3.2-.5" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    ) : (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const passwordInputRef = useRef(null);
 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === VALID_USER && password === VALID_PASS) {
      setError('');
      setIsSubmitting(true);
      window.location.href = TARGET_URL;
      return;
    }

    setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 400);
    setPassword('');
    passwordInputRef.current?.focus();
  };

  const clearError = () => {
    if (error) setError('');
  };

  return (
    <main className="page-shell">
      <section className={`login-card ${isShaking ? 'shake' : ''}`} aria-labelledby="login-title">
        <header className="brand">
          <div className="mark" aria-hidden="true">
            <img src={logo} alt="شعار مدارس البسام" />
          </div>
          <h1 id="login-title">مدارس البسام</h1>
          <div className="en">AL-BASSAM SCHOOLS</div>
          <p>CIS Team Evaluation Visit 2026 — Log in to follow up</p>
        </header>

        <form id="loginForm" onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="field">
            <label htmlFor="username">User Name</label>
            <div className="input-wrap">
              <UserIcon />
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  clearError();
                }}
                placeholder="أدخل اسم المستخدم"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockIcon />
              <input
                ref={passwordInputRef}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError();
                }}
                placeholder="أدخل كلمة المرور"
                required
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                aria-pressed={showPassword}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {error && <div className="error" role="alert">{error}</div>}

          <button style={{color:"whitw"}} type="submit" className="submit"   disabled={isSubmitting}>
            {isSubmitting ? '... Loding' : 'Login'}
          </button>
        </form>

        <footer className="foot">©️ 2026 Al-Bassam Schools — All Rights Reserved.</footer>
      </section>
    </main>
  );
}

export default App;
