import {prisma} from "@root/ExpressApp";
import {About} from "@prisma/client";

export class AboutRepository {

    static async create(aboutInstance): Promise<About> {
            
            try {
    
                const newAbout =  await prisma.about.create({
                    data: {
                        name: aboutInstance.name,
                        postal_code: aboutInstance.postal_code,
                        address: aboutInstance.address,
                        city:  aboutInstance.city,
                        mobileNumber: aboutInstance.mobileNumber 
                    },
                });
    
                return newAbout;
    
            } catch (error) {
    
                throw new Error('Failed to create about: ' + error);
    
            }
        }
    
    static async update({dataToUpdate, id}): Promise<About> {
        
            try {
        
                const updatedAbout = await prisma.about.update({
                    where: {
                        id: Number(id)
                    },
                    data: dataToUpdate,
                    select: {
                        id: true,
                        name: true,
                        postal_code: true,
                        address: true,
                        city: true,
                        mobileNumber: true,
                    },
                });
        
                return updatedAbout;
        
            } catch (error) {
               
        
                throw new Error('Failed to update about: ' + error);
        
            }




    }

    static async findAll(): Promise<About[]> {
            
                try {
    
                    const aboutRepository = await prisma.about.findMany({
                        select: {
                            id: true,
                            name: true,
                            postal_code: true,
                            address: true,
                            city: true,
                            mobileNumber: true,
                        },
                    });
    
                    return aboutRepository;
    
                } catch (error) {
    
                    throw new Error('Failed to find all about: ' + error);
    
                }
    }


    static async findById(id: number): Promise<About> {

        const about = await prisma.about.findUnique({
            where: {
                id: id,
            }
        });

        return about;
    }


}