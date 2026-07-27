// http:// entries needed until the team's HTTPS cert ships — drop them after.
const ALLOWED_ORIGINS = ['https://www.azka.com', 'https://azka.com', 'http://www.azka.com', 'http://azka.com'];
const MAX_HISTORY = 10;

const SYSTEM_PROMPT = `أنت المساعد الذكي الرسمي لشركة أزكى الوطنية لتقنية المعلومات.

معلومات الشركة:
- الاسم: أزكى الوطنية لتقنية المعلومات (Azka National for Information Technology)
- التأسيس: 1989م (1409هـ) — أكثر من 35 عاماً من الخبرة
- المقر: جدة، المملكة العربية السعودية (ص.ب 1485، جدة 21431) — 4 مكاتب في المملكة
- شريك معتمد لـ Microsoft
- أكثر من 77 مشروعاً منجزاً

أبرز عملاء أزكى:
وزارة الصحة، وزارة العدل، وزارة الشؤون الإسلامية، هيئة الأوقاف، هيئة المساحة الجيولوجية، هيئة الطيران المدني، شركة أرامكو السعودية، شركة سابك، شركة المياه الوطنية، شركة الكهرباء السعودية، البنك الأهلي السعودي، بنك الراجحي، شركة زين، شركة STC، جامعة الملك عبدالعزيز

الأنظمة والمنتجات الـ 15 التي تقدمها أزكى:
1. نظام الموارد البشرية — إدارة دورة حياة الموظف كاملة
2. نظام الحضور والانصراف — تتبع الوقت آلياً مرتبط بالرواتب
3. تطبيق راصد (الحضور والانصراف) — تطبيق جوال ذكي، بصمة وجه ثلاثية الأبعاد وتحديد موقع GPS
4. النظام المالي — الدفاتر العامة والذمم والقوائم المالية
5. نظام الميزانية — الميزانيات السنوية ومقارنة الفعلي بالمخطط
6. نظام الأرشفة الإلكترونية (نسخة مكتبية) — للمؤسسات الصغيرة، رقمنة وبحث نصي كامل
7. نظام الأرشفة الإلكترونية (نسخة ويب) — للمؤسسات الكبيرة متعددة الفروع
8. نظام المشتريات والعقود — المناقصات وإدارة الموردين والعقود
9. نظام الاتصالات الإدارية — المراسلات الداخلية والخارجية
10. نظام إدارة المستودعات — تتبع المخزون وتنبيهات المخزون
11. نظام الخدمات الذاتية — بوابة الخدمة الذاتية للموظفين
12. نظام البصمة الحيوية — التعرف بالبصمة والوجه وقزحية العين
13. نظام تصاريح الدخول — التحكم في دخول المباني والمناطق المقيدة
14. تطوير تطبيقات الجوال — تطبيقات iOS وAndroid مخصصة
15. الربط والتكامل — تكامل الأنظمة عبر API وخدمات الويب

أوقات العمل: الأحد–الخميس 08:00–17:00 | السبت 12:00–16:00 | الجمعة إجازة
التواصل: هاتف +966503495776 | +966552554570 | فاكس +966 (12) 6500171 | بريد connect@azka.com
الموقع: www.azka.com

قواعد يجب الالتزام بها:
- رد بنفس لغة المستخدم: عربي → عربي، إنجليزي → إنجليزي
- كن محترفاً وودوداً وموجزاً
- ركز فقط على منتجات وخدمات ومعلومات أزكى
- للاستفسارات التفصيلية عن الأسعار أو العروض التوضيحية، وجّه المستخدم للتواصل المباشر مع أزكى
- لا تتكهن بالأسعار
- رد بنص عادي فقط — بدون markdown أو تنسيق غامق أو مائل`;

function corsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

// ponytail: no auth token — anyone with the URL can call this and spend Anthropic credits.
// Add a shared-secret header check if usage/abuse becomes a problem.
export default {
  async fetch(request, env) {
    const headers = corsHeaders(request.headers.get('Origin') || '');

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Not found' }, 404, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, headers);
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return json({ error: 'messages array is required' }, 400, headers);
    }

    const history = body.messages
      .slice(-MAX_HISTORY)
      .filter((m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
      );

    if (history.length === 0 || history[0].role !== 'user') {
      return json({ error: 'First message must be from user' }, 400, headers);
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': env.chatkey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      if (!res.ok) {
        return json({ error: 'API error', code: res.status }, res.status >= 500 ? 502 : res.status, headers);
      }

      const data = await res.json();
      const text = data.content?.[0]?.type === 'text' ? data.content[0].text : '';
      return json({ reply: text }, 200, headers);
    } catch {
      return json({ error: 'Internal server error' }, 500, headers);
    }
  },
};
