-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 09, 2021 at 08:22 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `FormationBD`
--


DROP DATABASE IF EXISTS FormationBD;
CREATE DATABASE IF NOT EXISTS FormationBD;
USE FormationBD;

-- --------------------------------------------------------

--
-- Table structure for table `Compte`
--

CREATE TABLE `Compte` (
  `pseudo` varchar(45) NOT NULL,
  `motDePasse` varchar(256) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresseMail` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Compte`
--

INSERT INTO `Compte` (`pseudo`, `motDePasse`, `nom`, `prenom`, `adresseMail`) VALUES
('junior', 'U2FsdGVkX18ljijOtsMGLyJ+L+PUfSBzvI3kXWSqIKQ=', 'junior', 'junior', 'juniorelengaalphonse@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Compte_has_Messages`
--

CREATE TABLE `Compte_has_Messages` (
  `Compte_pseudo` varchar(45) NOT NULL,
  `Messages_idMessages` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `idMessages` int(11) NOT NULL,
  `messageEnvoye` varchar(45) DEFAULT NULL,
  `messageRecu` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ModuleFormation`
--

CREATE TABLE `ModuleFormation` (
  `idMF` int(11) NOT NULL,
  `nomMF` varchar(45) DEFAULT NULL,
  `Compte_pseudo` varchar(45) NOT NULL,
  `UnitePedagogique_idUP` int(11) NOT NULL,
  `UnitePedagogique_Compte_pseudo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `NiveauFormation`
--

CREATE TABLE `NiveauFormation` (
  `idNF` int(11) NOT NULL,
  `nomNF` varchar(45) DEFAULT NULL,
  `Compte_pseudo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UnitePedagogique`
--

CREATE TABLE `UnitePedagogique` (
  `idUP` int(11) NOT NULL,
  `nomUP` varchar(45) DEFAULT NULL,
  `Compte_pseudo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UnitePedagogique_has_NiveauFormation`
--

CREATE TABLE `UnitePedagogique_has_NiveauFormation` (
  `UnitePedagogique_idUP` int(11) NOT NULL,
  `UnitePedagogique_Compte_pseudo` varchar(45) NOT NULL,
  `NiveauFormation_idNF` int(11) NOT NULL,
  `NiveauFormation_Compte_pseudo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Compte`
--
ALTER TABLE `Compte`
  ADD PRIMARY KEY (`pseudo`);

--
-- Indexes for table `Compte_has_Messages`
--
ALTER TABLE `Compte_has_Messages`
  ADD PRIMARY KEY (`Compte_pseudo`,`Messages_idMessages`),
  ADD KEY `fk_Compte_has_Messages_Messages1_idx` (`Messages_idMessages`),
  ADD KEY `fk_Compte_has_Messages_Compte1_idx` (`Compte_pseudo`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`idMessages`);

--
-- Indexes for table `ModuleFormation`
--
ALTER TABLE `ModuleFormation`
  ADD PRIMARY KEY (`idMF`,`Compte_pseudo`,`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`),
  ADD KEY `fk_ModuleFormation_Compte1_idx` (`Compte_pseudo`),
  ADD KEY `fk_ModuleFormation_UnitePedagogique1_idx` (`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`);

--
-- Indexes for table `NiveauFormation`
--
ALTER TABLE `NiveauFormation`
  ADD PRIMARY KEY (`idNF`,`Compte_pseudo`),
  ADD KEY `fk_NiveauFormation_Compte1_idx` (`Compte_pseudo`);

--
-- Indexes for table `UnitePedagogique`
--
ALTER TABLE `UnitePedagogique`
  ADD PRIMARY KEY (`idUP`,`Compte_pseudo`),
  ADD KEY `fk_UnitePedagogique_Compte_idx` (`Compte_pseudo`);

--
-- Indexes for table `UnitePedagogique_has_NiveauFormation`
--
ALTER TABLE `UnitePedagogique_has_NiveauFormation`
  ADD PRIMARY KEY (`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`,`NiveauFormation_idNF`,`NiveauFormation_Compte_pseudo`),
  ADD KEY `fk_UnitePedagogique_has_NiveauFormation_NiveauFormation1_idx` (`NiveauFormation_idNF`,`NiveauFormation_Compte_pseudo`),
  ADD KEY `fk_UnitePedagogique_has_NiveauFormation_UnitePedagogique1_idx` (`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Compte_has_Messages`
--
ALTER TABLE `Compte_has_Messages`
  ADD CONSTRAINT `fk_Compte_has_Messages_Compte1` FOREIGN KEY (`Compte_pseudo`) REFERENCES `Compte` (`pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Compte_has_Messages_Messages1` FOREIGN KEY (`Messages_idMessages`) REFERENCES `Messages` (`idMessages`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ModuleFormation`
--
ALTER TABLE `ModuleFormation`
  ADD CONSTRAINT `fk_ModuleFormation_Compte1` FOREIGN KEY (`Compte_pseudo`) REFERENCES `Compte` (`pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ModuleFormation_UnitePedagogique1` FOREIGN KEY (`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`) REFERENCES `UnitePedagogique` (`idUP`, `Compte_pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `NiveauFormation`
--
ALTER TABLE `NiveauFormation`
  ADD CONSTRAINT `fk_NiveauFormation_Compte1` FOREIGN KEY (`Compte_pseudo`) REFERENCES `Compte` (`pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `UnitePedagogique`
--
ALTER TABLE `UnitePedagogique`
  ADD CONSTRAINT `fk_UnitePedagogique_Compte` FOREIGN KEY (`Compte_pseudo`) REFERENCES `Compte` (`pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `UnitePedagogique_has_NiveauFormation`
--
ALTER TABLE `UnitePedagogique_has_NiveauFormation`
  ADD CONSTRAINT `fk_UnitePedagogique_has_NiveauFormation_NiveauFormation1` FOREIGN KEY (`NiveauFormation_idNF`,`NiveauFormation_Compte_pseudo`) REFERENCES `NiveauFormation` (`idNF`, `Compte_pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_UnitePedagogique_has_NiveauFormation_UnitePedagogique1` FOREIGN KEY (`UnitePedagogique_idUP`,`UnitePedagogique_Compte_pseudo`) REFERENCES `UnitePedagogique` (`idUP`, `Compte_pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
