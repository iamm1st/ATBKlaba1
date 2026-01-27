const calculateDeliveryTime = require('./deliveryTime');

describe('Функция calculateDeliveryTime', () => {

  // ===== ПОЗИТИВНЫЕ СЦЕНАРИИ =====
  describe('Позитивные сценарии', () => {

    test('Корректный расчет времени на трассе', () => {
      const result = calculateDeliveryTime(100, 50, 'трасса');
      expect(result).toBe(2);
    });

    test('Корректный расчет времени в городе с коэффициентом', () => {
      const result = calculateDeliveryTime(60, 30, 'город');
      expect(result).toBeCloseTo(2.4, 5);
    });

  });

  // ===== НЕГАТИВНЫЕ СЦЕНАРИИ =====
  describe('Негативные сценарии', () => {

    test('Ошибка при отрицательном расстоянии', () => {
      expect(() => calculateDeliveryTime(-10, 50, 'трасса'))
        .toThrow('Расстояние должно быть положительным');
    });

    test('Ошибка при нулевой скорости', () => {
      expect(() => calculateDeliveryTime(100, 0, 'трасса'))
        .toThrow();
    });

    test('Ошибка при превышении скорости', () => {
      expect(() => calculateDeliveryTime(100, 200, 'трасса'))
        .toThrow();
    });

    test('Ошибка при превышении скорости в городе', () => {
      expect(() => calculateDeliveryTime(50, 80, 'город'))
        .toThrow('В городе скорость не может превышать 60 км/ч');
    });

    test('Ошибка при неверном типе местности', () => {
      expect(() => calculateDeliveryTime(50, 40, 'лес'))
        .toThrow();
    });

  });

});