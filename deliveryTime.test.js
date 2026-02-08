jest.mock('./GoogleMapsService');

const calculateDeliveryTime = require('./deliveryTime');
const GoogleMapsService = require('./GoogleMapsService');

// Тест 1 — Балл пробок = 10
describe('calculateDeliveryTime с Traffic API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Должен увеличить время в 2 раза при trafficScore = 10', async () => {

    // ARRANGE
    GoogleMapsService.getTrafficScore.mockResolvedValue(10);

    // ACT
    const result = await calculateDeliveryTime(100, 50, 'город', 'route1');

    // расс/скор = 2
    // *1.2 = 2.4
    // *2 = 4.8

    // ASSERT
    expect(result).toBeCloseTo(4.8);
    expect(GoogleMapsService.getTrafficScore).toHaveBeenCalledWith('route1');
  });

  // Тест 2 — API недоступен
  test('Должен использовать дефолтный коэффициент при падении API', async () => {

    // ARRANGE
    GoogleMapsService.getTrafficScore.mockRejectedValue(new Error('API error'));

    // ACT
    const result = await calculateDeliveryTime(100, 50, 'город', 'route1');

    // 2 *1.2 = 2.4
    // *1.5 = 3.6

    // ASSERT
    expect(result).toBeCloseTo(3.6);
  });

  // Тест 3 — Трасса (API не вызывается)
  test('Не должен вызывать Traffic API для трассы', async () => {

    const result = await calculateDeliveryTime(100, 50, 'трасса', 'route1');

    expect(result).toBe(2);
    expect(GoogleMapsService.getTrafficScore).not.toHaveBeenCalled();
  });

  // тесты на ошибки
test('Должен выбросить ошибку при отрицательном расстоянии', async () => {
  await expect(calculateDeliveryTime(-10, 50, 'трасса', 'r1'))
    .rejects.toThrow();
});

test('Должен выбросить ошибку при скорости 0', async () => {
  await expect(calculateDeliveryTime(10, 0, 'трасса', 'r1'))
    .rejects.toThrow();
});

test('Должен выбросить ошибку при неверном типе местности', async () => {
  await expect(calculateDeliveryTime(10, 50, 'лес', 'r1'))
    .rejects.toThrow();
});

// тест trafficScore =/ 10
test('Не должен удваивать время, если trafficScore не равен 10', async () => {
  GoogleMapsService.getTrafficScore.mockResolvedValue(5);

  const result = await calculateDeliveryTime(100, 50, 'город', 'route1');
  // 100/50=2, *1.2=2.4, trafficScore=5 => не удваив.
  expect(result).toBeCloseTo(2.4);
});
});