import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const ChatComponent = dynamic(() => import('./ChatComponent'));

export default function Home() {
  // i'm not really using this state. it is just an example, this could be a loading state or something elese

  const [showChat, setShowChat] = useState(true);
  return (
    <div className="container">
      {/* by doing this we're making sure that component is only loaded when it is needed */}
      {showChat && <ChatComponent />}
      <Head>
        <title>Nyla Challenge: Apps</title>
      </Head>

      <main>
        <h1 className="title">
          Nyla Challenge: <span>Apps</span>
        </h1>

        <p className="description">
          We need you to integrate with a third-party live chat called{' '}
          <a href="https://www.gorgias.com/" target="_blank">
            Gorgias
          </a>
          .
          <small>
            (you can see it in action on their own website, bottom right corner){' '}
          </small>
        </p>

        <p className="description">
          The only thing someone provides you is the following code snippet:
        </p>

        <pre>
          {`
<script id="gorgias-chat-widget-install">
  !function(_) {
    _.GORGIAS_CHAT_APP_ID = "7653", _.GORGIAS_CHAT_BASE_URL = "us-east1-898b.production.gorgias.chat", _.GORGIAS_API_BASE_URL = "config.gorgias.chat";
    var e = new XMLHttpRequest;
    e.open("GET", "https://config.gorgias.chat/applications/7653", !0), e.onload = function(t) {
      if (4 === e.readyState)
        if (200 === e.status) {
          var n = JSON.parse(e.responseText);
          if (!n.application || !n.bundleVersion) throw new Error("Missing fields in the response body - https://config.gorgias.chat/applications/7653");
          if (_.GORGIAS_CHAT_APP = n.application, _.GORGIAS_CHAT_BUNDLE_VERSION = n.bundleVersion, n && n.texts && (_.GORGIAS_CHAT_TEXTS = n.texts), n && n.sspTexts && (_.GORGIAS_CHAT_SELF_SERVICE_PORTAL_TEXTS = n.sspTexts), !document.getElementById("gorgias-chat-container")) {
            var o = document.createElement("div");
            o.id = "gorgias-chat-container", document.body.appendChild(o);
            var r = document.createElement("script");
            r.setAttribute("defer", !0), r.src = "https://client-builds.production.gorgias.chat/{bundleVersion}/static/js/main.js".replace("{bundleVersion}", n.bundleVersion), document.body.appendChild(r)
          }
        } else console.error("Failed request GET - https://config.gorgias.chat/applications/7653")
    }, e.onerror = function(_) {
      console.error(_)
    }, e.send()
  }(window || {});
</script>
          `}
        </pre>

        <div className="grid">
          <div className="card">
            <h3>Minimum acceptance criteria</h3>
            <ul>
              <li>
                The Gorgias chat widget should appear in the bottom right corner
                of the screen (you might need to use <em>Open in New Window</em>{' '}
                in StackBlitz due to CORS).
              </li>
              <li>It should be functional if a Visitor wants to use it.</li>
              <li>
                It shouldn't load if the Merchant disabled it and{' '}
                <code>process.env.NEXT_PUBLIC_GORGIAS</code>
                isn't true.
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>Bonus: organization</h3>
            <p>
              Any third-party App shouldn't contaminate/clutter the core
              codebase and abstractions should be used given that not all
              Merchants will use this App.
            </p>
          </div>

          <div className="card">
            <h3>Bonus: performance</h3>
            <p>
              Only 1 every 25 visitors actually starts a chat, and the average
              chat application adds an extra 50% of the total JS compressed size
              of a typical Nyla Site. The lower the impact on page load time
              performance for your average user, the better.
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        a {
          color: #0070f3;
        }

        .title span {
          color: #0070f3;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 1.5rem 0 0.25rem;
        }

        small {
          display: block;
          font-size: 0.9rem;
          opacity: 0.75;
        }

        code,
        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.5rem;
          font-size: 1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        pre {
          padding: 1rem;
          font-size: 0.825rem;
          white-space: pre-wrap;
          max-width: 800px;
          width: 95%;
          height: 100px;
          overflow: auto;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;
          max-width: 800px;
          width: 100%;
        }

        .card {
          margin: 1rem 0;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 100%;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p, .card li {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (min-width: 600px) {
          .title {
            font-size: 4rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
