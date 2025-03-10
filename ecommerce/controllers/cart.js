import { Cart } from "../models/cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  const { productId, title, price, quantity } = req.body;
  const { userId } = req.user;
  try {
    let cart = await Cart.findOne({userId});
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    let product = await cart.items.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (product > -1) {
      cart.items[product].quantity += quantity;
      cart.items[product].price += price * quantity;
    } else {
      cart.items.push({ productId, title, price, quantity });
    }
    await cart.save();
    res.json({ message: "added to cart successfully", cart, success: true });
  } catch (error) {
    res.json(error.message);
  }
};
// GET ALL CART
export const getAll=async(req,res)=>{
  const {userId} = req.user;
  try {
    let cart = await Cart.findOne({userId});
    if(!cart) res.json({message:"no cart found",success:false});
    res.json({message:"cart =>",cart,success:true});
  } catch (error) {
    res.json(error.message);
  }
}
