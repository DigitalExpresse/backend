import {
  Notification,
  NotificationType,
} from "@root/domain/shared/Notification";
import { handleErrors } from "@root/utils/service/handleErrors";
import express from "express";

export class NotificationRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router.post("/send-notification", async (req, res) => {
      try {
        const notification = new Notification(NotificationType.NEW_RESERVATION);

        // await notification.sendNotificationAdmin({
        //   reservation_id: 3,
        // });

        await notification.sendNotificationAdmin(

          {
            reservation_id: 3,
          }
        );

        return res.status(200).json({ message: "ok" });
      } catch (e) {
        const { status, error } = handleErrors(e);
        return res.status(status).json(error);
      }
    });
  }
}
