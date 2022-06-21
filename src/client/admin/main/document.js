
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

     export const DODRegUser={
       //input form
       id: document.getElementById("id_User"),
       name: document.getElementById("name_User"),
       email: document.getElementById("email_User"),
       pass: document.getElementById("pass_User"),
       confirmPass: document.getElementById("confimPass_User"),
       rol: document.getElementById("rol_User"),
       category: document.getElementById("category_User"),
       activation:document.getElementById("select-activationUser"),
       //butons
       btnRegUser:document.getElementById("registerUser"),
       btnResetUser:document.getElementById("resetRegisterUser"),
       //form
       form:document.getElementById("form_reg_User"),
       //message
       alert:document.getElementById("message-regUser"),
       //labels error
       alertErrorId:document.getElementById("notification-error__inputIdUser"),
       alertErrorName:document.getElementById("notification-error__inputNameUser"),
       alertErrorEmail:document.getElementById("notification-error__inputEmailUser"),
       alertErrorPass:document.getElementById("notification-error__inputPassUser"),
       alertErrorConfimPass:document.getElementById("notification-error__inputConfimPassUser"),
       //div container select vinculation.
       vinculationDiv:document.getElementById("containerActivation-User")
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
      category:document.getElementById("category_product"),
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

    export const DODCategory={
      //inputs
      name:document.getElementById("register_category"),
      description:document.getElementById("register_descrition-category"),
      //buttons
      btnRegCategory:document.getElementById("btn__reg-category"),
      btnCancelCategory:document.getElementById("btn__resetRegisterCategory"),    
      //modal
      modalGenerateEgress:document.getElementById("modal__generate-egress"),      
      //label
      alertErrorName:document.getElementById("notification-error__inputNameCategory"),
      alertErrorDescription:document.getElementById("notification-error__inputDescriptionCategory"), 
      //alert
      alert:document.getElementById("message-regCategory"),     
      //form 
      form:document.getElementById("form_reg_category"),
    }

     export const DODConsults={
       //Select
       category:document.getElementById("Consult_Category"),
       selectClient:document.getElementById("Consult_Category-ByClient"),
       selectUser:document.getElementById("Consult_Category-ByEmployee"),
       selectProduct:document.getElementById("Consult_Category-ByProduct"),
       selectSupplier:document.getElementById("Consult_Category-BySupplier"),
       //container selects
       containerSelectCli:document.getElementById("container_consult-client"),
       containerSelectUser:document.getElementById("container_consult-user"),
       containerSelectProd:document.getElementById("container_consult-product"),
       containerSelectSup:document.getElementById("container_consult-supplier"),
       //container table
       containerTableconsults:document.getElementById("container_table-consults"),
       //buttons
       btnListAll:document.getElementById("List_consult"),
       btnEditClient:document.getElementById("btn__edit-client"),
       btnCancelClient:document.getElementById("cancel__edit-client"),
       btnEditUser:document.getElementById("btn__edit-user"),
       btnCancelUser:document.getElementById("cancel__edit-user"),
       btnEditProduct:document.getElementById("btn__edit-product"),
       btnCancelProduct:document.getElementById("cancel__edit-product"),
       btnEditSupplier:document.getElementById("btn__edit-supplier"),
       btnCancelSupplier:document.getElementById("cancel__edit-supplier"),
       btnListByParameter:document.getElementById("btn-seach_parameter"),
  
      //title modal
       titleTableConsults:document.getElementById("title-table"),
       titleModalCient:document.getElementById("title-editClient"),
      //  titleModalEmploye:document.getElementById("title-editEmploye"),
       titleModalProduct:document.getElementById("title-editProduct"),
       titleModalSupplier:document.getElementById("title-editSupplier"),
       typeClient:document.getElementById("value"),
       
       //modal
       modalEditClient:document.getElementById("Modal__Edit-Client"),
       modalEditUser:document.getElementById("Modal__Edit-Employe"),
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
        selectEgress:document.getElementById("select_supplier-egress"),
        category:document.getElementById("select_category-egress"),
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
        idClient:document.getElementById("idClient__ByInvoice"),   
        client:document.getElementById("client__ByInvoice"),
        concep:document.getElementById("select-product__ByInvoice"),
        amount:document.getElementById("cant__byInvoice"), 
        price:document.getElementById("price-of__itemInvoice"),
        
        intoPaymentToInvoice:document.getElementById("input__payment-toinvoice"),
        
        //select
        selectCategory:document.getElementById("Consult_Category-ByInvoice"),
        selectTPayment:document.getElementById("select__tpayment-invoice"),
    
        // input date
        date1:document.getElementById("input__Date1-invoice"),
        date2:document.getElementById("input__Date2-invoice"),
      
        //buttons
        btnGenterateNewInvoice:document.getElementById("btn__geneterate-invoice"),
        btnConsultInvoice:document.getElementById("btn__consult-invoice"),
        btnConsultAllInvoice:document.getElementById("List_consultAllInvoice"),
        btnConsultAnullInvoice:document.getElementById("List_consultAmullInvoice"),
        btnAddItemInvoice:document.getElementById("add__item-byInvoice"),
        btnRegInvoice:document.getElementById("register__newInvoice"),
        btnCancelInvoice:document.getElementById("resetRegisterInvoice"),
        // btnRegisterNewClient:document.getElementById("registerNewClient"),
        btnCancelRegisterNewClient:document.getElementById("cancelRegisterNewClient"),
        btnPaymentToInvoice:document.getElementById("btn__payment-toInvoice"),
        btnCancelPaymentToInvoice:document.getElementById("btn__Cancelpayment-toInvoice"),
        // btnCancelAnnulmentInvoice:document.getElementById("btn__Cancelannulment-invoice"),
        // btnCloceListPayment:document.getElementById("btn__Cloce-listPayment"),
        // btnCancelRegNewVehicle:document.getElementById("btn_cancelReg_vehicle"),
        // btnAnnulmentInvoice:document.getElementById("btn__annulment-invoice"),


        //table
        tableForItemsInvoice:document.getElementById("table__items-invoice"),
        //container table 
        containerMain:document.getElementById("container__main-invoice"),
        containerTableConsultInvoice:document.getElementById("container_table-Invoice"),
        containerNewInvoice:document.getElementById("container__new-invoice"),
        containerConsultInvoice:document.getElementById("container__consult-invoice"), 
        containerFormItems:document.getElementById("container_form-items"),
        containerTable:document.getElementById("contaier__table-items"),
        containerdataItems:document.getElementById("container__info-items"),
        containerInfoClientPrintInvoice:document.getElementById("info__client-printInvoice"),
        containerListPayment:document.getElementById("container__table-listPaiment"),
        containerEditInvoice:document.getElementById("container__edit-invoice"),
               
        
        //label
        labelMissingBalance:document.getElementById("label__missing-balance"),
        //form 
        form:document.getElementById("form_reg_invoice"),
        
        //title
        titleCodInvoice:document.getElementById("title__code-invoice"),
        
        //text
        textTotalBruto:document.getElementById("text__total-bruto"),
        // textTotalNeto:document.getElementById("text__total-neto"),
        textTitlePaymentToInvoice:document.getElementById("title-payment-toInvoice"),
        
        //modal
        regNewClient:document.getElementById("Modal__register-client"),
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
        
