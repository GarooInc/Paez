/*==============================================================================
# WARNING: This file is auto-generated and any changes that are made may be lost.
==============================================================================*/
var appikonSignal = false;
var runningRequest = false;
// document.addEventListener('click', async function(e) {
//   if (!appikonSignal) {
//     await cartItem();
//     setTimeout(async function() {
//       await cartItem();
//       appikonSignal = false;
//     }, 2000);
//   }
//   appikonSignal = true;
// });
document.addEventListener('click', async function(e) {
  appikonSignal = true;
});
window.setInterval(async () => {
  if(appikonSignal && !runningRequest){
    runningRequest = true;
    await cartItem();
    runningRequest = false;
  }
}, 1000);
document.addEventListener('DOMContentLoaded', async function(e) {
  await cartItem();
});

//This function update the quantity of a item in cart if it has pre order enabled and the quantity set is more than the allowed and add the properties selected
async function cartItem() {
  const cartData = await fetch(window.Shopify.routes.root+'cart.js', {
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
        const productData = await fetch(window.Shopify.routes.root + 'products/' + item.handle + '.js', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const prudctDataJson = await productData.json();
        let formQuantityData = addQuantityToFormData(item, variantSetting);
        let formPropertiesData = addPropertiesToFormData(itemLine, item, variantSetting, cartDataJson.currency, prudctDataJson);
        if (itemPropertiesHaveChanged(item.properties, formPropertiesData.properties) || item.quantity !== formQuantityData.quantity) {
          let formData=formPropertiesData;
          if(!itemPropertiesHaveChanged(item.properties, formPropertiesData.properties)){
              delete formData.properties
          }
          if(item.quantity !== formQuantityData.quantity){
            needReload = true;
          }
          formData={
              ...formData,
              quantity: formQuantityData.quantity
          }
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
      if(!window.location.href.includes("products") || needReload){
        needReload=false;
        window.location.reload();
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

function addPropertiesToFormData(itemLine, item, variantSetting, currency, product){
  const cartLabel = variantSetting.cartCheckoutLabel;
  let formPropertiesData = {
      line: parseInt(itemLine)+1,
      properties: {
      }
  };
  if(item.selling_plan_allocation && cartLabel!==""){
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = {...properties, "Pre-order": cartLabel}
  }
  if(item.selling_plan_allocation && variantSetting.showSellingPlanLabelOnCart){
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = {...properties, 'Purchase option': item.selling_plan_allocation.selling_plan.name}
  }
  if (item.selling_plan_allocation && variantSetting.showFullPriceLabelOnCart) {
      let properties = formPropertiesData.properties;
      formPropertiesData.properties = { ...properties, 'Full price': item.final_price / 100 + ' ' + currency };
  }
  if(item.selling_plan_allocation && variantSetting.showPriceOnCheckoutLabelOnCart){
    let properties = formPropertiesData.properties;
    if(item.properties && item.properties['Price at checkout']){
      formPropertiesData.properties = {...properties, 'Price at checkout': item.properties['Price at checkout'] };
    }
    else{
      const selector = item.id+'-'+item.selling_plan_allocation.selling_plan.id+'-price-at-checkout'; 
      let helper = document.getElementById(selector);
      if(helper){
        formPropertiesData.properties = {...properties, 'Price at checkout': parseFloat(parseInt(helper.innerHTML)/100).toFixed(2) + ' ' + currency };
      }
    }
  }
  return formPropertiesData;
}

function itemPropertiesHaveChanged(itemProperties, formDataProperties){
  if(!itemProperties && formDataProperties){
      return true;
  }
  if(
      itemProperties['Pre-order']!==formDataProperties['Pre-order']
  ){
      return true;
  }
  if(
      itemProperties['Purchase option']!==formDataProperties['Purchase option']
  ){
      return true;
  }
  if(
      itemProperties['Full price']!==formDataProperties['Full price']
  ){
      return true;
  }
  //Comented because product api doesnt return checkout_charge property on selling plan
  if (itemProperties['Price at checkout'] !== formDataProperties['Price at checkout']) {
    return true;
  }
  return false;
}

cartItem();
