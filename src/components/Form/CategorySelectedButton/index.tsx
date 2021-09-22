import React from "react";

import { Container , Category , Icon } from "./styles";

interface Prosp {
    title:string;
    onPress: () => void
}

export function CategorySelectedButton( {title, onPress} : Prosp ){
    return(
        <Container onPress={onPress} >
            <Category>
                {title}
            </Category>
            <Icon name="chevron-down" />
        </Container>
    );
}