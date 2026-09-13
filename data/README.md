# تحديث بيانات التحدي

هذه المجلد هو نقطة التحكم اليومية بالموقع.

## challenge.json
حدّث الرصيد والإحصاءات **فقط** عندما تكون لديك بيانات حقيقية موثقة.

## trades.json
أضف كل صفقة بصيغة مثل:

```json
{
  "date": "2026-09-15",
  "symbol": "XAUUSD.m",
  "direction": "BUY",
  "entry": 3650.25,
  "exit": 3665.10,
  "pnl": 14.85,
  "result": "win",
  "note": "سبب الدخول ومراجعة ما بعد الصفقة"
}
```

النتائج المسموحة في الواجهة: `win`, `loss`, `breakeven`.

## milestones.json
اترك المراحل المستقبلية `locked` حتى تتحقق فعليًا.

## updates.json
أضف الأخبار/التحديثات المهمة للرحلة.

بعد التعديل:

```bash
git add data/
git commit -m "Update challenge data"
git push
```

## V3 Trade Engine
الملف `trade_engine/TRADE_UPDATE.txt` هو نقطة الإدخال المنفصلة لتحديث الصفقات. المصدر الرسمي يبقى `data/trades.json` بعد الاعتماد.
