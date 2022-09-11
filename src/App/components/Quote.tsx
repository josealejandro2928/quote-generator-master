
import React from 'react'
import "./Quote.scss"
export default function Quote({ quote }: { quote: any }) {
    return (
        <div className='Quote'>
            <div className='body'>
                {quote?.quoteText}
            </div>

        </div>
    )
}
