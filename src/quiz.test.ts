
describe('quiz', () => {
  test('substr', async () => {
    const statement = '日本で一番高い山は？';

    const first = statement.substring(0, 0);
    const second = statement.substring(0, 1);
    const last = statement.substring(0, statement.length);
    expect(first).toBe('');
    expect(second).toBe('日');
    expect(last).toBe(statement);
  });
});
