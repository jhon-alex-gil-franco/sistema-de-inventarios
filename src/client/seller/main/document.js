
      //DOCUMENT OBJET DATA  OF REGISTER CLIENT
     export const DODRegClient= {
      //inputs
       id: document.getElementById("id_client"),
       name: document.getElementById("name_client"),
       dir: document.getElementById("dir_client"),
       tel: document.getElementById("tel_client"),
       cel: document.getElementById("cel_client"),
       email: document.getElementById("email_client"),
       tClient: document.getElementById("t_client"),
       //butons
       btnRClient:document.getElementById("registerClient"),
       btnResetClient:document.getElementById("resetRegisterClient"),
       //form
       form:document.getElementById("form_reg_client"),
       //message
       alert:document.getElementById("message-regClien"),
       //labels error
       alertErrorId:document.getElementById("notification-error__inputId"),
       alertErrorName:document.getElementById("notification-error__inputName"),
       alertErrorDir:document.getElementById("notification-error__inputDir"),
       alertErrorTel:document.getElementById("notification-error__inputTel"),
       alertErrorCel: document.getElementById("notification-error__inputCel"),
       alertErrorEmail:document.getElementById("notification-error__inputEmail")
     };
//DOCUMENT OBJET DATA  OF REGISTER SUPPLIER
     export const DODRegSupplier= {
      //inputs
       id: document.getElementById("id_supplier"),
       name: document.getElementById("name_supplier"),
       dir: document.getElementById("dir_supplier"),
       tel: document.getElementById("tel_supplier"),
       cel: document.getElementById("cel_supplier"),
       email: document.getElementById("email_supplier"),
       tSupplier: document.getElementById("t_supplier"),
       description: document.getElementById("description_supplier"),
       
       //butons
       btnRSupplier:document.getElementById("registerSupp"),
       btnResetSupplier:document.getElementById("resetRegisterSupp"),
       //form
       form:document.getElementById("form_reg_Supp"),
       //message
       alert:document.getElementById("message-regSupp"),
       //labels error
       alertErrorIdSupp:document.getElementById("notification-error__inputIdSupp"),
       alertErrorNameSupp:document.getElementById("notification-error__inputNameSupp"),
       alertErrorDirSupp:document.getElementById("notification-error__inputDirSupp"),
       alertErrorTelSupp:document.getElementById("notification-error__inputTelSupp"),
       alertErrorCelSupp: document.getElementById("notification-error__inputCelSupp"),
       alertErrorEmailSupp:document.getElementById("notification-error__inputEmailSupp"),
       alertErrorDescriptionSupp:document.getElementById("notification-error__inputDescriptionSupp")
     };


     //DOCUMENT OBJET DATA  OF REGISTER VEHICLE
     export const DODRegVehicle={
      //input form
       placa: document.getElementById("register_placa"),
       marca: document.getElementById("register_marca"),
       modelo: document.getElementById("register_modelo"),
       anio: document.getElementById("register_anio"),
       km: document.getElementById("register_kilometraje"),
       propVh:document.getElementById("propietario_veh"),
       //form
       form:document.getElementById("form_reg_vehicle"),
        //butons
       btnRVehicle:document.getElementById("btn_register_vehicle"),
       btnResetVehicle:document.getElementById("btn_reset_vehicle"),
       //message
       alert: document.getElementById("message-regVehicle"),      
       //labels
       alertErrorPlaca:document.getElementById("notification-error__inputPlaca"),
       alertErrorMarca:document.getElementById("notification-error__inputMarca"),
       alertErrorModelo:document.getElementById("notification-error__inputModelo"),
       alertErrorAnio:document.getElementById("notification-error__inputAnio"),
       alertErrorKm:document.getElementById("notification-error__inputKm"),
       alertErrorProp:document.getElementById("notification-error__inputProp")
     }

     export const DODRegEmployee={
       //input form
       id: document.getElementById("id_employee"),
       name: document.getElementById("name_employee"),
       dir: document.getElementById("dir_employee"),
       tel: document.getElementById("tel_employee"),
       cel: document.getElementById("cel_employee"),
       email: document.getElementById("email_employee"),
       vinculation:document.getElementById("select-vinculation"),
       //butons
       btnRegEmployee:document.getElementById("registerEmployee"),
       btnResetEmployee:document.getElementById("resetRegisterEmployee"),
       //form
       form:document.getElementById("form_reg_employee"),
       //message
       alert:document.getElementById("message-regEmployee"),
       //labels error
       alertErrorId:document.getElementById("notification-error__inputIdEmployee"),
       alertErrorName:document.getElementById("notification-error__inputNameEmployee"),
       alertErrorDir:document.getElementById("notification-error__inputDirEmployee"),
       alertErrorTel:document.getElementById("notification-error__inputTelEmployee"),
       alertErrorCel: document.getElementById("notification-error__inputCelEmployee"),
       alertErrorEmail:document.getElementById("notification-error__inputEmailEmployee"),
       //div container select vinculation.
       vinculationDiv:document.getElementById("vinculation-employe")

     }
     export const DODRegProduct={
      //input form
      cod:document.getElementById("register_product-code"),
      name:document.getElementById("register_product-name"),
      ref:document.getElementById("register_product-ref"),
      mark:document.getElementById("register_product-marca"),
      amount:document.getElementById("register_product-amount"),
      amountMin:document.getElementById("register_product-amountMin"),
      price:document.getElementById("register_product-price"),
      description:document.getElementById("register_product-description"),
     //form
     form:document.getElementById("form_reg_product"),
     //message
     alert:document.getElementById("message-regProduct"),
     //butons
     btnReg:document.getElementById("btn_register_product"),
     btnReset:document.getElementById("btn_reset_product"),
     //labels
     
     labelAmountP:document.getElementById("label__amount-product"),
     alertErrorCod:document.getElementById("notification-error__inputCodP"),
     alertErrorName:document.getElementById("notification-error__inputProduct"),
     alertErrorRef:document.getElementById("notification-error__inputRef"),
     alertErrorMark:document.getElementById("notification-error__inputMarcaP"),
     alertErrorDes: document.getElementById("notification-error__inputDescriptionP"),
     alertErrorAmount:document.getElementById("notification-error__inputAmount"),
     alertErrorAmountMin:document.getElementById("notification-error__inputAmountMin"),
     alertErrorPrice:document.getElementById("notification-error__inputPriceP")
    }

    export const DODRegService={
     //input form
     cod:document.getElementById("register_service-code"),
     name:document.getElementById("register_service-name"),
     description:document.getElementById("register_service-description"),
     price:document.getElementById("register_service-price"),
    //form
    form:document.getElementById("form_reg_service"),
    //message
    alert:document.getElementById("message-regService"),
    //butons
    btnReg:document.getElementById("btn_register_service"),
    btnReset:document.getElementById("btn_reset_service"),
    //labels
    alertErrorCod:document.getElementById("notification-error__inputCod"),
    alertErrorName:document.getElementById("notification-error__inputService"),
    alertErrorDes: document.getElementById("notification-error__inputDescription"),
    alertErrorPrice:document.getElementById("notification-error__inputPrice")
   }


     export const DODConsults={
       //Select
       category:document.getElementById("Consult_Category"),
       selectVehicle:document.getElementById("Consult_Category-ByVehicle"),
       selectClient:document.getElementById("Consult_Category-ByClient"),
       selectEmploye:document.getElementById("Consult_Category-ByEmployee"),
       selectService:document.getElementById("Consult_Category-ByService"),
       selectProduct:document.getElementById("Consult_Category-ByProduct"),
       selectSupplier:document.getElementById("Consult_Category-BySupplier"),
     
       //container selects
       containerSelectVeh:document.getElementById("container_consult-vehicle"),
       containerSelectCli:document.getElementById("container_consult-client"),
       containerSelectEmp:document.getElementById("container_consult-employee"),
       containerSelectServ:document.getElementById("container_consult-service"),
       containerSelectProd:document.getElementById("container_consult-product"),
       containerSelectSup:document.getElementById("container_consult-supplier"),
       
       //container table
       containerTableconsults:document.getElementById("container_table-consults"),
    
       //buttons
       btnListAll:document.getElementById("List_consult"),
       btnEditVehicle:document.getElementById("btn__edit-vehicle"),
       btnCancelEditV:document.getElementById("cancel__edit-vehicle"),
      //  btnEditClient:document.getElementById("btn__edit-client"),
      //  btnCancelClient:document.getElementById("cancel__edit-client"),
       btnEditEmploye:document.getElementById("btn__edit-employe"),
       btnCancelEmploye:document.getElementById("cancel__edit-employe"),
       btnEditService:document.getElementById("btn__edit-service"),
       btnCancelService:document.getElementById("cancel__edit-service"),
       btnEditProduct:document.getElementById("btn__edit-product"),
       btnCancelProduct:document.getElementById("cancel__edit-product"),
       btnEditSupplier:document.getElementById("btn__edit-supplier"),
       btnCancelSupplier:document.getElementById("cancel__edit-supplier"),
       btnListByParameter:document.getElementById("btn-seach_parameter"),
  
      //title modal
       titleTableConsults:document.getElementById("title-table"),
       titleModalVehicle:document.getElementById("title-editVehicle"),
       titleModalCient:document.getElementById("title-editClient"),
       titleModalEmploye:document.getElementById("title-editEmploye"),
       titleModalService:document.getElementById("title-editService"),
       titleModalProduct:document.getElementById("title-editProduct"),
       titleModalSupplier:document.getElementById("title-editSupplier"),
       typeClient:document.getElementById("value"),
       
       //modal
       modalEditVeh:document.getElementById("Modal__Edit-Veicle"),
       modalEditClient:document.getElementById("Modal__Edit-Client"),
       modalEditEmploye:document.getElementById("Modal__Edit-Employe"),
       modalEditService:document.getElementById("Modal__Edit-Service"),
       modalEditProduct:document.getElementById("Modal__Edit-Product"),
       modalEditSupplier:document.getElementById("Modal__Edit-Supplier"),
       //input
       inputSeach:document.getElementById("seach_parameter")
      }
   
      export const DODInventory={
        //input
       inputSeach:document.getElementById("seach_parameterInventory"),
       //select
       selectProduct:document.getElementById("Consult_Category-ByProductInventory"),

       //buttons
       btnListOut:document.getElementById("List_consultOut"),
       btnListAll:document.getElementById("List_consultAll"),
       btnListByOut:document.getElementById("List_consultByOut"),
       btnAddStock:document.getElementById("btn__add-stock"),
       btnCancelAddStock:document.getElementById("cancel__add-stock"),
       //container table
       containerTableInventory:document.getElementById("container_table-Inventory"),
     
       //modal
       modalEditInventory:document.getElementById("Modal__Edit-ProductInventory"),
       //title modal
       titleModalInventory:document.getElementById("title-editInventory"),
       //label
       alertErrorAdd:document.getElementById("notification-error__inputAdd"),
       //input
       add:document.getElementById("input_add-stock"),
       //alert
       alert:document.getElementById("message-error-add"),
       
      }

      export const DODEgress={
        //input seach
        inputSeach:document.getElementById("seach_parameterEgress"),
        //select 

        // selectCatergoryInvoice:document.getElementById("Consult_Category-Egress"),
        // selectService:document.getElementById("service__ByEgress"),
        // selectClientInvoice:document.getElementById("Consult_Category-ByEgress"),
        selectEgress:document.getElementById("Consult_Category-ByEgress"),
        selectEgress:document.getElementById("select_cateegory-egress"),
        // input date
        date1:document.getElementById("input__Date1-egress"),
        date2:document.getElementById("input__Date2-egress"),
 
        //buttons
        btnGenterateEgress:document.getElementById("btn__geneterate-egress"),
        btnConsultAllEgress:document.getElementById("btn__consult-allEgress"),
        btnConsultEgress:document.getElementById("btn__consult-egress"),
        btnRegEgress:document.getElementById("btn__reg-egrees"),
        btnCancelEgress:document.getElementById("btn__regcancel-egrees"),
        //container table
        containerTableEgress:document.getElementById("container_table-Egress"),
        containerDateEgress:document.getElementById("container__date-egress"),
        containerCategoryEgress:document.getElementById("container__category-egress"),
        containerConsultEgress:document.getElementById("container__consults-egress"),
        containerRegEgress:document.getElementById("container__reg-egress"),
         
        //modal
        modalGenerateEgress:document.getElementById("modal__generate-egress"),      
        //label
        alertErrorConcep:document.getElementById("notification-error__inputConceptEg"),
        alertErrorPrice:document.getElementById("notification-error__inputPriceEg"),
        alertErrorSupplier:document.getElementById("notification-error__selectSupp"),
        
        //input
        supplier:document.getElementById("select_supplier-egress"),
        concep:document.getElementById("register_concept-egress"),
        price:document.getElementById("register_egress-price"),
        //alert
        alert:document.getElementById("message-regEgress"),
        alertConsultDate:document.getElementById(" message-consEgress"),
       
        //form 
        form:document.getElementById("form_reg_egrees"),
      }
      
      export const DODInvoice={
        //input
        inputSeach:document.getElementById("seach_parameterInvoice"),
        client:document.getElementById("client__ByInvoice"),
        vehicle:document.getElementById("vehicle__ByInvoice"),
        cantProducts:document.getElementById("cant__byInvoice"),
        priceProduct:document.getElementById("dto__byInvoice"),
        commission:document.getElementById("commission__byInvoice"),
        priceService:document.getElementById("price_service"),
        km:document.getElementById("km__ByInvoice"),
        comentary:document.getElementById("textarea__comentary-cancelInvoice"),
        intoPaymentToInvoice:document.getElementById("input__payment-toinvoice"),
        
        //select
        selectEmployee:document.getElementById("employee__ByInvoice"),
        selectProduct:document.getElementById("product__ByInvoice"),
        selectService:document.getElementById("service__ByInvoice"),
        selectOption:document.getElementById("select-productOrService"),
        selectCategory:document.getElementById("Consult_Category-ByInvoice"),
        selectTpayConsult:document.getElementById("Consult_typePay-ByInvoice"),
        selectTPayment:document.getElementById("select__tpayment-invoice"),
    
        // input date
        date1:document.getElementById("input__Date1-invoice"),
        date2:document.getElementById("input__Date2-invoice"),
      
        //buttons
        btnGenterateNewInvoice:document.getElementById("btn__geneterate-invoice"),
        btnConsultInvoice:document.getElementById("btn__consult-invoice"),
        btnConsultAllInvoice:document.getElementById("List_consultAllInvoice"),
        btnConsultAccountsRec:document.getElementById("List_accountsReceivable"),
        btnAddItemInvoice:document.getElementById("add__item-byInvoice"),
        btnRegInvoice:document.getElementById("register__newInvoice"),
        btnCancelInvoice:document.getElementById("resetRegisterInvoice"),
        btnCancelRegNewVehicle:document.getElementById("btn_cancelReg_vehicle"),
        btnAnnulmentInvoice:document.getElementById("btn__annulment-invoice"),
        btnCancelAnnulmentInvoice:document.getElementById("btn__Cancelannulment-invoice"),
        btnPaymentToInvoice:document.getElementById("btn__payment-toInvoice"),
        btnCancelPaymentToInvoice:document.getElementById("btn__Cancelpayment-toInvoice"),
        btnConsultAllInvoceCancel:document.getElementById("List_invoice-cancel"),
        // btnCloceListPayment:document.getElementById("btn__Cloce-listPayment"),


        //table
        tableForItemsInvoice:document.getElementById("table__items-invoice"),
        //container table 
        containerMain:document.getElementById("container__main-invoice"),
        containerTableConsultInvoice:document.getElementById("container_table-Invoice"),
        containerNewInvoice:document.getElementById("container__new-invoice"),
        containerConsultInvoice:document.getElementById("container__consult-invoice"), 
        containerProduct:document.getElementById("container__select-productInvoince"),
        containerCant:document.getElementById("container__input-cantProductInvoince"),
        containerService:document.getElementById("container__select-serviceInvoince"),
        containerDto:document.getElementById("container_dto"),
        containerPriceService:document.getElementById("container_price-service"),
        containerFormItems:document.getElementById("container_form-items"),
        containerTable:document.getElementById("contaier__table-items"),
        containerInfoClientPrintInvoice:document.getElementById("info__client-printInvoice"),
        containerListPayment:document.getElementById("container__table-listPaiment"),
        
        //  //label
       //  alertErrorConcep:document.getElementById("notification-error__inputConceptEg"),
       //  alertErrorPrice:document.getElementById("notification-error__inputPriceEg"),
       //  alertErrorSupplier:document.getElementById("notification-error__selectSupp"),
        
        //label
        labelMissingBalance:document.getElementById("label__missing-balance"),
        //form 
        form:document.getElementById("form_reg_invoice"),
        //checkbox
        // checkTypePayment:document.getElementById("select_t-payment"),
        // checkDto:document.getElementById("check__dto-byInvoice"),
        checkCom:document.getElementById("check__comEmployee-byInvoice"),
        
        //title
        titleCodInvoice:document.getElementById("title__code-invoice"),
        
        //text
        textCommEmploye:document.getElementById("text__total-employe"),
        textTotalBruto:document.getElementById("text__total-bruto"),
        textTotalNeto:document.getElementById("text__total-neto"),
        textTitlePaymentToInvoice:document.getElementById("title-payment-toInvoice"),
        
        //modal
        regNewVehicle:document.getElementById("Modal__reg-newVeicle"),
        cancelAnnulment:document.getElementById("Modal__Cancel-invoice"),
        PaymentToInvoice:document.getElementById("Modal__payment-toInvoice"),
        listPayment:document.getElementById("Modal__list-payment"),
        //alert
        alert:document.getElementById("message-regItem"),
      }

      export const DODReports={
        //select
        selectListEmployee:document.getElementById("select_list-Employee"),
        //inputs date  
        dateEmp1:document.getElementById("input__Date1-reportEmploye"),
        dateEmp2:document.getElementById("input__Date2-reportEmploye"),
        dateSales1:document.getElementById("input__Date1-sales"),
        dateSales2:document.getElementById("input__Date2-sales"),
        dateTopSales1:document.getElementById("input__Date1-Topsales"),
        dateTopSales2:document.getElementById("input__Date2-Topsales"),
        //container
        containerReportEmployee:document.getElementById("container__consults-informeEmployee"),
        containerReportSales:document.getElementById("container__consults-informeSales"),
        containerReportTopSales:document.getElementById("container__consults-informeTopSales"),
        //bottons 
        btnListEmployee:document.getElementById("btn__consult-reportEmploye"),
        btnListSales:document.getElementById("btn__consult-reportSales"),
        btnListTopSales:document.getElementById("btn__consult-reportTopSales"),
        btnForEmployee:document.getElementById("btn__geneterate-reportEmployee"),
        btnForSales:document.getElementById("btn__geneterate-reportSales"),
        btnForTopSales:document.getElementById("btn__geneterate-reportTopSales"),
        btnClearConsultTopSales:document.getElementById("btn__clearConsult-reportTopSales"),
        btnClearConsultSales:document.getElementById("btn__clearConsult-reportSales"),
        btnClearConsultEmployee:document.getElementById("btn__clearConsult-reportEmployee"),

        //table
        tableReportEmployee:document.getElementById("container_table-reportEmploye"),
        tableReportSales:document.getElementById("container_table-reportSales"),
        tableReportTopSales:document.getElementById("container_table-reportTopSales"),

        //alert
        alert:document.getElementById("message-report"),
       
      }
        
