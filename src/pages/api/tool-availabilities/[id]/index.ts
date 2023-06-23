import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { toolAvailabilityValidationSchema } from 'validationSchema/tool-availabilities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.tool_availability
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getToolAvailabilityById();
    case 'PUT':
      return updateToolAvailabilityById();
    case 'DELETE':
      return deleteToolAvailabilityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getToolAvailabilityById() {
    const data = await prisma.tool_availability.findFirst(convertQueryToPrismaUtil(req.query, 'tool_availability'));
    return res.status(200).json(data);
  }

  async function updateToolAvailabilityById() {
    await toolAvailabilityValidationSchema.validate(req.body);
    const data = await prisma.tool_availability.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteToolAvailabilityById() {
    const data = await prisma.tool_availability.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
