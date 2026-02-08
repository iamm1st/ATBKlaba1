const GoogleMapsService = require('./GoogleMapsService');

test('GoogleMapsService.getTrafficScore возвращает значение (заглушка)', async () => {
  const score = await GoogleMapsService.getTrafficScore('route1');
  expect(score).toBeDefined();
});