import { Request, Response} from "express";
import { orm } from "../shared/db/orm.js";
import { Tipo_Hechizo } from "./tipo_hechizo.entity.js";

const em = orm.em;

async function findAll(req: Request, res: Response) {
    try {
        const tipos_hechizo = await em.find(Tipo_Hechizo, {});
        res.status(200).json({ message: 'find all tipos de hechizo', data: tipos_hechizo });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const tipo_hechizo= await em.findOneOrFail(Tipo_Hechizo, {id})
        await em.persistAndFlush(tipo_hechizo); 
        res.status(200).json({message: 'found tipo de hechizo', data:tipo_hechizo})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res:Response){ 
    try{
        const tipo_hechizo = em.create(Tipo_Hechizo, req.body)
        await em.flush()
        res.status(201).json({message:'Tipo de hechizo created', data:tipo_hechizo})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response){
    try{
        const id= Number.parseInt(req.params.id)
        const tipo_hechizo = em.getReference(Tipo_Hechizo, id)
        em.assign(tipo_hechizo, req.body)
        await em.flush()
        res.status(200).json({ message: 'Tipo de Hechizo updated'})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const tipo_hechizo = em.getReference(Tipo_Hechizo, id)
        await em.removeAndFlush(tipo_hechizo)
        res.status(200).send({ message: 'Tipo Hechizo removed'})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

export {findAll, findOne, add, update, remove}