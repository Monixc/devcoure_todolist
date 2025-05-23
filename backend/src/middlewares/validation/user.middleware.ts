import { prisma } from "../../config/db";
import { Request, Response } from "express";

const validateUser = async (req: Request, res: Response) => {
    const user = req.user;
    
    if(!user) {
      return null;
    }
  
    const dbUser = await prisma.users.findUnique({
      where: {
       userId: user.userId
      },
    });
  
    return dbUser;
  };

export default validateUser