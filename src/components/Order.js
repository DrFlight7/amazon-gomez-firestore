import moment from "moment";
import CurrencyFormat from 'react-currency-format';

function Order({ id, amount, amountShipping, items, timestamp, images }) {

    return (
        <div className="relative border rounded-md my-5">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TOTAL</p>
                    <div className="flex whitespace-nowrap">
                        <CurrencyFormat value={Number(amount)} displayType={'text'} thousandSeparator={true} prefix={'Php '} renderText={value => <div>{value} <span>- Next Day Delivery:</span></div>} />
                        &nbsp;
                        <CurrencyFormat value={amountShipping} displayType={'text'} thousandSeparator={true} prefix={'Php '} renderText={value => <div>{value}</div>} />
                    </div>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} items</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image) => (
                        <img className="h-20 object-contain sm:h-32" src={image} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order