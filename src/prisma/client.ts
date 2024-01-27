import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient ({ datasources: { db: { url: "mysql://kalach:sjvm%402003@netflexdb.mysql.uhserver.com:3306/netflexdb"}}});
