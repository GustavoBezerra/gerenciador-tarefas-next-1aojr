import type {NextApiRequest, NextApiResponse} from 'next';
import { connectToDB } from '../../../middlewares/connectToDB';
import { jwtValidator } from '../../../middlewares/jwtValidator';
import { DefaultMessageRespose } from '../../../types/DefaultMessageRespose';
import { findTaskById, deleteTask } from '../../../services/taskServices';
import { Task } from '../../../types/Task';


const endpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {

    try{
        if(req.method === 'GET'){
            return getById(req, res);
        } else if(req.method === 'DELETE'){
            return removeTask(req, res);
        }
        
    } catch(e : any){
        console.log('Ocorreu erro ao excluir tarefa do usuário:', e);
        return res.status(500).json({error: 'Ocorreu erro ao excluir tarefa do usuário, tente novamente...'});
    }
}

const getById = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose | any>) => {
    const task = await findTaskById(req.query.taskId) as Task;

    if(task && task !== null){
        if(task.userId !== req.query.userId){
            return res.status(401).json({error: 'Você não tem permissão para acessar essa tarefa.'});
        }
        return res.status(200).json({task}); 
    }

    return res.status(200).json({});
}

const removeTask = async(req: NextApiRequest, res: NextApiResponse<DefaultMessageRespose>) => {
    console.log(req.query.taskId);
    const retorno = await deleteTask(req.query.taskId);

    if(retorno.deletedCount !== 0){
        return res.status(200).json({msg: "Exclusão efetuada com sucesso."});
    }
    return res.status(400).json({error: "Não foi encontrada nenhuma tarefa com o ID informado."});
}

export default connectToDB(jwtValidator(endpoint));