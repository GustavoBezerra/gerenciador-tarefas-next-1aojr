import type {NextApiRequest, NextApiResponse} from 'next';

export default function(requisicao: NextApiRequest, resposta: NextApiResponse){

    if(requisicao.method !== 'POST'){
        return resposta.status(405).json({error: 'Método informado não existe!'});
    }

    if(!requisicao.body){
        return resposta.status(400).json({error: 'Favor informar os dados para autenticação'});
    }

    const {login, password} = requisicao.body;

    if(login === 'teste@teste.com'
        && password === 'teste@123'){
            return resposta.status(200).json({msg: 'Usuário autenticado!'});
        }
    return resposta.status(400).json({error: 'Usuário e senha não conferem'});
}