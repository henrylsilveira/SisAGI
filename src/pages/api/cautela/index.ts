// import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handleCautela(req, res) {
  
  if(req.method ==='GET'){
    const result = await prisma.cautela.findMany({
      include: {
        cautelou: true,
        material: true
      }
    })

    return res.json(result)
  } else {
    const { materialId, observacao, local, cautelouId, validado } = req.body;

  //   const session = await getSession({ req });
    const result = await prisma.cautela.create({
      data: {
        materialId,
        observacao,
        local,
        resp_cautela: 'FULANO', // SERÁ USADO O USUARIO LOGADO
        cautelouId,
        validado
      },
    });
    res.json(result);
  }
}