import type { NextPage } from "next";

type HeaderProps = {
    sair(): void
}
export const Header : NextPage<HeaderProps> = ({sair}) => {

    const name = localStorage.getItem("name");
    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <button><span>+</span>Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá, </span>
                <img src="/exit-mobile.svg" alt="Sair" onClick={sair}/>
            </div>
            <div className="desktop">
                <span>Olá, {name}</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
            </div>
        </div>
    );
}