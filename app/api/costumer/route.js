import { db_cashier } from "../db";


export async function GET(){
    try {
        const getData = await db_cashier.costumer.findMany();
        
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

export async function PUT(req){
    try {
        const getData = await db_cashier.costumer.update(
            {
                where: {
                    id
                },

                data: {
                    nama_pelanggan,
                    alamat_pelanggan,
                    no_telpon
                }
            }
        );
        
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

export async function DELETE(req){
    try {
        const delData = await req.json();
        const { id } = delData;
        const deleteData = await db_cashier.costumer.delete({
            where: {
                id
            }
        });
        
        return new Response(
            JSON.stringify(deleteData),
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