-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3333
-- Время создания: Окт 03 2022 г., 19:04
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mixology`
--

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `time` timestamp NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'uknown',
  `articlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'uknownName',
  `rating` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `category`, `time`, `text`, `author`, `articlename`, `rating`) VALUES
(1, 'tips', '2022-08-07 19:00:00', 'do not keep open your mounth', 'hookahMaster', 'How to smoke it', 1),
(2, 'news', '2022-08-09 19:00:00', 'first news', 'just a boy', 'I\'ve got my first news ', 0),
(3, 'news', '2022-08-11 19:17:56', 'I dropped off a tea cup once , of course it broke into handred pieces', 'mega_Mind', 'The secret', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `articles_category`
--

CREATE TABLE `articles_category` (
  `id` int NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `articles_category`
--

INSERT INTO `articles_category` (`id`, `category`) VALUES
(1, 'tips'),
(2, 'news');

-- --------------------------------------------------------

--
-- Структура таблицы `brand`
--

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `company` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `brand`
--

INSERT INTO `brand` (`id`, `company`, `brand`) VALUES
(1, 'burn', 'black burn'),
(2, 'burn', 'banger'),
(3, 'burn', 'B3 be free'),
(4, 'burn', 'burn'),
(5, 'burn', 'peter ralf'),
(6, 'darkside', 'darkside'),
(7, 'darkside', 'daily hookah'),
(8, 'armango', 'brusko'),
(9, 'musthave', 'musthave');

-- --------------------------------------------------------

--
-- Структура таблицы `coctails`
--

CREATE TABLE `coctails` (
  `id` int NOT NULL,
  `strength` tinyint NOT NULL,
  `recipe` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `coctails`
--

INSERT INTO `coctails` (`id`, `strength`, `recipe`, `category`, `brand`, `rating`) VALUES
(1, 6, 'Applecot + Blackberry + Dark Mint + Green Mist (40%/40%/10%/10%)', 'fresh', 'darkside', 27),
(2, 6, 'Bananapapa + Bounty Hunter (60%/40%)', 'sweet', 'darkside', 10),
(3, 7, 'Basil Blast + Red Tea + Mango Lassi (20%/40%/40%)', 'tart', 'darkside', 10),
(4, 5, 'Bounty Hunter + Cinnamoon + Dark Icecream (40%/30%/30%)', 'dessert', 'darkside', 8),
(5, 6, 'Kalee Grapefruit + Bananapapa + Needls (50%/20%/30%)', 'original', 'darkside', 8),
(6, 6, 'Mango Lassi + Pear + Cinnamoon (30%/50%/20%)', 'spicy', 'dirkside', 8),
(7, 6, 'Serbetli: Ice Green Apple(60%), Afzal: Cranberry(40%)', 'fresh', 'Serbety Afzal', 9),
(11, 0, 'dsfsdfs', 'fresh', 'unknown', 2),
(12, 0, 'dssdfs', 'fresh', 'unknown', 4),
(13, 6, 'sadsdsd', 'fresh', 'unknown', 9),
(14, 5, 'hghfgffhghfghfgh', 'tart', 'unknown', 0),
(15, 9, 'qqqqqq', 'sweet', 'unknown', 0),
(16, 7, 'fdgsdfgsdfg', 'dessert', 'unknown', 1),
(17, 0, 'd', 'fresh', 'unknown', 0),
(18, 0, 'dsfsdf', 'fresh', 'unknown', 1),
(19, 0, 'dsf', 'fresh', 'unknown', 1),
(20, 0, 'dfsd', 'fresh', 'unknown', 1),
(21, 0, 'dfsd1111', 'fresh', 'unknown', 1),
(22, 0, 'fsdfsd', 'fresh', 'unknown', 0),
(23, 0, 'bananaApple', 'dessert', 'unknown', 2),
(24, 0, 'alex123', 'original', 'unknown', 1),
(25, 0, 'ssssssssssssssss', 'fresh', 'unknown', 0),
(26, 3, 'i_just_add_new_one', 'spicy', 'unknown', 0),
(27, 2, 'rwe', 'fresh', 'unknown', 0),
(28, 0, 'fsfsdf', 'fresh', 'unknown', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('p3QtpjX5d8mLd090b1VYcddJDz4Jb7uk', 1664641879, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":32,\"login\":\"malekov\",\"name\":\"aleksej\",\"favoriteRecipe\":\"13,6,23,4,5,3,24,2\"}}}');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `login` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `subscribe` tinyint(1) NOT NULL,
  `favoriteRecipe` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '1',
  `favoriteArticles` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `login`, `password`, `email`, `subscribe`, `favoriteRecipe`, `favoriteArticles`) VALUES
(32, 'aleksej', 'malekov', '$2b$10$q2d7jJ6JuDJNOAhawlb/FOh3rtzlTa.p5r/ZlN67E7bhlk5xHVwte', 'malekovaleksej@gmail.com', 0, '13,6,23,4,5,3,24,2,1', ''),
(33, 'Alex', 'smoker', '$2b$10$9fK8KTrYTM7Z.mclN9i18eZPGPvUjogZISD41GGSYAXKnYtwkj2sG', 'malekovaleksej@gmail.com', 0, '1', '0'),
(34, 'misha', 'misha1', '$2b$10$Di6k3q969OAhblobnkHxPu6s7Dgam7XlOerrNrDthutsKI4XEkCPy', 'malekovaleksej@gmail.com', 0, '1', '0'),
(35, 'Alex', 'smoker', '$2b$10$T5DvKD9xs57Uhjrx7g/aku.G5WIksp2AL1y6u7raDo9heIAssLriC', 'malekovaleksej@gmail.com', 0, '1', '0'),
(36, 'Alex', 'smoker', '$2b$10$fR927ov56QuuD6tohvkKFej2Bm2wvyb88.emGcP4RuEfUPaSOymXC', 'malekovaleksej@gmail.com', 1, '1', '0'),
(37, 'AlexBoss', 'misha1', '$2b$10$g7wRWo6zdMnvkFWetjmwXO/BHFHkJjch5pm2PWJQImg6X7JeMsikC', 'malekovaleksej@gmail.com', 1, '1', '0'),
(38, 'mishaaa', 'misha2', '$2b$10$ITesq0E0Swo.I7iNa1479.yknZJDXLQUVGHnGHqPiOYmtokiMRHxC', 'malekovaleksej@gmail.com', 0, '1', '0'),
(39, 'oleg', 'oleg', '$2b$10$LZ0xSMeCSu1pd8q7VyadGexsbQuTAeZe2kvIbWYAPU8UPxv0jTEF2', 'malekovaleksej@gmail.com', 1, '1', '0'),
(40, 'eeee', 'norimy', '$2b$10$xx5t68ojverFj0JwcMgUQe3vx2vJ.oVm5tzK8xQG2vlhLUZ44Pyai', 'malekovaleksej@gmail.com', 1, '1', '0'),
(41, 'aaaaa', 'aaaaa', '$2b$10$Wpp6odaEt8f.zgJMxlRkwOMkgC6t2YeoT5N3Dkb3IiRP6eLAvdivC', 'malekovaleksej@gmail.com', 1, '1', '0');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `articles_category`
--
ALTER TABLE `articles_category`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `coctails`
--
ALTER TABLE `coctails`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `articles_category`
--
ALTER TABLE `articles_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `coctails`
--
ALTER TABLE `coctails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
