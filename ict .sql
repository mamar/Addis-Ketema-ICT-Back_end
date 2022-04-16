-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2022 at 07:25 PM
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
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `anouncid` int(255) NOT NULL,
  `anounceName` varchar(255) NOT NULL,
  `anounceDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`anouncid`, `anounceName`, `anounceDate`, `status`) VALUES
(14, 'Please Dont Forget Your username and password', '2022-04-07 21:13:53', 'New');

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `office_id` int(250) NOT NULL,
  `office_name` varchar(250) NOT NULL,
  `floor_no` int(250) NOT NULL,
  `phone` int(250) NOT NULL,
  `Date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`office_id`, `office_name`, `floor_no`, `phone`, `Date`) VALUES
(65, 'Neged Tshefet bet', 1, 949050454, '2022-04-07 13:42:21');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `request_id` int(250) NOT NULL,
  `workerusername` varchar(250) DEFAULT NULL,
  `requesterusername` varchar(250) DEFAULT NULL,
  `Assignedby` varchar(250) DEFAULT NULL,
  `request_type` varchar(250) NOT NULL,
  `problem_desc` varchar(250) DEFAULT NULL,
  `status` varchar(250) DEFAULT NULL,
  `satisfaction` varchar(250) DEFAULT NULL,
  `Date` timestamp NULL DEFAULT current_timestamp(),
  `assignedDate` datetime DEFAULT NULL,
  `finishedDate` datetime DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `workerusername`, `requesterusername`, `Assignedby`, `request_type`, `problem_desc`, `status`, `satisfaction`, `Date`, `assignedDate`, `finishedDate`, `comment`) VALUES
(131, 'lelise', 'solomon', 'mamar', 'Computer,Printer', 'ኮምፒዩተሬ አይከፍትም', 'finished', '80', '2022-04-07 21:14:44', '2022-04-07 14:17:05', '2022-04-07 14:20:50', 'በጣም ነዉ የማመሰግነዉ .አገልግቱ ፈጣን ነበር'),
(132, 'lelise', 'solomon', 'Self', 'Computer', 'hi there\n', 'finished', '80', '2022-04-13 21:40:54', '2022-04-13 14:41:22', '2022-04-13 14:41:44', 'teru new\n');

-- --------------------------------------------------------

--
-- Table structure for table `requestwithstandard`
--

CREATE TABLE `requestwithstandard` (
  `requestwithstandardid` int(250) NOT NULL,
  `requestid` int(250) NOT NULL,
  `standardid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestwithstandard`
--

INSERT INTO `requestwithstandard` (`requestwithstandardid`, `requestid`, `standardid`) VALUES
(19, 131, 6),
(20, 132, 6);

-- --------------------------------------------------------

--
-- Table structure for table `standard`
--

CREATE TABLE `standard` (
  `standardid` int(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `measurement` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `standard`
--

INSERT INTO `standard` (`standardid`, `service`, `measurement`, `time`, `price`) VALUES
(6, 'Network Configuration ', 'day ', '1 ', '100 ');

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
  `division` varchar(250) NOT NULL,
  `floor_no` varchar(250) NOT NULL,
  `office_no` varchar(250) DEFAULT NULL,
  `Position` varchar(250) DEFAULT NULL,
  `Phone` varchar(250) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `office_id`, `username`, `password`, `ROLES`, `user_fullname`, `age`, `Gender`, `division`, `floor_no`, `office_no`, `Position`, `Phone`, `Date`, `status`) VALUES
(53, NULL, 'mamar', '$2b$10$OKc23cYQNXgteSKm95f/muZk6WrAaF9ZQwS0MCc9csnlY2G1xw6X6', 'Admin', 'Mamar Habtamu m ', '55', 'Male', 'dfffsdf ', '2', NULL, 'dgfgdgdfgd ', '4575675554', '2022-03-15 13:36:43', 'unblock'),
(81, NULL, 'solomon', '$2b$10$nIZk4wI9fatH4mcwRGnoG.tLbHuw//NjlcqjGGSXaCAz8EwqMP8Y.', 'Employee', 'Solomon Tadele', '', 'Male', 'wosagni kunet memezegbiYa', '1', '', '', '678697898', '2022-04-04 09:45:31', 'unblock'),
(82, 65, 'wubeshet', '$2a$10$nyjUInoSJZbyghrDpzRkW.tN3WgyzE.3MMTKRUs68xx7KZU4l6mWG', 'Admin', 'Wubeshet Derecha', '', 'Male', '', '1', NULL, NULL, '0949050454 ', '2022-04-07 13:44:51', 'unblock'),
(83, 65, 'lelise', '$2a$10$fcCb4KMb5O.8ob88H4pZ2eqOq99GKRegUhxpBW0Uh4qIQv7/toqKm', 'IT', 'ሌሊሴ  ኢዶሳ ', '', 'Female', 'ሲሰተም አስተዳደር', '1', '', 'ሲሰተም አስተዳደር', '0949050454', '2022-04-07 14:16:54', 'unblock');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`anouncid`);

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
-- Indexes for table `requestwithstandard`
--
ALTER TABLE `requestwithstandard`
  ADD PRIMARY KEY (`requestwithstandardid`);

--
-- Indexes for table `standard`
--
ALTER TABLE `standard`
  ADD PRIMARY KEY (`standardid`);

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
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `anouncid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `requestwithstandard`
--
ALTER TABLE `requestwithstandard`
  MODIFY `requestwithstandardid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
  MODIFY `standardid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`workerusername`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`requesterusername`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
