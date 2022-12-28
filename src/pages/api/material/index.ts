// import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handleMaterial(req, res) {
  const { nome, condicoes, quantidade, local } = req.body;

//   const session = await getSession({ req });
  const result = await prisma.material.create({
    data: {
      nome,
      condicoes,
      quantidade,
      local
    },
  });
  res.json(result);
}