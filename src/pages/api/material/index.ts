// import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import { MaterialDataProps } from '../../material/cadastro';

export default async function handleMaterial(req, res) {
  if (req.method === 'GET') {
    const result = await prisma.material.findMany({
      include: {
        cautelas: true
      }
    })

    return res.json(result)
  } else {
    const { nome, condicoes, quantidade, codigo, subUnidade,
      dependencia,
      categoria } = req.body;

    try {
       const result = await prisma.material.create({
      data: {
        nome: nome.toUpperCase(),
        condicoes,
        quantidade,
        local: subUnidade + ' ' + dependencia,
        codigo,
        sub_unidade: subUnidade,
        dependencia,
        categoria
      },
    });
    return res.status(201).send(result);
    } catch(error) {
      return res.error(error)
    }   
  }
}