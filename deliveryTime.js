const GoogleMapsService = require('./GoogleMapsService');

async function calculateDeliveryTime(distance, speed, type, routeId) {
  
  if (distance <= 0) throw new Error('Некорректное расстояние');
  if (speed <= 0 || speed > 150) throw new Error('Некорректная скорость');
  if (type !== 'город' && type !== 'трасса') throw new Error('Неверный тип местности');

  let time = distance / speed;

  if (type === 'город') {
    time *= 1.2;

    try {
      const trafficScore = await GoogleMapsService.getTrafficScore(routeId);

      if (trafficScore === 10) {
        time *= 2;
      }

    } catch (error) {
      // если API недост. - берет дефолт
      time *= 1.5;
    }
  }

  return time;
}

module.exports = calculateDeliveryTime;