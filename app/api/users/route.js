import { db_cashier } from "../db";

export async function POST(req) {
  try {
    const requestData = await req.json();
    const { username, email, password } = requestData;
    const createData = await db_cashier.users.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    return new Response(JSON.stringify(createData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};


export async function GET() {
  try {
    const createData = await db_cashier.users.findMany({});

    return new Response(JSON.stringify(createData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};

export async function PUT(req) {
  try {
    const reqData = req.json()
    const { id } = reqData
    const createData = await db_cashier.users.update({
      where: {
        id
      },

      data: {
        email,
        password
      }
    });

    return new Response(JSON.stringify(createData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};


export async function DELETE(req) {
  try {
    const reqData = req.json()
    const { id } = reqData
    const deleteData = await db_cashier.users.delete({
      where: {
        id
      }
    });

    return new Response(JSON.stringify(deleteData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};

