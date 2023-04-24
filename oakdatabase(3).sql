/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
    `admin_id` INT(11) AUTO_INCREMENT,
    `admin_password` VARCHAR(100),
    `admin_fname` VARCHAR(100),
    `admin_lname` VARCHAR(100),
    `admin_phone` CHAR(10),
    `admin_email` VARCHAR(100),
    PRIMARY KEY (`admin_id`),
    KEY `NN` (
        `admin_password`,
        `admin_fname`,
        `admin_lname`,
        `admin_phone`,
        `admin_email`
    )
);

DROP TABLE IF EXISTS `Customer`;

CREATE TABLE `Customer` (
    `customer_id` int(11) AUTO_INCREMENT,
    `password` VARCHAR(100),
    `fname` VARCHAR(100),
    `lname` VARCHAR(100),
    `email` VARCHAR(100),
    `phone_num` CHAR(10),
    `address` VARCHAR(100),
    `customer_img` VARCHAR(100),
    `start_membership` DATE,
    PRIMARY KEY (`customer_id`),
    KEY `NN` (
        `password`,
        `fname`,
        `lname`,
        `email`,
        `phone_num`,
        `address`,
        `start_membership`
    )
);

DROP TABLE IF EXISTS `Publisher`;

CREATE TABLE `Publisher` (
    `publisher_id` INT AUTO_INCREMENT,
    `publisher_name` VARCHAR(100),
    PRIMARY KEY (`publisher_id`),
    KEY `NN` (`publisher_name`)
);

DROP TABLE IF EXISTS `Book_order`;

CREATE TABLE `Book_order` (
    `order_id` int(11) AUTO_INCREMENT,
    `customer_id` int(11),
    `date_of_borrow` DATE,
    `end_of_date` DATE,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) on delete cascade on update cascade,
    KEY `NN` (`date_of_borrow`, `end_of_date`)
);

DROP TABLE IF EXISTS `Author`;

CREATE TABLE `Author` (
    `author_id` int(3) AUTO_INCREMENT,
    `author_name` VARCHAR(100),
    `author_alias` VARCHAR(100),
    PRIMARY KEY (`author_id`),
    KEY `NN` (`author_name`),
    KEY `UNIQUE` (`author_alias`)
);

DROP TABLE IF EXISTS `Books`;

CREATE TABLE `Books` (
    `isbn` VARCHAR(13),
    `book_name` VARCHAR(100),
    `book_img` VARCHAR(100),
    `book_desc` VARCHAR(100),
    `publishered_date` DATE,
    `publisher_id` INT,
    `book_stock` INT,
    PRIMARY KEY (`isbn`),
    FOREIGN KEY (`publisher_id`) REFERENCES `Publisher`(`publisher_id` ) on delete cascade on update cascade,
    KEY `NN` (`book_name`, `book_desc`, `book_stock`)
);

DROP TABLE IF EXISTS `Book_order_line`;

CREATE TABLE `Book_order_line` (
    `order_line_id` INT AUTO_INCREMENT,
    `order_id` int(11),
    `isbn` VARCHAR(13),
    `status` ENUM('Borrowed', 'Returned'),
    PRIMARY KEY (`order_line_id`),
    FOREIGN KEY (`order_id`) REFERENCES `Book_order`(`order_id`) on delete cascade on update cascade,
    FOREIGN KEY (`isbn`) REFERENCES `Books`(`isbn`) on delete cascade on update cascade,
    KEY `NN` (`status`)
);

DROP TABLE IF EXISTS `Type`;

CREATE TABLE `Type` (
    `Type_id` CHAR(3),
    `book_type` VARCHAR(100),
    PRIMARY KEY (`Type_id`),
    KEY `UNIQUE` (`book_type`)
);

DROP TABLE IF EXISTS `Book_type`;

CREATE TABLE `Book_type` (
    `isbn` VARCHAR(13),
    `Type_id` CHAR(3),
    primary key (`isbn`, `Type_id`),
    FOREIGN KEY (`isbn`) REFERENCES `Books`(`isbn`) on delete cascade on update cascade,
    FOREIGN KEY (`Type_id`) REFERENCES `Type`(`Type_id`) on delete cascade on update cascade
);

DROP TABLE IF EXISTS `Book_Author`;

CREATE TABLE `Book_Author` (
    `isbn` VARCHAR(13),
    `author_id` int(3),
    primary key(`isbn`,`author_id`),
    FOREIGN KEY (`isbn`) REFERENCES `Books`(`isbn`) on delete cascade on update cascade,
    FOREIGN KEY (`author_id`) REFERENCES `Author`(`author_id`) on delete cascade on update cascade
);

DROP TABLE IF EXISTS `Book_possession`;

CREATE TABLE `Book_possession` (
    `customer_id` int(11),
    `isbn` VARCHAR(13),
    PRIMARY KEY( `isbn`, `customer_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) on delete cascade on update cascade,
    FOREIGN KEY (`isbn`) REFERENCES `Books`(`isbn`) on delete cascade on update cascade
);

drop table if exists `Comments`;

CREATE TABLE `Comments` (
    `comment_id` INT(11) AUTO_INCREMENT,
    `isbn` VARCHAR(13),
    `customer_id` INT(11),
    `comment` VARCHAR(255),
    `created_when` timestamp,
    PRIMARY KEY (`comment_id`),
    KEY `NN` (`comment`, `created_when`),
    FOREIGN KEY (`isbn`) REFERENCES `Books`(`isbn`) on delete cascade on update cascade,
    FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) on delete cascade on update cascade
);

INSERT INTO
    `Customer` (
        `password`,
        `fname`,
        `lname`,
        `email`,
        `phone_num`,
        `address`,
        `customer_img`,
        `start_membership`
    )
VALUES
    (
        'password1',
        'John',
        'Doe',
        'john.doe@example.com',
        '1234567890',
        '123 Main St',
        'img1.jpg',
        '2021-01-01'
    ),
    (
        'password2',
        'Jane',
        'Smith',
        'jane.smith@example.com',
        '2345678901',
        '456 Park Ave',
        'img2.jpg',
        '2021-01-02'
    ),
    (
        'password3',
        'Bob',
        'Johnson',
        'bob.johnson@example.com',
        '3456789012',
        '789 Broadway',
        'img3.jpg',
        '2021-01-03'
    ),
    (
        'password4',
        'Alice',
        'Williams',
        'alice.williams@example.com',
        '4567890123',
        '321 Elm St',
        'img4.jpg',
        '2021-01-04'
    ),
    (
        'password5',
        'Mike',
        'Brown',
        'mike.brown@example.com',
        '5678901234',
        '654 Oak Ave',
        'img5.jpg',
        '2021-01-05'
    ),
    (
        'password6',
        'Sarah',
        'Taylor',
        'sarah.taylor@example.com',
        '6789012345',
        '987 Maple St',
        'img6.jpg',
        '2021-01-06'
    ),
    (
        'password7',
        'Tom',
        'Anderson',
        'tom.anderson@example.com',
        '7890123456',
        '159 Cherry Ln',
        'img7.jpg',
        '2021-01-07'
    ),
    (
        'password8',
        'Emily',
        'Jackson',
        'emily.jackson@example.com',
        '8901234567',
        '753 Pine St',
        'img8.jpg',
        '2021-01-08'
    ),
    (
        'password9',
        'Chris',
        'Davis',
        'chris.davis@example.com',
        '9012345678',
        '246 Cedar Ave',
        'img9.jpg',
        '2021-01-09'
    ),
    (
        'password10',
        'Olivia',
        'Wilson',
        'olivia.wilson@example.com',
        '0123456789',
        '852 Walnut Blvd',
        'img10.jpg',
        '2021-01-10'
    );

INSERT INTO
    `Admin` (
        
        `admin_password`,
        `admin_fname`,
        `admin_lname`,
        `admin_phone`,
        `admin_email`
    )
VALUES
    (
        
        'pass123',
        'John',
        'Doe',
        '1234567890',
        'johndoe@example.com'
    ),
    (

        'pass456',
        'Jane',
        'Doe',
        '2345678901',
        'janedoe@example.com'
    ),
    (
     
        'pass789',
        'Michael',
        'Smith',
        '3456789012',
        'michaelsmith@example.com'
    ),
    (
    
        'passabc',
        'Emily',
        'Davis',
        '4567890123',
        'emilydavis@example.com'
    ),
    (
   
        'passdef',
        'David',
        'Wilson',
        '5678901234',
        'davidwilson@example.com'
    ),
    (
     
        'passghi',
        'Susan',
        'Garcia',
        '6789012345',
        'susangarcia@example.com'
    ),
    (

        'passjkl',
        'Daniel',
        'Brown',
        '7890123456',
        'danielbrown@example.com'
    ),
    (
     
        'passmno',
        'Laura',
        'Jones',
        '8901234567',
        'laurajones@example.com'
    ),
    (
    
        'passpqr',
        'Brian',
        'Taylor',
        '9012345678',
        'briantaylor@example.com'
    ),
    (
     
        'passstu',
        'Jessica',
        'Clark',
        '0123456789',
        'jessicaclark@example.com'
    );

INSERT INTO
    `Books` (
        `isbn`,
        `book_name`,
        `book_img`,
        `book_desc`,
        `publishered_date`,
        `publisher_id`,
        `book_stock`
    )
VALUES
    (
        '9780141033570',
        '1984',
        '/uploads/819ijTWp9JL.jpg',
        'A dystopian social science fiction novel by English novelist George Orwell',
        '1949-06-08',
        1,
        10
    ),
    (
        '9780061120084',
        'To Kill a Mockingbird',
        '/uploads/To_Kill_a_Mockingbird_(first_edition_cover).jpg',
        'A novel by Harper Lee',
        '1960-07-11',
        2,
        15
    ),
    (
        '9780345391803',
        'The Hitchhiker\'s Guide to the Galaxy',
        '/uploads/81XSN3hA5gL._AC_UF1000,1000_QL80_.jpg',
        'A comic science fiction series created by Douglas Adams',
        '1979-10-12',
        3,
        20
    ),
    (
        '9780670026193',
        'The Goldfinch',
        '/uploads/71fyVKrv5NL._AC_UF1000,1000_QL80_.jpg',
        'A novel by Donna Tartt',
        '2013-10-22',
        4,
        8
    ),
    (
        '9780316015844',
        'The Hunger Games',
        '/uploads/The_Hunger_Games_cover.jpg',
        'A dystopian novel by the American writer Suzanne Collins',
        '2008-09-14',
        5,
        25
    ),
    (
        '9780316067928',
        'Twilight',
        '/uploads/615ZIxEDozL._AC_UF1000,1000_QL80_.jpg',
        'A series of four vampire-themed fantasy romance novels by American author Stephenie Meyer',
        '2005-10-05',
        6,
        12
    ),
    (
        '9780747532743',
        'Harry Potter and the Philosopher\'s Stone',
        '/uploads/book_img-1681635695182.jfif',
        'A novel by British author J.K. Rowling',
        '1997-06-26',
        7,
        30
    ),
    (
        '9780439655484',
        'The Da Vinci Code',
        '/uploads/91Q5dCjc2KL._AC_UF1000,1000_QL80_.jpg',
        'A mystery thriller novel by Dan Brown',
        '2003-03-18',
        8,
        18
    ),
    (
        '9780321751041',
        'University Physics with Modern Physics',
        '/uploads/81JNB5TQaIL._AC_UF1000,1000_QL80_.jpg',
        'A textbook for a two-year introductory algebra-based physics course',
        '2012-05-24',
        9,
        5
    ),
    (
        '9780199540483',
        'The Oxford Dictionary of English',
        '/uploads/81JNB5TQaIL._AC_UF1000,1000_QL80_.jpg',
        'A dictionary published by Oxford University Press',
        '1998-08-06',
        10,
        7
    );

INSERT INTO
    `Publisher` (`publisher_name`)
VALUES
    ('Penguin Books'),
    ('HarperCollins'),
    ('Random House'),
    ('Simon & Schuster'),
    ('Macmillan Publishers'),
    ('Hachette Book Group'),
    ('Bloomsbury Publishing'),
    ('Scholastic Corporation'),
    ('Pearson Education'),
    ('Oxford University Press');

INSERT INTO
    `Author` (`author_name`, `author_alias`)
VALUES
    ('J.K. Rowling', 'Robert Galbraith'),
    ('Stephen King', NULL),
    ('Agatha Christie', NULL),
    ('Haruki Murakami', NULL),
    ('Neil Gaiman', NULL),
    ('Margaret Atwood', NULL),
    ('Toni Morrison', NULL),
    ('J.R.R. Tolkien', NULL),
    ('George R.R. Martin', NULL),
    ('Jane Austen', NULL);

INSERT INTO
    `Book_Author` (`isbn`, `author_id`)
VALUES
    ('9780061120084', 1),
    -- J.K. Rowling
    ('9780141033570', 2),
    -- Stephen King
    ('9780199540483', 3),
    -- Agatha Christie
    ('9780316015844', 4),
    -- Haruki Murakami
    ('9780316067928', 5),
    -- Neil Gaiman
    ('9780321751041', 6),
    -- Walter Savitch
    ('9780345391803', 7),
    -- Douglas Adams
    ('9780439655484', 1),
    -- J.K. Rowling
    ('9780670026193', 8),
    -- J.R.R. Tolkien
    ('9780747532743', 9);

-- George R.R. Martin
INSERT INTO
    `Type` (`Type_id`, `book_type`)
VALUES
    ('FIC', 'Fiction'),
    ('NON', 'Non-fiction'),
    ('BIO', 'Biography'),
    ('HIS', 'History'),
    ('SCI', 'Science'),
    ('ART', 'Art'),
    ('TRV', 'Travel'),
    ('SPT', 'Sports'),
    ('MED', 'Medicine'),
    ('BUS', 'Business');

insert into
    book_type value ('9780061120084', 'FIC'),
    ('9780141033570', 'FIC'),
    ('9780199540483', 'FIC'),
    ('9780316015844', 'FIC'),
    ('9780316067928', 'FIC'),
    ('9780321751041', 'SCI'),
    ('9780345391803', 'FIC'),
    ('9780439655484', 'FIC'),
    ('9780670026193', 'FIC'),
    ('9780747532743', 'FIC');

INSERT INTO
    `Book_order` (`customer_id`, `date_of_borrow`, `end_of_date`)
VALUES
    (1, '2023-04-16', '2023-05-16'),-- 1
    (2, '2023-04-17', '2023-05-17'),-- 2
    (3, '2023-04-18', '2023-05-18'),-- 3
    (4, '2023-04-19', '2023-05-19'),-- 4
    (5, '2023-04-20', '2023-05-20'),-- 5
    (6, '2023-04-21', '2023-05-21'),-- 6
    (7, '2023-04-22', '2023-05-22'),-- 7
    (8, '2023-04-23', '2023-05-23'),-- 8
    (9, '2023-04-24', '2023-05-24'),-- 9
    (10, '2023-04-25', '2023-05-25');-- 10

INSERT INTO
    `Book_order_line` (`order_line_id`, `order_id`, `isbn`, `status`)
VALUES
    (1, 1, '9780141033570', 'Borrowed'),
    (2, 1, '9780199540483', 'Borrowed'),
    (3, 2, '9780316015844', 'Returned'),
    (4, 2, '9780316067928', 'Returned'),
    (5, 3, '9780321751041', 'Borrowed'),
    (6, 4, '9780439655484', 'Borrowed'),
    (7, 5, '9780439655484', 'Borrowed'),
    (8, 6, '9780321751041', 'Returned'),
    (9, 7, '9780199540483', 'Borrowed'),
    (10, 8, '9780141033570', 'Borrowed'),
    (11, 9, '9780321751041', 'Borrowed'),
    (12, 10, '9780439655484', 'Borrowed'),
    (13, 10, '9780316067928', 'Borrowed');
INSERT INTO
    `Book_possession` (`customer_id`, `isbn`)
VALUES
    (1, '9780141033570'),
    (1, '9780199540483'),
    (3, '9780321751041'),
    (4, '9780439655484'),
    (5, '9780439655484'),
    (7, '9780199540483'),
    (8, '9780141033570'),
    (9, '9780321751041'),
    (10, '9780439655484'),
    (10, '9780316067928');

INSERT INTO Comments (isbn, customer_id, comment, created_when) VALUES
('9780141033570', 2, 'This book was amazing! Highly recommend it.', '2023-04-14 10:30:00'),
('9780141033570', 3, 'I found the plot confusing and hard to follow.', '2023-04-15 11:45:00'),
('9780141033570', 4, 'Loved the characters and the writing style.', '2023-04-15 13:20:00'),
('9780141033570', 2, 'One of the best books I have ever read!', '2023-04-12 09:15:00'),
('9780199540483', 5, 'The story was interesting, but the pacing was too slow for me.', '2023-04-13 14:55:00'),
('9780199540483', 6, 'This book made me cry. So beautiful and moving.', '2023-04-13 18:00:00'),
('9780199540483', 4, 'Great book! Could not put it down.', '2023-04-11 16:30:00'),
('9780199540483', 7, 'I thought this book was just okay. Nothing special.', '2023-04-12 13:10:00'),
('9780199540483', 8, 'The ending was a bit predictable, but still enjoyable overall.', '2023-04-13 11:20:00'),
('9780199540483', 2, 'Not my favorite book, but still worth a read.', '2023-04-10 12:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;