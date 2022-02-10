-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2022 at 06:29 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ict`
--

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `office_id` int(250) NOT NULL,
  `office_name` varchar(250) NOT NULL,
  `floor_no` int(250) NOT NULL,
  `phone` int(250) NOT NULL,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`office_id`, `office_name`, `floor_no`, `phone`, `Date`) VALUES
(58, 'Infomation technology', 1, 949050454, '2022-01-27'),
(59, 'Digital Banking', 2, 949050454, '2022-01-27');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `request_id` int(250) NOT NULL,
  `workerusername` varchar(250) DEFAULT NULL,
  `requesterusername` varchar(250) DEFAULT NULL,
  `office_id` int(250) DEFAULT NULL,
  `division` varchar(250) NOT NULL,
  `floor_no` int(250) NOT NULL,
  `office_no` int(250) DEFAULT NULL,
  `phone` int(250) NOT NULL,
  `request_type` varchar(250) NOT NULL,
  `problem_desc` varchar(250) DEFAULT NULL,
  `status` varchar(250) DEFAULT NULL,
  `satisfaction` varchar(250) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `assignedDate` date DEFAULT NULL,
  `finishedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `workerusername`, `requesterusername`, `office_id`, `division`, `floor_no`, `office_no`, `phone`, `request_type`, `problem_desc`, `status`, `satisfaction`, `Date`, `assignedDate`, `finishedDate`) VALUES
(11, 'estifanos', 'estifanos', NULL, 'bfhfgh', 23, 4, 2147483647, 'Photocopy', 'fdgfdgdgfdgfdgfd', 'finished', NULL, '2022-02-03', '2022-02-03', '2022-02-03'),
(12, 'estifanos', 'estifanos', NULL, 'hgfhfghfghfg', 2, 44, 949050454, 'Printer', 'gfgfdgfddfgfdgdgdgfdgd', 'finished', NULL, '2022-02-03', NULL, '2022-02-03'),
(13, 'estifanos', 'estifanos', NULL, 'Networking', 33, 2, 4343, 'Printer', 'Printer is not working', 'finished', NULL, '2022-02-03', NULL, '2022-02-03'),
(14, 'estifanos', 'estifanos', NULL, 'From Database', 2, 3, 949050445, 'Network', 'ergfdbhfghfhfhfh', 'finished', NULL, '2022-02-03', NULL, '2022-02-03'),
(15, 'estifanos', 'estifanos', NULL, 'hgjghjg', 4, 5, 949050454, 'Computer', '56456', 'finished', NULL, '2022-02-03', '2022-02-03', '2022-02-03'),
(16, 'estifanos', 'estifanos', NULL, 'Mis office', 3, 3, 949050454, 'Photocopy', 'Photocpy does not working', 'finished', NULL, '2022-02-04', '2022-02-04', '2022-02-04'),
(17, 'estifanos', 'estifanos', NULL, 'IT', 3, 3, 967252122, 'Software', 'Office is not working', 'finished', NULL, '2022-02-05', '2022-02-05', '2022-02-05'),
(18, 'estifanos', 'solomon', NULL, 'Digital Banking', 2, 3, 94905654, 'Printer', '2423223', 'finished', NULL, '2022-02-05', '2022-02-05', '2022-02-07'),
(19, 'estifanos', 'estifanos', NULL, 'hi there', 4, 0, 0, 'Printer', 'grtgrhrt', 'finished', NULL, '2022-02-05', '2022-02-05', '2022-02-05'),
(27, 'estifanos', 'estifanos', NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'Work On Progress', NULL, '2022-02-08', '2022-02-08', NULL),
(28, 'estifanos', 'estifanos', NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'Work On Progress', NULL, '2022-02-08', '2022-02-08', NULL),
(29, 'estifanos', 'estifanos', NULL, 'gjgh', 4, 4, 6456546, 'Software', 'hfhghghf', 'Work On Progress', '29', '2022-02-08', '2022-02-08', NULL),
(30, NULL, 'estifanos', NULL, 'hvfjhfdgf', 23, 5, 949050454, 'Printer', 'fghhfghghfgghfh', 'New', NULL, '2022-02-09', NULL, NULL),
(31, NULL, 'estifanos', NULL, 'gfhfg', 0, 2, 6786, 'Network', 'hgfhgf', 'New', NULL, '2022-02-09', NULL, NULL),
(32, NULL, 'estifanos', NULL, 'rtyr', 4, 645, 57575, 'Software', 'ghfgh', 'New', NULL, '2022-02-09', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(250) NOT NULL,
  `office_id` int(250) DEFAULT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(500) NOT NULL,
  `ROLES` varchar(250) NOT NULL,
  `user_fullname` varchar(250) NOT NULL,
  `age` varchar(250) DEFAULT NULL,
  `Gender` varchar(250) NOT NULL,
  `Position` varchar(250) NOT NULL,
  `Phone` varchar(250) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `office_id`, `username`, `password`, `ROLES`, `user_fullname`, `age`, `Gender`, `Position`, `Phone`, `Date`) VALUES
(31, 58, 'mamar', '$2b$10$FT0rBkrK/nBizij./gK1C.cIqQbeP8A1pqucDZdLAef6VPXXgTlpm', 'Admin', 'Mamar Habtamu', '23', 'Male', 'Mis Officer', '0949050454', '2022-02-02'),
(36, 59, 'estifanos', '$2b$10$sknnWPrCorVHf2u..Ql8eusU9LXS7/Qy4tgKcEq10bH3q2.mwsVfa', 'Employee', 'Estifanos Jemberu', '43', 'Male', 'Database Administration', '0949050454', '2022-02-02'),
(37, 58, 'mamarh', '$2b$10$GyqugGPzt0vi8v8tfpPht.rp9qvdyUdCNIcXTu2s.9wir227bxLZi', 'Admin', 'Mamar habtamu', '23', 'Male', 'it officer', '0949050454', '2022-02-04'),
(40, 58, 'solomon', '$2b$10$4sfo9LdzflAqHyLQIt1q8..2GYVAVyEdS6tl9klTKIctUKePepC6u', 'Employee', 'Solomon Tadele', '23', 'Male', 'Hardware Maintenance', '09456656', '2022-02-05'),
(41, 58, 'estifanos1', '$2b$10$VUpFQTYC1zpDLek5vNS3vOded4jdVIkqKH6l4XMoGnX0pv7rK1ke6', 'Admin', 'gghgjghjghjghjgh', '45', 'Male', '78679789797', '54367', '2022-02-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`office_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `workerusername` (`workerusername`),
  ADD KEY `requesterusername` (`requesterusername`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `office_id` (`office_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`workerusername`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`requesterusername`) REFERENCES `users` (`username`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
