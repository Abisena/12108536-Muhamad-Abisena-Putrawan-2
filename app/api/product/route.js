import { db_cashier } from "../db";

export async function POST(req) {
  try {
    const productData = await req.json();
    const { nama_produk, price, quantity } = productData;
    const createProduk = await db_cashier.product.create({
      data: {
        nama_produk,
        price,
        quantity,
      },
    });

    return new Response(JSON.stringify(createProduk), {
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

export async function GET() {
  try {
    const getDataProduk = await db_cashier.product.findMany({});

    return new Response(JSON.stringify(getDataProduk), {
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

export async function PUT(req) {
  try {
    const getData = await req.json();
    const { quantity, id } = getData;

    if (!id) {
      console.log(id);
      throw new Error("ID is missing in the request body");
    }

    const newProduct = await db_cashier.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        quantity,
      },
    });

    return new Response(JSON.stringify(newProduct), {
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

export async function DELETE(req) {
  try {
    const delData = await req.json();
    const { id } = delData;

    if (!id) {
      return { status: 400, msg: "Invalid" };
    }

    const deletedData = await db_cashier.product.delete({
      where: {
        id,
      },
    });

    return new Response(JSON.stringify(deletedData), {
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
