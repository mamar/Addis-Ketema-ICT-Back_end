-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2022 at 08:12 PM
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
  `status` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(58, 'Infomation technology', 1, 949050454, '2022-01-27 00:00:00'),
(59, 'Digital Banking', 2, 949050454, '2022-01-27 00:00:00');

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
  `Date` timestamp NULL DEFAULT current_timestamp(),
  `assignedDate` datetime DEFAULT NULL,
  `finishedDate` datetime DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `workerusername`, `requesterusername`, `office_id`, `division`, `floor_no`, `office_no`, `phone`, `request_type`, `problem_desc`, `status`, `satisfaction`, `Date`, `assignedDate`, `finishedDate`, `comment`) VALUES
(27, 'estifanos', 'estifanos', NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '2022-03-05 10:31:07', NULL),
(28, 'estifanos', 'estifanos', NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', NULL),
(29, 'estifanos', 'estifanos', NULL, 'gjgh', 4, 4, 6456546, 'Software', 'hfhghghf', 'finished', '33', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', 'gdfgdf'),
(30, 'estifanos', 'estifanos', NULL, 'hvfjhfdgf', 23, 5, 949050454, 'Printer', 'fghhfghghfgghfh', 'finished', '76', '2022-02-09 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', 'fgfdgfd'),
(31, 'estifanos', 'estifanos', NULL, 'gfhfg', 0, 2, 6786, 'Network', 'hgfhgf', 'finished', NULL, '2022-02-09 08:00:00', '2022-02-14 00:00:00', '2022-02-14 00:00:00', NULL),
(33, 'mamar', 'estifanos', NULL, 'WOsagn kent', 2, 3, 949050454, 'Photocopy', '45435ghfghgf', 'finished', '78', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', '6546'),
(34, 'mamar', 'estifanos', NULL, 'hfghf', 34, 54, 956565, 'Network', '34', 'finished', '75', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', 'hi there'),
(35, 'mamar', 'mamar', NULL, 'gghhfg', 45, 6767, 949050454, 'Photocopy', '3434', 'finished', '50%-75%', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', NULL),
(40, 'mamar', 'mamar', NULL, 'tyryur', 45, 6, 9490656, 'Computer', '24343', 'finished', NULL, '2022-02-28 18:17:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(41, 'estifanos', 'estifanos', NULL, 'cjnjknfkghhfh', 5, 6, 949050454, 'Photocopy', 'computer not working', 'Work On Progress', NULL, '2022-03-04 20:27:44', '2022-03-10 13:10:48', NULL, NULL),
(42, 'estifanos', 'estifanos', NULL, 'rrre', 4, 6, 6457, 'Software', 'fghgfhgfhfh', 'Work On Progress', NULL, '2022-03-05 16:39:59', '2022-03-10 13:10:42', NULL, NULL),
(43, 'estifanos', 'estifanos', NULL, 'ghgfh', 65, 56, 6575, 'Network', 'hgfjgjgjgjg', 'Work On Progress', NULL, '2022-03-05 16:54:34', '2022-03-10 13:10:32', NULL, NULL),
(44, 'estifanos', 'estifanos', NULL, 'ffsg', 4, 5, 54636, 'Software', '546546', 'finished', NULL, '2022-03-05 17:20:19', '2022-03-05 10:48:04', '2022-03-07 08:28:30', NULL),
(45, 'estifanos', 'estifanos', NULL, 'Wosagn Kunet', 1, 1, 949050454, 'Printer', 'Printer does not work', 'Work On Progress', NULL, '0000-00-00 00:00:00', '2022-03-10 13:10:25', NULL, NULL),
(46, 'estifanos', 'estifanos', NULL, 'Ict', 3, 4, 9809, 'Photocopy', 'fdghdhd', 'finished', 'Teru new', '0000-00-00 00:00:00', '2022-03-07 08:28:42', '2022-03-10 09:17:03', 'hi tje'),
(47, 'estifanos', 'estifanos', NULL, '5667567', 0, 867, 68678867, 'Printer', 'hjgjgjgh', 'finished', '78', '0000-00-00 00:00:00', '2022-03-07 08:28:47', '2022-03-07 09:59:18', 'Tereu new'),
(48, 'estifanos', 'estifanos', NULL, 'gfhgf', 67, 678, 7868, 'Computer', 'fghhgjghj', 'Work On Progress', NULL, NULL, '2022-03-10 13:10:13', NULL, NULL),
(49, NULL, 'estifanos', NULL, 'ffgjfgh', 4, 6, 76886, 'Computer', 'gfhfgjhgjgh', 'New', NULL, NULL, NULL, NULL, NULL),
(50, 'estifanos', 'estifanos', NULL, 'magfhfh', 4, 5, 677868, 'Network', 'hjgjgjgh', 'Work On Progress', NULL, NULL, '2022-03-10 13:16:14', NULL, NULL),
(51, NULL, 'estifanos', NULL, 'fdhfgdh', 4, 4, 5646546, 'Photocopy', 'hfghgfhg', 'New', NULL, NULL, NULL, NULL, NULL),
(52, NULL, 'estifanos', NULL, 'fhgfhf', 566, 65464, 67567, 'Photocopy', '56775675', 'New', NULL, '2022-03-12 00:08:38', NULL, NULL, NULL),
(53, NULL, 'estifanos', NULL, 'ghfghf', 0, 6, 0, 'Printer', 'fghjjfj', 'New', NULL, '2022-03-12 00:35:02', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requestwithstandard`
--

CREATE TABLE `requestwithstandard` (
  `requestid` int(250) NOT NULL,
  `standardid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestwithstandard`
--

INSERT INTO `requestwithstandard` (`requestid`, `standardid`) VALUES
(47, 2),
(47, 3),
(46, 3),
(46, 3);

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
(2, 'gffhh', '4', '6', '123'),
(3, 'Network Configuration', 'hours', '1', '200');

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
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `office_id`, `username`, `password`, `ROLES`, `user_fullname`, `age`, `Gender`, `Position`, `Phone`, `Date`, `status`) VALUES
(31, 58, 'mamar', '$2b$10$FT0rBkrK/nBizij./gK1C.cIqQbeP8A1pqucDZdLAef6VPXXgTlpm', 'Admin', 'Mamar Habtamu', '23', 'Male', 'Mis Officer', '0949050454', '2022-02-02 00:00:00', 'unblock'),
(36, 59, 'estifanos', '$2b$10$sknnWPrCorVHf2u..Ql8eusU9LXS7/Qy4tgKcEq10bH3q2.mwsVfa', 'Employee', 'Estifanos Jemberu', '43', 'Male', 'Database Administration1', '0949050454', '2022-02-02 00:00:00', 'unblock'),
(37, 58, 'mamarh', '$2b$10$GyqugGPzt0vi8v8tfpPht.rp9qvdyUdCNIcXTu2s.9wir227bxLZi', 'Admin', 'Mamar habtamu', '23', 'Male', 'it officer', '0949050454', '2022-02-04 00:00:00', 'unblock'),
(43, 59, 'Mamar1234', '$2b$10$QlYgkXcWg.o04Ykr765fieoXX42pTgh4VbJDZq2rEA71WMiU5elQG', 'IT', 'Mamar Habtamu Gerlie', '23', 'Male', 'ytityiu', '67858768678', '0000-00-00 00:00:00', 'unblock');

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
  MODIFY `anouncid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
  MODIFY `standardid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

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
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
