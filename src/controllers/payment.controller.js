import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) =>{
    
    mercadopago.configure({
        access_token: MERCADOPAGO_API_KEY,
    });

    try{
        const result = await mercadopago.preferences.create({
            items:[
                {
                    title: "Colombiana",
                    unit_price: 50,
                    currency_id: "BRL",
                    quantity: 1,
                },
            ],
            back_urls:{
                success: "http://localhost:3000/webhook",
            },
        });
        console.log(result);
        res.json(result.body);

    }catch (error){
        return res.status(500).json({message: "Something goes wrong"});
    }
};

export const receiveWebhook = async (req, res) =>{
    try {
        const payment = req.query;
        console.log(payment);

        if (payment.type === "payment") {
          const data = await mercadopago.payment.findById(payment["data.id"]);
          console.log(data);
        }
    
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }
};