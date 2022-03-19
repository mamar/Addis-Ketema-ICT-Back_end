-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2022 at 11:59 PM
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
(9, 'How are y guys', '2022-03-15 21:32:52', 'New');

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
(59, 'Digital Banking   ', 4, 949050454, '2022-01-27 00:00:00'),
(60, 'Public Service', 2, 565475685, '2022-03-17 11:34:14');

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
(27, NULL, NULL, NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '2022-03-05 10:31:07', NULL),
(28, NULL, NULL, NULL, 'ythjghjg', 4, 556, 5465467, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', NULL),
(29, NULL, NULL, NULL, 'gjgh', 4, 4, 6456546, 'Software', 'hfhghghf', 'finished', '33', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', 'gdfgdf'),
(30, NULL, NULL, NULL, 'hvfjhfdgf', 23, 5, 949050454, 'Printer', 'fghhfghghfgghfh', 'finished', '76', '2022-02-09 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', 'fgfdgfd'),
(31, NULL, NULL, NULL, 'gfhfg', 0, 2, 6786, 'Network', 'hgfhgf', 'finished', NULL, '2022-02-09 08:00:00', '2022-02-14 00:00:00', '2022-02-14 00:00:00', NULL),
(33, NULL, NULL, NULL, 'WOsagn kent', 2, 3, 949050454, 'Photocopy', '45435ghfghgf', 'finished', '78', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', '6546'),
(34, NULL, NULL, NULL, 'hfghf', 34, 54, 956565, 'Network', '34', 'finished', '75', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', 'hi there'),
(35, NULL, NULL, NULL, 'gghhfg', 45, 6767, 949050454, 'Photocopy', '3434', 'finished', '50%-75%', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', NULL),
(40, NULL, NULL, NULL, 'tyryur', 45, 6, 9490656, 'Computer', '24343', 'finished', NULL, '2022-02-28 18:17:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(41, NULL, NULL, NULL, 'cjnjknfkghhfh', 5, 6, 949050454, 'Photocopy', 'computer not working', 'Work On Progress', NULL, '2022-03-04 20:27:44', '2022-03-10 13:10:48', NULL, NULL),
(42, NULL, NULL, NULL, 'rrre', 4, 6, 6457, 'Software', 'fghgfhgfhfh', 'Work On Progress', NULL, '2022-03-05 16:39:59', '2022-03-10 13:10:42', NULL, NULL),
(43, NULL, NULL, NULL, 'ghgfh', 65, 56, 6575, 'Network', 'hgfjgjgjgjg', 'Work On Progress', NULL, '2022-03-05 16:54:34', '2022-03-10 13:10:32', NULL, NULL),
(44, NULL, NULL, NULL, 'ffsg', 4, 5, 54636, 'Software', '546546', 'finished', '78', '2022-03-05 17:20:19', '2022-03-05 10:48:04', '2022-03-07 08:28:30', 'It is Good'),
(45, NULL, NULL, NULL, 'Wosagn Kunet', 1, 1, 949050454, 'Printer', 'Printer does not work', 'Work On Progress', NULL, '0000-00-00 00:00:00', '2022-03-10 13:10:25', NULL, NULL),
(46, NULL, NULL, NULL, 'Ict', 3, 4, 9809, 'Photocopy', 'fdghdhd', 'finished', 'Teru new', '0000-00-00 00:00:00', '2022-03-07 08:28:42', '2022-03-10 09:17:03', 'hi tje'),
(47, NULL, NULL, NULL, '5667567', 0, 867, 68678867, 'Printer', 'hjgjgjgh', 'finished', '78', '0000-00-00 00:00:00', '2022-03-07 08:28:47', '2022-03-07 09:59:18', 'Tereu new'),
(48, NULL, NULL, NULL, 'gfhgf', 67, 678, 7868, 'Computer', 'fghhgjghj', 'Work On Progress', NULL, NULL, '2022-03-10 13:10:13', NULL, NULL),
(49, NULL, NULL, NULL, 'ffgjfgh', 4, 6, 76886, 'Computer', 'gfhfgjhgjgh', 'New', NULL, NULL, NULL, NULL, NULL),
(50, NULL, NULL, NULL, 'magfhfh', 4, 5, 677868, 'Network', 'hjgjgjgh', 'Work On Progress', NULL, NULL, '2022-03-10 13:16:14', NULL, NULL),
(51, NULL, NULL, NULL, 'fdhfgdh', 4, 4, 5646546, 'Photocopy', 'hfghgfhg', 'Work On Progress', NULL, NULL, '2022-03-15 14:18:24', NULL, NULL),
(52, NULL, NULL, NULL, 'fhgfhf', 566, 65464, 67567, 'Photocopy', '56775675', 'finished', NULL, '2022-03-12 00:08:38', '2022-03-15 14:17:15', '2022-03-15 14:21:01', NULL),
(53, NULL, NULL, NULL, 'ghfghf', 0, 6, 0, 'Printer', 'fghjjfj', 'finished', NULL, '2022-03-12 00:35:02', '2022-03-15 14:16:43', '2022-03-15 14:17:39', NULL),
(54, 'mamar', NULL, NULL, 'fgdhfgh', 0, 23, 96767, 'Printer', 'Printer is not working', 'Work On Progress', NULL, '2022-03-15 21:22:09', '2022-03-15 14:22:43', NULL, NULL),
(55, 'mamar', NULL, NULL, 'Ict ', 1, 3, 949050454, 'Computer', 'Computer is not working', 'finished', NULL, '2022-03-15 23:10:29', '2022-03-15 16:40:37', '2022-03-16 10:49:31', NULL),
(56, 'mamar', NULL, NULL, 'Wosagn Kunet', 2, 43, 95455445, 'Photocopy', 'Photocpy does not working', 'finished', NULL, '2022-03-15 23:11:04', '2022-03-15 16:41:38', '2022-03-16 10:55:02', NULL),
(57, 'mamar', NULL, NULL, 'negd', 2, 5, 9676767, 'Printer', 'Printer does not working ', 'finished', NULL, '2022-03-15 23:11:31', '2022-03-15 16:56:25', '2022-03-16 10:55:07', NULL),
(58, 'mamar', NULL, NULL, 'hgfgdhfg', 3, 56465, 756578, 'Printer', 'fgbfdgfdhfghfghgfh', 'Work On Progress', NULL, '2022-03-15 23:56:07', '2022-03-15 16:58:06', NULL, NULL),
(59, 'mamar', NULL, NULL, 'sdsdsd', 2, 2213, 13, 'Photocopy', 'dfsdfdsfsf', 'Work On Progress', NULL, '2022-03-16 17:14:49', '2022-03-16 10:15:21', NULL, NULL),
(60, NULL, NULL, NULL, 'fdfdsf', 0, 332, 2424, 'Photocopy', 'dfsdfsf', 'New', NULL, '2022-03-16 17:15:07', NULL, NULL, NULL),
(61, 'mamar', 'estifanos', NULL, 'ghfghf', 55, 654, 67567, 'Computer', 'rtyrtyr', 'finished', '78', '2022-03-16 23:40:57', '2022-03-16 16:52:40', '2022-03-16 16:52:48', 'jfjghj'),
(62, 'mamar', 'estifanos', NULL, 'fghfgh', 0, 5, 5567, 'Photocopy', 'jhjghjgj', 'finished', '78', '2022-03-17 22:36:12', '2022-03-17 15:36:24', '2022-03-17 15:37:08', 'good'),
(63, 'mamar', 'estifanos', NULL, 'ghjghjg', 5, 6, 675675, 'Printer', 'ghfhfghfgj', 'finished', NULL, '2022-03-17 22:42:17', '2022-03-17 15:42:30', '2022-03-17 15:44:19', NULL);

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
(46, 3),
(52, 3),
(58, 3),
(62, 2),
(63, 3);

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
(2, 'gffhh  ', '4  ', '6  ', '150'),
(3, 'Network Configuration  ', 'hours  ', '1  ', '200  '),
(4, 'Printer ', 'Day', '1', '100');

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
(53, 59, 'mamar', '$2b$10$OKc23cYQNXgteSKm95f/muZk6WrAaF9ZQwS0MCc9csnlY2G1xw6X6', 'Admin', 'Mamar Habtamu m', '55', 'Male', '789879   ', '45756755566', '2022-03-15 13:36:43', 'unblock'),
(58, 59, 'estifanos', '$2b$10$ONT34xRmVleWRvDDx9KIU.6CxMSoNbthRU5yMsqy1IyNYQ.qslkgq', 'Employee', 'estifanos jemberu  ', '3', 'Male', 'jkhfddgh  ', '6456456567777', '2022-03-16 14:16:40', 'unblock'),
(59, 59, 'haile', '$2b$10$lP40mY0pg27/pjiUJvj.mOjdSbYDwtZnGliTDtLxBix3LxZkQHdje', 'Employee', 'Haile Habtamu', '545', 'Male', 'hghfgh', '4764567', '2022-03-16 14:21:09', 'unblock'),
(61, 59, 'Mamar12', '$2b$10$R54UrF8nLv8hTC/yGdmfleGKrdaRmz5x/YCDnRSllgPpyPAEZWpiq', 'IT', 'who wre u', '4', 'Male', 'ghgfhgfh     ', '4674 55    ', '2022-03-16 17:41:45', 'unblock');

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
  MODIFY `anouncid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
  MODIFY `standardid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

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
