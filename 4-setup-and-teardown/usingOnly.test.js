let globalVariable = "A"
//Usando only o unico cenario que será executado será o cenário com o .only
test('first test', () => {
    expect(globalVariable).toBe("A")
    globalVariable = "B"
  });
  
test.only('second test', () => {
    expect(globalVariable).toBe("A")
});