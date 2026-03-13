/*==============================================================================
# WARNING: This file is auto-generated and any changes that are made may be lost.
==============================================================================*/
setTimeout(()=>{
  let helper = document.querySelector('.appikon-pre-order-form-complement-helper-hidden');
  let productDataHelper = document.querySelector('.appikon-pre-order-product-data-helper-hidden');
  let product = undefined;
  if (productDataHelper) {
    product = JSON.parse(productDataHelper.dataset.product);
  }
  var spg = Array.from(helper.querySelectorAll('.purchase-option'));
  let originalButonText = '';
  let variantSelectedReference = undefined;
  let KT_countdown_update = null;

  // ----------------------- Load jQuery --------------------------------

  (function() {
    var head = document.getElementsByTagName('head')[0];
    var startingTime = new Date().getTime();

    if (typeof jQuery == 'undefined') {
      var jQueryScript = document.createElement('script');
      jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
      jQueryScript.type = 'text/javascript';
      head.appendChild(jQueryScript);
    }
    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
      if (window.jQuery) {
        callback(jQuery);
      } else {
        window.setTimeout(function() {
          checkReady(callback);
        }, 20);
      }
    };

    // Start polling...
    checkReady(function($) {
      $(function() {
        var endingTime = new Date().getTime();
        var tookTime = endingTime - startingTime;
        console.log('Pre-order Today: jQuery is loaded, after ' + tookTime + ' milliseconds!');
      });
    });
  })();

  // ----------------------- Load jQuery --------------------------------

  //----------------------- HTML elements getters - Custom theme --------------------------------

  function getFormWithSellingPlan() {
    const variant = findSelectedVariant();
    if (variant) {
      const variantSettings = window._POConfig.variantSettings[variant.id];
      if (variantSettings && variantSettings.showPurchaseOptions !== false) {
        let formWithSellingPlan = document.querySelector('.appikon-pre-order-form-complement-helper');
        return formWithSellingPlan;
      }
    }

    var forms = Array.from(document.querySelectorAll("form[action$='/cart/add']"));
    let formWithSellingPlan = undefined;
    for (const form of forms) {
      if (form.querySelector('[name="selling_plan"]')) {
        formWithSellingPlan = form;
        break;
      }
    }
    return formWithSellingPlan;
  }

  function getSellingPlanSelected() {
    let formWithSellingPlan = getFormWithSellingPlan();
    let sellingPlan = undefined;
    if (formWithSellingPlan) {
      sellingPlan = formWithSellingPlan.querySelector('[name="selling_plan"]');
    }
    return sellingPlan;
  }

  function getFormWithButton() {
    var forms = Array.from(document.querySelectorAll("form[action$='/cart/add']"));
    let formWithButton = undefined;
    for (const form of forms) {
      var submitButtons = Array.from(form.querySelectorAll("[type='submit']"));
      for (let submitButton of submitButtons) {
        let classList = Array.from(submitButton.classList);
        if (!classList.find(cl => cl === 'appikon-pre-order-button-customization')) {
          formWithButton = form;
          break;
        }
      }
    }
    return formWithButton;
  }

  function getActionButton() {
    if (window._POConfig && window._POConfig.selectors.atcButtonSelector && window._POConfig.selectors.atcButtonSelector !== '') {
      var submitButtons = Array.from(document.querySelectorAll(window._POConfig.selectors.atcButtonSelector));
      for (let submitButton of submitButtons) {
        let classList = Array.from(submitButton.classList);
        if (!classList.find(cl => cl === 'appikon-pre-order-button-customization')) {
          return submitButton;
        }
      }
      console.log('Pre-order Today: Add to cart button not found, bad selector');
      return undefined;
    }
    var formWithButton = getFormWithButton();
    if (formWithButton) {
      var submitButtons = Array.from(formWithButton.querySelectorAll("[type='submit']"));
      for (let submitButton of submitButtons) {
        let classList = Array.from(submitButton.classList);
        if (!classList.find(cl => cl === 'appikon-pre-order-button-customization')) {
          return submitButton;
        }
      }
    }
    console.log('Pre-order Today: Add to cart button not found, add a selector');
    return undefined;
  }

  function getPriceContainer() {
  if (window._POConfig && window._POConfig.selectors.priceContainerSelector && window._POConfig.selectors.priceContainerSelector !== '') {
    let priceContainer = document.querySelector(window._POConfig.selectors.priceContainerSelector);
    return priceContainer;
  }
  let priceContainer = undefined;
  if(document){
    let body = document.querySelector('body');
    if (body) {
      let main = body.querySelector('main');
      if (main) {
        priceContainer = main.querySelector('.price');
      }
    }
  }
  return priceContainer;
}

  function getRegularPriceContainer() {
    if (
      window._POConfig &&
      window._POConfig.selectors.priceRegularValueContainerSelector &&
      window._POConfig.selectors.priceRegularValueContainerSelector !== ''
    ) {
      let priceRegularValueContainer = document.querySelector(window._POConfig.selectors.priceRegularValueContainerSelector);
      return priceRegularValueContainer;
    }
    let priceContainer = getPriceContainer();
    let priceRegularValue = undefined;
    if (priceContainer) {
      let priceContainerChild = priceContainer.querySelector('.price__container');
      if (priceContainerChild) {
        let priceRegularContainer = priceContainerChild.querySelector('.price__regular');
        if (priceRegularContainer) {
          priceRegularValue = priceRegularContainer.querySelector('.price-item');
        }
      }
    }
    return priceRegularValue;
  }

  function getAllCollectionLabels() {
    let collectionLabelList = Array.from(document.querySelectorAll(".appikon-pre-order-label-collection-page"));
    return collectionLabelList;
  }

  function getPrevousElementWithClassReference(htmlObject, prevElementClass) {
    // Obtiene el primer elemento con la clase "prevElementClass" que este por encima del objeto htmlObject
    let refElement=htmlObject;
    while(refElement){
      let prevRefElement = refElement.previousElementSibling;
      if (prevRefElement && prevRefElement.classList.contains(prevElementClass)) {
        return prevRefElement;
      }
      refElement=prevRefElement;
    }
    return null;
  }
  //----------------------- HTML elements getters - Custom theme --------------------------------

  //----------------------- Listeners --------------------------------

  document.addEventListener('click', function() {
    setTimeout(function() {
      let newSelectedVariant = findSelectedVariant();
      if (newSelectedVariant && newSelectedVariant !== variantSelectedReference) {
        variantSelectedReference = newSelectedVariant;
        showOrHidePreOrder();
      }
    }, 100);
  });

  window.setInterval(() => {
    let newSelectedVariant = findSelectedVariant();
    if (newSelectedVariant && newSelectedVariant !== variantSelectedReference) {
      variantSelectedReference = newSelectedVariant;
      showOrHidePreOrder();
    }
  }, 300);

  document.addEventListener('change', function(event) {
    setTimeout(function() {
      showOrHidePreOrder();
    }, 100);
  });

  let sellingPlanSelected = getSellingPlanSelected();
  if (sellingPlanSelected) {
    sellingPlanSelected.addEventListener('change', function(e) {
      showPreOrderDiscount();
    });
  }

  //----------------------- Listeners --------------------------------

  //----------------------- Logic --------------------------------

  function findSelectedVariant() {
    //Find in location url the value for variant param
    let url = new URL(window.location.href);
    let variantId = url.searchParams.get('variant');
    if (variantId) {
      let selectedVariantId = parseInt(variantId);
      let selectedVariant;
      for (let i = 0; i < product.variants.length; i++) {
        if (product.variants[i].id === selectedVariantId) {
          selectedVariant = product.variants[i];
          break;
        }
      }
      return selectedVariant;
    }

    //Find if there is a select with class single-option-selector by title
    let singleOptionSelectors = document.querySelectorAll('select.single-option-selector');
    let selectorValuesArray = [];
    if (singleOptionSelectors != null) {
      for (let singleOptionSelector of singleOptionSelectors) {
        if (singleOptionSelector != null && singleOptionSelector.selectedIndex != null && singleOptionSelector.selectedIndex !== -1) {
          selectorValuesArray.push(singleOptionSelector[singleOptionSelector.selectedIndex].value);
        }
      }
    }
    if (selectorValuesArray.length > 0) {
      let selectedVariantTitle = selectorValuesArray.join(' / ');
      for (let i = 0; i < product.variants.length; i++) {
        if (product.variants[i].title === selectedVariantTitle) {
          return product.variants[i];
        }
      }
    }
  
    //Find if there is a select with the variant id as value
    let selectOptionSelectors = document.querySelectorAll('select');
    let selectorSelectValuesArray = [];
    if (selectOptionSelectors != null) {
      for (let selectOptionSelector of selectOptionSelectors) {
        if (selectOptionSelector != null && selectOptionSelector.selectedIndex != null && selectOptionSelector.selectedIndex !== -1) {
          selectorSelectValuesArray.push(selectOptionSelector[selectOptionSelector.selectedIndex].value);
        }
      }
    }
    if (selectorSelectValuesArray.length > 0) {
      if(product && product.variants){
        for (let i = 0; i < product.variants.length; i++) {
          if (selectorSelectValuesArray.includes(product.variants[i].id.toString())) {
            return product.variants[i];
          }
        }
      }
    }

    // Select by default the first variant
    if (window._POConfig && window._POConfig.product) {
      let selectedVariant = window._POConfig.product.selected_or_first_available_variant;
      return selectedVariant;
    }
    return undefined;
  }

  function showOrHidePreOrder() {
    const variant = findSelectedVariant();
    if (window._POConfig && variant) {
      const variantSettings = window._POConfig.variantSettings[variant.id];
      const variantData = window._POConfig.product.variants.find(item => item.id.toString() === variant.id.toString());
      const cartQuantity = getVariantCartQuantity(variant.id);
      if (
        //solo se muestra el bloque si:
        variantData && //existe la variant data
        variantSettings &&
        variantSettings.preOrderEnabled && //la variante esta habilitada para pre order
        variantData.inventory_quantity <= 0 && //su inventario es igual o menor a cero
        variantData.available //si tiene continue selling without stock habilitado
      ) {
        // Chequea si existe la configuracion de la variante para analizar si existe una configuracion de tiempo durante el cual tiene que estar habilitado el pre order
        if (variantSettings.preOrderTimeEnable && variantSettings.dateStart && variantSettings.dateStop) {
          const now = new Date();
          if (parseInt(variantSettings.dateStart) <= now.getTime() && parseInt(variantSettings.dateStop) >= now.getTime()) {
            createCustomCSS();
            showPurchaseOptions();
            showPreOrderButton();
            showOrHideCountDownTimer(true);
            showPreOrderTag();
          } else {
            createCustomCSS();
            showSoldOutMessage();
            hidePurchaseOptions();
            showOrHideCountDownTimer(true);
            showPreOrderTag();
          }
        } else if (
          (variantSettings.overallQuantityLimit > 0 &&
            variantSettings.overallQuantityLimit <= variantSettings.totalQuantityOrdered + cartQuantity) ||
          (variantSettings.quantityLimit > 0 && variantSettings.quantityLimit <= cartQuantity)
        ) {
          //Condiciones:
          //1- Si se tiene un limite de cantidad TOTAL (implica la cantidad total que se puede comprar de un producto: overallQuantityLimit) seteado y se supera ese limite sumando la cantidad que hay compradas en todas las ordenes mas la cantidad que el usuario tiene en el carrito (que puede ser cero) -> se muestra sold out
          //2- Si se tiene un limite de cantidad POR ORDEN y el usuario tiene en su carrito esa cantidad o mas -> se muestra sold out
          createCustomCSS();
          showSoldOutMessage();
          hidePurchaseOptions();
          showOrHideCountDownTimer(true);
          showPreOrderTag();
        } else {
          createCustomCSS();
          showPurchaseOptions();
          showPreOrderButton();
          showOrHideCountDownTimer(true);
          showPreOrderTag();
        }
      } else {
        hidePurchaseOptions();
        hidePreOrderButton();
        hideSoldOutMessage();
        showOrHideCountDownTimer(false);
        hidePreOrderTag();
      }
    } else {
      hidePurchaseOptions();
      hidePreOrderButton();
      hideSoldOutMessage();
      showOrHideCountDownTimer(false);
      hidePreOrderTag();
    }
  }

  function createCustomCSS() {
    if (!document.getElementById('AppikonCustomAndPOLabelStyle')) {
      var AppikonCustomAndPOLabelstyle = document.createElement('style');
      AppikonCustomAndPOLabelstyle.id = 'AppikonCustomAndPOLabelStyle';
      AppikonCustomAndPOLabelstyle.innerHTML = window._POConfig.defaultSetting.collectionPagePreOrderLabelCSS;
      document.head.appendChild(AppikonCustomAndPOLabelstyle);
    }
  }

  function getVariantCartQuantity(variantId) {
    if (window._POConfig && window._POConfig.cart && window._POConfig.cart.items) {
      const cartItems = window._POConfig.cart.items;
      for (let item of cartItems) {
        if (item.id === variantId) {
          return item.quantity;
        }
      }
    }
    return 0;
  }

  function showPurchaseOptions() {
    const variant = findSelectedVariant();
    const variantSettings = window._POConfig.variantSettings[variant.id];
    if (variantSettings.showPurchaseOptions !== false) {
      let helper = document.querySelector('.appikon-pre-order-form-complement-helper-hidden');
      let purchaseOptions = document.querySelector('.appikon-pre-order-form-complement-helper');
      let actionButton = getActionButton();
      if (helper && actionButton && !purchaseOptions) {
        purchaseOptions = helper.cloneNode(true);
        purchaseOptions.classList.remove('appikon-pre-order-form-complement-helper-hidden');
        purchaseOptions.classList.remove('appikon-pre-order-hidden');
        purchaseOptions.classList.add('appikon-pre-order-form-complement-helper');
        let purchaseOptionsInputs = Array.from(purchaseOptions.querySelectorAll('.purchase-option'));
        for (const input of purchaseOptionsInputs) {
          input.addEventListener('change', function(e) {
            let formWithSellingPlan = getFormWithSellingPlan();
            let radio = input.querySelector('input[type="radio"]');
            if (formWithSellingPlan && radio.checked) {
              let sellingPlan = getSellingPlanSelected();
              sellingPlan.value = input.id;
              let sellingPlanDescription = purchaseOptions.querySelector('.appikon-pre-order-purchase-option-description');
              const sellingPlanGroupData = product.selling_plan_groups.find(
                sellingPlanGroup => sellingPlanGroup.selling_plans[0].id.toString() === input.id.toString()
              );
              sellingPlanDescription.innerHTML = sellingPlanGroupData.selling_plans[0].description;
            }
            showPreOrderDiscount();
          });
        }
        actionButton.before(purchaseOptions);
      }
      if (purchaseOptions) {
        showOrHideSellingPlans(purchaseOptions);
      }
      let variant = findSelectedVariant();
      let formWithSellingPlan = getFormWithSellingPlan();
      if (variant && formWithSellingPlan) {
        let sellingPlan = getSellingPlanSelected();
        let existSellingPlan = variant.selling_plan_allocations.find(
          variantSellingPlan => variantSellingPlan.selling_plan_id.toString() === sellingPlan.value.toString()
        );
        if (!existSellingPlan) {
          let newValue;
          if (variant.selling_plan_allocations.length > 0) {
            newValue = variant.selling_plan_allocations[0].selling_plan_id;
          } else {
            newValue = '';
          }
          let purchaseOptions = document.querySelector('.appikon-pre-order-form-complement-helper');
          if (purchaseOptions) {
            let purchaseOptionsInputs = Array.from(purchaseOptions.querySelectorAll('.purchase-option'));
            for (const input of purchaseOptionsInputs) {
              let radio = input.querySelector('input[type="radio"]');
              if (input.id.toString() === newValue.toString()) {
                radio.checked = true;
                let sellingPlanDescription = purchaseOptions.querySelector('.appikon-pre-order-purchase-option-description');
                const sellingPlanGroupData = product.selling_plan_groups.find(
                  sellingPlanGroup => sellingPlanGroup.selling_plans[0].id.toString() === input.id.toString()
                );
                sellingPlanDescription.innerHTML = sellingPlanGroupData.selling_plans[0].description;
              } else {
                radio.checked = false;
              }
            }
          }
          sellingPlan.value = newValue;
        }
      }
    } else {
      hidePurchaseOptions();
    }
  }

  function hidePurchaseOptions() {
    let purchaseOptions = document.querySelector('.appikon-pre-order-form-complement-helper');
    if (purchaseOptions) {
      purchaseOptions.remove();
    }
  }

  function showOrHideSellingPlans(purchaseOptions) {
    purchaseOptions = document.querySelector('.appikon-pre-order-form-complement-helper');
    const variant = findSelectedVariant();
    var spgOptions = Array.from(purchaseOptions.querySelectorAll('.purchase-option'));
    const variantSettings = window._POConfig.variantSettings[variant.id];
    if (variant.selling_plan_allocations.length > 0) {
      if (variantSettings.showPurchaseOptionsOnSingleSellingPlan !== true) {
        if (variant.selling_plan_allocations.length == 1) {
          purchaseOptions.classList.add('appikon-pre-order-single-option-hidden');
        } else {
          purchaseOptions.classList.remove('appikon-pre-order-single-option-hidden');
        }
      } else {
        purchaseOptions.classList.remove('appikon-pre-order-single-option-hidden');
      }
      for (const sp of spgOptions) {
        const existSellingPlan = variant.selling_plan_allocations.find(
          sellingPlan => sellingPlan.selling_plan_id.toString() === sp.id.toString()
        );
        if (existSellingPlan) {
          sp.classList.remove('appikon-pre-order-hidden');
        } else {
          sp.classList.add('appikon-pre-order-hidden');
        }
      }
    }
  }

  function showPreOrderButton() {
    hideSoldOutMessage(true);
    //hidePreOrderButton(true);
    const submitButton = getActionButton();
    if (submitButton) {
      const variant = findSelectedVariant();
      const variantSettings = window._POConfig.variantSettings[variant.id];
      let preOrderButtonContainerExists = document.querySelector('.appikon-pre-order-button');
      if(preOrderButtonContainerExists){
        let preOrderButton = preOrderButtonContainerExists.querySelector('.appikon-pre-order-button-customization');
        if(!preOrderButton){
          preOrderButtonContainerExists.remove();
          preOrderButtonContainerExists = null;
        }
      }
      if (!preOrderButtonContainerExists) {
        const preOrderButtonContainerHidden = document.querySelector('.appikon-pre-order-button-hidden');
        const preOrderButtonContainer = preOrderButtonContainerHidden.cloneNode(true);
        preOrderButtonContainer.classList.remove('appikon-pre-order-button-hidden');
        preOrderButtonContainer.classList.remove('appikon-pre-order-hidden');
        preOrderButtonContainer.classList.add('appikon-pre-order-button');
        let preOrderButton = preOrderButtonContainer.querySelector('.appikon-pre-order-button-customization');
        // copy css classes from submit button to pre order button
        preOrderButton.classList.add(...submitButton.classList);
        preOrderButton.classList.remove('appikon-pre-order-hidden');
        preOrderButton.innerHTML = variantSettings.buttonText || window._POConfig.defaultSetting.buttonText;

        //Needed workaround for themes that needs a span element inside button to not fail on click event
        const span = document.createElement('span');
        span.classList.add('appikon-pre-order-hidden');
        preOrderButton.appendChild(span);

        // add event listener to pre order button
       // preOrderButton.addEventListener('click', function(e) {
         // setTimeout(() => {
           // cartItem();
         // }, 700);
        // });

        if (variantSettings.buttonMessageVisibility === 'ON_HOVER') {
          preOrderButton.title = variantSettings.buttonMessage || window._POConfig.defaultSetting.buttonMessage;
          let preOrderButtonMessage = preOrderButtonContainer.querySelector('.appikon-pre-order-button-message');
          if (preOrderButtonMessage) {
            preOrderButtonMessage.classList.add('appikon-pre-order-hidden');
          }
        } else {
          let preOrderButtonMessage = preOrderButtonContainer.querySelector('.appikon-pre-order-button-message');
          preOrderButtonMessage.classList.remove('appikon-pre-order-hidden');
          preOrderButtonMessage.innerHTML = variantSettings.buttonMessage || window._POConfig.defaultSetting.buttonMessage;
        }
        let formWithSellingPlan = getFormWithSellingPlan();
        if (formWithSellingPlan) {
          let sellingPlan = getSellingPlanSelected();
          if (!sellingPlan || sellingPlan.value === '') {
            preOrderButton.disabled = true;
          } else {
            let existSellingPlanOnVariant = variant.selling_plan_allocations.find(
              variantSellingPlan => variantSellingPlan.selling_plan_id.toString() === sellingPlan.value.toString()
            );
            if (!existSellingPlanOnVariant) {
              preOrderButton.disabled = true;
            } else {
              preOrderButton.disabled = false;
            }
          }
        } else {
          preOrderButton.disabled = true;
        }
        //insert
        submitButton.before(preOrderButtonContainer);
        for (let i = 0; i < 1; i = i + 1) {
          setTimeout(() => {
            hideOtherButtonsInForm();
          }, i);
        }
      } else {
        let preOrderButton = preOrderButtonContainerExists.querySelector('.appikon-pre-order-button-customization');
        preOrderButton.innerHTML = variantSettings.buttonText || window._POConfig.defaultSetting.buttonText;
        //Needed workaround for themes that needs a span element inside button to not fail on click event
        const span = document.createElement('span');
        span.classList.add('appikon-pre-order-hidden');
        preOrderButton.appendChild(span);
        if (variantSettings.buttonMessageVisibility === 'ON_HOVER') {
          preOrderButton.title = variantSettings.buttonMessage || window._POConfig.defaultSetting.buttonMessage;
          let preOrderButtonMessage = preOrderButtonContainerExists.querySelector('.appikon-pre-order-button-message');
          if (preOrderButtonMessage) {
            preOrderButtonMessage.classList.add('appikon-pre-order-hidden');
          }
        } else {
          let preOrderButtonMessage = preOrderButtonContainerExists.querySelector('.appikon-pre-order-button-message');
          preOrderButtonMessage.classList.remove('appikon-pre-order-hidden');
          preOrderButtonMessage.innerHTML = variantSettings.buttonMessage || window._POConfig.defaultSetting.buttonMessage;
        }
        let formWithSellingPlan = getFormWithSellingPlan();
        if (formWithSellingPlan) {
          let sellingPlan = getSellingPlanSelected();
          if (!sellingPlan || sellingPlan.value === '') {
            preOrderButton.disabled = true;
          } else {
            let existSellingPlanOnVariant = variant.selling_plan_allocations.find(
              variantSellingPlan => variantSellingPlan.selling_plan_id.toString() === sellingPlan.value.toString()
            );
            if (!existSellingPlanOnVariant) {
              preOrderButton.disabled = true;
            } else {
              preOrderButton.disabled = false;
            }
          }
          let errorMessage = document.querySelector('.appikon-pre-order-purchase-option-error');
          if (errorMessage) {
            if (preOrderButton.disabled) {
              errorMessage.classList.remove('appikon-pre-order-hidden');
            } else {
              errorMessage.classList.add('appikon-pre-order-hidden');
            }
          }
        } else {
          preOrderButton.disabled = true;
        }
      }
    }
  }

  function showSoldOutMessage() {
    hidePreOrderButton(true);
    const submitButton = getActionButton();
    if (submitButton) {
      const variant = findSelectedVariant();
      const variantSettings = window._POConfig.variantSettings[variant.id];
      const preOrderSoldOutMessageExists = document.querySelector('.appikon-pre-order-sold-out-message');
      if (!preOrderSoldOutMessageExists) {
        const preOrderSoldOutMessageHidden = document.querySelector('.appikon-pre-order-sold-out-message-hidden');
        //clone
        const preOrderSoldOutMessage = preOrderSoldOutMessageHidden.cloneNode(true);
        preOrderSoldOutMessage.classList.remove('appikon-pre-order-sold-out-message-hidden');
        preOrderSoldOutMessage.classList.add('appikon-pre-order-sold-out-message');
        preOrderSoldOutMessage.innerHTML = variantSettings.preOrderClosedMessage;
        preOrderSoldOutMessage.classList.add(...submitButton.classList);
        preOrderSoldOutMessage.classList.remove('appikon-pre-order-hidden');
        //insert
        submitButton.before(preOrderSoldOutMessage);
        for (let i = 0; i < 1; i = i + 1) {
          setTimeout(() => {
            hideOtherButtonsInForm();
          }, i);
        }
      }
    }
  }

  function hidePreOrderButton(hideOtherButtons) {
    let preOrderButtonContainer = document.querySelector('.appikon-pre-order-button');
    if (preOrderButtonContainer) {
      preOrderButtonContainer.remove();
      if (hideOtherButtons) {
        hideOtherButtonsInForm();
      } else {
        showOtherButtonsInForm();
      }
    }
  }

  function hideSoldOutMessage(hideOtherButtons) {
    let preOrderSoldOutMessage = document.querySelector('.appikon-pre-order-sold-out-message');
    if (preOrderSoldOutMessage) {
      preOrderSoldOutMessage.remove();
      if (hideOtherButtons) {
        hideOtherButtonsInForm();
      } else {
        showOtherButtonsInForm();
      }
    }
  }

  function showOtherButtonsInForm() {
    if (window._POConfig && window._POConfig.selectors.payment_button_selectors) {
      var paymentButton = document.querySelector(window._POConfig.selectors.payment_button_selectors);
      if (paymentButton) {
        paymentButton.classList.remove('appikon-pre-order-hidden');
        paymentButton.disabled = false;
      }
    }
    let actionButton = getActionButton();
    if (actionButton) {
      actionButton.classList.remove('appikon-pre-order-hidden');
      actionButton.disabled = false;
      hidePreOrderTag();
      if (actionButton instanceof HTMLInputElement) {
        actionButton.classList.remove('appikon-pre-order-hide-input');
      }
    }
    let preOrderButton = document.querySelector('.appikon-pre-order-button-customization');
    if (preOrderButton) {
      preOrderButton.classList.add('appikon-pre-order-hidden');
    }
  }

  function hideOtherButtonsInForm() {
    if (window._POConfig && window._POConfig.selectors.payment_button_selectors) {
      var paymentButton = document.querySelector(window._POConfig.selectors.payment_button_selectors);
      if (paymentButton) {
        paymentButton.classList.add('appikon-pre-order-hidden');
        paymentButton.disabled = false;
      }
    }
    let actionButton = getActionButton();
    if (actionButton) {
      actionButton.classList.add('appikon-pre-order-hidden');
      actionButton.disabled = false;
      if (actionButton instanceof HTMLInputElement) {
        actionButton.classList.add('appikon-pre-order-hide-input');
      }
    }
    let preOrderButton = document.querySelector('.appikon-pre-order-button-customization');
    if (preOrderButton) {
      preOrderButton.classList.remove('appikon-pre-order-hidden');
    }
  }

  function createUserCustomizations() {
    if (window._POConfig) {
      createButtonCustomizations();
      createPillCustomizations();
    }
  }

  function createButtonCustomizations() {
    if (window._POConfig) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML =
        '.appikon-pre-order-button-customization { background-color: ' +
        (window._POConfig.button.buttonBackgroundColor || 'transparent') +
        ' !important; border-color: ' +
        (window._POConfig.button.buttonBorderColor || 'black') +
        ' !important; border-radius: ' +
        window._POConfig.button.buttonBorderRadius +
        'px !important; border-width: ' +
        (window._POConfig.button.buttonBorderWidth || '1') +
        'px !important; color: ' +
        (window._POConfig.button.buttonColor || 'black') +
        ' !important; padding-left: ' +
        window._POConfig.button.buttonPadding +
        'px !important; padding-right: ' +
        window._POConfig.button.buttonPadding +
        'px !important; font-size: ' +
        window._POConfig.button.buttonFontSize +
        'px !important; font-family: ' +
        window._POConfig.button.buttonFontFamily +
        ' !important; font-weight: ' +
        window._POConfig.button.buttonFontWeight +
        ' !important; text-decoration: ' +
        window._POConfig.button.buttonTextDecoration +
        ' !important; margin-top: ' +
        window._POConfig.button.buttonMarginTop +
        'px !important; margin-bottom: ' +
        window._POConfig.button.buttonMarginBottom +
        'px !important;' +
        'border-style: solid !important;' +
        '}';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  function createPillCustomizations() {
    if (window._POConfig) {
      //Toma la customizacion del boton y la aplica al pill (solo colores y bordes, no toda la customizacion)
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML =
        '.appikon-pre-order-pill-customization { background-color: ' +
        (window._POConfig.button.buttonBackgroundColor || 'transparent') +
        '; border-color: ' +
        (window._POConfig.button.buttonBorderColor || 'black') +
        '; border-radius: ' +
        window._POConfig.button.buttonBorderRadius +
        'px; border-width: ' +
        (window._POConfig.button.buttonBorderWidth || '1') +
        'px; color: ' +
        (window._POConfig.button.buttonColor || 'black') +
        '; padding-left: ' +
        window._POConfig.button.buttonPadding +
        'px; padding-right: ' +
        window._POConfig.button.buttonPadding +
        'px; font-size: ' +
        window._POConfig.button.buttonFontSize +
        'px; font-family: ' +
        window._POConfig.button.buttonFontFamily +
        '; font-weight: ' +
        window._POConfig.button.buttonFontWeight +
        '; text-decoration: ' +
        window._POConfig.button.buttonTextDecoration +
        '; margin-top: ' +
        window._POConfig.button.buttonMarginTop +
        'px; margin-bottom: ' +
        window._POConfig.button.buttonMarginBottom +
        'px;' +
        'margin-left: 10px; border-style: solid;' +
        '}';
      // style.innerHTML =
      //   '.appikon-pre-order-pill-customization { background-color: ' +
      //   (window._POConfig.button.buttonBackgroundColor || 'transparent') +
      //   '; border-color: ' +
      //   window._POConfig.button.buttonBorderColor +
      //   ';  border-width: ' +
      //   (window._POConfig.button.buttonBorderWidth || '1') +
      //   'px; color: ' +
      //   (window._POConfig.button.buttonColor || 'black') +
      //   '; font-size: ' +
      //   (window._POConfig.button.buttonFontSize || '14') +
      //   'px; font-family: ' +
      //   window._POConfig.button.buttonFontFamily +
      //   '; font-weight: ' +
      //   window._POConfig.button.buttonFontWeight +
      //   '; text-decoration: ' +
      //   window._POConfig.button.buttonTextDecoration +
      //   '; margin-left: 10px;' +
      //   'border-style: solid;' +
      //   '}';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  function showOrHideCountDownTimer(show) {
    if (window._POConfig) {
      const preOrderButton = document.querySelector('.appikon-pre-order-button');
      const soldOutMessage = document.querySelector('.appikon-pre-order-sold-out-message');
      if (preOrderButton || soldOutMessage) {
        const countDownTimer = document.querySelector('.appikon-pre-order-countdown-timer-hidden');
        const countDownTimerHeader = countDownTimer.querySelector('.appikon-pre-order-countdown-timer-header');
        const countDownTimerMessage = countDownTimer.querySelector('.appikon-pre-order-countdown-timer-message');
        if (show && countDownTimer && countDownTimerHeader && countDownTimerMessage) {
          const variant = findSelectedVariant();
          const variantSettings = window._POConfig.variantSettings[variant.id];

          if (variantSettings.comingSoonEnable && variantSettings.comingSoonAvailableFrom) {
            countDownTimerHeader.innerHTML = variantSettings.comingSoonHeader;
            countDownTimerMessage.innerHTML = variantSettings.comingSoonMessage;
            const second = 1000,
              minute = second * 60,
              hour = minute * 60,
              day = hour * 24;
            const countDown = new Date(parseInt(variantSettings.comingSoonAvailableFrom)).getTime();
            if (KT_countdown_update !== null) {
              clearInterval(KT_countdown_update);
            }
            let countDownTimerCopy = document.querySelector('.appikon-pre-order-countdown-timer');
            if (!countDownTimerCopy) {
              countDownTimerCopy = countDownTimer.cloneNode(true);
              countDownTimerCopy.classList.remove('appikon-pre-order-countdown-timer-hidden');
              countDownTimerCopy.classList.add('appikon-pre-order-countdown-timer');
              const actionButton = getActionButton();
              if (actionButton) {
                actionButton.after(countDownTimerCopy);
              } else {
                const soldOutMessage = document.querySelector('.appikon-pre-order-sold-out-message');
                if (soldOutMessage) {
                  soldOutMessage.after(countDownTimerCopy);
                }
              }
            }
            let now = new Date().getTime();
            if (countDown - now < 0) {
              if (KT_countdown_update !== null) {
                clearInterval(KT_countdown_update);
              }
              const countDownTimer = document.querySelector('.appikon-pre-order-countdown-timer');
              if (countDownTimer) {
                countDownTimer.remove();
              }
            } else {
              countDownTimerCopy.classList.remove('appikon-pre-order-hidden');
              loadAppkionTimer();
            }
          } else {
            if (KT_countdown_update !== null) {
              clearInterval(KT_countdown_update);
            }
            const countDownTimer = document.querySelector('.appikon-pre-order-countdown-timer');
            if (countDownTimer) {
              countDownTimer.remove();
            }
          }
        } else {
          if (KT_countdown_update !== null) {
            clearInterval(KT_countdown_update);
          }
          const countDownTimer = document.querySelector('.appikon-pre-order-countdown-timer');
          if (countDownTimer) {
            countDownTimer.remove();
          }
        }
      } else {
        if (KT_countdown_update !== null) {
          clearInterval(KT_countdown_update);
        }
        const countDownTimer = document.querySelector('.appikon-pre-order-countdown-timer');
        if (countDownTimer) {
          countDownTimer.remove();
        }
      }
    }
  }

  function showPreOrderTag() {
    for (let i = 0; i < 1000; i++) {
      setTimeout(function() {
        let tagExists = document.querySelector('.appikon-pre-order-tag');
        if (!tagExists) {
          let priceContainer = getPriceContainer();
          const node = document.createElement('span');
          node.classList.add('appikon-pre-order-tag');
          node.classList.add('appikon-pre-order-pill-customization');
          node.innerHTML = 'Pre-order';
          if (priceContainer) {
            priceContainer.appendChild(node);
          }
        }
        showPreOrderDiscount();
      }, i);
    }
  }

  function hidePreOrderTag() {
    // for (let i = 0; i < 1000; i++) {
    //   setTimeout(function() {
    //     let tagExists = document.querySelector('.appikon-pre-order-tag');
    //     if (tagExists) {
    //       tagExists.remove();
    //       let actionButton = getActionButton();
    //       if (actionButton) {
    //         actionButton.disabled = false;
    //       }
    //       if (window._POConfig && window._POConfig.selectors.payment_button_selectors) {
    //         var paymentButton = document.querySelector(window._POConfig.selectors.payment_button_selectors);
    //         if (paymentButton) {
    //           paymentButton.disabled = false;
    //         }
    //       }
    //     }
    //     hidePreOrderDiscount();
    //   }, i);
    // }
    setTimeout(function() {
      let tagExists = document.querySelector('.appikon-pre-order-tag');
      if (tagExists) {
        tagExists.remove();
        let actionButton = getActionButton();
        if (actionButton) {
          actionButton.disabled = false;
        }
        if (window._POConfig && window._POConfig.selectors.payment_button_selectors) {
          var paymentButton = document.querySelector(window._POConfig.selectors.payment_button_selectors);
          if (paymentButton) {
            paymentButton.disabled = false;
          }
        }
      }
      hidePreOrderDiscount();
    }, 1000);
  }

  function showPreOrderDiscount() {
    let priceRegularValueContainer = getRegularPriceContainer();
    let sellingPlanSelected = getSellingPlanSelected();
    if (priceRegularValueContainer && sellingPlanSelected) {
      const variant = findSelectedVariant();
      const sellingPlanData = variant.selling_plan_allocations.find(
        sp => sp.selling_plan_id.toString() === sellingPlanSelected.value.toString()
      );
      if (sellingPlanData && sellingPlanData.price_adjustments.length > 0) {
        const price = Number.parseFloat(sellingPlanData.price / 100).toFixed(2);
        let preOrderDiscountContainer = document.querySelector('.appikon-pre-order-discount');
        if (!preOrderDiscountContainer) {
          // si no se creo ese container lo crea
          const node = document.createElement('div');
          node.classList.add(...priceRegularValueContainer.classList);
          node.classList.add('appikon-pre-order-discount');
          preOrderDiscountContainer = node;
          //asocia ese container creado al del tag pre order
          let preOrderTag = document.querySelector('.appikon-pre-order-tag');
          if (preOrderTag) {
            preOrderTag.before(preOrderDiscountContainer);
          }
        }
        let newHtml =
          price + (window._POConfig && window._POConfig.cart && window._POConfig.cart.currency ? window._POConfig.cart.currency : '');
        if (preOrderDiscountContainer.innerHTML.replace(' ', '') !== newHtml.replace(' ', '')) {
          preOrderDiscountContainer.innerHTML = newHtml.replace(' ', '');
        }
        let classes = priceRegularValueContainer.classList;
        if (!classes.contains('appikon-pre-order-price-line-through')) {
          classes.add('appikon-pre-order-price-line-through');
        }
      } else {
        hidePreOrderDiscount();
      }
    } else {
      hidePreOrderDiscount();
    }
  }

  function hidePreOrderDiscount() {
    let priceRegularValueContainer = getRegularPriceContainer();
    if (priceRegularValueContainer) {
      priceRegularValueContainer.classList.remove('appikon-pre-order-price-line-through');
    }
    let preOrderDiscountContainer = document.querySelector('.appikon-pre-order-discount');
    if (preOrderDiscountContainer) {
      preOrderDiscountContainer.remove();
    }
  }


function showOrHideCollectionPageLabel(){
  if (window._POConfig) {
    let collectionPageLabelList = getAllCollectionLabels();
    if (collectionPageLabelList && collectionPageLabelList.length>0) {
      for(let collectionPageLabel of collectionPageLabelList){
        let product = JSON.parse(collectionPageLabel.getAttribute("product-data"));
        let appikonPOSettings = JSON.parse(collectionPageLabel.getAttribute("appikon-po-settings"));
        if(appikonPOSettings){
          let variantSettingsList=JSON.parse(appikonPOSettings.variantSettings);
          let showCollectionLabel=false;
          let hrefVariantHelper = getPrevousElementWithClassReference(collectionPageLabel,"appikon-pre-order-label-collection-page-helper-variant-href"); // Agregar esta clase a un item en el html que tenga el href con la url de la variante para obtener el id de la variante
          if(hrefVariantHelper && variantSettingsList){
            let url = hrefVariantHelper.getAttribute("href");
            if(url){
              let variantId = url.split("variant=").pop();
              if (variantId && variantSettingsList[variantId]) {
                const variantSettings = variantSettingsList[variantId];
                const variantData = product.variants.find(item => item.id.toString() === variantId.toString());
                if (
                  //solo se muestra el bloque si:
                  variantSettings &&
                  variantSettings.preOrderEnabled && //la variante esta habilitada para pre order
                  variantData &&
                  variantData.available //si tiene continue selling without stock habilitado
                ) {
                  showCollectionLabel=true;
                }
              }
            }
          }
          else if(variantSettingsList){
            for(let variant of product.variants){
              const variantSettings = variantSettingsList[variant.id];
              const variantData = product.variants.find(item => item.id.toString() === variant.id.toString());
              if (
                //solo se muestra el bloque si:
                variantSettings &&
                variantSettings.preOrderEnabled && //la variante esta habilitada para pre order
                variantData &&
                variantData.available //si tiene continue selling without stock habilitado
              ) {
                showCollectionLabel=true;
              }
            }
          }
          if(showCollectionLabel){
            collectionPageLabel.classList.remove('appikon-pre-order-hidden');
            if(window._POConfig.defaultSetting.collectionPagePreOrderLabelText && window._POConfig.defaultSetting.collectionPagePreOrderLabelText!==""){
              collectionPageLabel.textContent = window._POConfig.defaultSetting.collectionPagePreOrderLabelText
            }
            else{
              collectionPageLabel.textContent = "Pre order"
            }
          }
          else{
            collectionPageLabel.classList.add('appikon-pre-order-hidden');
          }
        }
      }
    }
  }
}

  //--------------------New timer--------------------

  function loadAppkionTimer() {
    function playanimation(old_value_po, new_value_po, type) {
      old_value_po = '0' + old_value_po;
      old_value_po = old_value_po.split('').reverse();
      new_value_po = '0' + new_value_po;
      new_value_po = new_value_po.split('').reverse();
      var left = '.countdown-KT .' + type + '0';
      var right = '.countdown-KT .' + type + '1';
      var isRightFlip = false;
      var isLeftFlip = false;
      isRightFlip = jQuery(right + ' .card-text-KT').text() != jQuery(right + ' .card-back-text-KT').text();
      isLeftFlip = jQuery(left + ' .card-text-KT').text() != jQuery(left + ' .card-back-text-KT').text();
      if (isRightFlip) {
        jQuery(right).addClass('flip-KT');
      }
      if (isLeftFlip) {
        jQuery(left).addClass('flip-KT');
      }
      setTimeout(function() {
        jQuery(right + ' .card-text-KT').html(old_value_po[0]);
        jQuery(right + ' .card-bottom-back-text-KT').html(old_value_po[0]);
        jQuery(right + ' .card-back-text-KT').html(new_value_po[0]);
        jQuery(right + ' .card-bottom-text-KT').html(new_value_po[0]);
        jQuery(left + ' .card-text-KT').html(old_value_po[1]);
        jQuery(left + ' .card-bottom-back-text-KT').html(old_value_po[1]);
        jQuery(left + ' .card-back-text-KT').html(new_value_po[1]);
        jQuery(left + ' .card-bottom-text-KT').html(new_value_po[1]);
        if (isLeftFlip) {
          jQuery(left).removeClass('flip-KT');
        }
        if (isRightFlip) {
          jQuery(right).removeClass('flip-KT');
        }
      }, 900);
    }

    function update_KT_CT() {
      var days_old_po = Math.floor(KT_TOTAL / (60 * 60 * 24));
      var hrs_old_po = Math.floor((KT_TOTAL % (60 * 60 * 24)) / (60 * 60));
      var mins_old_po = Math.floor((KT_TOTAL % (60 * 60)) / 60);
      var secs_old_po = KT_TOTAL % 60;
      KT_TOTAL--;
      var days_po = Math.floor(KT_TOTAL / (60 * 60 * 24));
      var hrs_po = Math.floor((KT_TOTAL % (60 * 60 * 24)) / (60 * 60));
      var mins_po = Math.floor((KT_TOTAL % (60 * 60)) / 60);
      var secs_po = KT_TOTAL % 60;
      if (KT_TOTAL < 0) {
        jQuery('.countdown-KT-full-width').css('display', 'none');
        clearInterval(KT_countdown_update);
        return;
      }
      playanimation(days_old_po, days_po, 'days');
      playanimation(hrs_old_po, hrs_po, 'hrs');
      playanimation(mins_old_po, mins_po, 'mins');
      playanimation(secs_old_po, secs_po, 'secs');
    }

    function initDigit(old_value_po, new_value_po, type) {
      old_value_po = '0' + old_value_po;
      old_value_po = old_value_po.split('').reverse();
      new_value_po = '0' + new_value_po;
      new_value_po = new_value_po.split('').reverse();
      var left = '.countdown-KT .' + type + '0';
      var right = '.countdown-KT .' + type + '1';
      jQuery(right + ' .card-text-KT').html(old_value_po[0]);
      jQuery(right + ' .card-bottom-back-text-KT').html(old_value_po[0]);
      jQuery(right + ' .card-back-text-KT').html(new_value_po[0]);
      jQuery(right + ' .card-bottom-text-KT').html(new_value_po[0]);
      jQuery(left + ' .card-text-KT').html(old_value_po[1]);
      jQuery(left + ' .card-bottom-back-text-KT').html(old_value_po[1]);
      jQuery(left + ' .card-back-text-KT').html(new_value_po[1]);
      jQuery(left + ' .card-bottom-text-KT').html(new_value_po[1]);
    }

    function initValues() {
      var days_old_po = Math.floor(KT_TOTAL / (60 * 60 * 24));
      var hrs_old_po = Math.floor((KT_TOTAL % (60 * 60 * 24)) / (60 * 60));
      var mins_old_po = Math.floor((KT_TOTAL % (60 * 60)) / 60);
      var secs_old_po = KT_TOTAL % 60;
      KT_TOTAL--;
      var days_po = Math.floor(KT_TOTAL / (60 * 60 * 24));
      var hrs_po = Math.floor((KT_TOTAL % (60 * 60 * 24)) / (60 * 60));
      var mins_po = Math.floor((KT_TOTAL % (60 * 60)) / 60);
      var secs_po = KT_TOTAL % 60;
      initDigit(days_old_po, days_po, 'days');
      initDigit(hrs_old_po, hrs_po, 'hrs');
      initDigit(mins_old_po, mins_po, 'mins');
      initDigit(secs_old_po, secs_po, 'secs');
    }

    function start_Countdown_KT() {
      if (KT_countdown_update) {
        clearInterval(KT_countdown_update);
      }
      var variant = findSelectedVariant();
      const variantSetting = window._POConfig.variantSettings[variant.id];

      KT_TOTAL = variantSetting ? Math.round((variantSetting.comingSoonAvailableFrom - Date.now()) / 1000) : -1;

      if (variantSetting.comingSoonEnable) {
        var n = 2;
        while (KT_TOTAL <= 0) {
          KT_TOTAL = Math.round((variantSetting.comingSoonAvailableFrom + n * 86400 - Date.now()) / 1000);
          n = n * 2;
        }
      }

      if (KT_TOTAL < 0) {
        return;
      }
      setTimeout(function() {
        initValues();
      }, 1000);
      KT_countdown_update = window.setInterval(() => {
        update_KT_CT();
      }, 1000);
      jQuery('.countdown-KT-full-width').removeClass('hide-KT');
      jQuery('.countdown-KT-full-width').addClass('fade-in-KT');
    }

    //only call if jQuery is loaded
    if (window.jQuery) {
      start_Countdown_KT();
    } else {
      window.setTimeout(function() {
        loadAppkionTimer();
      }, 20);
    }
  }
  //--------------------New timer--------------------

  //--------------------Add cart items properties--------------------
  //Used to add properties to item when it is added to cart
  async function cartItem() {
    const cartData = await fetch('/cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const cartDataJson = await cartData.json();
    const cartItems = cartDataJson.items;
    if (window._POConfig) {
      let hasChanged = false;
      let needReload = false;
      for (const item of cartItems) {
        const variantSetting = window._POConfig.variantSettings[item.id];
        if (variantSetting && variantSetting.preOrderEnabled) {
          const itemLine = cartItems.findIndex(it => it == item);
          let formQuantityData = addQuantityToFormData(item, variantSetting);
          let formPropertiesData = addPropertiesToFormData(itemLine, item, variantSetting, cartDataJson.currency);
          if (itemPropertiesHaveChanged(item.properties, formPropertiesData.properties) || item.quantity !== formQuantityData.quantity) {
            let formData = formPropertiesData;
            if (!itemPropertiesHaveChanged(item.properties, formPropertiesData.properties)) {
              delete formData.properties;
            }
            if (item.quantity !== formQuantityData.quantity) {
              needReload = true;
            }
            formData = {
              ...formData,
              quantity: formQuantityData.quantity
            };
            await fetch('/cart/change.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            hasChanged = true;
          }
        }
      }
      if (hasChanged) {
        hasChanged = false;
        if (needReload) {
          needReload = false;
          location.reload();
        }
      }
    }
  }

  function addQuantityToFormData(item, variantSetting) {
    var overallAvailable = variantSetting.overallQuantityLimit - variantSetting.totalQuantityOrdered;
    var fixedQuant = variantSetting.quantityLimit;
    let formQuantityData = {
      id: item.id.toString(),
      quantity: item.quantity
    };
    if (variantSetting.overallQuantityLimit == 0 && variantSetting.quantityLimit == 0) {
      return formQuantityData;
    }
    if (overallAvailable > 0 && variantSetting.quantityLimit > 0) {
      fixedQuant = Math.min(overallAvailable, variantSetting.quantityLimit);
      if (item.quantity > variantSetting.quantityLimit || item.quantity > overallAvailable) {
        formQuantityData.quantity = fixedQuant;
      }
    }
    if (item.quantity > variantSetting.quantityLimit && variantSetting.quantityLimit != 0 && variantSetting.overallQuantityLimit == 0) {
      formQuantityData.quantity = variantSetting.quantityLimit;
    }
    if (item.quantity > overallAvailable && variantSetting.quantityLimit == 0 && overallAvailable > 0) {
      formQuantityData.quantity = overallAvailable;
    }
    return formQuantityData;
  }

  function addPropertiesToFormData(itemLine, item, variantSetting, currency) {
    const cartLabel = variantSetting.cartCheckoutLabel;
    let formPropertiesData = {
      line: parseInt(itemLine) + 1,
      properties: {}
    };
    if (item.selling_plan_allocation) {
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = { ...properties, 'Pre-order': cartLabel };
    }
    if (item.selling_plan_allocation && variantSetting.showSellingPlanLabelOnCart) {
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = { ...properties, 'Purchase option': item.selling_plan_allocation.selling_plan.name };
    }
    if (item.selling_plan_allocation && variantSetting.showFullPriceLabelOnCart) {
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = { ...properties, 'Full price': item.final_price / 100 + ' ' + currency };
    }
    if (item.selling_plan_allocation && variantSetting.showPriceOnCheckoutLabelOnCart) {
      if (product.selling_plan_groups && product.selling_plan_groups.length > 0) {
        const sellingPlanGroup = product.selling_plan_groups.find(
          spg => spg.selling_plans[0].id.toString() === item.selling_plan_allocation.selling_plan.id.toString()
        );
        if (sellingPlanGroup) {
          if (sellingPlanGroup.selling_plans[0].checkout_charge) {
            let value;
            if (sellingPlanGroup.selling_plans[0].checkout_charge.value_type === 'percentage') {
              value = Number.parseFloat((item.final_price / 100) * (sellingPlanGroup.selling_plans[0].checkout_charge.value / 100)).toFixed(
                2
              );
            }
            if (sellingPlanGroup.selling_plans[0].checkout_charge.value_type === 'price') {
              value = sellingPlanGroup.selling_plans[0].checkout_charge.value / 100;
            }
            let properties = formPropertiesData.properties;
            formPropertiesData.properties = {
              ...properties,
              'Price at checkout': value + ' ' + currency
            };
          }
        }
      }
    }
    return formPropertiesData;
  }

  function itemPropertiesHaveChanged(itemProperties, formDataProperties) {
    if (!itemProperties && formDataProperties) {
      return true;
    }
    if (itemProperties['Pre-order'] !== formDataProperties['Pre-order']) {
      return true;
    }
    if (itemProperties['Purchase option'] !== formDataProperties['Purchase option']) {
      return true;
    }
    if (itemProperties['Full price'] !== formDataProperties['Full price']) {
      return true;
    }
    if (itemProperties['Price at checkout'] !== formDataProperties['Price at checkout']) {
      return true;
    }
    return false;
  }
  //--------------------Add cart items properties--------------------

  //--------------------On page load--------------------
  function onLoad() {
    showOrHidePreOrder();
    createUserCustomizations();
    showOrHideCollectionPageLabel();
  }
  setTimeout(() => {
    onLoad();
  }, 0);
  document.addEventListener('DOMContentLoaded', onLoad);
  //--------------------On page load--------------------

}, 0);
