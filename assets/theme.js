// Define a convenience method and use it like
// ready(() => {...});
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

/*
|-----------------------------------------
| History State
|-----------------------------------------
| Check if window.history is supported
*/
function historyState() {
  return window.history && window.history.replaceState;
};

/*
|-----------------------------------------
| Format Money
|-----------------------------------------
| Formats the passed value as money with
| currency symbol.
*/
function moneyWithCurrency(value) {
  if (value != undefined) {
    var $string = value.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
    return $string;
  }
}

ready(function() {
  /*
  |-----------------------------------------
  | Option Selector
  |-----------------------------------------
  | Works the variant option dropdowns used on the
  | product page template.
  */
  var variant;
  var options = [];
  options[1] = null;
  options[2] = null;
  options[3] = null;

  var variantOptions = document.querySelectorAll(".js--variant-option");
  variantOptions.forEach(function(el) {
    el.addEventListener("change", function(event) {
      variantOptions.forEach(function(opt) {
        if (opt.tagName.toLowerCase() == 'input' && opt.checked == true) {
          var optionName = opt.getAttribute("name");
          var optionPos = parseInt(optionName.replace("option", ""));
          var optionValue = opt.value;
          options[optionPos] = optionValue;
        }
      });

      variants.filter(function(v) {
        if (v.option1 == options[1] && v.option2 == options[2] && v.option3 == options[3]) {
          variant = v;
          console.log(v);

          // Update variant id and prices
          var variantPrice = (v.price / 100).toFixed(2);
          document.querySelector("input#js--variant-id").value = v.id;
          document.querySelectorAll(".js--variant-price").forEach(function(el) {
            el.innerText = `£${variantPrice}`;
          });

          if (v.compare_at_price > v.price) {
            var variantCompareAtPrice = (v.compare_at_price / 100).toFixed(2);
            document.querySelectorAll(".js--variant-compareatprice").forEach(function(el) {
              el.innerText = `Was £${variantCompareAtPrice}`;
            });
          } else {
            document.querySelectorAll(".js--variant-compareatprice").forEach(function(el) {
              el.innerText = "";
            });
          }

          // Disable the buy button if product is unavailable
          if (v.available === false) {
            document.querySelector("#js--addtocart").disabled = true;
            document.querySelector("#js--addtocart").innerText = "Unavailable";
          } else {
            document.querySelector("#js--addtocart").disabled = false;
            document.querySelector("#js--addtocart").innerText = "Add to basket";
          }

          // Update image
          if (v.featured_image != null) {
            var imageId = v.featured_image.id;
            var imageIndex = document
              .querySelector('.product-image-item[data-imageid="' + imageId + '"]')
              .getAttribute("data-index");
            var sliderContainer = document.querySelector(".product-images-component");
            goToImage(imageIndex, sliderContainer);
          }

          // Append the variant ID as a url parameter
          if (v != undefined) {
            if (historyState()) {
              window.history.replaceState({}, document.title, "?variant=" + v.id);
            }
          }
        }
      });
    });
  });

});