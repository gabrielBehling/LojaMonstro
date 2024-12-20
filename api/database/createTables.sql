use monsterAntiqueDB

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Posts' AND TABLE_SCHEMA = 'dbo')
BEGIN
    CREATE TABLE dbo.Post (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        img VARCHAR(255),
        content VARCHAR(MAX) NOT NULL,
        footerImg VARCHAR(255),
        author VARCHAR(100) NOT NULL,
        date DATE NOT NULL DEFAULT CONVERT(DATE, GETDATE()),
        time TIME NOT NULL DEFAULT CONVERT(TIME, GETDATE())
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products' AND TABLE_SCHEMA = 'dbo')
BEGIN
    CREATE TABLE dbo.Product (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        supplier VARCHAR(100) NOT NULL,
        img VARCHAR(255)
    );
END;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'User' AND TABLE_SCHEMA = 'dbo')
BEGIN
    CREATE TABLE dbo.[User] (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
		img VARCHAR(255)
    );
END;