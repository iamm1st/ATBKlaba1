function calculateDeliveryTime(distance, speed, terrain) {
  // Проверка расстояния
  if (distance <= 0) {
    throw new Error('Расстояние должно быть положительным');
  }

  // Проверка скорости
  if (speed <= 0 || speed > 150) {
    throw new Error('Скорость должна быть в диапазоне от 1 до 150 км/ч');
  }

  // Проверка типа местности
  if (terrain !== 'город' && terrain !== 'трасса') {
    throw new Error('Тип местности должен быть "город" или "трасса"');
  }

  // Ограничение скорости в городе
  if (terrain === 'город' && speed > 60) {
    throw new Error('В городе скорость не может превышать 60 км/ч');
  }

  // Расчет базового времени
  let time = distance / speed;

  // Увеличение времени в городе
  if (terrain === 'город') {
    time *= 1.2;
  }

  return time;
}

module.exports = calculateDeliveryTime;