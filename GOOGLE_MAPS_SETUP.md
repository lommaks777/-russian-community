# 🗺️ Настройка Google Maps API для Vercel

## Проблема
Сайт на Vercel не работает из-за ошибки `RefererNotAllowedMapError` - домен не добавлен в разрешенные для API ключа.

## Решение

### Вариант 1: Настройка существующего ключа

1. **Перейдите в Google Cloud Console**:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - Войдите в аккаунт с API ключом

2. **Найдите API ключ**:
   - APIs & Services → Credentials
   - Найдите ключ: `AIzaSyB7-RgotVuWFR6qMvr_Alf8nQvkYd7I3WI`
   - Нажмите "Edit" (карандаш)

3. **Добавьте домены**:
   - Application restrictions → HTTP referrers
   - Добавьте:
     ```
     https://russian-community.vercel.app/*
     https://russian-community.vercel.app
     http://localhost:8000/*
     http://localhost:8000
     ```

4. **Сохраните** и подождите 5-10 минут

### Вариант 2: Создание нового API ключа

1. **Создайте новый проект** (если нужно):
   - [Google Cloud Console](https://console.cloud.google.com/)
   - "New Project" → введите название

2. **Включите нужные API**:
   - APIs & Services → Library
   - Включите:
     - Maps JavaScript API
     - Places API
     - Geocoding API

3. **Создайте API ключ**:
   - APIs & Services → Credentials
   - "Create Credentials" → "API Key"
   - Скопируйте новый ключ

4. **Настройте ограничения**:
   - Нажмите на созданный ключ
   - Application restrictions → HTTP referrers
   - Добавьте домены:
     ```
     https://russian-community.vercel.app/*
     https://russian-community.vercel.app
     http://localhost:8000/*
     http://localhost:8000
     ```

5. **Обновите код**:
   - Замените `AIzaSyB7-RgotVuWFR6qMvr_Alf8nQvkYd7I3WI` на новый ключ
   - Во всех файлах: `index.html`, `events.html`, `map.js`

### Вариант 3: Временное решение (НЕ рекомендуется для продакшена)

Убрать ограничения домена (небезопасно):
1. В настройках API ключа
2. Application restrictions → "None"
3. Сохранить

## Проверка

После настройки:
1. Подождите 5-10 минут
2. Обновите страницу: https://russian-community.vercel.app/
3. Карта должна загрузиться

## Файлы для обновления

Если создаете новый ключ, обновите в файлах:
- `index.html` (строка 37)
- `events.html` (строка 59)  
- `map.js` (строка 3)
- `add.html` (если есть)

## Безопасность

⚠️ **Важно**: Не удаляйте ограничения домена в продакшене - это может привести к злоупотреблению вашим API ключом.

## Поддержка

Если проблемы остаются:
1. Проверьте, что все нужные API включены
2. Убедитесь, что ключ активен
3. Проверьте квоты и биллинг
4. Подождите до 24 часов для полного распространения изменений

