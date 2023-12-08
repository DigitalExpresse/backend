import { prisma } from "@root/ExpressApp";
import { Admin } from "@prisma/client";
import { ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class AdminRepository {
  static async findAll(): Promise<Omit<Admin, "password">[]> {
    try {
      const adminArray = await prisma.admin.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          mobileNumber: true,
          notifiable_token: true,
        },
      });

      return adminArray;
    } catch (error) {
      throw new Error("Failed to find all admins: " + error);
    }
  }

  static async create(adminInstance): Promise<Omit<Admin, "password">> {
    try {
      const newAdmin: Omit<Admin, "password"> = await prisma.admin.create({
        data: {
          firstname: adminInstance.firstname,
          lastname: adminInstance.lastname,
          email: adminInstance.email.getValue(),
          mobileNumber: adminInstance.mobileNumber
            ? adminInstance.mobileNumber
            : null,
          password: adminInstance.password,
          notifiable_token: adminInstance.notifiable_token
            ? adminInstance.notifiable_token
            : null,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          mobileNumber: true,
          notifiable_token: true,
        },
      });

      return newAdmin;
    } catch (error) {
      throw new Error("Failed to create admin: " + error);
    }
  }

  static async update({ dataToUpdate, id }): Promise<Omit<Admin, "password">> {
    try {
      const updatedAdmin = await prisma.admin.update({
        where: {
          id: Number(id),
        },

        data: dataToUpdate,

        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          mobileNumber: true,
          notifiable_token: true,
        },
      });

      return updatedAdmin;
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(
          "Admin " + ERROR_NOT_FOUND.message + " " + error.meta.cause
        );
      }

      throw new Error("Failed to update admin: " + error);
    }
  }

  static async findByEmail(
    email: string
  ): Promise<Omit<Admin, "notifiable_token">> {
    try {
      const admin = await prisma.admin.findUnique({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          mobileNumber: true,
          password: true,
        },
        where: {
          email: email,
        },
      });

      return admin;
    } catch (error) {
      throw new Error("Failed to find admin: " + error);
    }
  }

  static async delete(id: number) {
    return prisma.admin.delete({
      where: {
        id: id,
      },
    });
  }

  static async findById(id: number): Promise<Omit<Admin, "password">> {
    const admin = await prisma.admin.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mobileNumber: true,
        notifiable_token: true,
      },
    });

    return admin;
  }

  static async findFirst(): Promise<Omit<Admin, "password">> {
    const admin = await prisma.admin.findFirst({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        mobileNumber: true,
        notifiable_token: true,
      },
    });

    return admin;
  }

  static async updatePassword({ password, id }): Promise<Omit<Admin, "password">> {
    try {
      const updatedAdmin = await prisma.admin.update({
        where: {
          id: Number(id),
        },

        data: {
          password: password,
        },

        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          mobileNumber: true,
          notifiable_token: true,
        },
      });

      return updatedAdmin;

    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(
          "Admin " + ERROR_NOT_FOUND.message + " " + error.meta.cause
        );
      }

      throw new Error("Failed to update admin: " + error);
    }
  }
}
