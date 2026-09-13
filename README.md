# 20TO100K.IQ

الموقع الرسمي لتحدي التداول: **$20 → $100,000**.

## البنية
- `index.html` — الصفحة الرئيسية
- `pages/` — صفحات التحدي والتقدم والرحلة والفريق والتحديثات والأسئلة والشفافية
- `assets/` — الصور والفيديو
- `css/style.css` — الهوية البصرية
- `js/app.js` — قراءة البيانات وتشغيل لوحة الموقع
- `data/` — **مصدر الأرقام القابل للتحديث يوميًا**

## التحديث اليومي
1. عدّل `data/challenge.json` عند وجود رصيد/إحصاءات حقيقية موثقة.
2. أضف الصفقات إلى `data/trades.json`.
3. أضف المراحل إلى `data/milestones.json` عند تحققها.
4. أضف أخبار الرحلة إلى `data/updates.json`.
5. نفّذ `git add . && git commit -m "Update challenge data" && git push`.

بعد الربط مع Cloudflare Pages أو GitHub Pages، يتم نشر التغييرات تلقائيًا عند كل push. لا تحتاج إلى إعادة رفع الموقع كاملًا.

## النشر
### Cloudflare Pages
اربط المستودع عبر Git integration واختر مشروعًا static. مجلد الجذر هو المستودع نفسه، ولا توجد عملية build مطلوبة.

### GitHub Pages
فعّل Pages من إعدادات المستودع واختر GitHub Actions أو branch deployment حسب إعدادك. ملف `CNAME` معدّ للهوية `20to100k.iq`.

## أمان
هذا المستودع مخصص لموقع static عام. **لا تضع API keys أو Telegram tokens أو كلمات مرور أو أسرارًا داخل الملفات.** إذا احتجنا لاحقًا إلى خدمة backend، تُحفظ الأسرار في environment variables / platform secrets، وليس في Git.

## ملاحظة
أرقام `data/` الحالية هي حالة تشغيلية أولية ولا تمثل نتائج تداول فعلية. لا تغيّرها إلا بناءً على بيانات حقيقية موثقة.


## Trading Lab v1
أضيفت صفحة `pages/tools.html` كمختبر تداول شخصي يعمل محليًا في المتصفح، وتشمل حاسبة مخاطر، دفتر صفقات، Win Rate، Profit Factor، Max Drawdown، Peak Equity ومنحنى Equity. بيانات المختبر محلية ولا تُرسل تلقائيًا إلى GitHub.


## Security update — Trading Lab V2
- Public Trading Lab is read-only.
- Visitor browsers cannot add, edit, or delete official challenge records.
- Risk Calculator remains local and does not write challenge data.
- Official results must come from the repository-controlled challenge data until a server-side authenticated admin/API is deployed.
- Do not treat browser Local Storage as an official source of truth.
