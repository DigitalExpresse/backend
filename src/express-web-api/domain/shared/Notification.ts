import { AdminRepository } from "../admin/AdminRepository";
import { notificationRepository } from "../notification/notificationRepository";

/* ################### Notification ADMIN #######################
const notification = new Notification(NotificationType.NEW_RESERVATION);
await notification.sendNotificationAdmin({
  reservation_id: 3,
});
*/

/* ################### Notification CLIENT #######################
// const notification = new Notification(NotificationType.NEW_RESERVATION);
// await notification.sendNotification(
//   client_id,
//   "notifiable_token",
//   {
//     reservation_id: 3,
//   }
// );
*/

export enum NotificationType {
  NEW_RESERVATION = "NEW_RESERVATION",
  CANCEL_RESERVATION = "CANCEL_RESERVATION",
}

interface NotificationMessage {
  title: string;
  body: string;
}

interface Notification_data {
  reservation_id: number;
}

export class Notification {
  private notificationType: NotificationType;

  constructor(notificationType: NotificationType) {
    this.notificationType = notificationType;
  }

  public async sendNotification(
    client_id: number,
    notifiable_token: string,
    data: Notification_data
  ) {
    try {
      await this.sendNotificationToUser(notifiable_token, data);
    } catch (error) {
      throw new Error("failed to send notification");
    }

    await notificationRepository.create(client_id, this.notificationType, data);
  }

  public async sendNotificationAdmin(data: Notification_data) {
    const admin = await AdminRepository.findFirst();

    if (admin && admin.notifiable_token ) {
      try {
        await this.sendNotificationToUser(admin.notifiable_token.trim(), data);
      } catch (error) {
        throw new Error("failed to send notification");
      }
    } else {
      console.error("Admin not found or notifiable_token is missing");
    }

    if (!admin) {
      throw new Error("Admin not found");
    }

    await notificationRepository.createAdmin(admin.id, this.notificationType, data);
  }

  private async sendNotificationToUser(token: string, data: Notification_data) {
    const message = {
      data: data,
      notification: this.getNotificationMessage(),
      to: token,
    };

    try {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: `key=${process.env.FIREBASE_NOTIFICATION_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log("Notification envoyée avec succès");
      } else {
        console.error("Échec de l'envoi de la notification");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi de la notification:",
        error
      );
    }
  }

  private getNotificationMessage(): NotificationMessage {
    switch (this.notificationType) {
      case NotificationType.NEW_RESERVATION:
        return {
          title: "Nouvelle réservation",
          body: "Vous avez une nouvelle réservation",
        };
      case NotificationType.CANCEL_RESERVATION:
        return {
          title: "Réservation annulée",
          body: "Une réservation a été annulée",
        };
      default:
        throw new Error("Type de notification inconnu");
    }
  }
}
