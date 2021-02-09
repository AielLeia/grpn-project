-- MySQL Script generated by MySQL Workbench
-- Tue Feb  9 08:50:54 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FormationBD
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FormationBD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FormationBD` DEFAULT CHARACTER SET utf8 ;
USE `FormationBD` ;

-- -----------------------------------------------------
-- Table `FormationBD`.`Compte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`Compte` (
  `pseudo` INT NOT NULL,
  `motDePasse` VARCHAR(256) NULL,
  `nom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `adresseMail` VARCHAR(45) NULL,
  PRIMARY KEY (`pseudo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`UnitePedagogique`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`UnitePedagogique` (
  `idUP` INT NOT NULL,
  `nomUP` VARCHAR(45) NULL,
  `Compte_pseudo` INT NOT NULL,
  PRIMARY KEY (`idUP`, `Compte_pseudo`),
  INDEX `fk_UnitePedagogique_Compte_idx` (`Compte_pseudo` ASC) VISIBLE,
  CONSTRAINT `fk_UnitePedagogique_Compte`
    FOREIGN KEY (`Compte_pseudo`)
    REFERENCES `FormationBD`.`Compte` (`pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`ModuleFormation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`ModuleFormation` (
  `idMF` INT NOT NULL,
  `nomMF` VARCHAR(45) NULL,
  `Compte_pseudo` INT NOT NULL,
  `UnitePedagogique_idUP` INT NOT NULL,
  `UnitePedagogique_Compte_pseudo` INT NOT NULL,
  PRIMARY KEY (`idMF`, `Compte_pseudo`, `UnitePedagogique_idUP`, `UnitePedagogique_Compte_pseudo`),
  INDEX `fk_ModuleFormation_Compte1_idx` (`Compte_pseudo` ASC) VISIBLE,
  INDEX `fk_ModuleFormation_UnitePedagogique1_idx` (`UnitePedagogique_idUP` ASC, `UnitePedagogique_Compte_pseudo` ASC) VISIBLE,
  CONSTRAINT `fk_ModuleFormation_Compte1`
    FOREIGN KEY (`Compte_pseudo`)
    REFERENCES `FormationBD`.`Compte` (`pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ModuleFormation_UnitePedagogique1`
    FOREIGN KEY (`UnitePedagogique_idUP` , `UnitePedagogique_Compte_pseudo`)
    REFERENCES `FormationBD`.`UnitePedagogique` (`idUP` , `Compte_pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`NiveauFormation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`NiveauFormation` (
  `idNF` INT NOT NULL,
  `nomNF` VARCHAR(45) NULL,
  `Compte_pseudo` INT NOT NULL,
  PRIMARY KEY (`idNF`, `Compte_pseudo`),
  INDEX `fk_NiveauFormation_Compte1_idx` (`Compte_pseudo` ASC) VISIBLE,
  CONSTRAINT `fk_NiveauFormation_Compte1`
    FOREIGN KEY (`Compte_pseudo`)
    REFERENCES `FormationBD`.`Compte` (`pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`UnitePedagogique_has_NiveauFormation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`UnitePedagogique_has_NiveauFormation` (
  `UnitePedagogique_idUP` INT NOT NULL,
  `UnitePedagogique_Compte_pseudo` INT NOT NULL,
  `NiveauFormation_idNF` INT NOT NULL,
  `NiveauFormation_Compte_pseudo` INT NOT NULL,
  PRIMARY KEY (`UnitePedagogique_idUP`, `UnitePedagogique_Compte_pseudo`, `NiveauFormation_idNF`, `NiveauFormation_Compte_pseudo`),
  INDEX `fk_UnitePedagogique_has_NiveauFormation_NiveauFormation1_idx` (`NiveauFormation_idNF` ASC, `NiveauFormation_Compte_pseudo` ASC) VISIBLE,
  INDEX `fk_UnitePedagogique_has_NiveauFormation_UnitePedagogique1_idx` (`UnitePedagogique_idUP` ASC, `UnitePedagogique_Compte_pseudo` ASC) VISIBLE,
  CONSTRAINT `fk_UnitePedagogique_has_NiveauFormation_UnitePedagogique1`
    FOREIGN KEY (`UnitePedagogique_idUP` , `UnitePedagogique_Compte_pseudo`)
    REFERENCES `FormationBD`.`UnitePedagogique` (`idUP` , `Compte_pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UnitePedagogique_has_NiveauFormation_NiveauFormation1`
    FOREIGN KEY (`NiveauFormation_idNF` , `NiveauFormation_Compte_pseudo`)
    REFERENCES `FormationBD`.`NiveauFormation` (`idNF` , `Compte_pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`Messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`Messages` (
  `idMessages` INT NOT NULL,
  `messageEnvoye` VARCHAR(45) NULL,
  `messageRecu` VARCHAR(45) NULL,
  PRIMARY KEY (`idMessages`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FormationBD`.`Compte_has_Messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FormationBD`.`Compte_has_Messages` (
  `Compte_pseudo` INT NOT NULL,
  `Messages_idMessages` INT NOT NULL,
  PRIMARY KEY (`Compte_pseudo`, `Messages_idMessages`),
  INDEX `fk_Compte_has_Messages_Messages1_idx` (`Messages_idMessages` ASC) VISIBLE,
  INDEX `fk_Compte_has_Messages_Compte1_idx` (`Compte_pseudo` ASC) VISIBLE,
  CONSTRAINT `fk_Compte_has_Messages_Compte1`
    FOREIGN KEY (`Compte_pseudo`)
    REFERENCES `FormationBD`.`Compte` (`pseudo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Compte_has_Messages_Messages1`
    FOREIGN KEY (`Messages_idMessages`)
    REFERENCES `FormationBD`.`Messages` (`idMessages`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
