import cron from "node-cron";
import User from "../model/users.model.ts";

// Runs every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  const result = await User.deleteMany({
    isEmailVerified: false,
    createdAt: { $lte: fiveMinutesAgo }
  });

  console.log(`Deleted ${result.deletedCount} unverified users`);
});
