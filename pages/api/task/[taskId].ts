import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../../middlewares/connectToDB';
import { jwtValidator } from '../../../middlewares/jwtValidator';
import { DefaultMessageRespose } from '../../../types/DefaultMessageRespose';
import { findTaskById } from '../../../services/taskServices';


const endpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {

    try{
        if(req.method === 'GET'){
            return getById(req, res);
        } else if(req.method === 'DELETE'){
            return deleteTask(req, res);
        }
        
    } catch(e : any){
        console.log('Ocorreu erro ao excluir tarefa do usuário:', e);
        return res.status(500).json({error: 'Ocorreu erro ao excluir tarefa do usuário, tente novamente...'});
    }
}

const getById = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {
    const task = await findTaskById(req.query.taskId);
    return res.status(200).json({task});
}

const deleteTask = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose>) => {
    console.log(req.query.taskId);
    return res.status(200).json({msg: "Ok"});
}

export default connectToDB(jwtValidator(endpoint));