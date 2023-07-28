CREATE TABLE Login (
    Email varchar(20) NOT NULL,
    Password varchar(50) NOT NULL,
	PRIMARY KEY (Email)

); 

CREATE TABLE Pedido (
	PedidoID int NOT NULL IDENTITY PRIMARY KEY,
    CNPJ varchar(20) NOT NULL,
    Resultado varchar(1010) NOT NULL,
); 

USE ReceitaWSDB;
INSERT INTO Login (Email,Password)
VALUES ('admin@admin.com', 'admin123'); 