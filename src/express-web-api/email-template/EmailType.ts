// Définition des types d'e-mails
import {EmailTypeBuilder} from "@root/email-template/EmailTypeBuilder";
import {restaurantEmail, restaurantName, restaurantPhone, restaurantWebsite} from "@utils/restaurantInfo";

export const EmailType = {
    WAITING_RESERVATION_CONFIRMATION: new EmailTypeBuilder<
        WaitingReservationConfirmationDataFromFront,
        WaitingReservationConfirmationDefaultData
    >(
        "src/express-web-api/email-template/email-client/waiting-reservation-confirmation.hbs",
        "Réservation en attente de confirmation",
        "client",
        {
            restaurantName,
            restaurantEmail,
            restaurantPhone,
            restaurantWebsite
        }
    ).build(),

    CONFIRMATION_RESERVATION: new EmailTypeBuilder<
        ConfirmationReservationData,
        ConfirmReservationAdditionalData
    >(
        "src/express-web-api/email-template/email-client/confirmation-reservation.hbs",
        "Réservation confirmée",
        "client",
        {
            restaurantName,
            restaurantEmail,
            restaurantPhone,
        }
    ).build(),

    NOTIF_ADMIN_NEW_RESERVATION: new EmailTypeBuilder<NotifAdminNewReservationData>(
        "src/express-web-api/email-template/email-admin/notif-admin-reservation.hbs",
        "Nouvelle réservation",
        "admin",
        {
            restaurantName,
            restaurantEmail,
            restaurantPhone,
        }
    ).build(),
};

interface ConfirmationReservationData {
    clientFullName: string;
    reservationDate: string;
    reservationHour: string;
    numberOfPeople: number;
}

interface ConfirmReservationAdditionalData {
    restaurantName: string;
    restaurantEmail: string;
    restaurantPhone: string;
}

interface NotifAdminNewReservationData {
    clientFullName: string;
    reservationDate: string;
    numberOfPeople: number;
    reservationHour: string;

}

interface WaitingReservationConfirmationDataFromFront {
    clientFullName: string;
    reservationDate: string;
    reservationHour: string;
    numberOfPeople: number;
}

interface WaitingReservationConfirmationDefaultData {
    restaurantName: string;
    restaurantEmail: string;
    restaurantPhone: string;
    restaurantWebsite: string;
}
