// Создание демонстрационных обогащенных данных о местах
// Для тестирования улучшенного отображения
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PLACES_FILE = path.join(ROOT, 'data', 'places.js');
const ENRICHED_PLACES_FILE = path.join(ROOT, 'data', 'places_enriched.js');

// Функция для генерации звездного рейтинга
function generateStars(rating) {
  if (!rating) return '';
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}

// Функция для создания демонстрационных отзывов (только если есть реальные данные)
function createDemoReviews() {
  // Возвращаем пустой массив, чтобы не показывать одинаковые отзывы
  // В реальном приложении здесь должны быть данные из Google Places API
  return [];
}

// Функция для создания демонстрационных описаний
function createDemoDescription(name, category) {
  const descriptions = {
    "Рестораны": [
      "Уютный ресторан с традиционной кухней и современным подходом к приготовлению блюд.",
      "Семейный ресторан, специализирующийся на домашней кухне и свежих продуктах.",
      "Элегантный ресторан с изысканным меню и профессиональным обслуживанием."
    ],
    "Бары": [
      "Современный бар с широким выбором коктейлей и живой музыкой.",
      "Уютный бар в стиле ретро с уникальной атмосферой и отличными напитками.",
      "Трендовый бар с креативными коктейлями и дружелюбной атмосферой."
    ],
    "Кофе": [
      "Специализированная кофейня с зернами собственной обжарки и домашней выпечкой.",
      "Современная кофейня с уютной атмосферой и профессиональными бариста.",
      "Кофейня в стиле минимализм с качественным кофе и легкими закусками."
    ],
    "Магазин": [
      "Специализированный магазин с широким ассортиментом качественных товаров.",
      "Семейный магазин с многолетней историей и внимательным обслуживанием.",
      "Современный магазин с актуальными товарами и удобным расположением."
    ],
    "Спорт": [
      "Современный спортивный комплекс с профессиональным оборудованием и тренерами.",
      "Фитнес-центр с разнообразными программами и индивидуальным подходом.",
      "Спортивный клуб с дружелюбной атмосферой и опытными инструкторами."
    ],
    "Красота": [
      "Салон красоты с профессиональными мастерами и современными технологиями.",
      "Спа-центр с расслабляющими процедурами и уютной атмосферой.",
      "Студия красоты с индивидуальным подходом и качественными услугами."
    ]
  };
  
  const categoryDescriptions = descriptions[category] || ["Качественное заведение с хорошим обслуживанием."];
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
}

// Функция для создания демонстрационных часов работы
function createDemoOpeningHours() {
  const schedules = [
    ["Понедельник: 9:00 - 22:00", "Вторник: 9:00 - 22:00", "Среда: 9:00 - 22:00", "Четверг: 9:00 - 22:00", "Пятница: 9:00 - 23:00", "Суббота: 10:00 - 23:00", "Воскресенье: 10:00 - 21:00"],
    ["Понедельник: 8:00 - 20:00", "Вторник: 8:00 - 20:00", "Среда: 8:00 - 20:00", "Четверг: 8:00 - 20:00", "Пятница: 8:00 - 21:00", "Суббота: 9:00 - 21:00", "Воскресенье: 9:00 - 19:00"],
    ["Понедельник: 10:00 - 24:00", "Вторник: 10:00 - 24:00", "Среда: 10:00 - 24:00", "Четверг: 10:00 - 24:00", "Пятница: 10:00 - 02:00", "Суббота: 10:00 - 02:00", "Воскресенье: 10:00 - 24:00"]
  ];
  
  return schedules[Math.floor(Math.random() * schedules.length)];
}

// Функция для обогащения места демонстрационными данными
function enrichPlaceWithDemoData(place) {
  const rating = Math.random() * 2 + 3; // Рейтинг от 3.0 до 5.0
  const userRatingsTotal = Math.floor(Math.random() * 200) + 10; // От 10 до 210 отзывов
  const priceLevel = Math.floor(Math.random() * 4); // От 0 до 3
  
  return {
    ...place,
    // Рейтинг и отзывы
    rating: parseFloat(rating.toFixed(1)),
    user_ratings_total: userRatingsTotal,
    stars: generateStars(rating),
    
    // Описание
    description: createDemoDescription(place.name, place.category),
    short_description: createDemoDescription(place.name, place.category).substring(0, 100) + "...",
    
    // Тип места
    place_type: place.category,
    types: [place.category.toLowerCase()],
    
    // Ценовой уровень
    price_level: priceLevel,
    price_text: ['Бесплатно', 'Недорого', 'Умеренно', 'Дорого', 'Очень дорого'][priceLevel],
    
    // Часы работы
    opening_hours: createDemoOpeningHours(),
    is_open_now: Math.random() > 0.5,
    
    // Отзывы
    reviews: createDemoReviews(),
    
    // Дополнительные фото (используем существующие)
    photos: place.photo_url ? [{
      reference: "demo_photo",
      url: place.photo_url
    }] : [],
    
    // Метаданные
    last_updated: new Date().toISOString(),
    enriched: true,
    demo_data: true
  };
}

// Основная функция
async function main() {
  console.log('🚀 Создание демонстрационных обогащенных данных...');
  
  // Загружаем существующие данные
  if (!fs.existsSync(PLACES_FILE)) {
    console.log('❌ Файл places.js не найден');
    return;
  }
  
  const placesContent = fs.readFileSync(PLACES_FILE, 'utf8');
  const placesMatch = placesContent.match(/window\.PLACES\s*=\s*(\[.*?\]);/s);
  
  if (!placesMatch) {
    console.log('❌ Не удалось извлечь данные из places.js');
    return;
  }
  
  const places = JSON.parse(placesMatch[1]);
  console.log(`📊 Найдено мест: ${places.length}`);
  
  // Обогащаем каждое место демонстрационными данными
  const enrichedPlaces = places.map((place, index) => {
    console.log(`📍 [${index + 1}/${places.length}] Обогащение: ${place.name}`);
    return enrichPlaceWithDemoData(place);
  });
  
  // Сохраняем обогащенные данные
  const enrichedContent = `window.PLACES = ${JSON.stringify(enrichedPlaces, null, 2)};`;
  fs.writeFileSync(ENRICHED_PLACES_FILE, enrichedContent);
  
  console.log(`\n✅ Создание демонстрационных данных завершено!`);
  console.log(`📁 Сохранено в: ${ENRICHED_PLACES_FILE}`);
  
  // Статистика
  const withRating = enrichedPlaces.filter(p => p.rating).length;
  const withDescription = enrichedPlaces.filter(p => p.description).length;
  const withReviews = enrichedPlaces.filter(p => p.reviews && p.reviews.length > 0).length;
  const withOpeningHours = enrichedPlaces.filter(p => p.opening_hours && p.opening_hours.length > 0).length;
  
  console.log(`\n📊 Статистика демонстрационных данных:`);
  console.log(`  С рейтингом: ${withRating}/${enrichedPlaces.length}`);
  console.log(`  С описанием: ${withDescription}/${enrichedPlaces.length}`);
  console.log(`  С отзывами: ${withReviews}/${enrichedPlaces.length}`);
  console.log(`  С часами работы: ${withOpeningHours}/${enrichedPlaces.length}`);
  
  console.log(`\n🎉 Готово! Теперь можно использовать демонстрационные обогащенные данные.`);
}

// Запуск
main().catch(error => {
  console.error('❌ Ошибка:', error);
  process.exit(1);
});
