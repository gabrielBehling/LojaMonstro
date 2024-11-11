IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'monsterAntiqueDB')
BEGIN
    CREATE DATABASE monsterAntiqueDB;
END;
use monsterAntiqueDB

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Post' AND TABLE_SCHEMA = 'dbo')
BEGIN
    CREATE TABLE dbo.Post (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100),
        date DATE,
        time TIME,
        content VARCHAR(MAX)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Product' AND TABLE_SCHEMA = 'dbo')
BEGIN
    CREATE TABLE dbo.Product (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        supplier VARCHAR(100) NOT NULL,
        img VARCHAR(255)
    );
END;