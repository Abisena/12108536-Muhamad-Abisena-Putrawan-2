import { db_cashier } from "../db";
import * as argon2 from "argon2"

export async function POST(req) {
    try {
        const dataJson = await req.json()
        const {email, password} = dataJson

        const user = await db_cashier.users.findFirst({
            where: {
              email,
            },
          });
      
          if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
              status: 404,
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
      
          const passwordMatch = await argon2.hash(password);
      
          if (!passwordMatch) {
            return new Response(JSON.stringify({ error: "Invalid password" }), {
              status: 401,
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
      
          return new Response(
            JSON.stringify({ success: true, user, passwordMatch }),
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