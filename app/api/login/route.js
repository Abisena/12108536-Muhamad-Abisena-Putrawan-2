// import { db_cashier } from "../db";
// import * as argon2 from "argon2";

// export async function POST(req) {
//   try {
//     const dataJson = await req.json();
//     const { email, password } = dataJson;

//     const user = await db_cashier.users.findFirst({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       return new Response(JSON.stringify({ error: "User not found" }), {
//         status: 404,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }

//     const passwordMatch = await argon2.verify(user.password, password);

//     if (!passwordMatch) {
//       return new Response(JSON.stringify({ error: "Invalid password" }), {
//         status: 401,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }

//     const { role } = user;
//     let redirectUrl = "/dashboard";
//     if (role === "Admin") {
//       redirectUrl += "/admin";
//     } else if (role === "Employee") {
//       redirectUrl += "/employe";
//     }

//     return new Response(JSON.stringify({ success: true, user }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         Location: redirectUrl,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", {
//       status: 500,
//     });
//   }
// }

import { db_cashier } from "../db";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const requestData = await req.json();
    const { email, password } = requestData;

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

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const token = jwt.sign({ id: user.id }, "kasir", {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ token }, "kasirRefresh", {
      expiresIn: "1h",
    });

    await db_cashier.users.update({
      where: {
        email,
      },
      data: {
        refreshToken,
      },
    });

    const { role } = user;
    let redirectUrl = "/dashboard";
    if (role === "Admin") {
      redirectUrl += "/admin";
    } else if (role === "Employee") {
      redirectUrl += "/employe";
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        Location: redirectUrl,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
