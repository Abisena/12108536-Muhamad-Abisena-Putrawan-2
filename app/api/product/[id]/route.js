import { db_cashier } from "../../db";

export async function POST(req, { params }) {
  try {
    const id = parseInt(params.id);
    const { quantity } = req.body;
    const updateProduct = await db_cashier.product.create({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Success to Update Product",
        data: updateProduct,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: "Invalid Server" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id);
    const { quantity } = req.body;
    const updateProduct = await db_cashier.product.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Success to Update Product",
        data: updateProduct,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ msg: "Invalid Server" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);
    const deleteData = await db_cashier.product.delete({
      where: { id },
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
}
