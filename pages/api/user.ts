import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultMessageRespose } from '../../types/DefaultMessageRespose';

export default function(requisicao: NextApiRequest, resposta: NextApiResponse<DefaultMessageRespose>){

    try{
        if(requisicao.method !== 'POST'){
            return resposta.status(405).json({error: 'Método informado não existe!'});
        }
    
        if(!requisicao.body){
            return resposta.status(400).json({error: 'Favor informar os dados para cadastro'});
        }
        return resposta.status(400).json({error: 'Usuário cadastrado'});
    } catch(e : any){
        console.log('Ocorreu erro ao cadastrar usuário:', e);
        return resposta.status(500).json({error: 'Ocorreu erro ao cadastrar usuário, tente novamente...'});
    }
    
}