import { db_cashier } from "../db";

export async function GET(req) {
    try {
        const getData = await db_cashier.costumer.findMany({
            include: {
                sales: true
            }
        })

        return new Response(
            JSON.stringify(getData),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error(error);
          return new Response("Internal Server Error", {
            status: 500,
        });
    }
}