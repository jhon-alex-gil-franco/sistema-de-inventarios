import { Consults } from "./controller/consults.js";
import { inventory } from "./controller/inventory.js";
import { egress } from "./controller/egress.js";
import { invoice } from "./controller/invoice.js";
import { registerClient } from "./controller/register/client.js";
import { registerEmployee } from "./controller/register/employe.js";
import { registerService } from "./controller/register/services.js";
import { registerVehicle } from "./controller/register/vehicle.js";
import { registerProduct } from "./controller/register/product.js";
import { registerSupplier } from "./controller/register/supplier.js";
import { reports } from "./controller/reports.js";
import { DODRegClient,DODRegEmployee,DODRegService,DODRegVehicle,DODConsults, DODRegProduct,DODInventory,DODRegSupplier,DODEgress,DODInvoice, DODReports} from "./document.js";

//-----------------------------Register----------------------------
registerVehicle(DODRegVehicle,DODInvoice,DODRegClient)
registerClient(DODRegClient)
registerService(DODRegService)
registerEmployee(DODRegEmployee)
registerProduct(DODRegProduct)
registerSupplier(DODRegSupplier)

//---------------------------Consults------------------------------
Consults(DODConsults,DODRegVehicle,DODRegClient, DODRegEmployee, DODRegService,DODRegProduct, DODRegSupplier)

//---------------------------Inventory------------------------------
inventory(DODInventory)

//egress
egress(DODEgress)

//invoice
invoice(DODInvoice,DODRegVehicle)

//reports
reports(DODReports)




   