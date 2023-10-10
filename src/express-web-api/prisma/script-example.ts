import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()
//
// // ------------- CREATE NEW admin -----------------
//
// // async function main() {
// //     const admin = await prisma.admin.create({
// //         data: {
// //             name: 'Marius',
// //             email: 'marius@prisma.io',
// //         },
// //     })
// //     console.log(user)
// // }
//
//
//
// // ------------- CREATE admin WITH POST -----------------
// // async function main() {
// //     const admin = await prisma.admin.create({
// //         data: {
// //             name: 'john',
// //             email: 'john@prisma.io',
// //             posts: {
// //                 create: {
// //                     title: 'Hello World',
// //                     content: 'This is a test post',
// //                 },
// //             },
// //         },
// //     })
// //     console.log(admin)
// // }
//
// // // ------------- GET ALL admins WITH POSTS -----------------
// async function main() {
//     const adminsWithPost = await prisma.admin.findMany()
//     console.dir(adminsWithPost, { depth: null })
// }
//
//
//
// // ------------- GET ONE admin WITH THIS POSTS -----------------
// // async function main() {
// //     const userWithPost = await prisma.admin.findUnique({
// //             where: { id: 3 },
// //             include: {
// //                 posts: true,
// //             },
// //         })
// //
// //     console.dir(userWithPost, { depth: null })
// // }
//

// // ------------- GET ALL admins -----------------

// async function main() {
//     const admins = await prisma.admin.findMany()
//     console.log(admins)
// }

// // ------------- CREATE ADMIN -----------------
async function main() {
    const admin = await prisma.admin.create({
            data: {
                firstname: 'john',
                lastname: 'doe',
                email:  'john@mail.com',
                mobileNumber: 123456789,
                password: "123456789",
            }
        });

    console.log(admin)
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

