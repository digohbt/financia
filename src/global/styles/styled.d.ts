// Mudar types do typescrype do styled conponets 

import "styled-components"; // export direto 
import theme  from "./theme"; // buscar os tipos para colocar na tipagem 


declare module 'styled-components' {
    type ThemeType = typeof theme  // cria um type usando objeto criado global 
    export interface DefaultTheme extends ThemeType{} // extend types para theme defalt 
}