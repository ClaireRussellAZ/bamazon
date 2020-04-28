const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
   host: 'localhost',
   port: 3000,
   user: 'root',
   password: 'bigmac77',
   database: 'bamazon'
})
const openStore = () => {
   // display intem in MySql
   connection.query('SELECT * FROM products', function(err, res) {
      if (err) throw err;
      console.log(
         '\nBamazon\n' +
         '--------------------------------\n' +
         'Items in Stock:\n' +
         '--------------------------------\n'
      );
      for (var i = 0 ; i < res.length ; i++) {
         console.log(
            'Item ID: ' + res[i].item_id +  
            '\nProduct Name: ' + res[i].product_name +  
            '\nDepartment Name: ' + res[i].department_name +  
            '\nPrice: $' + res[i].price + 
            '\nUnits Available: ' + res[i].stock_quantity + 
            '\n************************\n'
         );
      }
      console.log('--------------------------------');
      promptPurchase();
   })
}

const promptPurchase = () => {
   //info on wanted item
   inquirer.prompt([
      {
            name: 'item_id',
            type: 'input',
            message: 'What is the ID of the product you would like?',
            validate: (value) => {
                  if (!isNaN(value) && value > 0) {
                  return true;
                  } else {
                  console.log("Uh oh, we're noticing some suspicious activity");
                  return false;
                  }
            }  
      },
      {
            name: 'amount',
            type: 'input',
            message: 'How many do you need?',
            validate: (value) => {
                  if (!isNaN(value) && value > 0) {
                  return true;
                  } else {
                  console.log("Uh oh, we're noticing some suspicious activity");
                  return false;
                  }
            }
      }
   ]).then(function(answer) {
      let product = answer.item_id;
      let quantity = answer.amount;
      //connect with mysql to bring up the data
      connection.query('SELECT * FROM products WHERE ?', {item_id:product}, function(err, res) {
         if (err) throw err;
            let productData = res[0];
            if (productData.stock_quantity >= quantity) { 
               //inquirer to confirm with customer that the order is correct with yes or no
               inquirer.prompt([
                  {
                     name: 'orderConfirm',
                     type: 'confirm',
                     message: 'Please confirm your order:\n------------------------\nProduct ID: ' + productData.item_id + 
                        '\nProduct Name: ' + productData.product_name + 
                        '\nQuantity Requested: ' + quantity + 
                        '\nPrice / Unit: ' + productData.price + 
                        '\n------------------------------' +
                        '\nDo you wish to proceed with placing the order'
                  }
               ]).then(function(response){
                  if (response.orderConfirm){ //to update product quantity and place order
                     let updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + product;
                     connection.query(updateQuery, function(err, res){
                        if (err) throw err;
                        console.log(
                           'Great! We have placed your order. Your total is $' + (productData.price * quantity) +
                           '\nThanks for shopping with us! Your order will arrive soon...'
                        );
                        //continue shopping
                        inquirer.prompt([
                           {
                              name: 'shopConfirm',
                              type: 'confirm',
                              message: 'Do you wish to keep shopping?'
                           }
                        ]).then(function(check){
                           if (check.shopConfirm){
                              openStore();
                           } else {
                              connection.end();
                           }
                        })
                     })
                  } 
                  else { //If order encounters an error
                     console.log("Please review order for mistakes");
                     promptPurchase(); 
                  } 
               })
            }           
            else { //if there's not enough in stock
               console.log("Not enough in our stocks");
               promptPurchase();
            }
      })
   })
}
// launch 
openStore();