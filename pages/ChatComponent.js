import React, { useEffect } from 'react';

const ChatComponent = () => {
  const loadScript = async () => {
    const _ = {};
    _.GORGIAS_CHAT_APP_ID = '7653';
    _.GORGIAS_CHAT_BASE_URL = 'us-east1-898b.production.gorgias.chat';
    _.GORGIAS_API_BASE_URL = 'config.gorgias.chat';

    const CHAT_URL = `https://${_.GORGIAS_API_BASE_URL}/applications/${_.GORGIAS_CHAT_APP_ID}`;

    try {
      const e = await fetch(CHAT_URL);
      const n = await e.json();

      if (!n.application || !n.bundleVersion)
        throw new Error(`Missing fields in the response body - ${CHAT_URL}`);

      if (
        ((_.GORGIAS_CHAT_APP = n.application),
        (_.GORGIAS_CHAT_BUNDLE_VERSION = n.bundleVersion),
        n && n.texts && (_.GORGIAS_CHAT_TEXTS = n.texts),
        n &&
          n.sspTexts &&
          (_.GORGIAS_CHAT_SELF_SERVICE_PORTAL_TEXTS = n.sspTexts),
        !document.getElementById('gorgias-chat-container'))
      ) {
        var o = document.createElement('div');
        (o.id = 'gorgias-chat-container'), document.body.appendChild(o);
        var r = document.createElement('script');
        r.setAttribute('defer', !0);
        (r.src =
          'https://client-builds.production.gorgias.chat/{bundleVersion}/static/js/main.js'.replace(
            '{bundleVersion}',
            n.bundleVersion
          )),
          document.body.appendChild(r);
      }
    } catch (e) {
      console.error(`Failed request GET - ${CHAT_URL}`);
    }
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GORGIAS === 'true') {
      loadScript();
    }
  }, [loadScript]);

  return <></>;
};

export default ChatComponent;
