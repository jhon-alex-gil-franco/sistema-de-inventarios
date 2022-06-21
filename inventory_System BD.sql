-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-02-2022 a las 21:23:11
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lava_autos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abonos`
--

CREATE TABLE `abonos` (
  `id` int(11) NOT NULL,
  `abonado` decimal(10,0) NOT NULL,
  `fecha` date NOT NULL,
  `factura_codFactura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idClientes` varchar(15) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `Direccion` varchar(70) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `celular` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `T_cliente` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresos`
--

CREATE TABLE `egresos` (
  `cod` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `concepto` varchar(200) NOT NULL,
  `valor` decimal(10,0) NOT NULL,
  `Proveedor_idProveedor` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `idEmpleados` varchar(15) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `Direccion` varchar(70) NOT NULL,
  `celular` varchar(13) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `vinculado` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`idEmpleados`, `nombre`, `Direccion`, `celular`, `telefono`, `email`, `vinculado`) VALUES
('1002200331', 'JORGE BELALCAZAR LOPEZ', 'Cerros de Albornoz Mz 24A Lote 26', '', '3145140098', '', 'vinculado'),
('1047425803', 'MARLON BERMUDEZ', 'Pozon calle3 lote 20', '', '3242319060', '', 'vinculado'),
('1047430708', 'GABRIEL SILGADO', 'Olaya callejon Yanet', '', '3157254466', '', 'vinculado'),
('1050978082', 'JESUS DAVID ALCAZAR CORTEZ', 'Nelson Mandela la primavera Mz H Lt 9', '', '3014069095', '', 'vinculado'),
('1143398040', 'JORGE DIN LORDUY', 'San Jose sector revivir', '', '3135269234', '', 'vinculado'),
('24249010', 'JORGE ANDRES IGUARAN', 'Mirador albornoz', '', '3242305806', '', 'vinculado'),
('73203010', 'LEONARDO MARTINEZ', 'Ternera calle San Carlos 33-33', '', '3144692265', '', 'vinculado'),
('7921905', 'WALTER HERRERA MOZO', 'Arjona', '', '3013193074', '', 'vinculado'),
('8850623', 'JORGE MARRUGO', 'Olaya sector 11 de noviembre 5312', '', '3145130726', '', 'vinculado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `cod_factura` int(11) NOT NULL,
  `Clientes_idClientes` varchar(15) NOT NULL,
  `Placa_placa` varchar(6) NOT NULL,
  `km` int(6) NOT NULL,
  `t_pago` varchar(10) NOT NULL,
  `valor_neto` decimal(10,0) NOT NULL,
  `valor_bruto` decimal(10,0) NOT NULL,
  `comision_empleados` decimal(10,0) NOT NULL,
  `abono` decimal(10,0) NOT NULL,
  `fecha` date NOT NULL,
  `comentario` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_anuladas`
--

CREATE TABLE `facturas_anuladas` (
  `cod_factura` int(11) NOT NULL,
  `Clientes_idClientes` varchar(15) NOT NULL,
  `Placa_placa` varchar(6) NOT NULL,
  `km` int(6) NOT NULL,
  `t_pago` varchar(10) NOT NULL,
  `valor_neto` decimal(10,0) NOT NULL,
  `valor_bruto` decimal(10,0) NOT NULL,
  `comision_empleados` decimal(10,0) NOT NULL,
  `abono` decimal(10,0) NOT NULL,
  `fecha` date NOT NULL,
  `comentario` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `facturas_anuladas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_factura`
--

CREATE TABLE `items_factura` (
  `idItems` int(20) NOT NULL,
  `cod_item` varchar(10) NOT NULL,
  `t_item` varchar(15) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `referencia` varchar(30) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `valor_unitario` decimal(10,0) NOT NULL,
  `valor_total` decimal(10,0) NOT NULL,
  `factura_codFactura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items_factura`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_factura_anulada`
--

CREATE TABLE `items_factura_anulada` (
  `idItems` int(20) NOT NULL,
  `cod_item` varchar(10) NOT NULL,
  `t_item` varchar(15) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `referencia` varchar(30) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `valor_unitario` decimal(10,0) NOT NULL,
  `valor_total` decimal(10,0) NOT NULL,
  `factura_codFactura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items_factura_anulada`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `CodProducto` varchar(10) NOT NULL,
  `NombreProducto` varchar(50) NOT NULL,
  `Referencia` varchar(30) NOT NULL,
  `Marca` varchar(30) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Min` int(2) NOT NULL,
  `Cantidad` int(3) NOT NULL,
  `Precio` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `idProveedor` varchar(15) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `celular` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `T_proveedor` varchar(10) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idServicios` varchar(6) NOT NULL,
  `nombreServicio` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicios`, `nombreServicio`, `descripcion`, `precio`) VALUES
('CAM', 'CAMBIO DE ACEITE MOTOR', 'cambio de aceite de motor y filtracion', '0'),
('GFTO', 'GRAFITADO', 'aplicacion de grafito al chasis del vehiculo', '0'),
('LAA', 'LAVADO ARRIBA Y ABAJO', 'lavado arriba y abajo con aspirado interior', '18000'),
('LEA', 'LAVADO EXTERNO Y ABAJO', 'lavado de exterior y abajo', '15000'),
('LEX', 'LAVADO EXTERIOR', 'solo lavado exterior sin aspirado interior', '10000'),
('LGRAL', 'LAVADO GENERAL', 'lavado arriba, abajo, aspirado interior y lavado de motor.', '30000'),
('LMS', 'LAVADO DE MOTOR', 'lavado de motor en seco', '15000'),
('LS', 'LAVADO SENCILLO', 'lavado arriba con aspirado en el interior', '12000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_por_empleados`
--

CREATE TABLE `servicios_por_empleados` (
  `codServicio` int(15) NOT NULL,
  `empleados_idEmpleado` varchar(11) NOT NULL,
  `comision` decimal(10,0) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `factura_codFactura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios_por_empleados`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `placa` varchar(6) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `anio` varchar(4) NOT NULL,
  `kilometraje` int(6) NOT NULL,
  `Clientes_idClientes` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indices de la tabla `abonos`
--
ALTER TABLE `abonos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idClientes`);

--
-- Indices de la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `Proveedor_idProveedor` (`Proveedor_idProveedor`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`idEmpleados`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`cod_factura`),
  ADD KEY `Clientes_idClientes` (`Clientes_idClientes`),
  ADD KEY `Placa_placa` (`Placa_placa`);

--
-- Indices de la tabla `facturas_anuladas`
--
ALTER TABLE `facturas_anuladas`
  ADD PRIMARY KEY (`cod_factura`),
  ADD KEY `Clientes_idClientes,` (`Clientes_idClientes`),
  ADD KEY `Placa_placa` (`Placa_placa`);

--
-- Indices de la tabla `items_factura`
--
ALTER TABLE `items_factura`
  ADD PRIMARY KEY (`idItems`),
  ADD KEY `facturas_	cod_factura` (`factura_codFactura`);

--
-- Indices de la tabla `items_factura_anulada`
--
ALTER TABLE `items_factura_anulada`
  ADD PRIMARY KEY (`idItems`),
  ADD KEY `factura_codFactura` (`factura_codFactura`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`CodProducto`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idServicios`);

--
-- Indices de la tabla `servicios_por_empleados`
--
ALTER TABLE `servicios_por_empleados`
  ADD PRIMARY KEY (`codServicio`),
  ADD KEY `factura_codFactura` (`factura_codFactura`),
  ADD KEY `idEmpleado` (`empleados_idEmpleado`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`placa`),
  ADD KEY `Clientes_idClientes` (`Clientes_idClientes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `abonos`
--
ALTER TABLE `abonos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `egresos`
--
ALTER TABLE `egresos`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `cod_factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `items_factura`
--
ALTER TABLE `items_factura`
  MODIFY `idItems` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `servicios_por_empleados`
--
ALTER TABLE `servicios_por_empleados`
  MODIFY `codServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
