import cron from "node-cron";
import Ticket, { TicketStatus } from "../entities/ticket.entity";
import { errorLogger } from "../utils/logger";

// expirationCron executes every minute
export const expirationCron = cron.schedule("*/1 * * * *", async () => {
  try {
    const currentTime = new Date();
    currentTime.setSeconds(0, 0); // set seconds to zero
    const expiredTickets = await Ticket.find({
      where: {
        status: TicketStatus.Pending,
        expiresAt: currentTime
      }
    });

    // update status concurrently
    await Promise.all(expiredTickets.map(async (ticket) => {
      await Ticket.update({ id: ticket.id }, { status: TicketStatus.Expired });
    }));
  } catch (err) {
    errorLogger("error checking expired tickets", {
      reason: (err as Error).message
    });
  }
});
