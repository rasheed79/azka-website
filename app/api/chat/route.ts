import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `أنت المساعد الذكي الرسمي لشركة أزكى لتقنية المعلومات.

معلومات الشركة:
- الاسم: أزكى لتقنية المعلومات (Azka for Information Technology)
- التأسيس: 1989م (1409هـ) — أكثر من 35 عاماً من الخبرة
- المقر: جدة، المملكة العربية السعودية (ص.ب 1485، جدة 21431) — 4 مكاتب في المملكة
- شريك معتمد لـ Microsoft وIBM، وفاز بجائزة IBM Best Business Partner 2006
- أكثر من 77 مشروعاً منجزاً

الأنظمة الـ 13 التي تقدمها أزكى:
1. نظام الموارد البشرية — إدارة دورة حياة الموظف كاملة
2. نظام الحضور والانصراف — تتبع الوقت آلياً مرتبط بالرواتب
3. النظام المالي — الدفاتر العامة والذمم والقوائم المالية
4. نظام الميزانية — الميزانيات السنوية ومقارنة الفعلي بالمخطط
5. نظام الأرشفة الإلكترونية — رقمنة المستندات والبحث النصي الكامل
6. نظام المشتريات والعقود — المناقصات وإدارة الموردين والعقود
7. نظام الاتصالات الإدارية — المراسلات الداخلية والخارجية
8. نظام إدارة المستودعات — تتبع المخزون وتنبيهات المخزون
9. نظام الخدمات الذاتية — بوابة الخدمة الذاتية للموظفين
10. نظام البصمة الحيوية — التعرف بالبصمة والوجه وقزحية العين
11. نظام تصاريح الدخول — التحكم في دخول المباني والمناطق المقيدة
12. تطوير تطبيقات الجوال — تطبيقات iOS وAndroid مخصصة
13. الربط والتكامل — تكامل الأنظمة عبر API وخدمات الويب

أوقات العمل: الأحد–الخميس 08:00–17:00 | السبت 12:00–16:00 | الجمعة إجازة
التواصل: هاتف +966 (12) 6500223 | فاكس +966 (12) 6500171 | بريد connect@azka.com
الموقع: www.azka.com

قواعد يجب الالتزام بها:
- رد بنفس لغة المستخدم: عربي → عربي، إنجليزي → إنجليزي
- كن محترفاً وودوداً وموجزاً
- ركز فقط على منتجات وخدمات ومعلومات أزكى
- للاستفسارات التفصيلية عن الأسعار أو العروض التوضيحية، وجّه المستخدم للتواصل المباشر مع أزكى
- لا تتكهن بالأسعار أو أسماء العملاء غير المعلنة
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
