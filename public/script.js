* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f7fb;
  --panel: #ffffff;
  --primary: #2f6fed;
  --primary-dark: #1d4ec6;
  --accent: #f4b942;
  --text: #1b2430;
  --muted: #5f6d7a;
  --line: #dfe7f4;
  --shadow: 0 16px 40px rgba(23, 35, 58, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
textarea {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid rgba(223, 231, 244, 0.9);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.nav-button,
.primary-btn,
.secondary-btn,
.buy-btn,
.comment-submit {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease;
}

.nav-button,
.primary-btn,
.comment-submit {
  background: var(--primary);
  color: white;
}

.nav-button {
  padding: 10px 18px;
}

.primary-btn,
.comment-submit {
  padding: 12px 18px;
}

.secondary-btn {
  background: #eef3ff;
  color: var(--primary);
  padding: 10px 16px;
}

.nav-button:hover,
.primary-btn:hover,
.secondary-btn:hover,
.buy-btn:hover,
.comment-submit:hover {
  transform: translateY(-1px);
}

.hero {
  padding: 56px 0 28px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--primary);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.74rem;
}

.hero h1 {
  margin: 0;
  max-width: 640px;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.06em;
}

.subtitle {
  margin-top: 16px;
  max-width: 620px;
  font-size: 1.05rem;
  color: var(--muted);
  line-height: 1.7;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.form-panel {
  padding: 26px;
}

.form-panel h2,
.items-header h2 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.5rem;
}

.grid-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #f9fbff;
  padding: 12px 14px;
  color: var(--text);
}

input:focus,
textarea:focus {
  outline: 2px solid rgba(47, 111, 237, 0.18);
  border-color: var(--primary);
}

.items-header {
  margin-top: 32px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 12px 0 48px;
}

.item-card {
  background: var(--panel);
  border-radius: 20px;
  border: 1px solid var(--line);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.item-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.item-body {
  padding: 20px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.price-tag {
  background: #edf7ee;
  color: #1e7d42;
  border-radius: 999px;
  padding: 7px 10px;
  font-weight: 700;
  font-size: 0.86rem;
}

.item-description {
  color: var(--muted);
  line-height: 1.7;
  margin: 12px 0 18px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.buy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0eaf5b;
  color: white;
  padding: 10px 16px;
}

.comment-box {
  border-top: 1px solid var(--line);
  padding-top: 18px;
}

.comment-box h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.comment {
  background: #f7f9fd;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 12px;
}

.comment strong {
  display: block;
  margin-bottom: 4px;
}

.comment-form {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.comment-form input,
.comment-form textarea {
  background: white;
}

.comment-form textarea {
  min-height: 80px;
  resize: vertical;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 20px;
  background: var(--panel);
  border: 1px dashed var(--line);
  border-radius: 20px;
  color: var(--muted);
}

@media (max-width: 640px) {
  .grid-two {
    grid-template-columns: 1fr;
  }

  .nav {
    flex-wrap: wrap;
    gap: 12px;
  }
}
