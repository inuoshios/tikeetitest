import cron from "node-cron";
import Ticket, { TicketStatus } from "../entities/ticket.entity";

// expirationCron executes every second
export const expirationCron = cron.schedule("*/1 * * * *", async () => {
  try {
    const currentTime = new Date();
    currentTime.setSeconds(0, 0);
    const expiredTickets = await Ticket.find({
      where: {
        status: TicketStatus.Pending,
        expiresAt: currentTime
      }
    });

    await Promise.all(expiredTickets.map(async (ticket) => {
      await Ticket.update({ id: ticket.id }, { status: TicketStatus.Expired });
    }));
  } catch (err) {
    console.error("error checking expired tickets", {
      reason: (err as Error).message
    });
  }
});
