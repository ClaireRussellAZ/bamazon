DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
-- the table data lists the increments and values--
CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    price DECIMAL(10, 4) NOT NULL,
    PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, stock_quantity, price)
values("Ugly Troll Doll", "Toys", 1, 9.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Eye of Newt", "Food", 40, 18.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Phony Garbage", "Home", 10, 1.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Murderous Hamster", "Toys", 5, 9.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Snakes lots of Em", "Toys", 200, 99.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Hilarious Toilet", "Home", 5, 470.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Make Your Own Toe", "Toys", 1, 28.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Grandmas Wrath", "Miscellaneous", 1, 809.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Wombat Soda", "Food", 500, 9.99);
insert into products (product_name, department_name, stock_quantity, price)
values("Big Old Blobby Thing", "Miscellaneous", 40, 99.99);
