export function decodificarToken(): any {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const infoToken = token.split('.')[1];
    const tokenDecodificado = atob(infoToken);
    return JSON.parse(tokenDecodificado);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
