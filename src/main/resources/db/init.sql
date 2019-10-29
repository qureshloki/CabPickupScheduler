-- -----------------------------------------------------
-- Schema PickupSchedulerDb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PickupSchedulerDb` DEFAULT CHARACTER SET utf8 ;
USE `PickupSchedulerDb` ;

-- -----------------------------------------------------
-- Create Spring user with appropriate access
-- -----------------------------------------------------
CREATE USER IF NOT EXISTS 'springuser'@'localhost'
  IDENTIFIED BY 'spring123';
GRANT ALL
  ON PickupSchedulerDb.*
  TO 'springuser'@'localhost';

-- -----------------------------------------------------
-- Table `PickupSchedulerDb`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PickupSchedulerDb`.`Booking` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `custName` VARCHAR(255) NOT NULL,
 `latitude` DOUBLE NOT NULL,
 `longitude` DOUBLE NOT NULL,
 PRIMARY KEY (`id`));
 
-- -----------------------------------------------------
-- Table `PickupSchedulerDb`.`Driver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PickupSchedulerDb`.`Driver` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(255) NOT NULL,
 `status` VARCHAR(3) NOT NULL,
 `latitude` DOUBLE NOT NULL,
 `longitude` DOUBLE NOT NULL,
 `currentBookingId` INT,
PRIMARY KEY (`id`),
FOREIGN KEY (currentBookingId)
      REFERENCES Booking(id) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Add 5 drivers in Table `PickupSchedulerDb`.`Driver`
-- -----------------------------------------------------
INSERT INTO `PickupSchedulerDb`.`Driver` (`id`,`name`,`status`,`latitude`,`longitude`) VALUES
(1,'Leo Dell','avl',19.116689, 72.829902),
(2,'Geeta Das','avl',19.130176, 72.829017),
(3,'Jimmy Whang','avl',19.111244, 72.852474),
(4,'Krish Mani','avl',19.117553, 72.874828),
(5,'Shruti Jain','avl',19.137899, 72.851921); 
