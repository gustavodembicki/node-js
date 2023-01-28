/**
 * Representação de um espaço na memória do computador usado para transição rápida de informações
 * 
 * Os dados armazenados no buffer, são armazenados para serem tratados na sequência, sendo enviados
 * para aonde é necessário e são removidos posteriormente.
 * 
 * São formas de salvarmos informações na memória de forma extremamente performática na aplicação, pois
 * é mais performático ler/guardar informação de forma binaria/decimal/hexadecimal (modelo de gravação do buffer) do que uma 
 * string, pois o buffer permite que gravemos informações em baixo nível e a sua interpretação
 * de forma mais performática e clara no javaScript.
 */