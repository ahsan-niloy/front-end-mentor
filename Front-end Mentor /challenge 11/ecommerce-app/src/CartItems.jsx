/* eslint-disable react/prop-types */
export default function CartItems({
  cartItems,
  handleRemoveFromCart,
  totalCartItems,
}) {
  return (
    <div className="bg-white p-4 mt-6 overflow-hidden rounded-xl">
      <h2 className="text-4xl font-black mb-4 text-[#C73B0E] ">
        Your Cart {totalCartItems ? `(${totalCartItems})` : ""}
      </h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> : null}
      {cartItems.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <div>
            <div className="font-semibold mb-1">{item.name}</div>
            <div className="flex gap-1">
              <div>
                <span className="text-[#C73B0E] font-semibold mr-2">
                  {item.count}x
                </span>
                <span className="text-[#A9A2A0]">
                  {"  "}@ ${item.price.toFixed(2)}
                </span>{" "}
                ${(item.price * item.count).toFixed(2)}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleRemoveFromCart(item.name)}
            className="border h-[30px] w-[30px] rounded-full text-[#A9A2A0]"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
