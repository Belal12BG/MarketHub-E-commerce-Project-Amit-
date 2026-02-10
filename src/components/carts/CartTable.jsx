import React, { useContext } from "react";
import { Table, Button, Image } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";

const CartTable = ({ cartItems, onRemove }) => {
  const { increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <Table responsive hover className="align-middle">
      <thead>
        <tr>
          <th>Product</th>
          <th className="text-center">Price</th>
          <th className="text-center">Quantity</th>
          <th className="text-center">Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {cartItems.map((item) => (
          <tr key={item.id}>
            <td className="d-flex align-items-center gap-3">
              <Image src={item.thumbnail} width={60} rounded />
              <span>{item.title}</span>
            </td>

            <td className="text-center">{formatPrice(item.price)}</td>

            <td className="text-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <FaMinus />
                </Button>

                <span className="fw-bold">{item.quantity}</span>

                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <FaPlus />
                </Button>
              </div>
            </td>

            <td className="text-center">
              {formatPrice(item.price * item.quantity)}
            </td>

            <td className="text-center">
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onRemove(item.id)}
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CartTable;
