-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2025 a las 17:13:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ddco_lubricantes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL COMMENT 'auto',
  `type_client` int(11) NOT NULL COMMENT '1. Empresa, 2. Persona Natural',
  `user_id` int(11) DEFAULT NULL COMMENT 'cliente registrado pero sin inicio de sesion (null)',
  `type_id` mediumint(9) NOT NULL COMMENT '1. CC 2.CE 3. NIT 4. PP(pasaporte) 5. RUT',
  `number_id` longtext NOT NULL,
  `name` text NOT NULL,
  `lastname` text DEFAULT NULL,
  `cellphone` bigint(20) DEFAULT NULL,
  `address` mediumtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `Sex` varchar(6) DEFAULT NULL COMMENT 'M: Hombre, F: Mujer, NB: no binario, LBGTI: gremio gay etc.',
  `People_legal` text DEFAULT NULL COMMENT 'Representante legal(empresa)',
  `cellphone_legal` bigint(20) DEFAULT NULL,
  `email_legal` longtext DEFAULT NULL,
  `Sex_legal` varchar(6) DEFAULT NULL,
  `stated` int(11) DEFAULT NULL COMMENT '1: active, 2: inactive, 3: bloqued, 4: delete',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='clientes por empresa o normales';

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `type_client`, `user_id`, `type_id`, `number_id`, `name`, `lastname`, `cellphone`, `address`, `email`, `Sex`, `People_legal`, `cellphone_legal`, `email_legal`, `Sex_legal`, `stated`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 4, '32135131', 'DIGITAL DREAMS CO', NULL, 3513513, 'calle 54', 'info@digitaldreams.co', NULL, 'Mario,Prada', 35135135, 'mario@digitaldreams.co', 'M', 1, '2025-03-11 09:50:01', '2025-03-11 09:50:01'),
(2, 2, NULL, 1, '32707396', 'ana victoria', 'machado', 6513515, 'calle 27', 'anav@gmail.com', 'F', ',', NULL, NULL, NULL, 1, '2025-03-11 09:54:07', '2025-03-11 09:54:07'),
(3, 2, NULL, 1, '897205', 'Scarle', 'Carlods', 304585721, 'calle 21', 'carlos@hotmail.com', 'M', ',', NULL, NULL, NULL, 1, '2025-03-13 09:09:45', '2025-03-13 09:09:45'),
(4, 1, NULL, 4, '23151532', 'Lubricantes', NULL, 313513543, 'calle 74', 'lubrica@gmail.com', NULL, ',', NULL, NULL, NULL, 1, '2025-04-29 20:12:52', '2025-04-29 20:12:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formatt_study`
--

CREATE TABLE `formatt_study` (
  `id` int(11) NOT NULL,
  `codigo_id` int(11) NOT NULL,
  `name` varchar(355) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`value`)),
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`config`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `formatt_study`
--

INSERT INTO `formatt_study` (`id`, `codigo_id`, `name`, `tipo`, `value`, `config`, `created_at`, `updated_at`) VALUES
(1, 1, 'formato 100', 'NO', '0', '0', '2025-01-16 22:19:06', '2025-02-12 22:19:06'),
(2, 20251036, 'formato de prueba', 'A4', '[{\"titulo\": \"5.1 HABILIDADES\", \"preguntas\": [{\"peso\": 2, \"campo\": \"hola\", \"titulo\": \"¿Se educa, capacita y califica a gerentes o ingenieros del programa de lubricación con respecto al nivel de Machinery Lubricación Engineer (MLE)® (Ingeniero de Lubricación de Maquinaria) o su equivalente?\", \"Obligatorio\": true, \"calificacion\": 4}, {\"peso\": 2, \"campo\": \"\", \"titulo\": \"¿se educa, capacita y califica a técnicos en lubricación designados para ejecutar las tareas de lubricación de rutina, como se define en los procedimientos de trabajo y en las descripciones de trabajo (entrenamiento basado en tareas), con respecto al nivel I (MLT-I), certificaciones de especialidades (insignias) de ICML, ¿o su equivalente?\", \"Obligatorio\": true, \"calificacion\": 2}], \"descripcion\": \"El plan de gestión del programa de lubricación debe contener un elemento de habilidades, capacitación y competencia para el trabajo. Este elemento debe respaldar el plan de gestión de lubricación y alinearse con este.\"}, {\"titulo\": \"5.2.1 MAQUINARIA\", \"preguntas\": [{\"peso\": 4, \"campo\": \"\", \"titulo\": \"¿Está especificada la información técnica relevante de cada producto utiluzado? Tipo de base, aditivos, espesantes, viscosidad, consistencia?\", \"Obligatorio\": true, \"calificacion\": 4}], \"descripcion\": \"El plan de gestión del programa de lubricación debe incluir un elemento de preparación para la lubricación y el monitoreo de condiciones. Este elemento debe respaldar el plan de gestión de lubricación y alinearse con este.\"}]', '{\"stated\": \"visibility\"}', '2025-03-27 17:15:59', '2025-03-27 17:15:59'),
(3, 202511425, 'otro formato', 'A4', '[{\"titulo\": \"aspecto de la maquina\", \"preguntas\": [], \"descripcion\": \"\"}]', '{\"stated\": \"visibility\"}', '2025-02-12 22:29:07', '2025-02-12 22:29:07'),
(4, 202511430, 'otro formato', 'A4', '[{\"titulo\": \"aspecto de la maquina\", \"preguntas\": [], \"descripcion\": \"\"}]', '{\"stated\": \"visibility\"}', '2025-02-12 22:29:42', '2025-02-12 22:29:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lubrications_study`
--

CREATE TABLE `lubrications_study` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `machine_id` int(11) NOT NULL,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`documents`)),
  `client_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `machine`
--

CREATE TABLE `machine` (
  `id` int(11) NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `equipment_type` varchar(255) NOT NULL DEFAULT 'equipment',
  `observation` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `hierarchy_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`hierarchy_data`)),
  `hierarchy_level` int(11) NOT NULL DEFAULT 0,
  `full_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `machine`
--

INSERT INTO `machine` (`id`, `parent_id`, `name`, `state`, `type`, `equipment_type`, `observation`, `description`, `hierarchy_data`, `hierarchy_level`, `full_path`, `created_at`, `updated_at`) VALUES
(1, NULL, '10', 'ON', 'Retro', 'equipment', NULL, '10', NULL, 0, NULL, '2025-01-15 21:25:07', '2025-01-20 09:01:33'),
(2, NULL, 'retro', 'ON', 'excavadora', 'equipment', 'ninguna', 'excavadora', NULL, 0, NULL, '2025-01-16 04:36:38', '2025-01-16 04:36:38'),
(3, NULL, 'nueva', 'ON', 'Retro', 'equipment', 'ninguna', 'nada', NULL, 0, NULL, '2025-01-16 04:43:41', '2025-01-16 04:43:41'),
(4, NULL, 'excavadora', 'util', 'excavadora', 'equipment', 'ninguna', 'excavadora', NULL, 0, NULL, '2025-01-17 00:24:24', '2025-01-17 00:24:24'),
(5, NULL, 'Excavadora MT500', 'SI', '360', 'equipment', 'ninguna', 'Maquina amarilla', NULL, 0, NULL, '2025-01-18 00:24:58', '2025-01-18 00:24:58'),
(6, NULL, 'Excavadora MT900 5', 'ON', '368° cen', 'equipment', 'ninguna', 'Maquina verde hola', NULL, 0, NULL, '2025-01-18 00:26:34', '2025-01-20 09:00:10'),
(7, NULL, 'Excavadora MT250 - KJ', 'SI', 'TROQUE ALTO', 'equipment', 'ninguna', 'Maquina con metal para excavar 450 mts de profundidad', NULL, 0, NULL, '2025-01-18 00:39:59', '2025-01-18 00:39:59'),
(8, NULL, 'Reductor 150', 'ON', 'Engrane', 'equipment', 'ninguna', 'esta maquina es transmision', NULL, 0, NULL, '2025-01-21 00:42:00', '2025-01-21 00:42:51'),
(9, NULL, 'Propiedad', 'ON', 'CSE', 'equipment', 'observacion', 'las properties', NULL, 0, NULL, '2025-03-07 23:07:24', '2025-03-07 23:07:24'),
(10, NULL, 'Maquina 10024', 'ON', 'PISCAE', 'equipment', 'esto', 'esta maquina', NULL, 0, NULL, '2025-03-07 23:15:46', '2025-03-07 23:15:46'),
(13, NULL, 'RVSI-800', 'ON', 'ESCAVADORA', 'equipment', 'a', 'nad', NULL, 0, NULL, '2025-03-11 08:05:31', '2025-03-11 08:05:31'),
(14, NULL, 'tu nombre', 'ON', 'viendo', 'equipment', 'est', 'a', NULL, 0, NULL, '2025-03-11 08:06:58', '2025-03-11 08:06:58'),
(15, NULL, 'Excavadora CAT 320D', 'Operativa', 'Maquinaria Pesada', 'equipment', 'Equipo en buen estado', 'Excavadora principal para movimiento de tierra', NULL, 0, NULL, '2025-07-31 22:32:41', '2025-07-31 22:32:41'),
(16, NULL, 'Bulldozer D6T', 'Mantenimiento', 'Maquinaria Pesada', 'equipment', 'Requiere mantenimiento preventivo', 'Bulldozer para nivelación de terreno', NULL, 0, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(17, 15, 'Sistema Hidráulico', 'Operativo', 'Sistema', 'subequipment', 'Presión normal', 'Sistema hidráulico principal de la excavadora', NULL, 1, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(18, 15, 'Sistema Motor', 'Operativo', 'Sistema', 'subequipment', 'Funcionamiento óptimo', 'Motor diésel principal', NULL, 1, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(19, 15, 'Sistema de Orugas', 'Operativo', 'Sistema', 'subequipment', 'Desgaste normal', 'Sistema de tracción por orugas', NULL, 1, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(20, 17, 'Bomba Hidráulica Principal', 'Operativa', 'Bomba', 'component', 'Funcionamiento normal', 'Bomba de pistones axiales', '{\"specifications\":{\"pressure_rating\":\"350 bar\",\"flow_rate\":\"120 L\\/min\",\"displacement\":\"75 cc\\/rev\"},\"maintenance_info\":{\"last_service\":\"2025-06-15\",\"next_service\":\"2025-12-15\",\"service_hours\":500}}', 2, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(21, 17, 'Cilindros de Elevación', 'Operativo', 'Cilindro', 'component', 'Sin fugas detectadas', 'Cilindros hidráulicos para elevación del brazo', NULL, 2, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(22, 17, 'Filtro Hidráulico', 'Operativo', 'Filtro', 'component', 'Pendiente cambio próximo mantenimiento', 'Filtro principal del sistema hidráulico', NULL, 2, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(23, 20, 'Pistones de la Bomba', 'Operativo', 'Pistón', 'part', 'Buen estado', 'Set de pistones de la bomba principal', NULL, 3, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(24, 20, 'Plato de Levas', 'Operativo', 'Plato', 'part', 'Sin desgaste visible', 'Plato de levas de la bomba hidráulica', NULL, 3, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(25, 20, 'Sellos de la Bomba', 'Atención', 'Sello', 'part', 'Revisar en próximo mantenimiento', 'Sellos principales de la bomba', NULL, 3, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(26, 18, 'Filtro de Aceite', 'Operativo', 'Filtro', 'component', 'Cambiado recientemente', 'Filtro de aceite del motor', NULL, 2, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(27, 18, 'Turbocompresor', 'Operativo', 'Compresor', 'component', 'Funcionamiento óptimo', 'Turbocompresor del motor diésel', NULL, 2, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(28, 16, 'Sistema Hidráulico', 'Mantenimiento', 'Sistema', 'subequipment', 'En revisión', 'Sistema hidráulico del bulldozer', NULL, 1, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(29, 16, 'Sistema de Cuchilla', 'Operativo', 'Sistema', 'subequipment', 'Funcionamiento normal', 'Sistema de control de la cuchilla', NULL, 1, NULL, '2025-07-31 22:32:42', '2025-07-31 22:32:42'),
(30, NULL, 'Excavadora CAT 320D', 'Operativa', 'Maquinaria Pesada', 'equipment', 'Equipo en buen estado', 'Excavadora principal para movimiento de tierra', NULL, 0, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(31, NULL, 'Bulldozer D6T', 'Mantenimiento', 'Maquinaria Pesada', 'equipment', 'Requiere mantenimiento preventivo', 'Bulldozer para nivelación de terreno', NULL, 0, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(32, 30, 'Sistema Hidráulico', 'Operativo', 'Sistema', 'subequipment', 'Presión normal', 'Sistema hidráulico principal de la excavadora', NULL, 1, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(33, 30, 'Sistema Motor', 'Operativo', 'Sistema', 'subequipment', 'Funcionamiento óptimo', 'Motor diésel principal', NULL, 1, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(34, 30, 'Sistema de Orugas', 'Operativo', 'Sistema', 'subequipment', 'Desgaste normal', 'Sistema de tracción por orugas', NULL, 1, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(35, 32, 'Bomba Hidráulica Principal', 'Operativa', 'Bomba', 'component', 'Funcionamiento normal', 'Bomba de pistones axiales', '{\"specifications\":{\"pressure_rating\":\"350 bar\",\"flow_rate\":\"120 L\\/min\",\"displacement\":\"75 cc\\/rev\"},\"maintenance_info\":{\"last_service\":\"2025-06-15\",\"next_service\":\"2025-12-15\",\"service_hours\":500}}', 2, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(36, 32, 'Cilindros de Elevación', 'Operativo', 'Cilindro', 'component', 'Sin fugas detectadas', 'Cilindros hidráulicos para elevación del brazo', NULL, 2, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(37, 32, 'Filtro Hidráulico', 'Operativo', 'Filtro', 'component', 'Pendiente cambio próximo mantenimiento', 'Filtro principal del sistema hidráulico', NULL, 2, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(38, 35, 'Pistones de la Bomba', 'Operativo', 'Pistón', 'part', 'Buen estado', 'Set de pistones de la bomba principal', NULL, 3, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(39, 35, 'Plato de Levas', 'Operativo', 'Plato', 'part', 'Sin desgaste visible', 'Plato de levas de la bomba hidráulica', NULL, 3, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(40, 35, 'Sellos de la Bomba', 'Atención', 'Sello', 'part', 'Revisar en próximo mantenimiento', 'Sellos principales de la bomba', NULL, 3, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(41, 33, 'Filtro de Aceite', 'Operativo', 'Filtro', 'component', 'Cambiado recientemente', 'Filtro de aceite del motor', NULL, 2, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(42, 33, 'Turbocompresor', 'Operativo', 'Compresor', 'component', 'Funcionamiento óptimo', 'Turbocompresor del motor diésel', NULL, 2, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(43, 31, 'Sistema Hidráulico', 'Mantenimiento', 'Sistema', 'subequipment', 'En revisión', 'Sistema hidráulico del bulldozer', NULL, 1, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(44, 31, 'Sistema de Cuchilla', 'Operativo', 'Sistema', 'subequipment', 'Funcionamiento normal', 'Sistema de control de la cuchilla', NULL, 1, NULL, '2025-07-31 23:55:56', '2025-07-31 23:55:56'),
(45, NULL, 'Test Manual', 'Operativo', NULL, 'equipment', NULL, NULL, NULL, 0, NULL, '2025-08-01 00:06:42', '2025-08-01 00:06:42'),
(46, NULL, 'Excavadora Nueva Test', 'Operativo', 'Maquinaria', 'equipment', NULL, 'Excavadora de prueba', NULL, 0, NULL, '2025-08-01 00:07:22', '2025-08-01 00:07:22'),
(47, 46, 'Motor Principal', 'Operativo', 'Motor', 'component', NULL, 'Motor del equipo', NULL, 1, NULL, '2025-08-01 00:07:31', '2025-08-01 00:07:31'),
(48, 47, 'Filtro de Aceite', 'Operativo', 'Filtro', 'part', NULL, 'Filtro del motor', NULL, 2, NULL, '2025-08-01 00:07:38', '2025-08-01 00:07:38'),
(49, NULL, 'Non sequi cillum nis', 'Fuera de servicio', 'Lorem velit cum qui', 'part', 'Voluptatem dolores h', 'Quos perferendis id', '{\"created_at\":\"2025-07-31T19:16:22.693Z\",\"total_components\":1}', 0, NULL, '2025-08-01 00:16:23', '2025-08-01 00:16:23'),
(50, 49, 'Porter Grimes', 'Operativo', 'Quis nesciunt debit', 'component', 'Laborum cupidatat vo', 'Libero itaque ut con', '{\"level\":\"component\",\"created_at\":\"2025-07-31T19:16:23.568Z\"}', 1, NULL, '2025-08-01 00:16:23', '2025-08-01 00:16:23'),
(51, NULL, 'Test Simple', NULL, NULL, 'component', NULL, NULL, NULL, 0, NULL, '2025-08-01 01:50:45', '2025-08-01 01:50:45'),
(52, NULL, 'Test Simple', NULL, NULL, 'component', NULL, NULL, NULL, 0, NULL, '2025-08-01 01:50:56', '2025-08-01 01:50:56'),
(53, NULL, 'Sistema de Control Industrial', NULL, NULL, 'equipment', NULL, NULL, NULL, 0, NULL, '2025-08-01 02:32:25', '2025-08-01 02:32:25'),
(54, NULL, 'Sistema de Control Industrial', NULL, NULL, 'equipment', NULL, NULL, NULL, 0, NULL, '2025-08-01 02:32:33', '2025-08-01 02:32:33'),
(55, 54, 'Unidad de Control Central', NULL, NULL, 'subequipment', NULL, NULL, NULL, 1, NULL, '2025-08-01 02:32:41', '2025-08-01 02:32:41'),
(56, 54, 'Sistema de Sensores', NULL, NULL, 'subequipment', NULL, NULL, NULL, 1, NULL, '2025-08-01 02:32:50', '2025-08-01 02:32:50'),
(57, 54, 'Sistema de Actuadores', NULL, NULL, 'subequipment', NULL, NULL, NULL, 1, NULL, '2025-08-01 02:33:01', '2025-08-01 02:33:01'),
(58, 55, 'PLC Principal', NULL, NULL, 'component', NULL, NULL, NULL, 2, NULL, '2025-08-01 02:33:07', '2025-08-01 02:33:07'),
(59, 55, 'HMI Terminal', NULL, NULL, 'component', NULL, NULL, NULL, 2, NULL, '2025-08-01 02:33:13', '2025-08-01 02:33:13'),
(60, 56, 'Sensor de Temperatura', NULL, NULL, 'component', NULL, NULL, NULL, 2, NULL, '2025-08-01 02:33:18', '2025-08-01 02:33:18'),
(61, 56, 'Sensor de Presion', NULL, NULL, 'component', NULL, NULL, NULL, 2, NULL, '2025-08-01 02:33:53', '2025-08-01 02:33:53'),
(62, 57, 'Valvula Neumatica', NULL, NULL, 'component', NULL, NULL, NULL, 2, NULL, '2025-08-01 02:33:59', '2025-08-01 02:33:59'),
(63, 58, 'CPU del PLC', NULL, NULL, 'part', NULL, NULL, NULL, 3, NULL, '2025-08-01 02:34:09', '2025-08-01 02:34:09'),
(64, 58, 'Modulo de Entradas', NULL, NULL, 'part', NULL, NULL, NULL, 3, NULL, '2025-08-01 02:34:17', '2025-08-01 02:34:17'),
(65, 59, 'Pantalla Tactil', NULL, NULL, 'part', NULL, NULL, NULL, 3, NULL, '2025-08-01 02:34:30', '2025-08-01 02:34:30'),
(66, 60, 'Elemento Sensor', NULL, NULL, 'part', NULL, NULL, NULL, 3, NULL, '2025-08-01 02:34:44', '2025-08-01 02:34:44'),
(67, 62, 'Diafragma', NULL, NULL, 'part', NULL, NULL, NULL, 3, NULL, '2025-08-01 02:34:51', '2025-08-01 02:34:51'),
(68, NULL, 'Bomba Centrífuga A1', 'Operativo', 'Bombas', 'equipment', 'Importado desde Excel el 2025-08-01 03:38:44', 'Bomba principal del sistema de agua', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(69, NULL, 'Motor Eléctrico M1', 'Operativo', 'Motores', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Motor de 50HP para bomba A1', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(70, NULL, 'Válvula Check V1', 'Mantenimiento', 'Válvulas', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Válvula de retención principal', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(71, NULL, 'Sensor de Presión S1', 'Operativo', 'Sensores', 'part', 'Importado desde Excel el 2025-08-01 03:38:44', 'Sensor digital de presión', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(72, NULL, 'Filtro de Agua F1', 'Operativo', 'Filtros', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Filtro de sedimentos de 100 micras', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(73, NULL, 'Controlador PLC C1', 'Operativo', 'Control', 'equipment', 'Importado desde Excel el 2025-08-01 03:38:44', 'Controlador lógico programable', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(74, NULL, 'Transformador T1', 'Operativo', 'Eléctrico', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Transformador de 480V a 220V', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(75, NULL, 'Caja de Conexiones CB1', 'Operativo', 'Eléctrico', 'part', 'Importado desde Excel el 2025-08-01 03:38:44', 'Caja de distribución eléctrica', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(76, NULL, 'Tanque de Almacenamiento TK1', 'Operativo', 'Tanques', 'equipment', 'Importado desde Excel el 2025-08-01 03:38:44', 'Tanque de 5000 litros', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(77, NULL, 'Medidor de Flujo FM1', 'Mantenimiento', 'Medición', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Medidor electromagnético', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(78, NULL, 'Tubería Principal P1', 'Operativo', 'Tuberías', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Tubería de acero inoxidable 6 pulgadas', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(79, NULL, 'Acoplamiento AC1', 'Operativo', 'Mecánico', 'part', 'Importado desde Excel el 2025-08-01 03:38:44', 'Acoplamiento flexible motor-bomba', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(80, NULL, 'Sistema de Control SC1', 'Operativo', 'Control', 'equipment', 'Importado desde Excel el 2025-08-01 03:38:44', 'Sistema automatizado de control', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(81, NULL, 'Variador de Frecuencia VF1', 'Operativo', 'Eléctrico', 'component', 'Importado desde Excel el 2025-08-01 03:38:44', 'Variador para control de velocidad', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44'),
(82, NULL, 'Intercambiador de Calor IC1', 'Mantenimiento', 'Térmico', 'equipment', 'Importado desde Excel el 2025-08-01 03:38:44', 'Intercambiador de placas', NULL, 0, NULL, '2025-08-01 08:38:44', '2025-08-01 08:38:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_07_24_210104_add_roles_id_to_users_table', 2),
(6, '2025_07_24_210201_create_roles_table', 2),
(7, '2025_07_24_213019_create_sessions_table', 3),
(8, '2025_07_31_000001_modify_machine_table_for_hierarchy', 4),
(9, '2025_08_01_030029_create_uploaded_files_table', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `stated` tinyint(1) NOT NULL,
  `default_roles` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `stated`, `default_roles`, `created_at`, `updated_at`) VALUES
(1, 'create-service', 1, 1, NULL, NULL),
(2, 'update-service', 1, 1, NULL, NULL),
(3, 'delete-service', 1, 1, NULL, NULL),
(4, 'read-service', 1, 1, NULL, NULL),
(5, 'read-supports', 1, 1, NULL, NULL),
(6, 'create-user', 1, 1, NULL, NULL),
(7, 'update-user', 1, 1, NULL, NULL),
(8, 'read-config-system', 1, 1, NULL, NULL),
(9, 'read-study', 1, 4, NULL, NULL),
(10, 'create-study', 1, 4, NULL, NULL),
(11, 'delete-study', 1, 1, NULL, NULL),
(12, 'update-study', 1, 4, NULL, NULL),
(13, 'read-user', 1, 1, NULL, NULL),
(14, 'create-message', 1, 4, NULL, NULL),
(15, 'create-card', 1, 1, NULL, NULL),
(16, 'read-card', 1, 1, NULL, NULL),
(17, 'update-card', 1, 1, NULL, NULL),
(18, 'delete-card', 1, 1, NULL, NULL),
(19, 'read-idiom', 1, 1, NULL, NULL),
(20, 'create-idiom', 1, 1, NULL, NULL),
(21, 'update-idiom', 1, 1, NULL, NULL),
(22, 'delete-idiom', 1, 1, NULL, NULL),
(23, 'read-smtp', 1, 1, NULL, NULL),
(24, 'create-smtp', 1, 1, NULL, NULL),
(25, 'update-smtp', 1, 1, NULL, NULL),
(26, 'delete-smtp', 1, 1, NULL, NULL),
(27, 'create-format', 1, 1, NULL, NULL),
(28, 'read-format', 1, 1, NULL, NULL),
(29, 'update-format', 1, 1, NULL, NULL),
(30, 'delete-format', 1, 1, NULL, NULL),
(36, 'update-machine', 1, 1, NULL, NULL),
(35, 'read-machine', 1, 1, NULL, NULL),
(34, 'create-machine', 1, 1, NULL, NULL),
(37, 'delete-machine', 1, 1, NULL, NULL),
(38, 'create-client', 1, 1, NULL, NULL),
(39, 'read-client', 1, 1, NULL, NULL),
(40, 'update-client', 1, 1, NULL, NULL),
(41, 'delete-client', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permission_has_users`
--

CREATE TABLE `permission_has_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permission_has_users`
--

INSERT INTO `permission_has_users` (`id`, `user_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 2, 9, '2024-07-15 20:35:18', '2024-07-15 20:35:18'),
(2, 2, 14, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(3, 1, 1, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(4, 1, 7, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(5, 1, 4, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(6, 1, 13, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(7, 1, 9, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(8, 1, 5, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(9, 1, 8, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(10, 1, 6, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(11, 1, 10, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(12, 1, 14, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(13, 1, 16, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(14, 1, 19, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(15, 1, 23, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(16, 1, 3, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(17, 1, 15, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(18, 1, 27, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(19, 1, 28, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(20, 3, 16, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(21, 3, 14, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(22, 2, 10, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(23, 2, 4, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(24, 2, 16, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(25, 1, 34, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(26, 1, 37, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(27, 1, 35, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(28, 1, 36, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(29, 1, 38, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(30, 1, 39, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(31, 1, 40, '2024-07-15 20:35:25', '2024-07-15 20:35:25'),
(32, 5, 1, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(33, 5, 2, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(34, 5, 3, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(35, 5, 4, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(36, 5, 5, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(37, 5, 6, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(38, 5, 7, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(39, 5, 8, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(40, 5, 9, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(41, 5, 10, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(42, 5, 11, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(43, 5, 12, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(44, 5, 13, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(45, 5, 14, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(46, 5, 15, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(47, 5, 16, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(48, 5, 17, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(49, 5, 18, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(50, 5, 19, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(51, 5, 20, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(52, 5, 21, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(53, 5, 22, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(54, 5, 23, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(55, 5, 24, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(56, 5, 25, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(57, 5, 26, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(58, 5, 27, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(59, 5, 28, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(60, 5, 29, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(61, 5, 30, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(62, 5, 36, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(63, 5, 35, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(64, 5, 34, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(65, 5, 37, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(66, 5, 38, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(67, 5, 39, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(68, 5, 40, '2025-07-25 08:48:17', '2025-07-25 08:48:17'),
(69, 5, 41, '2025-07-25 08:48:17', '2025-07-25 08:48:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 5, 'auth_token', '36e26961909c693ad5e02abdf7a4cd59ddd2d5d98cff2e312d67b9e05bf01f08', '[\"*\"]', '2025-07-25 01:11:00', NULL, '2025-07-25 01:10:42', '2025-07-25 01:11:00'),
(2, 'App\\Models\\User', 5, 'auth_token', '5254d4454576d3d62507b90e710cd6eca69cfca3a3f9d63dd6b686a43758b787', '[\"*\"]', '2025-07-25 01:37:32', NULL, '2025-07-25 01:37:08', '2025-07-25 01:37:32'),
(3, 'App\\Models\\User', 5, 'auth_token', '9e3a164b58e490ee681ea28eb3059bb80b61be5df245e2bcfd43ccd20ec93522', '[\"*\"]', NULL, NULL, '2025-07-25 01:47:44', '2025-07-25 01:47:44'),
(4, 'App\\Models\\User', 5, 'auth_token', '088bedab0697654b9f8e9a895a477428452957f17eacb458f482359fab5a8542', '[\"*\"]', NULL, NULL, '2025-07-25 01:50:07', '2025-07-25 01:50:07'),
(5, 'App\\Models\\User', 5, 'auth_token', '45251db526936f9e89112d0a0d8ddec4541d5912d15ad1536fc19708eff8ac16', '[\"*\"]', NULL, NULL, '2025-07-25 01:51:07', '2025-07-25 01:51:07'),
(6, 'App\\Models\\User', 5, 'auth_token', '125ec6c5f76f47c88bc87515165c2484d2e9fe36239ca6548be6123b88da9a9d', '[\"*\"]', '2025-07-25 02:14:22', NULL, '2025-07-25 02:14:13', '2025-07-25 02:14:22'),
(7, 'App\\Models\\User', 5, 'auth_token', 'bdc3fd168dc4b6186da1936b259ed8697c97886bfa366997221bf4eeef525803', '[\"*\"]', '2025-07-25 02:48:26', NULL, '2025-07-25 02:48:11', '2025-07-25 02:48:26'),
(11, 'App\\Models\\User', 5, 'auth_token', '667c5333ae54992543ca030b0d0e69eb2e4bd9a40c031582f3a5b526d7cb3d8a', '[\"*\"]', '2025-07-25 10:04:20', NULL, '2025-07-25 09:41:51', '2025-07-25 10:04:20'),
(12, 'App\\Models\\User', 5, 'auth_token', '4f0ce094165721cab3c4d2e5b6532c01e29309c1c5fd2c154000d0baff88e761', '[\"*\"]', '2025-07-25 10:22:49', NULL, '2025-07-25 10:22:48', '2025-07-25 10:22:49'),
(13, 'App\\Models\\User', 5, 'auth_token', '431247c963ccbd2b404e8f69036a7d7063efec73fd39be820c259f5eef6a8b0a', '[\"*\"]', '2025-07-25 10:34:56', NULL, '2025-07-25 10:34:55', '2025-07-25 10:34:56'),
(14, 'App\\Models\\User', 5, 'auth_token', '2475c2ed22fd17daf1350bbf83e877c589d3f2d8b27909c5c57cdebeb5659e18', '[\"*\"]', '2025-07-25 10:40:31', NULL, '2025-07-25 10:40:30', '2025-07-25 10:40:31'),
(15, 'App\\Models\\User', 5, 'auth_token', 'fc18dbfbdb027b3b3742cec3848c01e24120c72778b3094e0d44d1225e17dc47', '[\"*\"]', '2025-07-25 10:45:39', NULL, '2025-07-25 10:45:38', '2025-07-25 10:45:39'),
(16, 'App\\Models\\User', 5, 'auth_token', '85e79aa8106168345b433229ce700e82e5aeaeffe74c055c5c3551d4c3084f7d', '[\"*\"]', '2025-07-25 11:05:48', NULL, '2025-07-25 11:02:59', '2025-07-25 11:05:48'),
(20, 'App\\Models\\User', 5, 'auth_token', '8d7098a1546ba9366e0d2238c9e9916d0797df26ddec38a6b6abd8ad2a5fcae6', '[\"*\"]', '2025-07-26 01:31:55', NULL, '2025-07-26 01:06:44', '2025-07-26 01:31:55'),
(21, 'App\\Models\\User', 5, 'auth_token', '6edade727e82f05dd6d6bf0463066fb2d2c8ee83acabc591ef6766f1f915399d', '[\"*\"]', '2025-08-02 00:55:14', NULL, '2025-07-31 22:49:11', '2025-08-02 00:55:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2024-07-15 18:21:28', '2024-07-15 18:21:28'),
(2, 'super-admin', '2024-07-15 18:21:28', '2024-07-15 18:21:28'),
(3, 'client', '2024-07-15 18:21:56', '2024-07-15 18:21:56'),
(4, 'operate', '2024-07-15 18:21:56', '2024-07-15 18:21:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `ref` mediumtext DEFAULT NULL,
  `name` text NOT NULL,
  `description` longtext DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `direccion` varchar(800) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `machine_id` int(11) DEFAULT NULL,
  `formatt_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_user_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `image` blob DEFAULT NULL COMMENT 'image machine',
  `state` int(11) DEFAULT 2 COMMENT '1.proccess, 2.pending, 3.finish',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`id`, `ref`, `name`, `description`, `hora`, `direccion`, `date`, `machine_id`, `formatt_id`, `user_id`, `create_user_id`, `client_id`, `image`, `state`, `created_at`, `updated_at`) VALUES
(1, '52871534', 'Maquina de inspección', NULL, NULL, 'calle 25', '2025-02-26', 3, 4, 2, 1, NULL, 0x687474703a2f2f6c6f63616c686f73743a383030302f696d6167656e2f363738656136373761363437662e706e67, 2, '2025-01-16 05:04:53', '2025-01-21 00:39:35'),
(2, '52671538', 'serviccio cual nuevo', NULL, NULL, NULL, '2025-01-21', 2, NULL, 2, 1, NULL, NULL, 2, '2025-01-16 05:34:05', '2025-01-16 05:34:05'),
(3, '72871634', 'servicio de prueba', 'prueba de', '14:38:00', NULL, '2025-02-27', 4, 1, 1, 1, NULL, 0x696d616765732f363738633932616261363239372e706e67, 3, '2025-01-17 00:25:22', '2025-01-19 10:50:36'),
(4, '59670524', 'servicio de prueba', NULL, NULL, NULL, '2025-02-28', 4, NULL, 1, 1, NULL, NULL, 2, '2025-01-17 00:25:22', '2025-01-17 00:25:22'),
(5, '53831581', 'servicio de prueba', NULL, NULL, NULL, '2025-01-28', 4, NULL, 1, 1, NULL, NULL, 2, '2025-01-17 00:25:22', '2025-01-17 00:25:22'),
(7, '22871234', 'servicios andres', 'hola', NULL, NULL, '2025-01-31', 2, NULL, 1, 1, NULL, NULL, 2, '2025-01-19 09:13:34', '2025-01-19 09:13:34'),
(8, '32377584', 'servicio de prueba ultima', 'hola', '14:37:00', 'cra 54', '2025-01-23', 2, 3, 2, 1, NULL, NULL, 2, '2025-01-19 09:32:09', '2025-01-19 09:35:38'),
(9, '50871530', 'probando este dorm', 'si necesitamos mas', '15:49:00', 'calle 54', '2025-02-26', 7, 1, 2, 1, NULL, NULL, 2, '2025-01-19 09:45:53', '2025-01-19 09:45:53'),
(10, '31651321', 'a', 's', '14:30:00', 's', '2025-01-22', 1, 2, 2, 1, NULL, NULL, 2, '2025-01-21 00:28:27', '2025-01-21 00:28:27'),
(11, '3213513', 'Servicio de RRST', 'esta', '03:13:00', 'calle 978', '2025-04-25', 13, 2, 2, 1, 2, NULL, 2, '2025-03-11 10:12:07', '2025-04-25 21:19:32'),
(12, '85811612', 'servicio para renovar todo en el hogar', 'servicio de prueba', '23:18:00', 'calle 23', '2025-06-05', 13, 2, 2, 1, 2, NULL, 2, '2025-03-13 09:14:00', '2025-03-13 09:14:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_of_identity`
--

CREATE TABLE `type_of_identity` (
  `id` int(11) NOT NULL,
  `name` longtext NOT NULL,
  `stated` int(11) NOT NULL DEFAULT 1 COMMENT '1: active, 2: inactive '
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `type_of_identity`
--

INSERT INTO `type_of_identity` (`id`, `name`, `stated`) VALUES
(1, 'CC', 1),
(2, 'CE', 1),
(3, 'PP', 1),
(4, 'NIT', 1),
(5, 'RUT', 1),
(6, 'RUES', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_size` bigint(20) NOT NULL,
  `processed_records` int(11) NOT NULL DEFAULT 0,
  `dashboard_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dashboard_data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `filename`, `original_name`, `file_path`, `file_size`, `processed_records`, `dashboard_data`, `created_at`, `updated_at`) VALUES
(1, '20250801_032539_20250704_105456_Matriz de lubricacion Lamitech.xlsx', '20250704_105456_Matriz de lubricacion Lamitech.xlsx', 'uploads/excel/2025/08/20250801_032539_20250704_105456_Matriz de lubricacion Lamitech.xlsx', 372872, 0, '[]', '2025-08-01 08:25:40', '2025-08-01 08:25:40'),
(2, '20250801_033844_ejemplo_equipos.csv', 'ejemplo_equipos.csv', 'uploads/excel/2025/08/20250801_033844_ejemplo_equipos.csv', 1284, 15, '{\"equipment_by_type\":{\"equipment\":5,\"component\":7,\"part\":3},\"equipment_by_state\":{\"Operativo\":12,\"Mantenimiento\":3},\"hierarchy_levels\":[],\"monthly_data\":[{\"month\":\"Ene\",\"uploads\":41,\"equipment\":53},{\"month\":\"Feb\",\"uploads\":26,\"equipment\":13},{\"month\":\"Mar\",\"uploads\":12,\"equipment\":38},{\"month\":\"Abr\",\"uploads\":27,\"equipment\":41},{\"month\":\"May\",\"uploads\":28,\"equipment\":44},{\"month\":\"Jun\",\"uploads\":16,\"equipment\":89},{\"month\":\"Jul\",\"uploads\":27,\"equipment\":81},{\"month\":\"Ago\",\"uploads\":36,\"equipment\":22},{\"month\":\"Sep\",\"uploads\":0,\"equipment\":0},{\"month\":\"Oct\",\"uploads\":0,\"equipment\":0},{\"month\":\"Nov\",\"uploads\":0,\"equipment\":0},{\"month\":\"Dic\",\"uploads\":0,\"equipment\":0}],\"recent_uploads\":[{\"name\":\"Bomba Centr\\u00edfuga A1\",\"type\":\"equipment\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.106746Z\"},{\"name\":\"Motor El\\u00e9ctrico M1\",\"type\":\"component\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.107991Z\"},{\"name\":\"V\\u00e1lvula Check V1\",\"type\":\"component\",\"state\":\"Mantenimiento\",\"timestamp\":\"2025-08-01T03:38:44.108715Z\"},{\"name\":\"Sensor de Presi\\u00f3n S1\",\"type\":\"part\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.109864Z\"},{\"name\":\"Filtro de Agua F1\",\"type\":\"component\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.110792Z\"},{\"name\":\"Controlador PLC C1\",\"type\":\"equipment\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.111850Z\"},{\"name\":\"Transformador T1\",\"type\":\"component\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.112788Z\"},{\"name\":\"Caja de Conexiones CB1\",\"type\":\"part\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.113624Z\"},{\"name\":\"Tanque de Almacenamiento TK1\",\"type\":\"equipment\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.114984Z\"},{\"name\":\"Medidor de Flujo FM1\",\"type\":\"component\",\"state\":\"Mantenimiento\",\"timestamp\":\"2025-08-01T03:38:44.115917Z\"},{\"name\":\"Tuber\\u00eda Principal P1\",\"type\":\"component\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.116759Z\"},{\"name\":\"Acoplamiento AC1\",\"type\":\"part\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.117628Z\"},{\"name\":\"Sistema de Control SC1\",\"type\":\"equipment\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.118365Z\"},{\"name\":\"Variador de Frecuencia VF1\",\"type\":\"component\",\"state\":\"Operativo\",\"timestamp\":\"2025-08-01T03:38:44.119087Z\"},{\"name\":\"Intercambiador de Calor IC1\",\"type\":\"equipment\",\"state\":\"Mantenimiento\",\"timestamp\":\"2025-08-01T03:38:44.119854Z\"}],\"summary\":{\"total_records\":15,\"upload_date\":\"2025-08-01T03:38:44.119900Z\",\"equipment_types\":3,\"states_variety\":2}}', '2025-08-01 08:38:44', '2025-08-01 08:38:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `lastname` varchar(500) DEFAULT NULL,
  `roles_id` int(11) DEFAULT 3,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `lastname`, `roles_id`, `created_at`, `updated_at`) VALUES
(1, 'Andres', 'andresg9602@equilibria.com', NULL, '$2a$12$8V8vY8Mr/Zgdj8vHuctUbe4887H1jnWaNxe2mmTbk9s7VzE2dXB9q', NULL, NULL, 2, '2024-07-15 10:23:13', '2024-07-15 10:23:13'),
(2, 'melissa', 'melissa@equilibria.com', NULL, '$2y$12$.x8vbj0VfG.vFS1jRIq9CemxcxK7rMoIcnhL24hOqrRyKcsKs5hTy', NULL, NULL, 4, '2024-07-17 03:18:30', '2024-07-17 03:18:30'),
(3, 'ana', 'anav@equilibria.com', NULL, '$2y$12$Q0aHy9ovZOJ3O8QEHINCLe.8WindMZYg5oRN.GnVwGrm7SWuYm9tW', NULL, NULL, 3, '2024-10-16 11:28:31', '2024-10-16 11:28:31'),
(4, 'Jesus', 'dev2@digitaldreams.co', NULL, '$2y$10$OSU0f9shod8jI7WQtLCNhOQrFwJPI2P/kfvKbTRYwZPuS7Se6QTxy', NULL, NULL, 2, NULL, NULL),
(5, 'Admin', 'admin@equilub.com', NULL, '$2y$12$5lLsWpZiQACg19faqfGdr.2QiwmsH84FVsUIEIzkRdnTf7MzQyzz.', NULL, NULL, 2, '2025-07-25 01:10:32', '2025-07-25 01:36:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Unique_id_client` (`number_id`(200)) USING BTREE;

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `formatt_study`
--
ALTER TABLE `formatt_study`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lubrications_study`
--
ALTER TABLE `lubrications_study`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `machine`
--
ALTER TABLE `machine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `machine_parent_id_index` (`parent_id`),
  ADD KEY `machine_equipment_type_index` (`equipment_type`(250)),
  ADD KEY `machine_hierarchy_level_index` (`hierarchy_level`),
  ADD KEY `machine_full_path_index` (`full_path`(250));

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permission_has_users`
--
ALTER TABLE `permission_has_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `type_of_identity`
--
ALTER TABLE `type_of_identity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_files_created_at_index` (`created_at`),
  ADD KEY `uploaded_files_filename_index` (`filename`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formatt_study`
--
ALTER TABLE `formatt_study`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lubrications_study`
--
ALTER TABLE `lubrications_study`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `machine`
--
ALTER TABLE `machine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `permission_has_users`
--
ALTER TABLE `permission_has_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `type_of_identity`
--
ALTER TABLE `type_of_identity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
