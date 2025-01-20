import { getProducts } from "@/lib/actions/actions";

const topProducts = await getProducts();

topProducts.sort((a, b) => b.rating - a.rating);


export default topProducts.slice(0, 4);
