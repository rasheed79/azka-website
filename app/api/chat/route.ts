import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY = 10;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { messages: ChatMessage[] };

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
    }

    const history = body.messages
      .slice(-MAX_HISTORY)
      .filter((m): m is ChatMessage =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
      );

    if (history.length === 0 || history[0].role !== 'user') {
      return NextResponse.json({ error: 'First message must be from user' }, { status: 400 });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: history,
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ reply: text });

  } catch (error: unknown) {
    console.error('[/api/chat] error:', error);
    if (error instanceof Anthropic.APIError) {
      const status = error.status ?? 500;
      return NextResponse.json({ error: 'API error', code: status }, { status: status >= 500 ? 502 : status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
