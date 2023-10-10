-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: final_project_dev
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0cfb8df3-10ee-40a7-bb64-a54fbe70511c','4e7770bdac5ba1c5b9433e778580546f21932f10c87892263022232d4546104a','2023-06-27 12:24:17.015','20230620235423_delete',NULL,NULL,'2023-06-27 12:24:17.010',1),('0f09d1e7-205f-4dbd-9d16-d4e5364c6e85','197e0937b50871ffe86226a9fdae68545a2d1092c8c3d244033bac1c8bfea511','2023-06-28 14:26:23.712','20230628142623_add_client_cascade_at_delete_reservation',NULL,NULL,'2023-06-28 14:26:23.698',1),('4a369fc5-5096-4249-be9b-edaed5d6874d','2491ca018b692390576566fad1e73bbdd5c6584e94fce90178c61c13bd83a763','2023-06-27 12:24:17.040','20230626090124_change',NULL,NULL,'2023-06-27 12:24:17.024',1),('7b3859bf-6194-4e3e-9ad1-524e12c3e8f7','8a54a29aa33683b43b8edbfa8bec1ca1c9c65cceaf6a76934bdaac9e22f82bb8','2023-06-28 13:51:59.670','20230627095721_address',NULL,NULL,'2023-06-28 13:51:59.666',1),('8bfc4326-44ee-4a0e-bd89-588fa4662d68','93b0c9f7dab9d2f7a937fb77fb8274887733b998a9cc9c12c088cd0e4e7d3e4c','2023-06-27 12:24:16.995','20230615120109_change',NULL,NULL,'2023-06-27 12:24:16.986',1),('90445a34-b306-4a46-8720-1f394cd48329','7ffc80b2fe1b6a078927dce3183352213d19306e610c15feaf9b6a6ddc5feeee','2023-06-27 12:24:17.009','20230620232358_delete',NULL,NULL,'2023-06-27 12:24:17.004',1),('a97401ff-ae41-4361-be99-1d4cb8750a9e','1cc18ad47ff7d498d6784a6d3aa382f2ad9f87f53aa49d6897b1136328b2567c','2023-06-28 14:12:25.721','20230628141225_add_reservation_table',NULL,NULL,'2023-06-28 14:12:25.678',1),('b61385a4-a332-4a9f-aa03-cba5fb397d3c','a635f43fffc070ef6302efa6362733a11f5e479a6275136764be9eaa342b86a4','2023-06-27 12:24:17.003','20230620232116_add',NULL,NULL,'2023-06-27 12:24:16.996',1),('c26958d7-c70f-4f89-bc6e-9da6dbfed5b4','04eaf92f63c76592db79c8ea2cface39a4c1b3b45e075a70ebb2522f52209b7a','2023-06-27 12:24:16.985','20230614103948_init',NULL,NULL,'2023-06-27 12:24:16.977',1),('cf4d0346-cc91-4c4f-a1ff-fc68c7d0e8a8','c887e0c0f6aacdc7165d0bae5138a0c75bfbc733f5d11d7a3a341266ff3ac326','2023-06-27 12:24:17.023','20230621003920_delete',NULL,NULL,'2023-06-27 12:24:17.016',1),('f8675399-aecc-4ded-90b2-f8675cf2bc83','ca8d06ed858009fcf6191778c2a9856dad7f2f7c4a7ff020a9d4ad84e1388dca','2023-06-28 13:51:59.665','20230627083425_table_about',NULL,NULL,'2023-06-28 13:51:59.661',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `About`
--

DROP TABLE IF EXISTS `About`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `About` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `About`
--

LOCK TABLES `About` WRITE;
/*!40000 ALTER TABLE `About` DISABLE KEYS */;
/*!40000 ALTER TABLE `About` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileNumber` int,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'1',NULL,'ffkfkfkfffdffffdfffdfffk@gmail.com','$2b$10$nBeNiDeA1.ArSKRToeW.oeBQ3i7FgZEO6wfl.Moh2vwYeKiQQeTae',NULL),(2,'1',NULL,'ffkfkfkfffdfffffdfffdfffk@gmail.com','$2b$10$trj2KfjUWpNVUlPyfRM5LuyT2BsPVxm06Sb5RlULqdMrL.6vlTm7i',NULL),(3,'1',NULL,'ffkfkfkfffdfffffdffffdfffk@gmail.com','$2b$10$jE.oR7o1CRXJEsQfny6kvuOX7n4QufeI4rOyGMv1uq3U28cQ9HcRu',NULL);
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobileNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count_no_shows` int DEFAULT '0',
  `count_reservations` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Client_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (2,'marius','isoardi','marius13127@gmail.com','0612028485',0,0),(3,'isoardi','marius','marius13@gmail.com','0612028485',0,0);
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `clientId` int NOT NULL,
  `tableId` int NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Reservation_tableId_fkey` (`tableId`),
  KEY `Reservation_clientId_fkey` (`clientId`),
  CONSTRAINT `Reservation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
INSERT INTO `Reservation` VALUES (2,'2023-06-28 16:31:20',2,1,'allergie'),(3,'2023-06-28 16:31:20',2,2,'allergie');
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Table`
--

DROP TABLE IF EXISTS `Table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Table`
--

LOCK TABLES `Table` WRITE;
/*!40000 ALTER TABLE `Table` DISABLE KEYS */;
INSERT INTO `Table` VALUES (1,'1',4),(2,'2',2);
/*!40000 ALTER TABLE `Table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 16:35:42
