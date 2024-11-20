/*
 * UPDATE ITEM QUANTITY
 * Update the quantity for a cart line item.
 */
function updateLineItemQty(el) {
  let key = el.dataset.key;
  let id = el.dataset.id;
  let quantity = el.value;
  let row = el.closest('.js--cart-item');
  let data = {
    id: key,
    quantity: quantity
  };
  fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(cart => {
      if (quantity > 0) {
        row.querySelectorAll('.js--cart-item-total').forEach(function(el) {
          // Get details of the updated item.
          let item = cart.items.filter(function(lineitem) {
            if (lineitem.key === key) {
              return lineitem;
            }
          });
          el.innerText = moneyWithCurrency((item[0].final_line_price / 100));
        });
      } else {
        row.remove();
        removeGiftWrap(key);
      }
      // Update the total cart price.
      document.querySelectorAll('.js--cart-total').forEach(function(el) {
        el.innerText = moneyWithCurrency(cart.total_price / 100);
      });
      if (typeof window.spendMore === "function") {
        spendMore(cart);
      }
    });
};

/*
 * GIFT WRAP OPTION
 * Manages the gift wrap option in the cart.
 */
function runGiftWrap() {
  var $this = event.target;
  var lineItemTitle = $this.getAttribute("data-item-title");
  var lineItemKey = $this.value;
  if ($this.checked == true) {
    addGiftWrap(lineItemTitle, lineItemKey);
  } else {
    removeGiftWrap(lineItemKey);
  }
}

/*
 * ADD GIFT WRAP ITEM
 * Adds gift wrap product to cart.
 * @param lineItemTitle - Product title of the cart line item
 * @param lineItemKey (string) - Cart line item key
 */
function addGiftWrap(lineItemTitle, lineItemKey) {
  var data = {
    items: [{
      id: giftWrap.id,
      quantity: 1,
      properties: {
        Item: lineItemTitle,
        _id: lineItemKey,
      },
    }, ],
  };

  fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((update) => {
      fetch("/cart.json")
        .then((response) => response.json())
        .then((cart) => {
          document.querySelectorAll(".js--cart-total").forEach(function(el) {
            el.textContent = moneyWithCurrency(cart.total_price / 100);
          });
        });
    });
}

/*
 * REMOVE GIFT WRAP ITEM
 * Removes gift wrap item from the cart by setting its quantity to 0.
 * @param lineItemKey (string) - Cart line item key
 */
function removeGiftWrap(lineItemKey) {
  fetch("/cart.json")
    .then((response) => response.json())
    .then((cart) => {
      var item = cart.items.filter(function(item) {
        if (item.properties) {
          if (item.properties["_id"] == lineItemKey) {
            data = {
              id: item.key,
              quantity: 0,
            };
            fetch("/cart/change.js", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
              .then((response) => response.json())
              .then((cart) => {
                document.querySelectorAll(".js--cart-total").forEach(function(el) {
                  el.textContent = moneyWithCurrency(cart.total_price / 100);
                });
              });
          }
        }
      });
    });
}