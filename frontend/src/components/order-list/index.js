import {useEffect, useState} from "react";
import {AuthAPI, OrdersAPI, PrivateKey, PublicKey} from "../../API";
import {OrderItem} from "./order-item";

const sha1 = require('sha1');


export const OrderList = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const {RequestToken} = (await AuthAPI.GetRequestToken()).data
                const privetKey = sha1(RequestToken + PrivateKey)
                const {AccessToken} = (await AuthAPI.GetAccessToken(RequestToken, PublicKey, privetKey)).data
                const {Result} = (await OrdersAPI.GetOrderList(AccessToken)).data
                setOrders(Result)
            } catch (e) {
                alert("Произошла ошибка при загрузке данных")
            }
        }
        getOrders()
    }, [])

    return (<div className="container">
        <h1 className="title">Тестовое задание:</h1>
        {orders.map((order) => <OrderItem key={order.Id}
                                          name={order.Title}
                                          title={order.Shipping?.Title}
                                          phone={order.Shipping?.Phone}/>)}

    </div>)
}