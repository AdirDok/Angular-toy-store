
export default interface order_T_model {
    order_ID: string | number    /*זה נמצא בשם הקבלה */
    client: number                  /*זה נמצא בשם הקבלה */
    cart_ID: string
    final_Price: number
    City_For_Delivery: string
    Street_For_Delivery: string
    Date_For_Delivery: Date | string
    Time_of_Order: Date | string    /*   זה נמצא בשם הקבלה  */
    Last_4_Digits: string
    status_of_Delivery: boolean
    nots: string

}




  // {
        //     "msg": "Your order has been accepted",
        //     "order": {
        //         "order_ID": 64,
        //         "client": "312198153",
        //         "cart_ID": "bd4f16b0-597b-4f11-a81a-16449fbd575d",
        //         "final_Price": 5657.7,
        //         "City_For_Delivery": "nowhre",
        //         "Street_For_Delivery": "elen",
        //         "Date_For_Delivery": "2022-05-11T21:00:00.000Z",
        //         "Time_of_Order": "2022-05-11T10:20:12.000Z",
        //         "Last_4_Digits": "3456",
        //         "status_of_Delivery": 0,
        //         "nots": "im batman"
        //     }
        // }
