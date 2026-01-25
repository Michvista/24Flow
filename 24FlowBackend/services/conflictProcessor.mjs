import prisma from '../db.mjs';
import { generateAIProposal } from './aiScheduler';

export async function processUserConflicts(userId) {
  const events = await prisma.event.findMany({
    where: { userId },
    orderBy: { startTime: 'asc' }
  });

  const clusters = getOverlapClusters(events);

  for (const cluster of clusters) {
    const conflict = await prisma.conflict.create({
      data: {
        userId,
        summary: `${cluster.length} Tasks Collision`,
        analysis: 'AI is analyzing this conflict…'
      }
    });

    // Save involved events
    for (let i = 0; i < cluster.length; i++) {
      await prisma.conflictEvent.create({
        data: {
          conflictId: conflict.id,
          eventId: cluster[i].id,
          type: i === 0 ? 'static' : 'conflict'
        }
      });
    }

    // AI proposal
    const proposals = await generateAIProposal(cluster, events);

    for (const p of proposals) {
      await prisma.proposal.create({
        data: {
          conflictId: conflict.id,
          eventId: p.id,
          startTime: new Date(p.startTime),
          endTime: new Date(p.endTime),
          reasoning: p.reasoning
        }
      });
    }

    await prisma.conflict.update({
      where: { id: conflict.id },
      data: { analysis: 'AI scheduling completed' }
    });
  }
}
