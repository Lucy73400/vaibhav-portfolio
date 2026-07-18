import { Link } from 'react-router-dom';

export default function Collaborate() {
  return (
    <>
      <section id="footer-visual" aria-hidden="true">
        <div className="fv-room"></div>
        <img
          src="https://i.ibb.co/hJwV1pph/MY-personal-logo.png"
          className="fv-logo-img"
          alt=""
          loading="lazy"
        />
      </section>

      <section id="collaborate" aria-labelledby="collaborate-heading">
        <div className="collab-inner">
          <div className="collab-left">
            <div className="collab-label">[ INQUIRIES ]</div>
            <h2 id="collaborate-heading" className="collab-h">
              LET'S ABSORB<br />EACH OTHER'S<br />IDEAS, ENDURE<br />THE CHAOS TOGETHER.
            </h2>
            <div className="collab-tag">
              AVAILABLE FOR GLOBAL COMMISSIONS<br />DIRECTORIAL WORK &amp; CONSULTING
            </div>
          </div>

          <div className="collab-center" aria-hidden="true">
            <div className="collab-img-available">● CURRENTLY AVAILABLE — 2026</div>
          </div>

          <div className="collab-right">
            <div>
              <div className="collab-sec-label">DIRECT CHANNEL</div>
              <a href="mailto:v.khule02@gmail.com" className="collab-email">
                v.khule02@gmail.com
              </a>
            </div>

            <div>
              <div className="collab-sec-label">NETWORKS</div>
              <div className="collab-link-row">
                <a href="#" aria-label="Behance profile">Behance</a>
                <span aria-hidden="true">[ ↗ ]</span>
              </div>
              <div className="collab-link-row">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram profile">Instagram</a>
                <span aria-hidden="true">[ ↗ ]</span>
              </div>
              <div className="collab-link-row">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">LinkedIn</a>
                <span aria-hidden="true">[ ↗ ]</span>
              </div>
              <div className="collab-link-row">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube channel">YouTube</a>
                <span aria-hidden="true">[ ↗ ]</span>
              </div>
            </div>

            <div>
              <div className="collab-sec-label">BASE</div>
              <div className="collab-loc-name">AKOLA / INDIA</div>
              <div className="collab-loc-sub">WORKING ACROSS TIMEZONES</div>
            </div>
          </div>
        </div>

        <div className="collab-bottom-bar">
          <div className="collab-bottom-label">SITE FRAMEWORK</div>
          <div className="collab-bottom-links">
            <a href="#hero">INDEX_03</a>
            <a href="#portfolio">PORTFOLIO_GRID</a>
            <Link to="/blog">blog_LOGS</Link>
          </div>
        </div>
      </section>
    </>
  );
}
