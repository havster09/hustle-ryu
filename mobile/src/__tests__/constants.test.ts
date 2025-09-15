import { COLORS } from '../constants/colors';

// Simple tests for color constants
test('COLORS object should have all required color values', () => {
  expect(COLORS.white).toBe('#FFFFFF');
  expect(COLORS.cleanWhite).toBe('#FEFEFE');
  expect(COLORS.redDeep).toBe('#DC2626');
  expect(COLORS.redMedium).toBe('#EF4444');
  expect(COLORS.redLight).toBe('#F87171');
  expect(COLORS.redVeryLight).toBe('#FCA5A5');
  expect(COLORS.grayDark).toBe('#374151');
  expect(COLORS.grayMedium).toBe('#9CA3AF');
  expect(COLORS.grayLight).toBe('#E5E7EB');
  expect(COLORS.blue).toBe('#3B82F6');
});

test('All colors should be valid hex values', () => {
  const hexPattern = /^#[0-9A-F]{6}$/i;
  
  Object.values(COLORS).forEach(color => {
    expect(color).toMatch(hexPattern);
  });
});

test('Color object should contain exactly 10 colors', () => {
  const colorCount = Object.keys(COLORS).length;
  expect(colorCount).toBe(10);
}); 