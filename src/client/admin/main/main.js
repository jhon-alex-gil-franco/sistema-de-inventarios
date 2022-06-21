import { Consults } from "./controller/consults.js";
import { inventory } from "./controller/inventory.js";
import { egress } from "./controller/egress.js";
import { invoice } from "./controller/invoice.js";
import { registerClient } from "./controller/register/client.js";
import { registerUser } from "./controller/register/user.js";
import { registerProduct } from "./controller/register/product.js";
import { registerSupplier } from "./controller/register/supplier.js";
import { registerCategory } from "./controller/register/category.js";
import { reports } from "./controller/reports.js";
import { DODRegClient,DODRegUser,DODConsults, DODRegProduct,DODInventory,DODRegSupplier,DODEgress,DODInvoice, DODReports,DODCategory} from "./document.js";
//-----------------------------Register----------------------------
registerClient(DODRegClient, DODInvoice)
registerUser(DODRegUser)
registerProduct(DODRegProduct)
registerSupplier(DODRegSupplier)
registerCategory(DODCategory)

//---------------------------Consults------------------------------
Consults(DODConsults,DODRegClient, DODRegUser,DODRegProduct, DODRegSupplier)

//---------------------------Inventory------------------------------
inventory(DODInventory)

//egress
egress(DODEgress)

//invoice
invoice(DODInvoice,DODRegClient)

//reports
reports(DODReports)






