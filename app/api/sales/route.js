import { db_cashier } from "../db";

export async function POST(req) {
  try {
    const jsonData = await req.json();
    let {
      nama_pelanggan,
      alamat_pelanggan,
      no_telpon,
      productId,
      quantity,
      pembayaran,
    } = jsonData;

    productId = parseInt(productId);
    quantity = parseInt(quantity);
    pembayaran = parseFloat(pembayaran);

    const result = await db_cashier.$transaction(async (prisma) => {
      const pelangganResult = await prisma.costumer.create({
        data: {
          nama_pelanggan,
          alamat_pelanggan,
          no_telpon,
          pembayaran,
        },
      });

      const pelangganId = pelangganResult.id;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }
      if (product.quantity < quantity) {
        throw new Error("Insufficient product quantity");
      }

      const total = product.price * quantity;
      const kembali = pembayaran - total;

      if (kembali < 0) {
        throw new Error("Insufficient payment");
      }

      const orderResult = await prisma.sales.create({
        data: {
          productId,
          quantity,
          total,
          pelangganId,
          kembali,
        },
      });

      await prisma.product.update({
        where: { id: productId },
        data: {
          quantity: `${product.quantity - quantity}`,
        },
      });

      return { pelangganResult, orderResult, kembali };
    });

    return new Response(JSON.stringify(result), {
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
