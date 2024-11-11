IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'monsterAntiqueDB')
BEGIN
    CREATE DATABASE monsterAntiqueDB;
END;