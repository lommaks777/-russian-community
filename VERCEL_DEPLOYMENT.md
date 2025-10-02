# 🚀 Деплой на Vercel - Инструкция

## 📋 Подготовка к деплою

### 1. **Файлы конфигурации созданы:**
- ✅ `vercel.json` - конфигурация Vercel
- ✅ `.vercelignore` - файлы для игнорирования
- ✅ Обновлен `package.json` с командой `build`

### 2. **Команда сборки:**
```bash
npm run build
```
Эта команда выполняет:
- `npm run build-events` - сборка событий
- `npm run translate-events` - перевод событий на русский
- `npm run demo-enriched` - создание обогащенных данных

## 🔧 Конфигурация Vercel

### `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "routes": [
    {
      "src": "/data/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=3600"
      }
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|svg|ico))",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ],
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### `.vercelignore`:
```
node_modules/
.git/
.vercel/
*.log
.env
test/
scripts/
*.md
!README.md
```

## 🚀 Процесс деплоя

### Вариант 1: Через Vercel CLI
```bash
# Установка Vercel CLI
npm i -g vercel

# Логин в Vercel
vercel login

# Деплой
vercel

# Продакшн деплой
vercel --prod
```

### Вариант 2: Через GitHub
1. Подключите репозиторий к Vercel
2. Vercel автоматически будет деплоить при каждом push в main
3. Настройки будут взяты из `vercel.json`

### Вариант 3: Через веб-интерфейс
1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте репозиторий
4. Vercel автоматически определит настройки из `vercel.json`

## ⚙️ Настройки окружения

### Переменные окружения в Vercel:
1. Зайдите в настройки проекта в Vercel
2. Перейдите в "Environment Variables"
3. Добавьте:
   - `GOOGLE_MAPS_API_KEY` - ваш API ключ Google Maps
   - `NODE_ENV=production`

## 🔍 Проверка деплоя

### После деплоя проверьте:
1. ✅ **Главная страница загружается**: `https://your-project.vercel.app/`
2. ✅ **Карта отображается**: Google Maps загружается корректно
3. ✅ **События на русском**: панель событий показывает переведенные события
4. ✅ **Адреса кликабельные**: ссылки на Google Maps работают
5. ✅ **Фильтры работают**: можно фильтровать места по категориям

### Возможные проблемы:
- **Ошибка Google Maps API**: проверьте API ключ и домены в Google Cloud Console
- **События не загружаются**: проверьте, что `data/events.js` создался
- **Стили не применяются**: проверьте кэш браузера

## 📊 Мониторинг

### Vercel Dashboard:
- **Analytics**: статистика посещений
- **Functions**: логи серверных функций
- **Deployments**: история деплоев

### Логи:
```bash
# Просмотр логов
vercel logs

# Логи конкретного деплоя
vercel logs [deployment-url]
```

## 🔄 Автоматические обновления

### GitHub Actions (опционально):
Создайте `.github/workflows/update-events.yml`:
```yaml
name: Update Events
on:
  schedule:
    - cron: '0 9 * * 1'  # Каждый понедельник в 9:00
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎉 Готово!

После настройки ваш проект будет автоматически деплоиться на Vercel при каждом изменении в репозитории. Все файлы конфигурации готовы! 🚀
