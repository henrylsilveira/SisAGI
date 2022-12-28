// import { getSession } from 'next-auth/react';
import { NextApiResponse, NextApiRequest } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handleMilitar(req: NextApiRequest, res: NextApiResponse) {
  const { identidade, nomeCompleto, nomeGuerra, senha, funcao_local, postoGrad } = req.body;
  //   const session = await getSession({ req });
  try {
    const result = await prisma.militar.create({
      data: {
        nome_completo: nomeCompleto,
        nome_guerra: postoGrad + ' ' + nomeGuerra,
        identidade: String(identidade),
        senha: String(await bcrypt.hash(senha, 10)),
        permissao: 'comum',
        funcao_local: 'comum'
      },
    });
    return res.status(201).send(result);
  } catch (error) {
    console.error(error)
  }

}