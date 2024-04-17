import { db_cashier } from "../db";
import * as XLSX from "xlsx"

export async function POST() {
    try {
        const result = await db_cashier.$transaction(async (prisma) => {
        
        })
    } catch (error) {
        
    }
}