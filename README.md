# 20TO100K.IQ — V3 Trade Engine

الموقع الرسمي لتحدي التداول **$20 → $100,000**.

## V3
هذه النسخة تضيف بنية تحديث مستقلة للصفقات، بحيث يمكن تحديث بيانات التداول دون إعادة بناء صفحات الموقع.

### تدفق التحديث
1. Screenshot الصفقة → `trade_engine/inbox/`
2. استخراج البيانات الظاهرة فقط ومراجعتها.
3. اعتماد الصفقة.
4. تحديث `data/trades.json`.
5. تحديث `data/challenge.json` إذا تغيّر الرصيد أو الإحصاءات الرسمية.
6. تحديث `data/updates.json` عند وجود خبر/حدث يستحق النشر.
7. إنشاء نصوص Instagram/TikTok/Telegram داخل `trade_engine/social/`.
8. `git diff --check` → commit → push.

### مصدر الحقيقة
- `data/trades.json` = السجل الرسمي للصفقات.
- `data/challenge.json` = الحالة الرسمية الحالية للتحدي.
- التصميم HTML/CSS لا يحتوي على أرقام تداول مصطنعة.
- الموقع العام قراءة فقط.

### Social Hub
الروابط الرسمية مضافة إلى الموقع:
- Instagram: https://www.instagram.com/20to100k.iq/
- TikTok: https://www.tiktok.com/@20to100k.iq
- Telegram: https://t.me/+hdQDOiYvJPU4N2Ri
- Email: 20to100k.iq@gmail.com

### ما هو أوتوماتيكي الآن؟
الموقع نفسه data-driven: عندما تتغير ملفات `data/` وتصل إلى المستودع، تقرأ الصفحات البيانات الجديدة دون تعديل HTML لكل صفقة.

### ما ليس أوتوماتيكيًا بعد؟
النشر المباشر إلى Instagram/TikTok/Telegram غير مفعّل في هذه النسخة. يحتاج ذلك إلى Backend + APIs/صلاحيات رسمية + Secrets محفوظة خارج Git. القوالب موجودة لتسريع العمل الآن.

## الأمان
لا تضع Telegram Bot Token أو Instagram credentials أو API keys أو كلمات مرور أو بيانات دخول الوسيط داخل المستودع.

## Trading Lab
`pages/tools.html` مختبر عام قراءة فقط، مع حاسبة مخاطر محلية. لا يمكن للزوار تعديل السجل الرسمي من المتصفح.
