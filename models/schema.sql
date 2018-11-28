DROP DATABASE IF EXISTS push_db;
CREATE DATABASE IF NOT EXISTS push_db;
USE push_db;
 
CREATE TABLE questions(
   questionId int not null auto_increment primary key,
   question varchar(255) not null,
) ENGINE=InnoDB;

CREATE TABLE users(
  userId INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  age INTEGER(11),
  gender BOOLEAN,
);
 
create table responses(
    questionID int,
    id int,
    FOREIGN KEY questionID (questionID)
    references questions (questionID), 
    FOREIGN KEY id (id)
    references user (userId)
    ON DELETE cascade
    ON UPDATE cascade,
    answer VARCHAR (50)
);
