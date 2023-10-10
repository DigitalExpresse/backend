import { prisma } from "@root/ExpressApp";
import { Admin, Client, Notifications_admin } from "@prisma/client";
import { NotificationType } from "../shared/Notification";
import { AdminRepository } from "../admin/AdminRepository";

export class notificationRepository {
  static async createAdmin(
    admin_id: number,
    notificationType: NotificationType,
    data: any
  ) {
    try {
      const notificationData: any = {
        type: notificationType,
        admin: {
          connect: {
            id: admin_id,
          },
        },
      };

      if (data) {
        notificationData.data = data;
      }

      const notification = await prisma.notifications_admin.create({
        data: notificationData,
      });

      //   const notificationData: any = {
      //     type: notificationType,
      //     admin: {
      //       connect: {
      //         id: adminId,
      //       },
      //     },
      //   };

      //   if (data) {
      //     notificationData.data = data;
      //   }

      //   const notification = await prisma.notifications_admin.create({
      //     data: notificationData,
      //   });

      //   return notification;
    } catch (error) {
      throw new Error("failed to save notification" + error);
    }
  }

  static async create(
    client_id: number,
    notificationType: NotificationType,
    data: any
  ) {
    try {
      const notificationData: any = {
        type: notificationType,
        client: {
          connect: {
            id: client_id,
          },
        },
      };

      if (data) {
        notificationData.data = data;
      }

      const notification = await prisma.notifications_client.create({
        data: notificationData,
      });

      return notification;
    } catch (error) {
      throw new Error("failed to save notification" + error);
    }
  }
}
