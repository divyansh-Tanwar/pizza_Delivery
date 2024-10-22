const { default: axios } = require("axios");
import AWN from "awesome-notifications";
import moment from 'moment';
function initAdmin(socket) 
{  
  console.log('init ke ander ghus gya');
  const orderTableBody = document.getElementById("orderTableBody");
  let order = [];
  let markup;
  // console.log("inside initAdmin function");
  // The header X-Requested-With: XMLHttpRequest is a custom header that is often used to identify Ajax requests. When this header is
  //included in a request, it indicates to the server that the request was made using JavaScript (specifically, XMLHttpRequest or a
  // modern equivalent like fetch or axios).
  axios
    .get("/admin/orders", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((res) => {
      order = res.data;
      // console.log("received data");
      markup = generateMarkup(order);
      orderTableBody.innerHTML = markup;
    })
    .catch((err) => {
      console.log(err);
    });

  function renderItems(items) {
    let parsedItems = Object.values(items);
    return parsedItems
      .map((menuItem) => {
        return `
                <p>${menuItem.item.name} - ${menuItem.Qty} pcs </p>
            `;
      })
      .join("");
  }

  function generateMarkup(orders) {
    console.log("inside generate markup");
    return orders
      .map((order) => {
        // console.log('yaha hu');
        // console.log(orders);
        return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${order._id}</p>
                    <div>${renderItems(order.items)}</div>
                </td>
                <td class="border px-4 py-2">${order.CustomerId.name}</td>
                <td class="border px-4 py-2">${order.address}</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/admin/orders/status" method="POST">
                            <input type="hidden" name="orderId" value="${
                              order._id
                            }">
                            <select name="status" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="order_placed"
                                    ${
                                      order.status === "order_placed"
                                        ? "selected"
                                        : ""
                                    }>
                                    Placed</option>
                                <option value="confirmed" ${
                                  order.status === "confirmed" ? "selected" : ""
                                }>
                                    Confirmed</option>
                                <option value="prepared" ${
                                  order.status === "prepared" ? "selected" : ""
                                }>
                                    Prepared</option>
                                <option value="delivered" ${
                                  order.status === "delivered" ? "selected" : ""
                                }>
                                    Delivered
                                </option>
                                <option value="completed" ${
                                  order.status === "completed" ? "selected" : ""
                                }>
                                    Completed
                                </option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${moment(order.createdAt).format('hh:mm A')}
                </td>
                <td class="border px-4 py-2">
                    ${order.paymentStatus ? "paid" : "Not paid"}
                </td>
            </tr>
        `;
      })
      .join("");
  }
  
  socket
    .on('orderPlaced', async (data) => {
      let notifier = new AWN();
      notifier.success("new order");
      console.log("data")
      console.log(data);
      order.unshift(data);
      orderTableBody.innerHTML = '';
      orderTableBody.innerHTML = await generateMarkup(order);
    })
}
// module.exports = initAdmin;
export default initAdmin;
