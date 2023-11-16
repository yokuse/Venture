import React from 'react'

type Props = {
  content: object
}

const PrintObject = (props: any) => {
  const formattedContent: string = JSON.stringify(props.content, null, 2)

  return (
  <div className=" mx-auto px-16 py-8">
    <h3>Name: {props.content.customer_details.name}</h3>
    <h4>Email: {props.content.customer_details.email}</h4>
    <br/>
    <p>Funded: ${props.content.payment_intent.amount_received}</p>
    <p>Currency: {props.content.payment_intent.charges.data[0].currency }</p>
    <p>Card: {props.content.payment_intent.charges.data[0].payment_method_details.card.brand }</p>
    
  </div>
  
  )
}

export default PrintObject
