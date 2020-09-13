import { createDay, createPlaceholder, isToday, zeroPad } from './util';

describe('Utils', () => {
  describe('createDay', () => {
    test('should create an element for the given day', () => {
      const day = createDay(2, 5, 1981, 1, 1);

      expect(day.tagName.toLowerCase()).toBe('div');
      expect(day.classList).toContain('day');
      expect(day.classList).not.toContain('today');
      expect(day.textContent).toBe('2');
      expect(day.dataset.date).toBe('1981-06-02');
    });

    test('should create an element for today', () => {
      const today = new Date();
      const day = createDay(
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
        1,
        1
      );

      expect(day.classList).toContain('today');
    });
  });

  describe('createPlaceholder', () => {
    test('should create a placeholder element', () => {
      const placeholder = createPlaceholder(1, 1);
      expect(placeholder.tagName.toLowerCase()).toEqual('div');
      expect(placeholder.classList).toContain('placeholder');
    });
  });

  describe('isToday', () => {
    test('should detect when it is today', () => {
      const today = new Date();
      expect(
        isToday(today.getDate(), today.getMonth(), today.getFullYear())
      ).toBe(true);
    });

    test('should detect when it is not today', () => {
      expect(isToday(2, 5, 1981)).toBe(false);
    });
  });

  describe('zeroPad', () => {
    test('should add zeros if the string is too short', () => {
      expect(zeroPad('05', 5)).toEqual('00005');
    });

    test('should not add zeros if the string is longer than the minimum', () => {
      expect(zeroPad('005', 2)).toEqual('005');
    });
  });
});
