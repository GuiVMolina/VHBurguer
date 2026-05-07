import secureLocalStorage from "react-secure-storage";

export function verificarAutenticacao() {
  const token = secureLocalStorage.getItem("Token");

  return !!token;

  // Token passa a ser booleano
  // Se existir informação = True
  // Caso não exista = False
}
