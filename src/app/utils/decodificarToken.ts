export function decodificarToken(): any {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const infoToken = token.split('.')[1];
    const tokenDecodificado = JSON.parse(atob(infoToken))
    const expirationTime = tokenDecodificado.exp * 1000;
    if (Date.now() > expirationTime) {
      return null;
    }

    return tokenDecodificado;
  } catch (error) {
    return null;
  }
}
