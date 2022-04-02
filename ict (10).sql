-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2022 at 07:38 PM
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
(12, 'rthfghfh', '2022-04-02 16:37:59', 'Finish');

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
(61, 'gfhfjhjhgjghj', 5, 456547, '2022-03-28 10:02:39'),
(62, 'dvbhfghfghfh', 54, 5, '2022-04-01 18:13:08');

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
(27, NULL, NULL, NULL, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '2022-03-05 10:31:07', NULL),
(28, NULL, NULL, NULL, 'Photocopy', 'rtytryrty', 'finished', '1000', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', NULL),
(29, NULL, NULL, NULL, 'Software', 'hfhghghf', 'finished', '33', '2022-02-08 08:00:00', '2022-02-08 00:00:00', '0000-00-00 00:00:00', 'gdfgdf'),
(30, NULL, NULL, NULL, 'Printer', 'fghhfghghfgghfh', 'finished', '76', '2022-02-09 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', 'fgfdgfd'),
(31, NULL, NULL, NULL, 'Network', 'hgfhgf', 'finished', NULL, '2022-02-09 08:00:00', '2022-02-14 00:00:00', '2022-02-14 00:00:00', NULL),
(33, NULL, NULL, NULL, 'Photocopy', '45435ghfghgf', 'finished', '78', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', '6546'),
(34, NULL, NULL, NULL, 'Network', '34', 'finished', '75', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '2022-02-15 00:00:00', 'hi there'),
(35, NULL, NULL, NULL, 'Photocopy', '3434', 'finished', '50%-75%', '2022-02-15 08:00:00', '2022-02-15 00:00:00', '0000-00-00 00:00:00', NULL),
(40, NULL, NULL, NULL, 'Computer', '24343', 'finished', NULL, '2022-02-28 18:17:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(41, NULL, NULL, NULL, 'Photocopy', 'computer not working', 'Work On Progress', NULL, '2022-03-04 20:27:44', '2022-03-10 13:10:48', NULL, NULL),
(42, NULL, NULL, NULL, 'Software', 'fghgfhgfhfh', 'Work On Progress', NULL, '2022-03-05 16:39:59', '2022-03-10 13:10:42', NULL, NULL),
(43, NULL, NULL, NULL, 'Network', 'hgfjgjgjgjg', 'Work On Progress', NULL, '2022-03-05 16:54:34', '2022-03-10 13:10:32', NULL, NULL),
(44, NULL, NULL, NULL, 'Software', '546546', 'finished', '78', '2022-03-05 17:20:19', '2022-03-05 10:48:04', '2022-03-07 08:28:30', 'It is Good'),
(45, NULL, NULL, NULL, 'Printer', 'Printer does not work', 'Work On Progress', NULL, '0000-00-00 00:00:00', '2022-03-10 13:10:25', NULL, NULL),
(46, NULL, NULL, NULL, 'Photocopy', 'fdghdhd', 'finished', 'Teru new', '0000-00-00 00:00:00', '2022-03-07 08:28:42', '2022-03-10 09:17:03', 'hi tje'),
(47, NULL, NULL, NULL, 'Printer', 'hjgjgjgh', 'finished', '78', '0000-00-00 00:00:00', '2022-03-07 08:28:47', '2022-03-07 09:59:18', 'Tereu new'),
(48, NULL, NULL, NULL, 'Computer', 'fghhgjghj', 'Work On Progress', NULL, NULL, '2022-03-10 13:10:13', NULL, NULL),
(49, NULL, NULL, NULL, 'Computer', 'gfhfgjhgjgh', 'New', NULL, NULL, NULL, NULL, NULL),
(50, NULL, NULL, NULL, 'Network', 'hjgjgjgh', 'Work On Progress', NULL, NULL, '2022-03-10 13:16:14', NULL, NULL),
(51, NULL, NULL, NULL, 'Photocopy', 'hfghgfhg', 'Work On Progress', NULL, NULL, '2022-03-15 14:18:24', NULL, NULL),
(52, NULL, NULL, NULL, 'Photocopy', '56775675', 'finished', NULL, '2022-03-12 00:08:38', '2022-03-15 14:17:15', '2022-03-15 14:21:01', NULL),
(53, NULL, NULL, NULL, 'Printer', 'fghjjfj', 'finished', NULL, '2022-03-12 00:35:02', '2022-03-15 14:16:43', '2022-03-15 14:17:39', NULL),
(54, 'mamar', NULL, NULL, 'Printer', 'Printer is not working', 'Work On Progress', NULL, '2022-03-15 21:22:09', '2022-03-15 14:22:43', NULL, NULL),
(55, 'mamar', NULL, NULL, 'Computer', 'Computer is not working', 'finished', NULL, '2022-03-15 23:10:29', '2022-03-15 16:40:37', '2022-03-16 10:49:31', NULL),
(56, 'mamar', NULL, NULL, 'Photocopy', 'Photocpy does not working', 'finished', NULL, '2022-03-15 23:11:04', '2022-03-15 16:41:38', '2022-03-16 10:55:02', NULL),
(57, 'mamar', NULL, NULL, 'Printer', 'Printer does not working ', 'finished', NULL, '2022-03-15 23:11:31', '2022-03-15 16:56:25', '2022-03-16 10:55:07', NULL),
(58, 'mamar', NULL, NULL, 'Printer', 'fgbfdgfdhfghfghgfh', 'Work On Progress', NULL, '2022-03-15 23:56:07', '2022-03-15 16:58:06', NULL, NULL),
(59, 'mamar', NULL, NULL, 'Photocopy', 'dfsdfdsfsf', 'Work On Progress', NULL, '2022-03-16 17:14:49', '2022-03-16 10:15:21', NULL, NULL),
(60, NULL, NULL, NULL, 'Photocopy', 'dfsdfsf', 'New', NULL, '2022-03-16 17:15:07', NULL, NULL, NULL),
(68, 'mamar', 'estifanos', NULL, 'Photocopy', 'ፕሪንተሬ አይሰራም', 'finished', '90', '2022-03-19 19:04:35', '2022-03-19 12:05:09', '2022-04-02 09:40:50', 'It is very Good'),
(73, 'mamar', 'estifanos', 'Self', '', 'mnbghjgh', 'Work On Progress', NULL, '2022-03-31 16:56:43', '2022-04-01 12:58:25', NULL, NULL),
(76, 'mamex11', 'estifanos', 'mamar', '', 'jhjhjjhjjhj', 'Work On Progress', NULL, '2022-03-31 19:06:37', '2022-03-31 17:40:51', NULL, NULL),
(88, 'mamar', 'estifanos', 'Self', 'Oliver Hansen', 'fghfh', 'Work On Progress', NULL, '2022-03-31 23:48:46', '2022-04-01 12:58:33', NULL, NULL),
(90, 'mamar', 'estifanos', 'Self', 'Printer,Network,Software,Computer,Photocpy,Others', 'dfsfsdfsdfsdf', 'Work On Progress', NULL, '2022-04-01 00:35:04', '2022-04-01 12:58:30', NULL, NULL),
(91, 'mamar', 'estifanos', 'Self', 'Software,Printer,Computer', 'sdfgfdgdgdg', 'Work On Progress', NULL, '2022-04-01 00:38:48', '2022-04-01 12:58:19', NULL, NULL),
(92, 'mamar', 'estifanos', 'Self', '', 'dgfgfdgd', 'Work On Progress', NULL, '2022-04-01 00:38:58', '2022-04-01 12:55:40', NULL, NULL),
(115, NULL, 'estifanos', NULL, 'Computer', 'ghjgjgh', 'New', NULL, '2022-04-01 23:27:01', NULL, NULL, NULL),
(116, NULL, 'estifanos', NULL, 'Printer,Computer,Network,Software', 'hfghfghfghfghfg', 'New', NULL, '2022-04-02 00:38:18', NULL, NULL, NULL),
(117, NULL, 'estifanos', NULL, 'Printer,Computer', 'dfsfsd', 'New', NULL, '2022-04-02 00:38:42', NULL, NULL, NULL),
(118, NULL, 'estifanos', NULL, '', 'gfdg', 'New', NULL, '2022-04-02 00:38:53', NULL, NULL, NULL),
(119, NULL, 'estifanos', NULL, 'Printer,Computer', 'dfggddg', 'New', NULL, '2022-04-02 00:41:01', NULL, NULL, NULL),
(120, NULL, 'estifanos', NULL, 'Printer', 'dsffsdfsdfdsfsfsfsfs', 'New', NULL, '2022-04-02 00:50:26', NULL, NULL, NULL),
(121, NULL, 'estifanos', NULL, '', 'jhkhkh', 'New', NULL, '2022-04-02 00:55:02', NULL, NULL, NULL),
(122, NULL, 'estifanos', NULL, '', 'hgfh', 'New', NULL, '2022-04-02 01:00:41', NULL, NULL, NULL),
(123, NULL, 'estifanos', NULL, 'Printer,Computer,Network', 'sdfgfdgfdg', 'New', NULL, '2022-04-02 01:01:59', NULL, NULL, NULL),
(124, NULL, 'estifanos', NULL, 'Printer', 'rthfghfhf', 'New', NULL, '2022-04-02 01:02:58', NULL, NULL, NULL),
(125, NULL, 'estifanos', NULL, 'Printer,Computer,Network', 'ghfhfh', 'New', NULL, '2022-04-02 01:03:25', NULL, NULL, NULL),
(126, NULL, 'estifanos', NULL, 'Computer,Printer,Network,Software', 'jhfgjfhjghj', 'New', NULL, '2022-04-02 01:11:02', NULL, NULL, NULL),
(127, NULL, 'estifanos', NULL, 'Software', 'fghfhfghf', 'New', NULL, '2022-04-02 01:11:13', NULL, NULL, NULL),
(128, NULL, 'estifanos', NULL, 'Computer,Printer,Network,Software', 'Hey there', 'New', NULL, '2022-04-02 01:11:40', NULL, NULL, NULL),
(129, NULL, 'estifanos', NULL, 'Computer,Printer,Network', 'avfsdfsdaf', 'New', NULL, '2022-04-02 16:43:24', NULL, NULL, NULL);

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
(63, 3),
(64, 3),
(65, 4),
(69, 3),
(69, 3),
(66, 2),
(66, 4),
(68, 3),
(70, 3),
(92, 3),
(92, 3);

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
(3, 'Network Configuration   ', 'hours   ', '1   ', '200   '),
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
(53, 59, 'mamar', '$2b$10$OKc23cYQNXgteSKm95f/muZk6WrAaF9ZQwS0MCc9csnlY2G1xw6X6', 'Admin', 'Mamar Habtamu m', '55', 'Male', 'dfffsdf', '2', '3', 'dgfgdgdfgd', '45756755566', '2022-03-15 13:36:43', 'unblock'),
(58, NULL, 'estifanos', '$2b$10$ONT34xRmVleWRvDDx9KIU.6CxMSoNbthRU5yMsqy1IyNYQ.qslkgq', 'Employee', 'estifanos jemberu   ', '3', 'Male', '', '34', NULL, NULL, '6456456567777 ', '2022-03-16 14:16:40', 'unblock'),
(69, NULL, 'mamex11', 'mamex', 'IT', 'Mamar Habtamu ', '3', 'Male', '', '28', NULL, 'Network Administration ', '0949050454  ', '2022-03-19 09:59:16', 'unblock'),
(71, 59, 'ghgfdhfhfhfhg', '$2b$10$GfCP.AHQfyCUCmDjr75ikeo17sed4MZ61.Xe0Oc8HN5.xEXJlbbPe', 'IT', 'jfngjkdndgfdgd      ', '6', 'Male', '', '54353543', '32', 'ghgfhfhf   ', '455464      ', '2022-03-19 10:29:57', 'unblock'),
(72, NULL, 'ghjgjgjgjgj', '$2b$10$udEmV63B.Znr7HOImbE5Q.MfSYgyxoo/.UH2efcpSIYE1mvFrLWT2', 'Employee', 'khjjghjgjgjg  ', '575', 'Male', 'ghjgjhgjgj  ', '43254', NULL, 'gjhjgjgjh   ', '575676545', '2022-03-21 09:33:09', 'unblock'),
(73, 59, 'ማማር', '$2b$10$w5KS1yyTTG6jfu77obzfkeYpp3wzYnEPXIDjEOd2LgME8LfWHmX3a', 'Employee', 'ገሀጀገጀገጀተሀጀገጀገሀጀገሀ', '', 'Male', 'ፈገሀገፈሀፈገሀ', '5', '', 'ገሀጀገሀጀገጀገሀጀገሀ', '546456546', '2022-03-21 10:01:33', 'unblock'),
(74, 59, 'Mamar1234', '$2b$10$MkoxZlyCPXGKTt66kErOg.bUixZjIkxC2NyoTBr7C5mDnUZ3tRL6i', 'Employee', 'hjkkhkhhgfhfhfg', '', 'Female', '768867867', '4', '', 'sddfsgf', '3454353', '2022-03-21 11:20:54', 'unblock'),
(77, NULL, 'mamarg', '$2b$10$EoH2yS67CqIy7nCEGk6W7ug3/sblN4QV8kIOrVdbpoM8ABqOexVxm', 'Admin', 'Mamar Habtamu g', '', 'Male', 'fdgdgdfgd', '5', '', '', '46546', '2022-03-21 11:49:31', 'unblock');

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
  MODIFY `anouncid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `request_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
  MODIFY `standardid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
